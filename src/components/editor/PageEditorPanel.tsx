import React, { useState, useEffect, useRef } from 'react';
import {
    Save, X, Loader, RefreshCw, Languages, Edit, Eye,
    CheckCircle, AlertCircle, History, RotateCcw, ExternalLink
} from 'lucide-react';
import { usePageEditor } from '../../contexts/PageEditorContext';
import { getAllPageContent, PageContent } from '../../utils/mockData';

interface PageEditorPanelProps {
    onClose?: () => void;
}

/**
 * Page Editor Panel v2 - Shows actual home page in iframe with edit mode
 */
const PageEditorPanel: React.FC<PageEditorPanelProps> = ({ onClose }) => {
    const {
        isEditMode,
        setEditMode,
        hasUnsavedChanges,
        hasPendingTranslations,
        saveAllChanges,
        discardChanges,
        translateAll,
        isTranslating,
        isSaving,
        refreshContent,
        dbContent
    } = usePageEditor();

    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [contentList, setContentList] = useState<PageContent[]>([]);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Load content list
    useEffect(() => {
        const loadContent = async () => {
            const content = await getAllPageContent();
            setContentList(content);
        };
        loadContent();
    }, [dbContent]);

    // Send edit mode to iframe
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: 'SET_EDIT_MODE', enabled: isEditMode },
                '*'
            );
        }
    }, [isEditMode]);

    // Show notification
    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Handle save
    const handleSave = async () => {
        try {
            await saveAllChanges();
            showNotification('Modificările au fost salvate!', 'success');
            // Refresh iframe to show saved changes
            if (iframeRef.current) {
                iframeRef.current.src = iframeRef.current.src;
            }
        } catch (error) {
            showNotification('Eroare la salvare', 'error');
        }
    };

    // Handle discard
    const handleDiscard = () => {
        if (hasUnsavedChanges) {
            if (window.confirm('Sigur vrei să anulezi modificările?')) {
                discardChanges();
                showNotification('Modificările au fost anulate', 'success');
            }
        }
    };

    // Handle translate
    const handleTranslate = async () => {
        try {
            await translateAll();
            showNotification('Traducerile au fost încărcate!', 'success');
        } catch (error) {
            showNotification('Eroare la traducere', 'error');
        }
    };

    // Toggle edit mode
    const handleToggleEditMode = () => {
        if (isEditMode && hasUnsavedChanges) {
            if (window.confirm('Ai modificări nesalvate. Vrei să le anulezi?')) {
                discardChanges();
                setEditMode(false);
            }
        } else {
            setEditMode(!isEditMode);
        }
    };

    // Open home page in new tab
    const openInNewTab = () => {
        window.open('/', '_blank');
    };

    return (
        <div className="h-full flex flex-col bg-stone-100">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {notification.message}
                </div>
            )}

            {/* Toolbar */}
            <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-serif font-bold text-stone-800">Editor Pagină</h2>

                    {/* Edit Mode Toggle */}
                    <button
                        onClick={handleToggleEditMode}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isEditMode
                                ? 'bg-bakery-500 text-white shadow-md'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                    >
                        {isEditMode ? <Edit size={18} /> : <Eye size={18} />}
                        {isEditMode ? 'Mod Editare ACTIV' : 'Mod Vizualizare'}
                    </button>

                    {/* Open in new tab */}
                    <button
                        onClick={openInNewTab}
                        className="flex items-center gap-2 px-3 py-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                        title="Deschide pagina în tab nou"
                    >
                        <ExternalLink size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Refresh */}
                    <button
                        onClick={() => {
                            refreshContent();
                            if (iframeRef.current) {
                                iframeRef.current.src = iframeRef.current.src;
                            }
                        }}
                        className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                        title="Reîncarcă"
                    >
                        <RefreshCw size={20} />
                    </button>

                    {/* Translate Button */}
                    {hasPendingTranslations && (
                        <button
                            onClick={handleTranslate}
                            disabled={isTranslating}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 shadow-md"
                        >
                            {isTranslating ? (
                                <>
                                    <Loader size={18} className="animate-spin" />
                                    Se traduce...
                                </>
                            ) : (
                                <>
                                    <Languages size={18} />
                                    Încarcă traduceri
                                </>
                            )}
                        </button>
                    )}

                    {/* Save/Discard buttons */}
                    {isEditMode && (
                        <>
                            <button
                                onClick={handleDiscard}
                                disabled={!hasUnsavedChanges || isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-all disabled:opacity-50"
                            >
                                <X size={18} />
                                Anulează
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={!hasUnsavedChanges || isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 shadow-md"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader size={18} className="animate-spin" />
                                        Se salvează...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Salvează
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-sm text-amber-800">
                <strong>📝 Notă:</strong> Această funcție este în dezvoltare. În această versiune, puteți edita textul din secțiunile de mai jos.
                Pentru a vedea modificările pe pagina principală, actualizați componentele Hero, InfoSection și Footer direct.
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Preview Panel */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-200">
                        <div className="bg-stone-800 text-white px-4 py-2 flex items-center gap-2 text-sm">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="ml-4 text-stone-400">officinadelgusto.ro - Editor Preview</span>
                            {isEditMode && (
                                <span className="ml-auto bg-green-500 px-2 py-0.5 rounded text-xs font-medium animate-pulse">
                                    MOD EDITARE ACTIV
                                </span>
                            )}
                        </div>

                        {/* Editing instructions */}
                        {isEditMode && (
                            <div className="bg-bakery-50 border-b border-bakery-200 px-4 py-3 text-sm">
                                <div className="flex items-center gap-2 text-bakery-700">
                                    <Edit size={16} />
                                    <span><strong>Click pe text</strong> pentru a edita</span>
                                    <span className="mx-2">•</span>
                                    <kbd className="px-1.5 py-0.5 bg-white rounded border text-xs font-mono">Ctrl+Z</kbd>
                                    <span>undo</span>
                                    <span className="mx-2">•</span>
                                    <kbd className="px-1.5 py-0.5 bg-white rounded border text-xs font-mono">Ctrl+Shift+Z</kbd>
                                    <span>redo</span>
                                    <span className="mx-2">•</span>
                                    <kbd className="px-1.5 py-0.5 bg-white rounded border text-xs font-mono">Esc</kbd>
                                    <span>anulează</span>
                                </div>
                            </div>
                        )}

                        {/* Demo editable sections */}
                        <DemoEditableSections />
                    </div>
                </div>

                {/* Sidebar - Content List */}
                <div className="w-80 bg-white border-l border-stone-200 p-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-stone-800">Conținut Salvat</h3>
                        <span className="text-xs text-stone-400">{contentList.length} elemente</span>
                    </div>

                    {contentList.length === 0 ? (
                        <div className="text-stone-400 text-sm text-center py-8">
                            <Edit size={32} className="mx-auto mb-3 opacity-30" />
                            <p>Niciun conținut personalizat încă.</p>
                            <p className="mt-2 text-xs">Editați textul și salvați pentru a vedea aici.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {contentList.map((content) => (
                                <div
                                    key={content.id}
                                    className="p-3 bg-stone-50 rounded-lg border border-stone-200 hover:border-bakery-300 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-mono text-bakery-600 bg-bakery-50 px-1.5 py-0.5 rounded">
                                            {content.section_key}
                                        </span>
                                        {content.needs_translation && (
                                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                                Necesită traducere
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-stone-700 line-clamp-2 mt-2">{content.content_ro}</p>
                                    <p className="text-xs text-stone-400 mt-1">
                                        Actualizat: {new Date(content.updated_at).toLocaleString('ro-RO')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Import EditableText for demo sections
import EditableText from './EditableText';

/**
 * Demo sections that show what the page editor can do
 */
const DemoEditableSections: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-bakery-800 to-bakery-950 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-2 left-2 bg-white/10 text-white/70 text-xs px-2 py-1 rounded backdrop-blur-sm">
                    Hero Section
                </div>
                <div className="pt-4">
                    <EditableText
                        contentKey="hero.heading"
                        defaultValue="Officina del Gusto"
                        as="h1"
                        className="text-4xl font-serif font-bold mb-3"
                    />
                    <EditableText
                        contentKey="hero.subheading"
                        defaultValue="Pasiune pentru Delicii"
                        as="p"
                        className="font-cursive text-2xl text-bakery-300 mb-4"
                    />
                    <EditableText
                        contentKey="hero.description"
                        defaultValue="Descoperă aromele autentice ale patiseriei noastre artizanale. Fiecare produs este făcut cu dragoste și ingrediente proaspete."
                        as="p"
                        className="text-bakery-100 max-w-lg leading-relaxed"
                        multiline
                    />
                    <div className="flex gap-3 mt-6">
                        <EditableText
                            contentKey="hero.primaryCta"
                            defaultValue="Descoperă Produsele"
                            as="span"
                            className="px-6 py-3 bg-bakery-500 hover:bg-bakery-600 rounded-full font-bold cursor-pointer"
                        />
                        <EditableText
                            contentKey="hero.secondaryCta"
                            defaultValue="Localizare"
                            as="span"
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 relative">
                <div className="absolute top-2 left-2 bg-bakery-500/10 text-bakery-600 text-xs px-2 py-1 rounded">
                    Info Section
                </div>
                <div className="pt-4">
                    <EditableText
                        contentKey="info.heading"
                        defaultValue="Bine ați venit!"
                        as="h2"
                        className="text-3xl font-serif font-bold text-bakery-900 mb-4"
                    />
                    <EditableText
                        contentKey="info.description"
                        defaultValue="Suntem o patiserie de familie cu tradiție în prepararea produselor de calitate. De peste 10 ani, oferim clienților noștri cele mai gustoase delicii."
                        as="p"
                        className="text-bakery-700 leading-relaxed max-w-2xl"
                        multiline
                    />
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-neutral-900 rounded-2xl p-8 text-white relative">
                <div className="absolute top-2 left-2 bg-white/10 text-white/70 text-xs px-2 py-1 rounded">
                    Footer Section
                </div>
                <div className="pt-4">
                    <h3 className="text-2xl font-serif font-bold mb-2">Officina del Gusto</h3>
                    <EditableText
                        contentKey="footer.tagline"
                        defaultValue="Pasiune pentru Delicii"
                        as="p"
                        className="font-cursive text-bakery-400 text-xl"
                    />
                </div>
            </div>

            {/* Help text */}
            <div className="text-center py-4 text-stone-400 text-sm">
                <p>💡 Modificările făcute aici vor fi salvate în baza de date și pot fi afișate pe site.</p>
                <p className="mt-1">Pentru a reflecta pe pagina publică, este necesară integrarea completă a componentelor.</p>
            </div>
        </div>
    );
};

export default PageEditorPanel;
