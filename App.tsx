import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import ProductGallery from './components/ProductGallery';
import CustomOrders from './components/CustomOrders';
import JobsSection from './components/JobsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ChristmasEffects from './components/ChristmasEffects';
import OrderModal from './components/OrderModal';
import { ChristmasMusicProvider } from './contexts/ChristmasMusicContext';
import { Lock, ArrowUp } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

// Safe localStorage helper
const safeGetBooleanFromStorage = (key: string, defaultValue: boolean): boolean => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    const parsed = JSON.parse(value);
    return typeof parsed === 'boolean' ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
};

const App: React.FC = () => {
  const { dictionary } = useLanguage();
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Admin-level Christmas control (can completely disable for all users)
  const [christmasAdminEnabled, setChristmasAdminEnabled] = useState<boolean>(() => {
    return safeGetBooleanFromStorage('christmasAdminEnabled', true);
  });

  // User-level Christmas control (user can toggle on/off if admin allows)
  const [christmasUserEnabled, setChristmasUserEnabled] = useState<boolean>(() => {
    return safeGetBooleanFromStorage('christmasEffects', true);
  });

  // Effective Christmas state: both admin AND user must have it enabled
  const christmasEnabled = christmasAdminEnabled && christmasUserEnabled;

  // Listen for christmas mode changes
  useEffect(() => {
    const handleStorageChange = () => {
      setChristmasAdminEnabled(safeGetBooleanFromStorage('christmasAdminEnabled', true));
      setChristmasUserEnabled(safeGetBooleanFromStorage('christmasEffects', true));
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

  // Initialize default values on first load/visit
  React.useEffect(() => {
    // Admin credentials
    if (!localStorage.getItem('adminUsername')) {
      localStorage.setItem('adminUsername', 'odg');
    }
    if (!localStorage.getItem('adminPassword')) {
      localStorage.setItem('adminPassword', 'mamaliga');
    }

    // Set default admin enabled only on FIRST visit (if null)
    if (localStorage.getItem('christmasAdminEnabled') === null) {
      localStorage.setItem('christmasAdminEnabled', 'true');
    }
  }, []);

  // Force Christmas USER preference to enabled on every page load/refresh
  // This ensures Christmas shows by default, but ADMIN toggle is always respected
  React.useEffect(() => {
    // Only reset user preference if admin has Christmas enabled
    const adminSetting = localStorage.getItem('christmasAdminEnabled');
    const adminEnabled = adminSetting !== 'false'; // null or 'true' = enabled

    if (adminEnabled) {
      // Reset user preference to enabled on page load
      localStorage.setItem('christmasEffects', 'true');
      setChristmasUserEnabled(true);

      // Only reset music choice if user hasn't chosen "never"
      const musicChoice = localStorage.getItem('christmasMusicChoice');
      if (musicChoice !== 'never') {
        localStorage.removeItem('christmasMusicChoice');
      }
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUsername = localStorage.getItem('adminUsername') || 'odg';
    const savedPassword = localStorage.getItem('adminPassword') || 'mamaliga';

    if (loginForm.username === savedUsername && loginForm.password === savedPassword) {
      // Generate session token for this login session
      const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem('adminSession', sessionToken);
      setView('admin');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Render Admin View
  if (view === 'admin') {
    // Verify session token exists
    if (!sessionStorage.getItem('adminSession')) {
      setView('login');
      return null;
    }

    return <AdminDashboard
      onLogout={() => {
        sessionStorage.removeItem('adminSession');
        setView('public');
        setLoginForm({ username: '', password: '' });
      }}
      christmasEnabled={christmasAdminEnabled}
      onChristmasToggle={(enabled) => {
        setChristmasAdminEnabled(enabled);
        setChristmasUserEnabled(enabled);
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
          <h2 className="text-2xl font-serif font-bold text-center mb-6 text-stone-800">{dictionary.login.title}</h2>

          {loginError && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center text-sm font-bold">
              {dictionary.login.error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-600 mb-1">{dictionary.login.userLabel}</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-stone-300 rounded-xl focus:border-bakery-500 focus:ring-2 focus:ring-bakery-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-600 mb-1">{dictionary.login.passLabel}</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-stone-300 rounded-xl focus:border-bakery-500 focus:ring-2 focus:ring-bakery-200 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-bakery-500 hover:bg-bakery-600 text-white font-bold rounded-xl mt-4 shadow-lg transition-transform active:scale-95"
            >
              {dictionary.login.submit}
            </button>
            <button
              type="button"
              onClick={() => setView('public')}
              className="w-full py-2 text-stone-400 hover:text-stone-600 text-sm font-medium"
            >
              {dictionary.login.back}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Public Site
  return (
    <ChristmasMusicProvider enabled={christmasEnabled}>
      <div className="font-sans antialiased text-stone-800 bg-stone-50 min-h-screen flex flex-col relative">
        {/* Christmas Effects - always mounted for smooth transitions */}
        <ChristmasEffects enabled={christmasEnabled} />

        <Navbar christmasAdminEnabled={christmasAdminEnabled} onOpenOrderModal={() => setIsOrderModalOpen(true)} />
        <main className="flex-grow">
          <Hero />
          <InfoSection />
          <ProductGallery onOpenOrderModal={() => setIsOrderModalOpen(true)} />
          <CustomOrders onOpenOrderModal={() => setIsOrderModalOpen(true)} />
          <JobsSection />
          <MapSection />
        </main>
        <Footer onAdminClick={() => setView('login')} />

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-40 p-4 bg-bakery-500 hover:bg-bakery-600 text-white rounded-full shadow-lg transition-all duration-300 transform ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>

        <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      </div>
    </ChristmasMusicProvider>
  );
};

export default App;