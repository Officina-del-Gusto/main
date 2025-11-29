import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import ProductGallery from './components/ProductGallery';
import JobsSection from './components/JobsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { Lock } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'odg' && loginForm.password === 'mamaliga') {
      setView('admin');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Render Admin View
  if (view === 'admin') {
    return <AdminDashboard onLogout={() => {
      setView('public');
      setLoginForm({ username: '', password: '' });
    }} />;
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
    <div className="font-sans antialiased text-stone-800 bg-stone-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InfoSection />
        <ProductGallery />
        <JobsSection />
        <MapSection />
      </main>
      <Footer onAdminClick={() => setView('login')} />
    </div>
  );
};

export default App;