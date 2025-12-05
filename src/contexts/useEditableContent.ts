import { useState, useEffect, useCallback } from 'react';
import { getPageContent, savePageContent, PageContent, Language } from '../utils/mockData';
import { useLanguage } from './LanguageContext';
import { supabase } from '../supabaseClient';

interface EditableContentValue {
    value: string;
    isFromDb: boolean;
    isLoading: boolean;
}

/**
 * Hook to get editable content from database with fallback to translations
 * - Fetches from page_content table first
 * - Falls back to dictionary translation if not in DB
 * - Subscribes to realtime updates
 */
export const useEditableContent = (
    contentKey: string,
    fallbackValue: string
): EditableContentValue => {
    const { language } = useLanguage();
    const [dbContent, setDbContent] = useState<PageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch content from DB
    const fetchContent = useCallback(async () => {
        try {
            const content = await getPageContent(contentKey);
            setDbContent(content);
        } catch (error) {
            console.error('Error fetching content:', contentKey, error);
        } finally {
            setIsLoading(false);
        }
    }, [contentKey]);

    // Initial fetch and realtime subscription
    useEffect(() => {
        fetchContent();

        // Subscribe to realtime changes
        const channel = supabase
            .channel(`content-${contentKey}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'page_content',
                    filter: `section_key=eq.${contentKey}`
                },
                () => {
                    fetchContent();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [contentKey, fetchContent]);

    // Determine the value to return
    if (isLoading) {
        return { value: fallbackValue, isFromDb: false, isLoading: true };
    }

    if (dbContent) {
        // Get content for current language, fall back to Romanian
        const langKey = `content_${language}` as keyof PageContent;
        const localizedContent = (dbContent[langKey] as string) || dbContent.content_ro;

        if (localizedContent) {
            return { value: localizedContent, isFromDb: true, isLoading: false };
        }
    }

    // Fall back to translation
    return { value: fallbackValue, isFromDb: false, isLoading: false };
};

/**
 * Simple hook to check if we're in edit mode (via URL parameter)
 */
export const useIsEditMode = (): boolean => {
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        // Check URL for edit parameter
        const params = new URLSearchParams(window.location.search);
        setIsEditMode(params.get('edit') === 'true');

        // Listen for postMessage from parent (admin panel)
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'SET_EDIT_MODE') {
                setIsEditMode(event.data.enabled);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return isEditMode;
};
