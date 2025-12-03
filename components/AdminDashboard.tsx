
import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Users, Plus, Edit, Trash2, Power, PowerOff,
  Star, Archive, Check, X, LogOut, Home, RotateCcw, Eye, Layers, AlertTriangle, Copy, ArrowRight, Settings,
  Image, ShoppingBag, Upload, GripVertical, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
  Job, Application, CarouselImage, Product,
  getJobs, saveJob, deleteJob, toggleJobStatus, activateAllJobs, deactivateAllJobs, deleteAllJobs, resetDatabase, checkDbConnection,
  getApplications, updateApplicationStatus, deleteApplication,
  getCarouselImages, uploadCarouselImage, addCarouselImage, deleteCarouselImage, reorderCarouselImages,
  getProducts, uploadProductImage, saveProduct, deleteProduct, toggleProductActive, reorderProducts,
  HeroImage, getHeroImages, uploadHeroImage, addHeroImage, deleteHeroImage, reorderHeroImages,
  OrderRequest, getOrders, deleteOrder, updateOrderStatus
} from '../utils/mockData';

interface AdminDashboardProps {
  onLogout: () => void;
  christmasEnabled: boolean;
  onChristmasToggle: (enabled: boolean) => void;
}

type AppFilter = 'all' | 'new' | 'starred' | 'rejected' | 'trashed';
type AdminTab = 'jobs' | 'applications' | 'carousel' | 'products' | 'hero' | 'orders';

// Custom Notification Component
const NotificationToast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
    {type === 'error' ? <AlertTriangle size={20} /> : <Check size={20} />}
    <span className="font-bold">{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-80"><X size={16} /></button>
  </div>
);

