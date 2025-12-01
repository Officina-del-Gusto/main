
import React, { useState } from 'react';
import { Facebook, Phone, Mail, Lock, X } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

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

  return (
    <footer className="bg-neutral-900 text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-serif text-white font-bold mb-2">Officina del Gusto</h3>
            <p className="font-cursive text-bakery-400 text-xl">Patiserie • Pizza • Tradiție</p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://www.facebook.com/ODGOfficinaDelGusto" 
              target="_blank" 
              rel="noreferrer"
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
                alt="WhatsApp" 
                className="w-full h-full object-cover"
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
              Termeni și Condiții
            </button>
            <span className="text-stone-700">|</span>
            <button 
              onClick={() => setShowPrivacy(true)}
              className="text-stone-400 hover:text-bakery-400 transition-colors underline-offset-4 hover:underline"
            >
              Politica de Confidențialitate
            </button>
            <span className="text-stone-700">|</span>
            <a 
              href="https://anpc.ro/ce-spune-legea-702/702/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-bakery-400 transition-colors underline-offset-4 hover:underline"
            >
              ANPC
            </a>
          </div>
        </div>

        {/* ANPC Logos Section - Required by Romanian Law */}
        <div className="border-t border-stone-800 pt-6 pb-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-stone-500 text-center">
              Soluționarea alternativă a litigiilor / Soluționarea online a litigiilor
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {/* ANPC SAL - Soluționarea Alternativă a Litigiilor */}
              <a 
                href="https://anpc.ro/ce-spune-legea-702/702/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg px-4 py-2 hover:shadow-lg transition-all hover:scale-105"
                title="ANPC - Soluționarea Alternativă a Litigiilor"
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
                title="Soluționarea Online a Litigiilor - Platforma ODR"
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
             <p className="mt-1">Locații în Drăgășani și Băbeni.</p>
           </div>
           <div className="flex gap-4">
             <span className="text-stone-400">Luni - Sâmbătă: 06:00 - 20:00</span>
             <span>•</span>
             <span className="text-red-400/80">Duminică: Închis</span>
           </div>
        </div>
        
        {/* Admin Link (Hidden/Discrete) */}
        <div className="flex justify-center mt-12 opacity-30 hover:opacity-100 transition-opacity">
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 text-xs text-stone-600 hover:text-bakery-400"
          >
            <Lock size={12} /> Admin Login
          </button>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      <LegalModal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Termeni și Condiții">
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">1. Informații Generale</h3>
            <p>
              Acest website este operat de <strong>Officina del Gusto</strong>, cu sediul în Drăgășani, județul Vâlcea, România.
            </p>
            <p className="mt-2">
              <strong>Contact:</strong><br />
              Telefon: 0754 554 194<br />
              Email: odgdragasani@gmail.com
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">2. Obiectul Activității</h3>
            <p>
              Officina del Gusto este o patiserie artizanală care oferă produse de panificație, patiserie și pizza 
              în locațiile din Drăgășani și Băbeni. Produsele sunt disponibile exclusiv pentru ridicare din locațiile noastre fizice.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">3. Utilizarea Website-ului</h3>
            <p>
              Acest website are scop informativ și prezintă produsele și serviciile noastre. 
              De asemenea, oferim posibilitatea de a aplica pentru pozițiile disponibile în echipa noastră.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">4. Proprietate Intelectuală</h3>
            <p>
              Toate materialele prezente pe acest website (texte, imagini, logo-uri, design) sunt proprietatea 
              Officina del Gusto și sunt protejate de legile privind drepturile de autor.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">5. Limitarea Răspunderii</h3>
            <p>
              Ne rezervăm dreptul de a modifica prețurile, disponibilitatea produselor și programul de funcționare 
              fără notificare prealabilă. Informațiile de pe website sunt orientative.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">6. Soluționarea Litigiilor</h3>
            <p>
              În cazul unor eventuale litigii, consumatorii pot apela la:<br />
              • <a href="https://anpc.ro/ce-spune-legea-702/702/" target="_blank" rel="noopener noreferrer" className="text-bakery-600 hover:underline">ANPC - Soluționarea Alternativă a Litigiilor (SAL)</a><br />
              • <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-bakery-600 hover:underline">Platforma Europeană ODR pentru Soluționarea Online a Litigiilor</a>
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">7. Legea Aplicabilă</h3>
            <p>
              Acești termeni și condiții sunt guvernați de legislația din România.
            </p>
          </section>

          <p className="text-sm text-stone-500 pt-4 border-t">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </LegalModal>

      {/* Privacy Policy Modal */}
      <LegalModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Politica de Confidențialitate">
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">1. Introducere</h3>
            <p>
              Officina del Gusto respectă confidențialitatea vizitatorilor website-ului nostru și se angajează 
              să protejeze datele personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">2. Date Colectate</h3>
            <p>Colectăm următoarele categorii de date personale:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Date de contact:</strong> Nume, telefon, email (în cazul aplicațiilor pentru joburi)</li>
              <li><strong>CV-uri:</strong> Documente încărcate pentru aplicații de angajare</li>
              <li><strong>Date tehnice:</strong> Date de navigare anonime pentru îmbunătățirea website-ului</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">3. Scopul Prelucrării</h3>
            <p>Datele personale sunt prelucrate pentru:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Procesarea aplicațiilor pentru pozițiile disponibile</li>
              <li>Contactarea candidaților pentru interviuri</li>
              <li>Îmbunătățirea serviciilor noastre</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">4. Stocarea Datelor</h3>
            <p>
              Datele personale sunt stocate în siguranță și sunt păstrate doar pe perioada necesară îndeplinirii 
              scopurilor pentru care au fost colectate. CV-urile și datele de aplicare sunt păstrate maximum 
              6 luni după încheierea procesului de recrutare.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">5. Drepturile Dumneavoastră</h3>
            <p>În conformitate cu GDPR, aveți dreptul:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>De acces la datele personale</li>
              <li>De rectificare a datelor incorecte</li>
              <li>De ștergere a datelor ("dreptul de a fi uitat")</li>
              <li>De restricționare a prelucrării</li>
              <li>De portabilitate a datelor</li>
              <li>De a vă opune prelucrării</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">6. Contact DPO</h3>
            <p>
              Pentru exercitarea drepturilor sau întrebări privind datele personale, ne puteți contacta la:<br />
              <strong>Email:</strong> odgdragasani@gmail.com<br />
              <strong>Telefon:</strong> 0754 554 194
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-800 mb-2">7. Plângeri</h3>
            <p>
              Dacă considerați că drepturile dumneavoastră au fost încălcate, puteți depune o plângere la 
              Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) - 
              <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-bakery-600 hover:underline"> www.dataprotection.ro</a>
            </p>
          </section>

          <p className="text-sm text-stone-500 pt-4 border-t">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </LegalModal>
    </footer>
  );
};

export default Footer;
