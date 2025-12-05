
import React, { useMemo, useState } from 'react';
import { Facebook, Phone, Mail, Lock, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { TermsAndPrivacy, Language } from '../i18n/translations';

interface FooterProps {
  onAdminClick: () => void;
}

const localeMap: Record<Language, string> = {
  ro: 'ro-RO',
  en: 'en-US',
  it: 'it-IT',
  fr: 'fr-FR',
  es: 'es-ES',
  zh: 'zh-CN',
  ru: 'ru-RU',
};

// Legal Modal Component
const LegalModal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <h2 className="text-2xl font-serif font-bold text-stone-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <X size={24} className="text-stone-600" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] text-stone-700 prose prose-stone">
          {children}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const { dictionary, language } = useLanguage();
  const footerText = dictionary.footer;
  const legal = dictionary.legal;

  const lastUpdatedDate = useMemo(() => {
    const locale = localeMap[language] ?? 'en-US';
    return new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  }, [language]);

  const renderLegalContent = (content: TermsAndPrivacy) => (
    <div className="space-y-6">
      {content.sections.map((section, sectionIndex) => (
        <section key={`${content.title}-${section.title}-${sectionIndex}`}>
          <h3 className="text-lg font-bold text-stone-800 mb-2">{section.title}</h3>
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${section.title}-paragraph-${paragraphIndex}`} className="mt-2 first:mt-0">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {section.list.map((item, listIndex) => (
                <li key={`${section.title}-list-${listIndex}`}>{item}</li>
              ))}
            </ul>
          )}
          {section.footerNote && (
            <p className="text-sm text-stone-500 mt-2">{section.footerNote}</p>
          )}
        </section>
      ))}
      <p className="text-sm text-stone-500 pt-4 border-t">
        {content.lastUpdated}: {lastUpdatedDate}
      </p>
    </div>
  );

  return (
    <footer className="bg-neutral-900 text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">

          <div className="text-center md:text-left">
            <h3 className="text-3xl font-serif text-white font-bold mb-2">Officina del Gusto</h3>
            <p className="font-cursive text-bakery-400 text-xl">{footerText.tagline}</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/ODGOfficinaDelGusto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-stone-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://wa.me/40754554194"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-all duration-300 transform shadow-lg"
              aria-label="WhatsApp"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/500px-WhatsApp_icon.png"
                alt="Contactați-ne pe WhatsApp"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </a>
            <a
              href="mailto:odgdragasani@gmail.com"
              className="w-12 h-12 rounded-full bg-stone-800 hover:bg-bakery-400 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:+40754554194"
              className="w-12 h-12 rounded-full bg-stone-800 hover:bg-bakery-500 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Phone"
            >
              <Phone size={24} />
            </a>
          </div>
        </div>

        {/* Legal Links Section */}
        <div className="border-t border-stone-800 pt-8 pb-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <button
              onClick={() => setShowTerms(true)}
              className="text-stone-400 hover:text-bakery-400 transition-colors underline-offset-4 hover:underline"
            >
              {footerText.termsLink}
            </button>
            <span className="text-stone-700">|</span>
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-stone-400 hover:text-bakery-400 transition-colors underline-offset-4 hover:underline"
            >
              {footerText.privacyLink}
            </button>
            <span className="text-stone-700">|</span>
            <a
              href="https://anpc.ro/ce-spune-legea-702/702/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-bakery-400 transition-colors underline-offset-4 hover:underline"
            >
              {footerText.anpcLink}
            </a>
          </div>
        </div>

        {/* ANPC Logos Section - Required by Romanian Law */}
        <div className="border-t border-stone-800 pt-6 pb-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-stone-500 text-center">
              {footerText.anpcDescription}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {/* ANPC SAL - Soluționarea Alternativă a Litigiilor */}
              <a
                href="https://anpc.ro/ce-spune-legea-702/702/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg px-4 py-2 hover:shadow-lg transition-all hover:scale-105"
                title={`${footerText.anpcLink} - ${footerText.anpcDescription}`}
              >
                <img
                  src="/legal/SAL.svg"
                  alt="ANPC SAL - Soluționarea Alternativă a Litigiilor"
                  className="h-12 object-contain"
                />
              </a>

              {/* SOL - Soluționarea Online a Litigiilor (EU ODR) */}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg px-4 py-2 hover:shadow-lg transition-all hover:scale-105"
                title={footerText.anpcDescription}
              >
                <img
                  src="/legal/SOL.svg"
                  alt="SOL - Soluționarea Online a Litigiilor"
                  className="h-12 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500 gap-4">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Officina del Gusto.</p>
            <p className="mt-1">{footerText.locationsNote}</p>
          </div>
          <div className="flex gap-4">
            <span className="text-stone-400">{footerText.schedule}</span>
            <span>•</span>
            <span className="text-red-400/80">{footerText.sundayClosed}</span>
          </div>
        </div>


      </div>

      {/* Terms & Conditions Modal */}
      <LegalModal isOpen={showTerms} onClose={() => setShowTerms(false)} title={legal.terms.title}>
        {renderLegalContent(legal.terms)}
      </LegalModal>

      {/* Privacy Policy Modal */}
      <LegalModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title={legal.privacy.title}>
        {renderLegalContent(legal.privacy)}
      </LegalModal>
    </footer>
  );
};

export default Footer;