// Custom Confirmation Modal
const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }: { isOpen: boolean, message: string, onConfirm: () => void, onCancel: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
        <h3 className="text-xl font-bold text-stone-800 mb-2">Confirmare</h3>
        <p className="text-stone-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg font-bold text-stone-600">Anulează</button>
          <button onClick={onConfirm} className="flex-1 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-white">Confirmă</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, christmasEnabled, onChristmasToggle }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('jobs');
  const [appFilter, setAppFilter] = useState<AppFilter>('all');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // File upload refs
  const carouselFileRef = useRef<HTMLInputElement>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);
  const productFileRef = useRef<HTMLInputElement>(null);

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [dbError, setDbError] = useState(false);

  // UI State
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [confirmConfig, setConfirmConfig] = useState<{ isOpen: boolean, message: string, onConfirm: () => void } | null>(null);

  // Job Form State
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Job>>({});

  // Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [isUploadingCarousel, setIsUploadingCarousel] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingProduct, setIsUploadingProduct] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const isConnected = await checkDbConnection();
      setDbError(!isConnected);
      await refreshData();
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const refreshData = async () => {
    const fetchedJobs = await getJobs();
    setJobs(fetchedJobs);
    const fetchedApps = await getApplications();
    setApplications(fetchedApps);
    const fetchedCarousel = await getCarouselImages();
    setCarouselImages(fetchedCarousel);
    const fetchedHero = await getHeroImages();
    setHeroImages(fetchedHero);
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
    const fetchedOrders = await getOrders();
    setOrders(fetchedOrders);
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  // Helper to check if we are in "Demo Mode" (only default jobs)
  const isDemoMode = jobs.some(j => j.id.startsWith('default-'));

  // --- JOB ACTIONS ---

  const handleEditJob = (job?: Job) => {
    if (job) {
      if (job.id.startsWith('default-')) {
        showNotification("Apasă 'Activează Toate' pentru a salva acest job în baza de date înainte de editare.", 'error');
        return;
      }
      setCurrentJob(job);
    } else {
      setCurrentJob({
        title: '',
        location: 'Drăgășani',
        type: 'Full-time',
        description: '',
        active: true,
      });
    }
    setIsEditingJob(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentJob.title) {
      try {
        await saveJob(currentJob as Job);
        setIsEditingJob(false);
        await refreshData();
        showNotification("Job salvat cu succes!");
      } catch (e: any) {
        if (e.message === "DEFAULT_JOB_ERROR") {
          showNotification("Nu poți edita un job default. Apasă 'Activează Toate' mai întâi.", 'error');
        } else {
          showNotification("Eroare la salvare. Verifică baza de date.", 'error');
        }
      }
    }
  };

  const handleDeleteJob = async (id: string) => {
    setConfirmConfig({
      isOpen: true,
      message: 'Sigur vrei să ștergi acest anunț?',
      onConfirm: async () => {
        try {
          await deleteJob(id);
          await refreshData();
          showNotification("Job șters cu succes!");
        } catch (e: any) {
          if (e.message === "DEFAULT_JOB_ERROR") {
            showNotification("Joburile default nu se pot șterge. Apasă 'Activează Toate' mai întâi.", 'error');
          } else {
            showNotification("Eroare la ștergere.", 'error');
          }
        }
        setConfirmConfig(null);
      }
    });
  };

  const handleToggleJobStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleJobStatus(id, currentStatus);
      await refreshData();
      showNotification(currentStatus ? "Job dezactivat!" : "Job activat!");
    } catch (e: any) {
      showNotification("Eroare la modificare status.", 'error');
    }
  };

  const handleActivateAll = async () => {
    setConfirmConfig({
      isOpen: true,
      message: 'Această acțiune va activa toate joburile (cele default vor fi salvate în baza de date). Continui?',
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await activateAllJobs();
          await refreshData();
          showNotification('Toate joburile au fost activate!');
          setDbError(false);
        } catch (e: any) {
          if (e.message === "CONNECTION_ERROR") {
            setDbError(true);
            showNotification('Eroare conexiune. Rulează scriptul SQL.', 'error');
          } else {
            showNotification('Eroare la activare.', 'error');
          }
        }
        setIsLoading(false);
        setConfirmConfig(null);
      }
    });
  };

  const handleDeactivateAll = async () => {
    setConfirmConfig({
      isOpen: true,
      message: 'Această acțiune va dezactiva toate joburile. Continui?',
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await deactivateAllJobs();
          await refreshData();
          showNotification('Toate joburile au fost dezactivate!');
          setDbError(false);
        } catch (e: any) {
          if (e.message === "CONNECTION_ERROR") {
            setDbError(true);
            showNotification('Eroare conexiune. Rulează scriptul SQL.', 'error');
          } else {
            showNotification('Eroare la dezactivare.', 'error');
          }
        }
        setIsLoading(false);
        setConfirmConfig(null);
      }
    });
  };

  const handleDeleteAll = async () => {
    setConfirmConfig({
      isOpen: true,
      message: '⚠️ ATENȚIE: Această acțiune va șterge TOATE joburile din baza de date! Această acțiune este ireversibilă. Ești sigur?',
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await deleteAllJobs();
          await refreshData();
          showNotification('Toate joburile au fost șterse!');
        } catch (e: any) {
          if (e.message === "CONNECTION_ERROR") {
            setDbError(true);
            showNotification('Eroare conexiune. Rulează scriptul SQL.', 'error');
          } else {
            showNotification('Eroare la ștergere.', 'error');
          }
        }
        setIsLoading(false);
        setConfirmConfig(null);
      }
    });
  };

  const handleResetDB = async () => {
    setConfirmConfig({
      isOpen: true,
      message: '🚨 PERICOL: Această acțiune va RESETA COMPLET baza de date! Toate joburile, aplicațiile și CV-urile vor fi șterse definitiv. Această acțiune NU poate fi anulată! Ești ABSOLUT sigur?',
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await resetDatabase();
          await refreshData();
          showNotification('Baza de date a fost resetată complet!');
        } catch (e: any) {
          if (e.message === "CONNECTION_ERROR") {
            setDbError(true);
            showNotification('Eroare conexiune. Rulează scriptul SQL.', 'error');
          } else {
            showNotification('Eroare la resetare.', 'error');
          }
        }
        setIsLoading(false);
        setConfirmConfig(null);
      }
    });
  };

  // --- APPLICATION ACTIONS ---

  const handleAppStatus = async (id: string, status: 'new' | 'starred' | 'rejected' | 'trashed') => {
    await updateApplicationStatus(id, status);
    refreshData();
  };

  const handlePermanentDeleteApp = async (id: string, cvUrl?: string) => {
    setConfirmConfig({
      isOpen: true,
      message: 'Această acțiune este ireversibilă. Ștergi definitiv aplicația?',
      onConfirm: async () => {
        await deleteApplication(id, cvUrl);
        refreshData();
        showNotification("Aplicație ștearsă definitiv!");
        setConfirmConfig(null);
      }
    });
  };

  // --- ORDER ACTIONS ---

  const handleDeleteOrder = async (id: string) => {
    setConfirmConfig({
      isOpen: true,
      message: 'Sigur vrei să ștergi această comandă?',
      onConfirm: async () => {
        try {
          await deleteOrder(id);
          await refreshData();
          showNotification("Comandă ștearsă cu succes!");
        } catch (e: any) {
          showNotification("Eroare la ștergere.", 'error');
        }
        setConfirmConfig(null);
      }
    });
  };

  const handleToggleOrderStatus = async (id: string, currentStatus: 'pending' | 'contacted' | 'completed') => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      await updateOrderStatus(id, newStatus);
      await refreshData();
      showNotification(newStatus === 'completed' ? "Comandă finalizată!" : "Comandă redeschisă!");
    } catch (e: any) {
      showNotification("Eroare la actualizare status.", 'error');
    }
  };

  // Filter Logic
  const filteredApps = applications.filter(app => {
    if (appFilter === 'trashed') return app.status === 'trashed';
    if (app.status === 'trashed') return false;
    if (appFilter === 'all') return true;
    return app.status === appFilter;
  });

  const counts = {
    all: applications.filter(a => a.status !== 'trashed').length,
    new: applications.filter(a => a.status === 'new').length,
    starred: applications.filter(a => a.status === 'starred').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    trashed: applications.filter(a => a.status === 'trashed').length,
  };

  const sqlScript = `
-- 1. Create Jobs Table
create table if not exists public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null,
  location text not null,
  description text not null,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create Applications Table
create table if not exists public.applications (
  id uuid default gen_random_uuid() primary key,
  job_id text not null,
  job_title text not null,
  applicant_name text not null,
  phone text not null,
  email text,
  message text,
  cv_url text,
  cv_filename text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Enable Security (RLS)
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- 4. Create Policies (Simplified for easy setup)
create policy "Public Read Jobs" on public.jobs for select using (true);
create policy "Public Insert Jobs" on public.jobs for insert with check (true);
create policy "Public Update Jobs" on public.jobs for update using (true);
create policy "Public Delete Jobs" on public.jobs for delete using (true);

create policy "Public Insert Apps" on public.applications for insert with check (true);
create policy "Public Read Apps" on public.applications for select using (true);
create policy "Public Update Apps" on public.applications for update using (true);
create policy "Public Delete Apps" on public.applications for delete using (true);

-- 5. Create Carousel Images Table
create table if not exists public.carousel_images (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  display_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.carousel_images enable row level security;
create policy "Public Read Carousel" on public.carousel_images for select using (true);
create policy "Public Insert Carousel" on public.carousel_images for insert with check (true);
create policy "Public Update Carousel" on public.carousel_images for update using (true);
create policy "Public Delete Carousel" on public.carousel_images for delete using (true);

-- 6. Create Products Table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  name text not null,
  description text not null,
  tag text,
  display_order integer not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.products enable row level security;
create policy "Public Read Products" on public.products for select using (true);
create policy "Public Insert Products" on public.products for insert with check (true);
create policy "Public Update Products" on public.products for update using (true);
create policy "Public Delete Products" on public.products for delete using (true);

-- 7. Create Storage Bucket for CVs
insert into storage.buckets (id, name, public) 
values ('cvs', 'cvs', true)
on conflict (id) do nothing;

create policy "Public Upload CVs" on storage.objects 
for insert with check ( bucket_id = 'cvs' );

create policy "Public View CVs" on storage.objects 
for select using ( bucket_id = 'cvs' );

create policy "Public Delete CVs" on storage.objects 
for delete using ( bucket_id = 'cvs' );

-- 8. Create Storage Bucket for Images (Products & Carousel)
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "Public Upload Images" on storage.objects 
for insert with check ( bucket_id = 'images' );

create policy "Public View Images" on storage.objects 
for select using ( bucket_id = 'images' );

create policy "Public Delete Images" on storage.objects 
for delete using ( bucket_id = 'images' );
`;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* NOTIFICATIONS */}
      {notification && <NotificationToast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      {/* CONFIRM MODAL */}
      {confirmConfig && (
        <ConfirmModal
          isOpen={confirmConfig.isOpen}
          message={confirmConfig.message}
          onConfirm={confirmConfig.onConfirm}
          onCancel={() => setConfirmConfig(null)}
        />
      )}

      {/* Admin Header */}
      <div className="bg-neutral-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bakery-500 rounded-lg flex items-center justify-center font-bold text-xl">ODG</div>
            <span className="font-serif text-xl font-bold hidden sm:inline">Panou Administrare</span>
          </div>
          <div className="flex gap-3 items-center">
            {/* Christmas Toggle */}
            <div className="flex items-center gap-2 bg-stone-700 px-4 py-2 rounded-lg">
              <span className="text-sm font-bold">🎄 Crăciun</span>
              <button
                onClick={() => onChristmasToggle(!christmasEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${christmasEnabled ? 'bg-green-500' : 'bg-stone-500'
                  }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${christmasEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>
            <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-2 bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-lg text-sm font-bold">
              <Settings size={16} /> Setări
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-lg text-sm font-bold">
              <Home size={16} /> Acasă
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 bg-stone-800 hover:bg-red-900 px-4 py-2 rounded-lg text-sm font-bold">
              <LogOut size={16} /> Deconectare
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">

        {/* DATABASE SETUP HELP BOX - Shows if error occurs */}
        {dbError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600">
                <AlertTriangle size={32} />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-red-800 mb-2">Configurare Bază de Date Necesară</h3>
                <p className="text-red-700 mb-4">
                  Se pare că tabelele nu există în noul proiect Supabase (Eroare 404). <br />
                  Pentru ca aplicația să funcționeze, trebuie să rulezi acest cod în <strong>Supabase SQL Editor</strong>.
                </p>
                <div className="bg-neutral-900 rounded-xl p-4 relative group">
                  <button
                    onClick={() => navigator.clipboard.writeText(sqlScript)}
                    className="absolute top-4 right-4 text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-700 p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                  >
                    <Copy size={14} /> Copiază Codul
                  </button>
                  <pre className="text-green-400 font-mono text-xs overflow-x-auto p-2">
                    {sqlScript}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Tab Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          <button onClick={() => setActiveTab('hero')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'hero' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <Image size={18} /> Hero
          </button>
          <button onClick={() => setActiveTab('orders')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'orders' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <ShoppingBag size={18} /> Comenzi
            {orders.filter(o => o.status === 'pending').length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {orders.filter(o => o.status === 'pending').length}
              </span>
            )}
          </button>
          <button onClick={() => setActiveTab('products')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'products' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <ShoppingBag size={18} /> Produse
          </button>
          <button onClick={() => setActiveTab('carousel')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'carousel' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <Image size={18} /> Carusel
          </button>
          <button onClick={() => setActiveTab('jobs')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'jobs' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <LayoutDashboard size={18} /> Joburi
          </button>
          <button onClick={() => setActiveTab('applications')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'applications' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <Users size={18} /> Aplicații
            {counts.new > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{counts.new}</span>}
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-stone-400">
            <span className="animate-pulse text-lg font-bold">Se încarcă datele...</span>
          </div>
        ) : (
          <>
            {/* --- JOBS TAB --- */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-stone-800">Joburi Postate</h2>
                    <button
                      onClick={() => handleEditJob()}
                      className="bg-bakery-500 hover:bg-bakery-600 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <Plus size={20} /> Adaugă Job
                    </button>
                  </div>

                  {/* Bulk Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleActivateAll}
                      className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md ${isDemoMode
                        ? 'bg-green-500 hover:bg-green-600 text-white animate-pulse'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      title="Activează toate joburile"
                    >
                      <Power size={18} /> Activează Toate
                      {isDemoMode && <ArrowRight size={14} className="animate-bounce-x" />}
                    </button>
                    <button
                      onClick={handleDeactivateAll}
                      className="px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md bg-orange-500 hover:bg-orange-600 text-white"
                      title="Dezactivează toate joburile"
                    >
                      <PowerOff size={18} /> Dezactivează Toate
                    </button>
                    <button
                      onClick={handleDeleteAll}
                      className="px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md bg-red-500 hover:bg-red-600 text-white"
                      title="Șterge toate joburile"
                    >
                      <Trash2 size={18} /> Șterge Toate
                    </button>
                    <button
                      onClick={handleResetDB}
                      className="px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md bg-red-700 hover:bg-red-800 text-white ring-2 ring-red-300"
                      title="Resetează complet baza de date"
                    >
                      <RotateCcw size={18} /> Resetează DB
                    </button>
                  </div>
                </div>

                {/* Job List */}
                <div className="grid gap-4">
                  {jobs.map(job => (
                    <div key={job.id} className={`bg-white p-6 rounded-2xl shadow-sm border-l-8 flex flex-col md:flex-row justify-between items-center gap-4 ${job.active ? 'border-green-500' : 'border-stone-300'} ${job.id.startsWith('default-') ? 'opacity-80 ring-2 ring-yellow-400/50' : ''}`}>
                      <div className="flex-grow text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                          <h3 className="text-xl font-bold text-stone-800">{job.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${job.active ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-600'}`}>
                            {job.active ? 'Activ' : 'Inactiv'}
                          </span>
                          {job.id.startsWith('default-') && (
                            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded font-bold">Nesalvat</span>
                          )}
                        </div>
                        <p className="text-stone-500 text-sm">{job.location} • {job.type}</p>
                        <p className="text-stone-600 mt-2 line-clamp-1">{job.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleToggleJobStatus(job.id, job.active)} className="p-3 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200"><Power size={20} /></button>
                        <button onClick={() => handleEditJob(job)} className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><Edit size={20} /></button>
                        <button onClick={() => handleDeleteJob(job.id)} className="p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))}
                  {jobs.length === 0 && <p className="text-center text-stone-500 py-10">Nu sunt joburi. Apasă "Activează Toate" pentru a adăuga joburile default.</p>}
                </div>
              </div>
            )}

            {/* --- APPLICATIONS TAB --- */}
            {activeTab === 'applications' && (
              <div>
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  <button onClick={() => setAppFilter('all')} className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${appFilter === 'all' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-500 hover:bg-stone-50'}`}><Layers size={14} /> Toate <span className="opacity-80 ml-1">{counts.all}</span></button>
                  <button onClick={() => setAppFilter('new')} className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${appFilter === 'new' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>Noi (Inbox) <span className="ml-1 opacity-80">{counts.new}</span></button>
                  <button onClick={() => setAppFilter('starred')} className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${appFilter === 'starred' ? 'bg-yellow-500 text-white shadow-md' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>Favorite <span className="ml-1 opacity-80">{counts.starred}</span></button>
                  <button onClick={() => setAppFilter('rejected')} className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${appFilter === 'rejected' ? 'bg-red-400 text-white shadow-md' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>Respinse <span className="ml-1 opacity-80">{counts.rejected}</span></button>
                  <button onClick={() => setAppFilter('trashed')} className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${appFilter === 'trashed' ? 'bg-stone-500 text-white shadow-md' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>Coș Gunoi <span className="ml-1 opacity-80">{counts.trashed}</span></button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {filteredApps.length === 0 ? (
                    <div className="p-12 text-center text-stone-500 flex flex-col items-center"><Archive size={48} className="mb-4 opacity-20" /><p>Nu sunt aplicații în această categorie.</p></div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-stone-50 border-b border-stone-200">
                          <tr>
                            <th className="p-4 text-stone-500 font-bold text-sm w-10">#</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Nume Aplicant</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Job</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Locație Dorită</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Contact</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Mesaj / CV</th>
                            <th className="p-4 text-stone-500 font-bold text-sm text-right">Acțiuni</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {filteredApps.map(app => (
                            <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                              <td className="p-4">
                                {app.status === 'starred' && <Star className="text-yellow-400 fill-yellow-400" size={18} />}
                                {app.status === 'rejected' && <X className="text-red-400" size={18} />}
                                {app.status === 'new' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                {app.status === 'trashed' && <Trash2 className="text-stone-300" size={18} />}
                              </td>
                              <td className="p-4 font-bold text-stone-800">{app.applicantName}<div className="text-xs text-stone-400 font-normal">{new Date(app.dateApplied).toLocaleDateString()}</div></td>
                              <td className="p-4 text-stone-600">{app.jobTitle}</td>
                              <td className="p-4 text-stone-700 font-medium">{(() => {
                                const locationMatch = app.message?.match(/\[Locație Dorită: (.+?)\]/);
                                return locationMatch ? locationMatch[1] : 'N/A';
                              })()}</td>
                              <td className="p-4 text-stone-600 text-sm">
                                <div className="flex flex-col">
                                  <a href={`tel:${app.phone}`} className="text-bakery-600 hover:text-bakery-700 font-medium hover:underline">{app.phone}</a>
                                  {app.email && <a href={`mailto:${app.email}`} className="text-blue-500 hover:text-blue-600 hover:underline">{app.email}</a>}
                                </div>
                              </td>
                              <td className="p-4">
                                {app.message && <div className="text-sm italic text-stone-500 mb-1 line-clamp-2 max-w-[200px]">"{app.message.replace(/\[Locație Dorită: .+?\]\n\n/, '')}"</div>}
                                {app.cvUrl ? (
                                  <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-bakery-500 hover:bg-bakery-600 px-3 py-1.5 rounded-lg shadow-sm transition-colors mt-1"><Eye size={14} /> {app.cvFileName || "Vezi CV"}</a>
                                ) : <span className="text-xs text-stone-400">Fără CV</span>}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-1">
                                  {app.status !== 'trashed' ? (
                                    <>
                                      <button onClick={() => handleAppStatus(app.id, app.status === 'starred' ? 'new' : 'starred')} className={`p-2 rounded hover:bg-stone-200 ${app.status === 'starred' ? 'text-yellow-500' : 'text-stone-400 hover:text-yellow-500'}`} title={app.status === 'starred' ? 'Elimină din favorite' : 'Adaugă la favorite'}><Star size={18} fill={app.status === 'starred' ? 'currentColor' : 'none'} /></button>
                                      <button onClick={() => handleAppStatus(app.id, app.status === 'rejected' ? 'new' : 'rejected')} className={`p-2 rounded hover:bg-stone-200 ${app.status === 'rejected' ? 'text-red-500' : 'text-stone-400 hover:text-red-500'}`} title={app.status === 'rejected' ? 'Anulează respingerea' : 'Marchează ca respins'}><Archive size={18} /></button>
                                      <button onClick={() => handleAppStatus(app.id, 'trashed')} className="p-2 rounded hover:bg-stone-200 text-stone-400 hover:text-stone-600" title="Mută în coșul de gunoi"><Trash2 size={18} /></button>
                                    </>
                                  ) : (
                                    <>
                                      <button onClick={() => handleAppStatus(app.id, 'new')} className="p-2 rounded hover:bg-green-100 text-green-600" title="Restaurează aplicația"><RotateCcw size={18} /></button>
                                      <button onClick={() => handlePermanentDeleteApp(app.id, app.cvUrl)} className="p-2 rounded hover:bg-red-100 text-red-600" title="Șterge definitiv (ireversibil)"><X size={18} /></button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- PRODUCTS TAB --- */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-stone-800">Produse</h2>
                  <button
                    onClick={() => {
                      setCurrentProduct({
                        name_ro: '',
                        description_ro: '',
                        tag_ro: '',
                        is_active: true
                      });
                      setIsEditingProduct(true);
                    }}
                    className="bg-bakery-500 hover:bg-bakery-600 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <Plus size={20} /> Adaugă Produs
                  </button>
                </div>

                <p className="text-stone-500 text-sm">
                  Aceste produse apar în galeria principală. Poți edita numele, descrierea și imaginea.
                </p>

                {products.length === 0 ? (
                  <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-stone-300">
                    <ShoppingBag size={48} className="mx-auto text-stone-300 mb-4" />
                    <p className="text-stone-500">Niciun produs.</p>
                    <p className="text-stone-400 text-sm">Apasă "Adaugă Produs" pentru a începe.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map((product, index) => (
                      <div
                        key={product.id}
                        className={`relative bg-white rounded-xl overflow-hidden shadow-sm border-2 ${!product.is_active ? 'opacity-50' : ''} ${product.id.startsWith('default-') ? 'border-yellow-300' : 'border-transparent'}`}
                      >
                        <div className="relative h-40 overflow-hidden group">
                          <img
                            src={product.image_url}
                            alt={product.name_ro}
                            className="w-full h-full object-cover"
                          />
                          {/* Reorder buttons on hover */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={async () => {
                                if (index > 0) {
                                  const newOrder = [...products];
                                  [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
                                  setProducts(newOrder);
                                  await reorderProducts(newOrder.map((p, i) => ({
                                    id: p.id,
                                    display_order: i + 1,
                                    image_url: p.image_url,
                                    name_ro: p.name_ro,
                                    description_ro: p.description_ro,
                                    tag_ro: p.tag_ro,
                                    is_active: p.is_active
                                  })));
                                  await refreshData();
                                  showNotification(`Produs mutat la poziția #${index}`);
                                }
                              }}
                              disabled={index === 0}
                              className={`p-2 bg-white rounded-lg transition-colors ${index === 0 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                              title="Mută la stânga"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={async () => {
                                if (index < products.length - 1) {
                                  const newOrder = [...products];
                                  [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
                                  setProducts(newOrder);
                                  await reorderProducts(newOrder.map((p, i) => ({
                                    id: p.id,
                                    display_order: i + 1,
                                    image_url: p.image_url,
                                    name_ro: p.name_ro,
                                    description_ro: p.description_ro,
                                    tag_ro: p.tag_ro,
                                    is_active: p.is_active
                                  })));
                                  await refreshData();
                                  showNotification(`Produs mutat la poziția #${index + 2}`);
                                }
                              }}
                              disabled={index === products.length - 1}
                              className={`p-2 bg-white rounded-lg transition-colors ${index === products.length - 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                              title="Mută la dreapta"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>
                          {/* Position badge */}
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-bold">
                            #{index + 1}
                          </div>
                          {product.tag_ro && (
                            <span className="absolute top-2 right-2 bg-bakery-500 text-white text-xs px-2 py-1 rounded font-bold">
                              {product.tag_ro}
                            </span>
                          )}
                          {product.id.startsWith('default-') && (
                            <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-stone-800 mb-1">{product.name_ro}</h3>
                          <p className="text-stone-500 text-sm line-clamp-2">{product.description_ro}</p>
                        </div>
                        <div className="p-3 border-t border-stone-100 flex justify-between items-center">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-600'}`}>
                            {product.is_active ? 'Activ' : 'Inactiv'}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={async () => {
                                try {
                                  await toggleProductActive(product.id, product.is_active);
                                  await refreshData();
                                  showNotification(product.is_active ? 'Produs dezactivat!' : 'Produs activat!');
                                } catch (err: any) {
                                  showNotification(err.message || 'Eroare', 'error');
                                }
                              }}
                              className="p-2 rounded hover:bg-stone-100 text-stone-500"
                              title={product.is_active ? 'Dezactivează' : 'Activează'}
                            >
                              <Power size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setCurrentProduct(product);
                                setIsEditingProduct(true);
                              }}
                              className="p-2 rounded hover:bg-blue-50 text-blue-600"
                              title="Editează"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setConfirmConfig({
                                  isOpen: true,
                                  message: 'Sigur vrei să ștergi acest produs?',
                                  onConfirm: async () => {
                                    try {
                                      await deleteProduct(product.id, product.image_url);
                                      await refreshData();
                                      showNotification('Produs șters!');
                                    } catch (err: any) {
                                      showNotification(err.message || 'Eroare la ștergere', 'error');
                                    }
                                    setConfirmConfig(null);
                                  }
                                });
                              }}
                              className="p-2 rounded hover:bg-red-50 text-red-600"
                              title="Șterge"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* --- ORDERS TAB --- */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-stone-800">Comenzi Primite</h2>

                {orders.length === 0 ? (
                  <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-stone-300">
                    <ShoppingBag size={48} className="mx-auto text-stone-300 mb-4" />
                    <p className="text-stone-500">Nu există comenzi momentan.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-stone-50 border-b border-stone-200">
                          <tr>
                            <th className="p-4 text-stone-500 font-bold text-sm">Client</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Telefon</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Data Livrării</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Livrare</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Produse</th>
                            <th className="p-4 text-stone-500 font-bold text-sm">Status</th>
                            <th className="p-4 text-stone-500 font-bold text-sm text-right">Acțiuni</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                              <td className="p-4 font-bold text-stone-800">
                                {order.customer_name}
                                <div className="text-xs text-stone-400 font-normal">
                                  {order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}
                                </div>
                              </td>
                              <td className="p-4 text-stone-600">
                                <a href={`tel:${order.phone_number}`} className="hover:text-bakery-600 hover:underline">
                                  {order.phone_number}
                                </a>
                              </td>
                              <td className="p-4 text-stone-700">
                                {new Date(order.needed_by).toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                <div className="flex flex-col">
                                  <span className={`text-sm font-bold ${order.delivery_type === 'delivery' ? 'text-blue-600' : 'text-orange-600'}`}>
                                    {order.delivery_type === 'delivery' ? 'Livrare' : 'Ridicare'}
                                  </span>
                                  {order.delivery_type === 'delivery' && order.delivery_address && (
                                    <span className="text-xs text-stone-500 max-w-[200px] truncate" title={order.delivery_address}>
                                      {order.delivery_address}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-col gap-1">
                                  {order.items.map((item: any, idx: number) => (
                                    <span key={idx} className="text-sm text-stone-600">
                                      {item.quantity}x {item.name}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                                  order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                  {order.status === 'pending' ? 'Nouă' :
                                    order.status === 'completed' ? 'Finalizată' :
                                      order.status === 'contacted' ? 'Contactat' : order.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => order.id && handleToggleOrderStatus(order.id, order.status)}
                                    className={`p-2 rounded transition-colors ${order.status === 'completed'
                                      ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                                      }`}
                                    title={order.status === 'completed' ? 'Marchează ca nefinalizată' : 'Marchează ca finalizată'}
                                  >
                                    {order.status === 'completed' ? <RotateCcw size={18} /> : <Check size={18} />}
                                  </button>
                                  <button
                                    onClick={() => order.id && handleDeleteOrder(order.id)}
                                    className="p-2 rounded hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                                    title="Șterge Comanda"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- HERO TAB --- */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-stone-800">Imagini Hero (Slider Principal)</h2>
                  <button
                    onClick={() => heroFileRef.current?.click()}
                    disabled={isUploadingHero}
                    className="bg-bakery-500 hover:bg-bakery-600 disabled:bg-stone-400 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
                  >
                    {isUploadingHero ? (
                      <span className="animate-pulse">Se încarcă...</span>
                    ) : (
                      <><Upload size={20} /> Adaugă Imagine</>
                    )}
                  </button>
                  <input
                    type="file"
                    ref={heroFileRef}
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsUploadingHero(true);
                      try {
                        const url = await uploadHeroImage(file);
                        await addHeroImage(url);
                        await refreshData();
                        showNotification('Imagine Hero adăugată cu succes!');
                      } catch (err: any) {
                        showNotification('Eroare la încărcare: ' + (err.message || 'Necunoscută'), 'error');
                      }
                      setIsUploadingHero(false);
                      e.target.value = '';
                    }}
                  />
                </div>

                <p className="text-stone-500 text-sm">
                  Aceste imagini apar în slider-ul principal de pe prima pagină. Trage pentru a reordona.
                </p>

                {heroImages.length === 0 ? (
                  <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-stone-300">
                    <Image size={48} className="mx-auto text-stone-300 mb-4" />
                    <p className="text-stone-500">Nicio imagine în slider.</p>
                    <p className="text-stone-400 text-sm">Apasă "Adaugă Imagine" pentru a începe.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {heroImages.map((img, index) => (
                      <div
                        key={img.id}
                        className={`relative group bg-white rounded-xl overflow-hidden shadow-sm border-2 ${img.id.startsWith('default-') ? 'border-yellow-300' : 'border-transparent'}`}
                      >
                        <img
                          src={img.image_url}
                          alt={`Hero ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={async () => {
                              if (index > 0 && !isReordering) {
                                setIsReordering(true);
                                try {
                                  const newOrder = [...heroImages];
                                  [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
                                  setHeroImages(newOrder);
                                  await reorderHeroImages(newOrder.map((img, i) => ({ id: img.id, display_order: i + 1, image_url: img.image_url })));
                                  showNotification(`Imagine mutată la poziția #${index}`);
                                } catch (error: any) {
                                  showNotification('Eroare la mutare: ' + (error.message || 'Necunoscută'), 'error');
                                  await refreshData();
                                } finally {
                                  setIsReordering(false);
                                }
                              }
                            }}
                            disabled={index === 0}
                            className={`p-2 bg-white rounded-lg transition-colors ${index === 0 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                            title="Mută la stânga"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={async () => {
                              if (index < heroImages.length - 1 && !isReordering) {
                                setIsReordering(true);
                                try {
                                  const newOrder = [...heroImages];
                                  [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
                                  setHeroImages(newOrder);
                                  await reorderHeroImages(newOrder.map((img, i) => ({ id: img.id, display_order: i + 1, image_url: img.image_url })));
                                  showNotification(`Imagine mutată la poziția #${index + 2}`);
                                } catch (error: any) {
                                  showNotification('Eroare la mutare: ' + (error.message || 'Necunoscută'), 'error');
                                  await refreshData();
                                } finally {
                                  setIsReordering(false);
                                }
                              }
                            }}
                            disabled={index === heroImages.length - 1}
                            className={`p-2 bg-white rounded-lg transition-colors ${index === heroImages.length - 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                            title="Mută la dreapta"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                        <button
                          onClick={async () => {
                            if (confirm('Sigur vrei să ștergi această imagine?')) {
                              try {
                                await deleteHeroImage(img.id, img.image_url);
                                await refreshData();
                                showNotification('Imagine ștearsă!');
                              } catch (error: any) {
                                showNotification('Eroare la ștergere: ' + (error.message || 'Necunoscută'), 'error');
                              }
                            }
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                          title="Șterge imagine"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )
        }
      </div >

      {/* JOB EDIT MODAL */}
      {
        isEditingJob && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-stone-800">{currentJob.title ? 'Editează Job' : 'Job Nou'}</h3>
              <form onSubmit={handleSaveJob} className="space-y-4">
                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Titlu Job</label>
                  <input type="text" required value={currentJob.title || ''} onChange={e => setCurrentJob({ ...currentJob, title: e.target.value })} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400" placeholder="ex: Vânzătoare" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm text-stone-600 mb-1">Locație</label>
                    <select value={currentJob.location || 'Drăgășani'} onChange={e => setCurrentJob({ ...currentJob, location: e.target.value })} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 outline-none">
                      <option value="Drăgășani">Drăgășani</option>
                      <option value="Băbeni">Băbeni</option>
                      <option value="Drăgășani & Băbeni">Ambele Locații</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-sm text-stone-600 mb-1">Tip Program</label>
                    <select value={currentJob.type || 'Full-time'} onChange={e => setCurrentJob({ ...currentJob, type: e.target.value })} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 outline-none">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Descriere</label>
                  <textarea required rows={4} value={currentJob.description || ''} onChange={e => setCurrentJob({ ...currentJob, description: e.target.value })} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400" placeholder="Cerințe și beneficii..." />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsEditingJob(false)} className="flex-1 py-3 bg-stone-200 hover:bg-stone-300 rounded-xl font-bold text-stone-600">Anulează</button>
                  <button type="submit" className="flex-1 py-3 bg-bakery-500 hover:bg-bakery-600 rounded-xl font-bold text-white shadow-md">Salvează</button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {/* PRODUCT EDIT MODAL */}
      {
        isEditingProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6 text-stone-800">{currentProduct.id ? 'Editează Produs' : 'Produs Nou'}</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await saveProduct(currentProduct as Product);
                  setIsEditingProduct(false);
                  await refreshData();
                  showNotification('Produs salvat cu succes!');
                } catch (err: any) {
                  showNotification(err.message || 'Eroare la salvare', 'error');
                }
              }} className="space-y-4">

                {/* Image Upload/Preview */}
                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-2">Imagine</label>
                  <div className="relative">
                    {currentProduct.image_url ? (
                      <div className="relative">
                        <img
                          src={currentProduct.image_url}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg border border-stone-200"
                        />
                        <button
                          type="button"
                          onClick={() => productFileRef.current?.click()}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Upload size={24} className="mr-2" /> Schimbă imaginea
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => productFileRef.current?.click()}
                        className="w-full h-40 border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center text-stone-400 hover:border-bakery-400 hover:text-bakery-500 transition-colors"
                      >
                        <Upload size={32} className="mb-2" />
                        <span className="font-bold">Click pentru a încărca</span>
                      </button>
                    )}
                    <input
                      type="file"
                      ref={productFileRef}
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploadingProduct(true);
                        try {
                          const url = await uploadProductImage(file);
                          setCurrentProduct({ ...currentProduct, image_url: url });
                          showNotification('Imagine încărcată!');
                        } catch (err: any) {
                          showNotification('Eroare la încărcare: ' + (err.message || 'Necunoscută'), 'error');
                        }
                        setIsUploadingProduct(false);
                        e.target.value = '';
                      }}
                    />
                    {isUploadingProduct && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                        <span className="animate-pulse font-bold text-bakery-500">Se încarcă...</span>
                      </div>
                    )}
                  </div>
                  {!currentProduct.image_url && !currentProduct.id && (
                    <p className="text-xs text-stone-400 mt-1">Sau lipește un URL direct mai jos:</p>
                  )}
                  <input
                    type="url"
                    value={currentProduct.image_url || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, image_url: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400 mt-2 text-sm"
                    placeholder="https://example.com/imagine.jpg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Nume Produs *</label>
                  <input
                    type="text"
                    required
                    value={currentProduct.name_ro || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, name_ro: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400"
                    placeholder="ex: Covrigi cu susan"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Descriere *</label>
                  <textarea
                    required
                    rows={3}
                    value={currentProduct.description_ro || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, description_ro: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400"
                    placeholder="Descriere scurtă a produsului..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Etichetă (opțional)</label>
                  <input
                    type="text"
                    value={currentProduct.tag_ro || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, tag_ro: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400"
                    placeholder="ex: Popular, Nou, Favorit"
                  />
                  <p className="text-xs text-stone-400 mt-1">Apare ca badge pe imagine (lasă gol pentru nicio etichetă)</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsEditingProduct(false)} className="flex-1 py-3 bg-stone-200 hover:bg-stone-300 rounded-xl font-bold text-stone-600">Anulează</button>
                  <button
                    type="submit"
                    disabled={!currentProduct.image_url || !currentProduct.name_ro || !currentProduct.description_ro}
                    className="flex-1 py-3 bg-bakery-500 hover:bg-bakery-600 disabled:bg-stone-400 rounded-xl font-bold text-white shadow-md"
                  >
                    Salvează
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {/* SETTINGS MODAL */}
      {
        isSettingsOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsSettingsOpen(false)}>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                  <Settings size={24} className="text-bakery-500" />
                  Setări Admin
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              {settingsError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm font-bold flex items-center gap-2">
                  <AlertTriangle size={16} />
                  {settingsError}
                </div>
              )}

              <form onSubmit={(e) => {
                e.preventDefault();
                const savedPassword = localStorage.getItem('adminPassword') || 'mamaliga';

                if (settingsForm.currentPassword !== savedPassword) {
                  setSettingsError('Parola curentă este incorectă!');
                  return;
                }

                if (settingsForm.newPassword && settingsForm.newPassword !== settingsForm.confirmPassword) {
                  setSettingsError('Parolele noi nu se potrivesc!');
                  return;
                }

                if (!settingsForm.newUsername && !settingsForm.newPassword) {
                  setSettingsError('Trebuie să schimbi cel puțin numele de utilizator sau parola!');
                  return;
                }

                // Sanitize and validate inputs
                if (settingsForm.newUsername) {
                  const sanitized = settingsForm.newUsername.trim();
                  if (sanitized.length < 3 || sanitized.length > 20) {
                    setSettingsError('Numele de utilizator trebuie să aibă între 3 și 20 caractere!');
                    return;
                  }
                  if (!/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
                    setSettingsError('Numele de utilizator poate conține doar litere, cifre, _ și -');
                    return;
                  }
                  localStorage.setItem('adminUsername', sanitized);
                }

                if (settingsForm.newPassword) {
                  if (settingsForm.newPassword.length < 6) {
                    setSettingsError('Parola trebuie să aibă cel puțin 6 caractere!');
                    return;
                  }
                  localStorage.setItem('adminPassword', settingsForm.newPassword);
                }

                showNotification('Credențiale actualizate cu succes! Vei fi deconectat.');
                setTimeout(() => {
                  onLogout();
                }, 2000);

              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-1">Parolă Curentă *</label>
                  <input
                    type="password"
                    required
                    value={settingsForm.currentPassword}
                    onChange={e => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                    placeholder="Introdu parola curentă"
                  />
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <p className="text-xs text-stone-500 mb-3 italic">Completează doar câmpurile pe care vrei să le modifici</p>

                  <div className="mb-4">
                    <label className="block text-sm font-bold text-stone-600 mb-1">Nume Utilizator Nou (Opțional)</label>
                    <input
                      type="text"
                      value={settingsForm.newUsername}
                      onChange={e => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                      placeholder="Lasă gol pentru a păstra"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold text-stone-600 mb-1">Parolă Nouă (Opțional)</label>
                    <input
                      type="password"
                      value={settingsForm.newPassword}
                      onChange={e => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                      placeholder="Lasă gol pentru a păstra"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-600 mb-1">Confirmă Parola Nouă</label>
                    <input
                      type="password"
                      value={settingsForm.confirmPassword}
                      onChange={e => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                      placeholder="Doar dacă ai introdus parolă nouă"
                      disabled={!settingsForm.newPassword}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => {
                    setIsSettingsOpen(false);
                    setSettingsForm({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
                    setSettingsError(null);
                  }} className="flex-1 py-3 bg-stone-200 hover:bg-stone-300 rounded-xl font-bold text-stone-600">
                    Anulează
                  </button>
                  <button type="submit" className="flex-1 py-3 bg-bakery-500 hover:bg-bakery-600 rounded-xl font-bold text-white shadow-md">
                    Salvează Modificările
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default AdminDashboard;
