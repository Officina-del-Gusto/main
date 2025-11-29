
import React from 'react';
import { Facebook, Phone, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
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
              href="mailto:odgdragasani@gmail.com" 
              className="w-12 h-12 rounded-full bg-stone-800 hover:bg-bakery-400 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a 
              href="tel:+40742314657" 
              className="w-12 h-12 rounded-full bg-stone-800 hover:bg-bakery-500 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Phone"
            >
              <Phone size={24} />
            </a>
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
    </footer>
  );
};

export default Footer;
