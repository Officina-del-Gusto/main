import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import ProductGallery from './components/ProductGallery';
import JobsSection from './components/JobsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ChristmasEffects from './components/ChristmasEffects';
import { Lock, ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [christmasEnabled, setChristmasEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('christmasAdminEnabled');
    return saved ? JSON.parse(saved) : true; // Default enabled
  });

  // Listen for christmas mode changes from admin
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('christmasAdminEnabled');
      setChristmasEnabled(saved ? JSON.parse(saved) : true);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show scroll-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize default credentials on first load
  React.useEffect(() => {
    if (!localStorage.getItem('adminUsername')) {
      localStorage.setItem('adminUsername', 'odg');
    }
    if (!localStorage.getItem('adminPassword')) {
      localStorage.setItem('adminPassword', 'mamaliga');
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUsername = localStorage.getItem('adminUsername') || 'odg';
    const savedPassword = localStorage.getItem('adminPassword') || 'mamaliga';
    
    if (loginForm.username === savedUsername && loginForm.password === savedPassword) {
      setView('admin');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Render Admin View
  if (view === 'admin') {
    return <AdminDashboard 
      onLogout={() => {
        setView('public');
        setLoginForm({ username: '', password: '' });
      }}
      christmasEnabled={christmasEnabled}
      onChristmasToggle={(enabled) => {
        setChristmasEnabled(enabled);
        localStorage.setItem('christmasAdminEnabled', JSON.stringify(enabled));
        // Also update user preference when admin changes it
        localStorage.setItem('christmasEffects', JSON.stringify(enabled));
        window.dispatchEvent(new Event('storage'));
      }}
    />;
  }

  // Render Login View
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6 text-bakery-500">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-center mb-6 text-stone-800">Acces Administrare</h2>
          
          {loginError && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center text-sm font-bold">
              User sau parolă incorecte!
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-600 mb-1">Utilizator</label>
              <input 
                type="text" 
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-stone-300 rounded-xl focus:border-bakery-500 focus:ring-2 focus:ring-bakery-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-600 mb-1">Parolă</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-stone-300 rounded-xl focus:border-bakery-500 focus:ring-2 focus:ring-bakery-200 outline-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-bakery-500 hover:bg-bakery-600 text-white font-bold rounded-xl mt-4 shadow-lg transition-transform active:scale-95"
            >
              Autentificare
            </button>
            <button 
              type="button"
              onClick={() => setView('public')}
              className="w-full py-2 text-stone-400 hover:text-stone-600 text-sm font-medium"
            >
              Înapoi la site
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Public Site
  return (
    <div className="font-sans antialiased text-stone-800 bg-stone-50 min-h-screen flex flex-col relative">
      {/* Christmas Effects with fade transition */}
      <div className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-700 ${christmasEnabled ? 'opacity-100' : 'opacity-0'}`}>
        {christmasEnabled && <ChristmasEffects />}
      </div>
      
      <Navbar christmasAdminEnabled={christmasEnabled} />
      <main className="flex-grow">
        <Hero />
        <InfoSection />
        <ProductGallery />
        <JobsSection />
        <MapSection />
      </main>
      <Footer onAdminClick={() => setView('login')} />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 p-4 bg-bakery-500 hover:bg-bakery-600 text-white rounded-full shadow-lg transition-all duration-300 transform ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;