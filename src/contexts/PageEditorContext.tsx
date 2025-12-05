import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import {
    getAllPageContent,
    savePageContent,
    hasContentPendingTranslation,
    getContentNeedingTranslation,
    updatePageContentTranslations,
    PageContent,
    Language
} from '../utils/mockData';

interface EditedContent {
    sectionKey: string;
    originalValue: string;
    currentValue: string;
    isDirty: boolean;
}

interface PageEditorContextValue {
    isEditMode: boolean;
    setEditMode: (enabled: boolean) => void;
    editedContent: Map<string, EditedContent>;
    dbContent: Map<string, PageContent>;
    updateContent: (sectionKey: string, value: string, originalValue: string) => void;
    getContentValue: (sectionKey: string, defaultValue: string) => string;
    hasUnsavedChanges: boolean;
    hasPendingTranslations: boolean;
    saveAllChanges: () => Promise<void>;
    discardChanges: () => void;
    translateAll: () => Promise<void>;
    isTranslating: boolean;
    isSaving: boolean;
    refreshContent: () => Promise<void>;
}

const PageEditorContext = createContext<PageEditorContextValue | undefined>(undefined);

interface PageEditorProviderProps {
    children: ReactNode;
    enabled?: boolean;
}

export const PageEditorProvider: React.FC<PageEditorProviderProps> = ({ children, enabled = false }) => {
    const [isEditMode, setIsEditMode] = useState(enabled);
    const [editedContent, setEditedContent] = useState<Map<string, EditedContent>>(new Map());
    const [dbContent, setDbContent] = useState<Map<string, PageContent>>(new Map());
    const [hasPendingTranslations, setHasPendingTranslations] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Load content from database
    const refreshContent = useCallback(async () => {
        try {
            const content = await getAllPageContent();
            const contentMap = new Map<string, PageContent>();
            content.forEach(item => {
                contentMap.set(item.section_key, item);
            });
            setDbContent(contentMap);

            // Check for pending translations
            const pending = await hasContentPendingTranslation();
            setHasPendingTranslations(pending);
        } catch (error) {
            console.error('Error loading page content:', error);
        }
    }, []);

    // Load on mount
    useEffect(() => {
        refreshContent();
    }, [refreshContent]);

    // Set edit mode
    const setEditMode = useCallback((mode: boolean) => {
        setIsEditMode(mode);
        if (!mode) {
            // Clear edits when exiting edit mode
            setEditedContent(new Map());
        }
    }, []);

    // Update content locally (not saved to DB yet)
    const updateContent = useCallback((sectionKey: string, value: string, originalValue: string) => {
        setEditedContent(prev => {
            const next = new Map(prev);
            next.set(sectionKey, {
                sectionKey,
                originalValue,
                currentValue: value,
                isDirty: value !== originalValue
            });
            return next;
        });
    }, []);

    // Get content value (edited > DB > default)
    const getContentValue = useCallback((sectionKey: string, defaultValue: string): string => {
        // First check if there's an edited value
        const edited = editedContent.get(sectionKey);
        if (edited) {
            return edited.currentValue;
        }

        // Then check DB content
        const db = dbContent.get(sectionKey);
        if (db?.content_ro) {
            return db.content_ro;
        }

        // Fall back to default
        return defaultValue;
    }, [editedContent, dbContent]);

    // Check if there are unsaved changes
    const hasUnsavedChanges = Array.from(editedContent.values()).some(e => e.isDirty);

    // Save all changes to database
    const saveAllChanges = useCallback(async () => {
        if (!hasUnsavedChanges) return;

        setIsSaving(true);
        try {
            const dirtyEntries = Array.from(editedContent.values()).filter(e => e.isDirty);

            for (const entry of dirtyEntries) {
                await savePageContent(entry.sectionKey, entry.currentValue);
            }

            // Clear local edits
            setEditedContent(new Map());

            // Refresh from DB
            await refreshContent();
        } catch (error) {
            console.error('Error saving changes:', error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    }, [editedContent, hasUnsavedChanges, refreshContent]);

    // Discard all changes
    const discardChanges = useCallback(() => {
        setEditedContent(new Map());
    }, []);

    // Translate all pending content using Gemini API
    const translateAll = useCallback(async () => {
        setIsTranslating(true);
        try {
            const pendingContent = await getContentNeedingTranslation();

            if (pendingContent.length === 0) {
                setHasPendingTranslations(false);
                return;
            }

            // Use Gemini API for translation
            const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

            if (!GEMINI_API_KEY) {
                throw new Error('Gemini API key not configured');
            }

            const targetLanguages: Language[] = ['en', 'it', 'fr', 'es', 'zh', 'ru'];

            for (const content of pendingContent) {
                const translations: Partial<Record<Language, string>> = {};

                // Translate to each language
                for (const lang of targetLanguages) {
                    const langName = {
                        en: 'English',
                        it: 'Italian',
                        fr: 'French',
                        es: 'Spanish',
                        zh: 'Chinese (Simplified)',
                        ru: 'Russian'
                    }[lang];

                    try {
                        const response = await fetch(
                            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    contents: [{
                                        parts: [{
                                            text: `Translate the following Romanian text to ${langName}. Return ONLY the translated text, nothing else. Do not add quotes or explanations.\n\nRomanian text: "${content.content_ro}"`
                                        }]
                                    }],
                                    generationConfig: {
                                        temperature: 0.3,
                                        maxOutputTokens: 1000
                                    }
                                })
                            }
                        );

                        if (response.ok) {
                            const data = await response.json();
                            const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                            if (translatedText) {
                                translations[lang] = translatedText;
                            }
                        }
                    } catch (err) {
                        console.error(`Error translating to ${lang}:`, err);
                    }
                }

                // Update the database with translations
                await updatePageContentTranslations(content.section_key, translations);
            }

            // Refresh content and check for pending
            await refreshContent();
        } catch (error) {
            console.error('Error during translation:', error);
            throw error;
        } finally {
            setIsTranslating(false);
        }
    }, [refreshContent]);

    const value: PageEditorContextValue = {
        isEditMode,
        setEditMode,
        editedContent,
        dbContent,
        updateContent,
        getContentValue,
        hasUnsavedChanges,
        hasPendingTranslations,
        saveAllChanges,
        discardChanges,
        translateAll,
        isTranslating,
        isSaving,
        refreshContent
    };

    return (
        <PageEditorContext.Provider value={value}>
            {children}
        </PageEditorContext.Provider>
    );
};

export const usePageEditor = () => {
    const context = useContext(PageEditorContext);
    if (!context) {
        throw new Error('usePageEditor must be used within a PageEditorProvider');
    }
    return context;
};

// Hook for components that may or may not be in a PageEditorProvider
export const usePageEditorOptional = () => {
    return useContext(PageEditorContext);
};
