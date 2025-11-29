import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="flex flex-col items-center md:items-start">
              <span className={`font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors ${scrolled ? 'text-bakery-800' : 'text-white drop-shadow-md'}`}>
                Officina del Gusto
              </span>
              <span className={`font-cursive text-lg -mt-1 ${scrolled ? 'text-bakery-600' : 'text-bakery-200 drop-shadow-sm'}`}>
                Patiserie Artizanală
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            {['Produse', 'Despre', 'Cariere', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Despre' ? 'about' : item === 'Produse' ? 'products' : item === 'Cariere' ? 'jobs' : 'contact')} 
                className={`font-medium text-lg transition-colors ${scrolled ? 'text-bakery-800 hover:text-bakery-500' : 'text-white hover:text-bakery-200 drop-shadow-sm'}`}
              >
                {item}
              </button>
            ))}
            
            <a 
              href="tel:+40742314657" 
              className={`px-5 py-2.5 rounded-full font-bold transition-all shadow-md flex items-center gap-2 ${
                scrolled 
                  ? 'bg-bakery-500 text-white hover:bg-bakery-600' 
                  : 'bg-white text-bakery-800 hover:bg-bakery-100'
              }`}
            >
              <Phone size={18} />
              <span className="hidden lg:inline">0742 314 657</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 transition-colors ${scrolled ? 'text-bakery-800' : 'text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-bakery-100 shadow-xl absolute w-full top-full left-0">
          <div className="px-4 py-6 space-y-4">
            <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-3 text-bakery-800 hover:bg-bakery-50 rounded-lg text-lg font-medium border-l-4 border-transparent hover:border-bakery-500 transition-all">
              Produsele Noastre
            </button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-3 text-bakery-800 hover:bg-bakery-50 rounded-lg text-lg font-medium border-l-4 border-transparent hover:border-bakery-500 transition-all">
              Despre Noi
            </button>
            <button onClick={() => scrollToSection('jobs')} className="block w-full text-left px-4 py-3 text-bakery-800 hover:bg-bakery-50 rounded-lg text-lg font-medium border-l-4 border-transparent hover:border-bakery-500 transition-all">
              Cariere
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-3 text-bakery-800 hover:bg-bakery-50 rounded-lg text-lg font-medium border-l-4 border-transparent hover:border-bakery-500 transition-all">
              Locație & Program
            </button>
            <div className="pt-4 flex flex-col gap-3">
              <a href="tel:+40742314657" className="w-full text-center bg-bakery-500 text-white px-4 py-4 rounded-xl font-bold hover:bg-bakery-600 flex items-center justify-center gap-2 shadow-sm">
                <Phone size={20} /> Sună Acum
              </a>
              <button onClick={() => scrollToSection('contact')} className="w-full text-center bg-bakery-100 text-bakery-900 px-4 py-4 rounded-xl font-bold hover:bg-bakery-200 flex items-center justify-center gap-2">
                <MapPin size={20} /> Vezi Locațiile
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;