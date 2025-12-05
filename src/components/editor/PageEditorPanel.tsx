import React, { useState, useEffect } from 'react';
import {
    Save, X, Loader, RefreshCw, Languages, Edit, Eye,
    CheckCircle, AlertCircle, MapPin, Clock, Wheat, Heart, Coffee,
    ShoppingBag, PartyPopper, Briefcase, Phone, Mail, Navigation
} from 'lucide-react';
import { usePageEditor } from '../../contexts/PageEditorContext';
import { getAllPageContent, PageContent } from '../../utils/mockData';
import EditableText from './EditableText';

interface PageEditorPanelProps {
    onClose?: () => void;
}

/**
 * Page Editor Panel v3 - Complete page mirror with all sections
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

    // Get current hostname for display
    const currentHost = window.location.hostname === 'localhost'
        ? `localhost:${window.location.port}`
        : window.location.hostname;

    // Load content list
    useEffect(() => {
        const loadContent = async () => {
            const content = await getAllPageContent();
            setContentList(content);
        };
        loadContent();
    }, [dbContent]);

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
            <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-serif font-bold text-stone-800">Editor Pagină</h2>

                    {/* Edit Mode Toggle */}
                    <button
                        onClick={handleToggleEditMode}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isEditMode
                                ? 'bg-green-500 text-white shadow-md'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                    >
                        {isEditMode ? <Edit size={18} /> : <Eye size={18} />}
                        {isEditMode ? 'Mod Editare ACTIV' : 'Mod Vizualizare'}
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Refresh */}
                    <button
                        onClick={refreshContent}
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

            {/* Keyboard shortcuts banner */}
            {isEditMode && (
                <div className="bg-green-50 border-b border-green-200 px-6 py-2 text-sm flex-shrink-0">
                    <div className="flex items-center gap-4 text-green-700">
                        <span><strong>Click pe text</strong> pentru a edita</span>
                        <span className="text-green-400">•</span>
                        <span><kbd className="px-1.5 py-0.5 bg-white rounded border text-xs font-mono">Ctrl+Z</kbd> undo</span>
                        <span className="text-green-400">•</span>
                        <span><kbd className="px-1.5 py-0.5 bg-white rounded border text-xs font-mono">Ctrl+Shift+Z</kbd> redo</span>
                        <span className="text-green-400">•</span>
                        <span><kbd className="px-1.5 py-0.5 bg-white rounded border text-xs font-mono">Esc</kbd> anulează</span>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Preview Panel - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    {/* Browser Chrome */}
                    <div className="sticky top-0 z-10 bg-stone-800 text-white px-4 py-2 flex items-center gap-2 text-sm">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="ml-4 text-stone-400">{currentHost} - Previzualizare Pagină</span>
                        {isEditMode && (
                            <span className="ml-auto bg-green-500 px-2 py-0.5 rounded text-xs font-medium animate-pulse">
                                EDITARE ACTIVĂ
                            </span>
                        )}
                    </div>

                    {/* Page Content - All Sections */}
                    <div className="bg-white">
                        {/* === HERO SECTION === */}
                        <section className="relative bg-gradient-to-b from-bakery-900 via-bakery-800 to-bakery-900 text-white py-20 px-6">
                            <div className="absolute top-2 left-2 bg-white/10 text-white/60 text-xs px-2 py-1 rounded">
                                Hero Section
                            </div>
                            <div className="max-w-4xl mx-auto text-center pt-8">
                                <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full text-sm bg-black/30">
                                    <MapPin size={14} className="text-bakery-400" />
                                    <span>Drăgășani • Băbeni</span>
                                </div>

                                <EditableText
                                    contentKey="hero.heading"
                                    defaultValue="Officina del Gusto"
                                    as="h1"
                                    className="text-5xl md:text-6xl font-serif font-bold mb-4"
                                />
                                <EditableText
                                    contentKey="hero.subheading"
                                    defaultValue="Pasiune pentru Delicii"
                                    as="p"
                                    className="font-cursive text-3xl text-bakery-300 mb-6"
                                />
                                <EditableText
                                    contentKey="hero.description"
                                    defaultValue="Descoperă aromele autentice ale patiseriei noastre artizanale. Fiecare produs este făcut cu dragoste și ingrediente proaspete."
                                    as="p"
                                    className="text-lg text-bakery-100 max-w-2xl mx-auto mb-8"
                                    multiline
                                />
                                <div className="flex gap-4 justify-center flex-wrap">
                                    <EditableText
                                        contentKey="hero.primaryCta"
                                        defaultValue="Descoperă Produsele"
                                        as="span"
                                        className="px-8 py-3 bg-bakery-500 rounded-full font-bold cursor-pointer hover:bg-bakery-600"
                                    />
                                    <EditableText
                                        contentKey="hero.secondaryCta"
                                        defaultValue="Localizare"
                                        as="span"
                                        className="px-8 py-3 bg-white/10 border border-white/30 rounded-full font-medium cursor-pointer hover:bg-white/20"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* === INFO SECTION - Tradiție și Pasiune === */}
                        <section className="py-16 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                            <div className="absolute top-2 left-2 bg-bakery-500/10 text-bakery-600 text-xs px-2 py-1 rounded">
                                Info Section
                            </div>
                            <div className="max-w-6xl mx-auto">
                                <div className="text-center mb-12">
                                    <EditableText
                                        contentKey="infoSection.heading"
                                        defaultValue="Tradiție și Pasiune"
                                        as="h2"
                                        className="text-4xl font-serif font-bold text-bakery-900 mb-4"
                                    />
                                    <div className="w-20 h-1 bg-bakery-400 mx-auto rounded-full mb-6"></div>
                                    <EditableText
                                        contentKey="infoSection.description"
                                        defaultValue="Fiecare produs din Officina del Gusto este creat cu atenție la detalii, folosind rețete tradiționale și ingrediente de cea mai bună calitate."
                                        as="p"
                                        className="text-bakery-700 max-w-3xl mx-auto text-lg"
                                        multiline
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Schedule Card */}
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-bakery-100">
                                        <div className="w-12 h-12 bg-bakery-100 text-bakery-600 rounded-xl flex items-center justify-center mb-4">
                                            <Clock size={24} />
                                        </div>
                                        <EditableText
                                            contentKey="infoSection.cards.schedule.title"
                                            defaultValue="Program"
                                            as="h3"
                                            className="text-xl font-serif font-bold text-bakery-800 mb-2"
                                        />
                                        <EditableText
                                            contentKey="infoSection.cards.schedule.description"
                                            defaultValue="Vă așteptăm să ne vizitați în fiecare zi."
                                            as="p"
                                            className="text-bakery-600 text-sm"
                                            multiline
                                        />
                                    </div>

                                    {/* Quality Card */}
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-bakery-100">
                                        <div className="w-12 h-12 bg-bakery-100 text-bakery-600 rounded-xl flex items-center justify-center mb-4">
                                            <Wheat size={24} />
                                        </div>
                                        <EditableText
                                            contentKey="infoSection.cards.quality.title"
                                            defaultValue="Calitate Supremă"
                                            as="h3"
                                            className="text-xl font-serif font-bold text-bakery-800 mb-2"
                                        />
                                        <EditableText
                                            contentKey="infoSection.cards.quality.description"
                                            defaultValue="Ingrediente proaspete, rețete autentice și pasiune în fiecare produs."
                                            as="p"
                                            className="text-bakery-600 text-sm"
                                            multiline
                                        />
                                    </div>

                                    {/* Passion Card */}
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-bakery-100">
                                        <div className="w-12 h-12 bg-bakery-100 text-bakery-600 rounded-xl flex items-center justify-center mb-4">
                                            <Heart size={24} />
                                        </div>
                                        <EditableText
                                            contentKey="infoSection.cards.passion.title"
                                            defaultValue="Cu Pasiune"
                                            as="h3"
                                            className="text-xl font-serif font-bold text-bakery-800 mb-2"
                                        />
                                        <EditableText
                                            contentKey="infoSection.cards.passion.description"
                                            defaultValue="Fiecare creație este făcută cu dragoste și dedicare."
                                            as="p"
                                            className="text-bakery-600 text-sm"
                                            multiline
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* === PRODUCTS SECTION (Header Only) === */}
                        <section className="py-16 px-6 bg-bakery-50">
                            <div className="max-w-6xl mx-auto text-center">
                                <EditableText
                                    contentKey="productGallery.eyebrow"
                                    defaultValue="Bunătăți"
                                    as="span"
                                    className="font-cursive text-2xl text-bakery-500 block mb-2"
                                />
                                <EditableText
                                    contentKey="productGallery.title"
                                    defaultValue="Produsele Noastre"
                                    as="h2"
                                    className="text-4xl font-serif font-bold text-bakery-900 mb-4"
                                />
                                <EditableText
                                    contentKey="productGallery.description"
                                    defaultValue="De la prăjituri delicate la pizza artizanală, fiecare produs este o operă de artă culinară."
                                    as="p"
                                    className="text-bakery-700 max-w-2xl mx-auto text-lg mb-8"
                                    multiline
                                />
                                <div className="bg-white/50 border-2 border-dashed border-bakery-200 rounded-2xl p-8 text-bakery-400">
                                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-sm">Produsele sunt editabile în tabul "Produse & Meniu"</p>
                                </div>
                            </div>
                        </section>

                        {/* === CUSTOM ORDERS SECTION === */}
                        <section className="py-16 px-6 bg-gradient-to-b from-amber-50 to-orange-50">
                            <div className="max-w-6xl mx-auto text-center">
                                <EditableText
                                    contentKey="customOrders.eyebrow"
                                    defaultValue="Servicii Speciale"
                                    as="span"
                                    className="font-cursive text-2xl text-bakery-500 block mb-2"
                                />
                                <EditableText
                                    contentKey="customOrders.title"
                                    defaultValue="Comenzi Speciale"
                                    as="h2"
                                    className="text-4xl font-serif font-bold text-bakery-900 mb-4"
                                />
                                <EditableText
                                    contentKey="customOrders.description"
                                    defaultValue="Torturi personalizate, prăjituri pentru evenimente și comenzi pentru ocazii speciale."
                                    as="p"
                                    className="text-bakery-700 max-w-2xl mx-auto text-lg mb-8"
                                    multiline
                                />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <PartyPopper size={24} className="text-bakery-500 mx-auto mb-2" />
                                        <EditableText
                                            contentKey="customOrders.feature1"
                                            defaultValue="Evenimente"
                                            as="span"
                                            className="text-sm text-bakery-700 font-medium"
                                        />
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <Heart size={24} className="text-bakery-500 mx-auto mb-2" />
                                        <EditableText
                                            contentKey="customOrders.feature2"
                                            defaultValue="Nunți"
                                            as="span"
                                            className="text-sm text-bakery-700 font-medium"
                                        />
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <Coffee size={24} className="text-bakery-500 mx-auto mb-2" />
                                        <EditableText
                                            contentKey="customOrders.feature3"
                                            defaultValue="Botezuri"
                                            as="span"
                                            className="text-sm text-bakery-700 font-medium"
                                        />
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <Clock size={24} className="text-bakery-500 mx-auto mb-2" />
                                        <EditableText
                                            contentKey="customOrders.feature4"
                                            defaultValue="Aniversări"
                                            as="span"
                                            className="text-sm text-bakery-700 font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* === JOBS SECTION (Header Only) === */}
                        <section className="py-16 px-6 bg-white">
                            <div className="max-w-6xl mx-auto text-center">
                                <EditableText
                                    contentKey="jobs.eyebrow"
                                    defaultValue="Cariere"
                                    as="span"
                                    className="font-cursive text-2xl text-bakery-500 block mb-2"
                                />
                                <EditableText
                                    contentKey="jobs.title"
                                    defaultValue="Cariere la Officina"
                                    as="h2"
                                    className="text-4xl font-serif font-bold text-bakery-900 mb-4"
                                />
                                <EditableText
                                    contentKey="jobs.description"
                                    defaultValue="Vino să faci parte din echipa noastră! Căutăm oameni pasionați care vor să crească alături de noi."
                                    as="p"
                                    className="text-bakery-700 max-w-2xl mx-auto text-lg mb-8"
                                    multiline
                                />
                                <div className="bg-bakery-50 border-2 border-dashed border-bakery-200 rounded-2xl p-8 text-bakery-400">
                                    <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-sm">Joburile sunt editabile în tabul "Joburi"</p>
                                </div>
                            </div>
                        </section>

                        {/* === MAP SECTION === */}
                        <section className="py-16 px-6 bg-neutral-900 text-white">
                            <div className="max-w-6xl mx-auto text-center">
                                <EditableText
                                    contentKey="mapSection.title"
                                    defaultValue="Te Așteptăm pe la noi!"
                                    as="h2"
                                    className="text-4xl font-serif font-bold text-bakery-400 mb-4"
                                />
                                <EditableText
                                    contentKey="mapSection.description"
                                    defaultValue="Vizitează-ne în una din cele două locații din Drăgășani și Băbeni."
                                    as="p"
                                    className="text-stone-400 max-w-2xl mx-auto text-lg mb-8"
                                    multiline
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-stone-800 rounded-full">
                                            <MapPin className="text-bakery-400" size={20} />
                                        </div>
                                        <div>
                                            <EditableText
                                                contentKey="mapSection.addressLabel"
                                                defaultValue="Adresă"
                                                as="h4"
                                                className="font-bold text-white mb-1"
                                            />
                                            <p className="text-stone-400 text-sm">Drăgășani & Băbeni</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-stone-800 rounded-full">
                                            <Phone className="text-bakery-400" size={20} />
                                        </div>
                                        <div>
                                            <EditableText
                                                contentKey="mapSection.phoneLabel"
                                                defaultValue="Telefon"
                                                as="h4"
                                                className="font-bold text-white mb-1"
                                            />
                                            <p className="text-stone-400 text-sm">0754 554 194</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* === FOOTER === */}
                        <footer className="py-12 px-6 bg-neutral-950 text-stone-300">
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-serif text-white font-bold mb-1">Officina del Gusto</h3>
                                        <EditableText
                                            contentKey="footer.tagline"
                                            defaultValue="Pasiune pentru Delicii"
                                            as="p"
                                            className="font-cursive text-bakery-400 text-lg"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-stone-400">Social & Contact Icons</span>
                                    </div>
                                </div>
                                <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500 gap-4">
                                    <div>
                                        <p>© {new Date().getFullYear()} Officina del Gusto.</p>
                                        <EditableText
                                            contentKey="footer.locationsNote"
                                            defaultValue="Drăgășani • Băbeni"
                                            as="p"
                                            className="text-stone-400 mt-1"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <EditableText
                                            contentKey="footer.schedule"
                                            defaultValue="Luni - Sâmbătă: 08:00 - 20:00"
                                            as="span"
                                            className="text-stone-400"
                                        />
                                        <span>•</span>
                                        <EditableText
                                            contentKey="footer.sundayClosed"
                                            defaultValue="Duminică: Închis"
                                            as="span"
                                            className="text-red-400/80"
                                        />
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>

                {/* Sidebar - Content List */}
                <div className="w-72 bg-white border-l border-stone-200 p-4 overflow-y-auto flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-stone-800">Conținut Salvat</h3>
                        <span className="text-xs text-stone-400">{contentList.length}</span>
                    </div>

                    {contentList.length === 0 ? (
                        <div className="text-stone-400 text-sm text-center py-8">
                            <Edit size={28} className="mx-auto mb-3 opacity-30" />
                            <p>Niciun conținut încă.</p>
                            <p className="text-xs mt-1">Editați și salvați pentru a vedea aici.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {contentList.map((content) => (
                                <div
                                    key={content.id}
                                    className="p-3 bg-stone-50 rounded-lg border border-stone-200 hover:border-bakery-300 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-mono text-bakery-600 bg-bakery-50 px-1.5 py-0.5 rounded truncate max-w-[140px]">
                                            {content.section_key}
                                        </span>
                                        {content.needs_translation && (
                                            <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
                                                traducere
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-stone-600 line-clamp-2 mt-1">{content.content_ro}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageEditorPanel;
