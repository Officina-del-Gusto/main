
import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Users, Plus, Edit, Trash2, Power, PowerOff,
  Star, Archive, Check, X, LogOut, Home, RotateCcw, Eye, Layers, AlertTriangle, Copy, ArrowRight, Settings,
  Image, ShoppingBag, Upload, GripVertical, ChevronLeft, ChevronRight, ChevronDown, Phone, MapPin, Calendar, Briefcase, UserX
} from 'lucide-react';
import {
  Job, Application, CarouselImage, Product,
  getJobs, saveJob, deleteJob, toggleJobStatus, activateAllJobs, deactivateAllJobs, deleteAllJobs, resetDatabase, checkDbConnection,
  getApplications, updateApplicationStatus, deleteApplication,
  getCarouselImages, uploadCarouselImage, addCarouselImage, deleteCarouselImage, reorderCarouselImages,
  getProducts, uploadProductImage, saveProduct, deleteProduct, toggleProductActive, reorderProducts,
  HeroImage, getHeroImages, uploadHeroImage, addHeroImage, deleteHeroImage, reorderHeroImages,
  OrderRequest, getOrders, deleteOrder, updateOrderStatus,
  getStoreSettings, saveStoreSettings, StoreSettings, updateCarouselImage
} from '../utils/mockData';
import { useScrollLock } from '../hooks/useScrollLock';

interface AdminDashboardProps {
  onLogout: () => void;
  christmasEnabled: boolean;
  onChristmasToggle: (enabled: boolean) => void;
}

type AppFilter = 'all' | 'new' | 'starred' | 'rejected' | 'trashed' | 'hired' | 'fired';
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
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [newAppsCount, setNewAppsCount] = useState(0);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    id: '1',
    shipping_fee: 15,
    packaging_fee: 2,
    pricing_enabled: true,
    fee_rules: {
      standard: { packaging: [], delivery: [] },
      special: { packaging: [], delivery: [] }
    }
  });
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);
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
  const [isEditingCarousel, setIsEditingCarousel] = useState(false);
  const [currentCarouselItem, setCurrentCarouselItem] = useState<Partial<CarouselImage>>({});
  const [isUploadingCarousel, setIsUploadingCarousel] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingProduct, setIsUploadingProduct] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  useScrollLock(isSettingsOpen || isEditingJob || isEditingProduct || isEditingCarousel || (confirmConfig?.isOpen ?? false));

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
    const fetchedSettings = await getStoreSettings();
    setStoreSettings(fetchedSettings);

    // Calculate notifications based on localStorage
    const lastViewedOrders = parseInt(localStorage.getItem('lastViewedOrders') || '0');
    const lastViewedApps = parseInt(localStorage.getItem('lastViewedApplications') || '0');

    const newOrders = fetchedOrders.filter(o => new Date(o.created_at || 0).getTime() > lastViewedOrders).length;
    const newApps = fetchedApps.filter(a => new Date(a.dateApplied).getTime() > lastViewedApps).length;

    setNewOrdersCount(newOrders);
    setNewAppsCount(newApps);
  };

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    if (tab === 'orders') {
      localStorage.setItem('lastViewedOrders', Date.now().toString());
      setNewOrdersCount(0);
    }
    if (tab === 'applications') {
      localStorage.setItem('lastViewedApplications', Date.now().toString());
      setNewAppsCount(0);
    }
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

  const handleAppStatus = async (id: string, status: 'new' | 'starred' | 'rejected' | 'trashed' | 'hired' | 'fired') => {
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
    hired: applications.filter(a => a.status === 'hired').length,
    fired: applications.filter(a => a.status === 'fired').length,
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
          <button onClick={() => handleTabChange('hero')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'hero' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <Image size={18} /> Hero
          </button>
          <button onClick={() => handleTabChange('orders')} className={`relative py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'orders' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <ShoppingBag size={18} /> Comenzi
            {newOrdersCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {newOrdersCount}
              </span>
            )}
          </button>
          <button onClick={() => handleTabChange('products')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'products' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <ShoppingBag size={18} /> Produse & Meniu
          </button>
          <button onClick={() => handleTabChange('jobs')} className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'jobs' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <LayoutDashboard size={18} /> Joburi
          </button>
          <button onClick={() => handleTabChange('applications')} className={`relative py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base shadow-sm transition-all ${activeTab === 'applications' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <Users size={18} /> Aplicații
            {newAppsCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {newAppsCount}
              </span>
            )}
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
                  <button onClick={() => setAppFilter('hired')} className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${appFilter === 'hired' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>Angajați <span className="ml-1 opacity-80">{counts.hired}</span></button>
                  <button onClick={() => setAppFilter('fired')} className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${appFilter === 'fired' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>Concediați <span className="ml-1 opacity-80">{counts.fired}</span></button>
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
                                {app.status === 'hired' && <Briefcase className="text-green-600" size={18} />}
                                {app.status === 'fired' && <UserX className="text-stone-500" size={18} />}
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
                                      <button onClick={() => handleAppStatus(app.id, app.status === 'hired' ? 'new' : 'hired')} className={`p-2 rounded hover:bg-stone-200 ${app.status === 'hired' ? 'text-green-600' : 'text-stone-400 hover:text-green-600'}`} title={app.status === 'hired' ? 'Anulează angajarea' : 'Marchează ca angajat'}><Briefcase size={18} /></button>
                                      <button onClick={() => handleAppStatus(app.id, app.status === 'fired' ? 'new' : 'fired')} className={`p-2 rounded hover:bg-stone-200 ${app.status === 'fired' ? 'text-stone-800' : 'text-stone-400 hover:text-stone-800'}`} title={app.status === 'fired' ? 'Anulează concedierea' : 'Marchează ca concediat'}><UserX size={18} /></button>
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

            {/* --- PRODUCTS TAB (Merged with Carousel & Settings) --- */}
            {activeTab === 'products' && (
              <div className="space-y-10">

                {/* GLOBAL SETTINGS SECTION */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                  <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <Settings size={20} className="text-bakery-500" />
                    Setări Globale Magazin
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-stone-600 mb-1">Taxă Livrare (RON)</label>
                      <input
                        type="number"
                        value={storeSettings.shipping_fee}
                        onChange={(e) => setStoreSettings({ ...storeSettings, shipping_fee: parseFloat(e.target.value) || 0 })}
                        className="w-full p-2 border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-600 mb-1">Taxă Ambalaj (RON)</label>
                      <input
                        type="number"
                        value={storeSettings.packaging_fee}
                        onChange={(e) => setStoreSettings({ ...storeSettings, packaging_fee: parseFloat(e.target.value) || 0 })}
                        className="w-full p-2 border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <div
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${storeSettings.pricing_enabled ? 'bg-green-500' : 'bg-stone-300'}`}
                        onClick={() => setStoreSettings({ ...storeSettings, pricing_enabled: !storeSettings.pricing_enabled })}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${storeSettings.pricing_enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                      <span className="font-bold text-stone-700">Afișare Prețuri pe Site</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={async () => {
                        setIsSettingsLoading(true);
                        try {
                          await saveStoreSettings(storeSettings);
                          showNotification("Setări salvate cu succes!");
                        } catch (e) {
                          showNotification("Eroare la salvare setări", "error");
                        }
                        setIsSettingsLoading(false);
                      }}
                      disabled={isSettingsLoading}
                      className="px-6 py-2 bg-stone-800 text-white rounded-lg font-bold hover:bg-stone-900 disabled:opacity-50"
                    >
                      {isSettingsLoading ? 'Se salvează...' : 'Salvează Setări'}
                    </button>
                  </div>

                  {/* Fee Rules Configuration */}
                  <div className="mt-8 border-t border-stone-200 pt-6">
                    <h4 className="font-bold text-stone-700 mb-4">Reguli Dinamice Taxe</h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Standard Products Rules */}
                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <h5 className="font-bold text-bakery-600 mb-3 flex items-center gap-2">
                          <ShoppingBag size={16} /> Produse Standard
                        </h5>

                        {/* Packaging Rules */}
                        <div className="mb-4">
                          <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Reguli Ambalaj</label>
                          <div className="space-y-2">
                            {storeSettings.fee_rules?.standard?.packaging?.map((rule, idx) => (
                              <div key={idx} className="flex gap-2 items-center">
                                <span className="text-sm text-stone-600">Peste</span>
                                <input
                                  type="number"
                                  value={rule.threshold}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.standard.packaging || [])];
                                    newRules[idx].threshold = parseInt(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, packaging: newRules } } });
                                  }}
                                  className="w-16 p-1 border rounded text-center text-sm"
                                  placeholder="Nr"
                                />
                                <span className="text-sm text-stone-600">prod. =</span>
                                <input
                                  type="number"
                                  value={rule.fee}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.standard.packaging || [])];
                                    newRules[idx].fee = parseFloat(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, packaging: newRules } } });
                                  }}
                                  className="w-20 p-1 border rounded text-center text-sm"
                                  placeholder="RON"
                                />
                                <span className="text-sm text-stone-600">RON</span>
                                <button
                                  onClick={() => {
                                    const newRules = storeSettings.fee_rules.standard.packaging.filter((_, i) => i !== idx);
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, packaging: newRules } } });
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newRules = [...(storeSettings.fee_rules.standard.packaging || []), { threshold: 0, fee: 0 }];
                                setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, packaging: newRules } } });
                              }}
                              className="text-xs font-bold text-bakery-500 hover:underline flex items-center gap-1"
                            >
                              <Plus size={12} /> Adaugă Regulă
                            </button>
                          </div>
                        </div>

                        {/* Delivery Rules */}
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Reguli Livrare</label>
                          <div className="space-y-2">
                            {storeSettings.fee_rules?.standard?.delivery?.map((rule, idx) => (
                              <div key={idx} className="flex gap-2 items-center">
                                <span className="text-sm text-stone-600">Comandă &gt;</span>
                                <input
                                  type="number"
                                  value={rule.threshold}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.standard.delivery || [])];
                                    newRules[idx].threshold = parseFloat(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, delivery: newRules } } });
                                  }}
                                  className="w-16 p-1 border rounded text-center text-sm"
                                  placeholder="RON"
                                />
                                <span className="text-sm text-stone-600">RON =</span>
                                <input
                                  type="number"
                                  value={rule.fee}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.standard.delivery || [])];
                                    newRules[idx].fee = parseFloat(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, delivery: newRules } } });
                                  }}
                                  className="w-20 p-1 border rounded text-center text-sm"
                                  placeholder="RON"
                                />
                                <span className="text-sm text-stone-600">Taxă</span>
                                <button
                                  onClick={() => {
                                    const newRules = storeSettings.fee_rules.standard.delivery.filter((_, i) => i !== idx);
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, delivery: newRules } } });
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newRules = [...(storeSettings.fee_rules.standard.delivery || []), { threshold: 0, fee: 0 }];
                                setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, standard: { ...storeSettings.fee_rules.standard, delivery: newRules } } });
                              }}
                              className="text-xs font-bold text-bakery-500 hover:underline flex items-center gap-1"
                            >
                              <Plus size={12} /> Adaugă Regulă
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Special Products Rules */}
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                        <h5 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                          <Star size={16} /> Produse Speciale (Carousel)
                        </h5>

                        {/* Packaging Rules */}
                        <div className="mb-4">
                          <label className="block text-xs font-bold text-amber-600 uppercase mb-2">Reguli Ambalaj</label>
                          <div className="space-y-2">
                            {storeSettings.fee_rules?.special?.packaging?.map((rule, idx) => (
                              <div key={idx} className="flex gap-2 items-center">
                                <span className="text-sm text-stone-600">Peste</span>
                                <input
                                  type="number"
                                  value={rule.threshold}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.special.packaging || [])];
                                    newRules[idx].threshold = parseInt(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, packaging: newRules } } });
                                  }}
                                  className="w-16 p-1 border rounded text-center text-sm"
                                  placeholder="Nr"
                                />
                                <span className="text-sm text-stone-600">prod. =</span>
                                <input
                                  type="number"
                                  value={rule.fee}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.special.packaging || [])];
                                    newRules[idx].fee = parseFloat(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, packaging: newRules } } });
                                  }}
                                  className="w-20 p-1 border rounded text-center text-sm"
                                  placeholder="RON"
                                />
                                <span className="text-sm text-stone-600">RON</span>
                                <button
                                  onClick={() => {
                                    const newRules = storeSettings.fee_rules.special.packaging.filter((_, i) => i !== idx);
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, packaging: newRules } } });
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newRules = [...(storeSettings.fee_rules.special.packaging || []), { threshold: 0, fee: 0 }];
                                setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, packaging: newRules } } });
                              }}
                              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                            >
                              <Plus size={12} /> Adaugă Regulă
                            </button>
                          </div>
                        </div>

                        {/* Delivery Rules */}
                        <div>
                          <label className="block text-xs font-bold text-amber-600 uppercase mb-2">Reguli Livrare</label>
                          <div className="space-y-2">
                            {storeSettings.fee_rules?.special?.delivery?.map((rule, idx) => (
                              <div key={idx} className="flex gap-2 items-center">
                                <span className="text-sm text-stone-600">Comandă &gt;</span>
                                <input
                                  type="number"
                                  value={rule.threshold}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.special.delivery || [])];
                                    newRules[idx].threshold = parseFloat(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, delivery: newRules } } });
                                  }}
                                  className="w-16 p-1 border rounded text-center text-sm"
                                  placeholder="RON"
                                />
                                <span className="text-sm text-stone-600">RON =</span>
                                <input
                                  type="number"
                                  value={rule.fee}
                                  onChange={(e) => {
                                    const newRules = [...(storeSettings.fee_rules.special.delivery || [])];
                                    newRules[idx].fee = parseFloat(e.target.value) || 0;
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, delivery: newRules } } });
                                  }}
                                  className="w-20 p-1 border rounded text-center text-sm"
                                  placeholder="RON"
                                />
                                <span className="text-sm text-stone-600">Taxă</span>
                                <button
                                  onClick={() => {
                                    const newRules = storeSettings.fee_rules.special.delivery.filter((_, i) => i !== idx);
                                    setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, delivery: newRules } } });
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newRules = [...(storeSettings.fee_rules.special.delivery || []), { threshold: 0, fee: 0 }];
                                setStoreSettings({ ...storeSettings, fee_rules: { ...storeSettings.fee_rules, special: { ...storeSettings.fee_rules.special, delivery: newRules } } });
                              }}
                              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                            >
                              <Plus size={12} /> Adaugă Regulă
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={async () => {
                          setIsSettingsLoading(true);
                          try {
                            await saveStoreSettings(storeSettings);
                            showNotification("Setări salvate cu succes!");
                          } catch (e) {
                            showNotification("Eroare la salvare setări", "error");
                          }
                          setIsSettingsLoading(false);
                        }}
                        disabled={isSettingsLoading}
                        className="px-6 py-2 bg-stone-800 text-white rounded-lg font-bold hover:bg-stone-900 disabled:opacity-50"
                      >
                        {isSettingsLoading ? 'Se salvează...' : 'Salvează Setări'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* STANDARD PRODUCTS SECTION */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-stone-800">Produse Standard</h2>
                    <button
                      onClick={() => {
                        setCurrentProduct({
                          name_ro: '',
                          description_ro: '',
                          tag_ro: '',
                          is_active: true,
                          price: 0,
                          unit: 'buc'
                        });
                        setIsEditingProduct(true);
                      }}
                      className="bg-bakery-500 hover:bg-bakery-600 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <Plus size={20} /> Adaugă Produs
                    </button>
                  </div>

                  <p className="text-stone-500 text-sm">
                    Aceste produse apar în galeria principală. Poți edita numele, descrierea, prețul și imaginea.
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
                                      is_active: p.is_active,
                                      price: p.price,
                                      unit: p.unit
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
                                      is_active: p.is_active,
                                      price: p.price,
                                      unit: p.unit
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
                            <div className="mt-2 font-bold text-bakery-600">
                              {product.price} RON / {product.unit}
                            </div>
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

                {/* CAROUSEL SECTION (Merged) */}
                <div className="space-y-6 pt-10 border-t border-stone-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-stone-800">Produse Galerie (Carousel)</h2>
                    <button
                      onClick={() => carouselFileRef.current?.click()}
                      disabled={isUploadingCarousel}
                      className="bg-stone-700 hover:bg-stone-800 disabled:bg-stone-400 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
                    >
                      {isUploadingCarousel ? (
                        <span className="animate-pulse">Se încarcă...</span>
                      ) : (
                        <><Upload size={20} /> Adaugă Imagine Carousel</>
                      )}
                    </button>
                    <input
                      type="file"
                      ref={carouselFileRef}
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploadingCarousel(true);
                        try {
                          const url = await uploadCarouselImage(file);
                          // Add with default empty metadata
                          await addCarouselImage({ image_url: url, name: '', description: '', price: 0, unit: 'buc' });
                          await refreshData();
                          showNotification('Imagine adăugată în carusel!');
                        } catch (err: any) {
                          showNotification('Eroare la încărcare: ' + (err.message || 'Necunoscută'), 'error');
                        }
                        setIsUploadingCarousel(false);
                        e.target.value = '';
                      }}
                    />
                  </div>

                  <p className="text-stone-500 text-sm">
                    Aceste produse apar în caruselul de pe prima pagină. Acum poți adăuga detalii și preț.
                  </p>

                  {carouselImages.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-stone-300">
                      <Image size={48} className="mx-auto text-stone-300 mb-4" />
                      <p className="text-stone-500">Nicio imagine în carusel.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {carouselImages.map((img, index) => (
                        <div
                          key={img.id}
                          className={`relative group bg-white rounded-xl overflow-hidden shadow-sm border-2 ${img.id.startsWith('default-') ? 'border-yellow-300' : 'border-transparent'}`}
                        >
                          <img
                            src={img.image_url}
                            alt={`Carousel ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />

                          {/* Metadata Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white">
                            <div className="text-xs font-bold truncate">{img.name || 'Fără nume'}</div>
                            <div className="text-xs opacity-80">{img.price ? `${img.price} RON` : '-'}</div>
                          </div>

                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {/* Reorder Buttons */}
                            <button
                              onClick={async () => {
                                if (index > 0 && !isReordering) {
                                  setIsReordering(true);
                                  try {
                                    const newOrder = [...carouselImages];
                                    [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
                                    setCarouselImages(newOrder);
                                    await reorderCarouselImages(newOrder.map((img, i) => ({
                                      id: img.id,
                                      display_order: i + 1,
                                      image_url: img.image_url,
                                      name: img.name,
                                      description: img.description,
                                      price: img.price,
                                      unit: img.unit
                                    })));
                                    showNotification(`Imagine mutată la poziția #${index}`);
                                  } catch (error: any) {
                                    showNotification('Eroare la mutare', 'error');
                                    await refreshData();
                                  } finally {
                                    setIsReordering(false);
                                  }
                                }
                              }}
                              disabled={index === 0}
                              className={`p-2 bg-white rounded-lg transition-colors ${index === 0 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={async () => {
                                if (index < carouselImages.length - 1 && !isReordering) {
                                  setIsReordering(true);
                                  try {
                                    const newOrder = [...carouselImages];
                                    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
                                    setCarouselImages(newOrder);
                                    await reorderCarouselImages(newOrder.map((img, i) => ({
                                      id: img.id,
                                      display_order: i + 1,
                                      image_url: img.image_url,
                                      name: img.name,
                                      description: img.description,
                                      price: img.price,
                                      unit: img.unit
                                    })));
                                    showNotification(`Imagine mutată la poziția #${index + 2}`);
                                  } catch (error: any) {
                                    showNotification('Eroare la mutare', 'error');
                                    await refreshData();
                                  } finally {
                                    setIsReordering(false);
                                  }
                                }
                              }}
                              disabled={index === carouselImages.length - 1}
                              className={`p-2 bg-white rounded-lg transition-colors ${index === carouselImages.length - 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>

                          {/* Action Buttons (Edit/Delete) */}
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                // Open Carousel Edit Modal (Need to implement this modal or reuse product modal with different state)
                                // For simplicity, let's use a prompt or a new state. 
                                // Actually, I should add a state for editing carousel item.
                                // Let's use a new state `currentCarouselItem` and `isEditingCarousel`.
                                // But I haven't added those states yet. I should add them.
                                // I'll assume I'll add them in the next step or I can add inline editing?
                                // No, modal is better.
                                // I'll add the state in the next step. For now, I'll comment this out or use a placeholder.
                                // Wait, I can't leave it broken.
                                // I'll add the state in the previous step? No, I already did that step.
                                // I'll add the state now using a separate tool call before this one?
                                // Or I can add the state in the same file update if I scroll up?
                                // I'll just add the button logic and assume I'll add the state/modal later.
                                // Actually, I'll add `isEditingCarousel` state in the next tool call.
                                // So I'll put the onClick handler here.
                                setCurrentCarouselItem(img);
                                setIsEditingCarousel(true);
                              }}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
                              title="Editează detalii"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm('Sigur vrei să ștergi această imagine?')) {
                                  try {
                                    await deleteCarouselImage(img.id, img.image_url);
                                    await refreshData();
                                    showNotification('Imagine ștearsă!');
                                  } catch (error: any) {
                                    showNotification('Eroare la ștergere: ' + (error.message || 'Necunoscută'), 'error');
                                  }
                                }
                              }}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
                              title="Șterge imagine"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const itemsTotal = order.items.reduce((sum: number, item: any) => sum + ((item.price || 0) * item.quantity), 0);
                      const shipping = order.delivery_type === 'delivery' ? storeSettings.shipping_fee : 0;
                      const packaging = storeSettings.packaging_fee;
                      const grandTotal = itemsTotal > 0 ? itemsTotal + shipping + packaging : 0;
                      const hasUnpricedItems = order.items.some((item: any) => !item.price || item.price === 0);
                      return (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                          <details className="group">
                            <summary className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 cursor-pointer hover:bg-stone-50 transition-colors list-none">
                              <div className="flex items-center gap-4 flex-grow">
                                <div className={`p-2 rounded-full ${order.status === 'pending' ? 'bg-blue-100 text-blue-600' : order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-600'}`}>
                                  <ShoppingBag size={20} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-bakery-600 bg-bakery-50 px-1.5 rounded text-xs">#{order.friendly_id || '---'}</span>
                                    <div className="font-bold text-stone-800">{order.customer_name}</div>
                                  </div>
                                  <div className="text-xs text-stone-500">
                                    {new Date(order.created_at || Date.now()).toLocaleDateString()} • {order.items.length} produse
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 mt-2 md:mt-0">
                                <div className="font-bold text-stone-800">{grandTotal.toFixed(2)} RON</div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                                  order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                  {order.status === 'pending' ? 'Nouă' : order.status === 'completed' ? 'Finalizată' : order.status}
                                </span>
                                <ChevronDown size={20} className="text-stone-400 transition-transform group-open:rotate-180" />
                              </div>
                            </summary>

                            <div className="p-4 border-t border-stone-100 bg-stone-50/50">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-bold text-stone-700 mb-2 text-sm uppercase">Detalii Client</h4>
                                  <div className="space-y-2 text-sm text-stone-600">
                                    <div className="flex items-center gap-2">
                                      <Phone size={14} />
                                      <a href={`tel:${order.phone_number}`} className="hover:text-bakery-600 underline">{order.phone_number}</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin size={14} />
                                      <span>{order.delivery_type === 'delivery' ? `Livrare: ${order.delivery_address}` : 'Ridicare Personală'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar size={14} />
                                      <span>Data: {new Date(order.needed_by).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-bold text-stone-700 mb-2 text-sm uppercase">Produse Comandate</h4>
                                  <div className="space-y-2">
                                    {order.items.map((item: any, idx: number) => (
                                      <div key={idx} className={`flex justify-between text-sm border-b border-stone-200 pb-1 last:border-0 ${(!item.price || item.price === 0) ? 'bg-red-50 p-1 rounded border-red-100' : ''}`}>
                                        <span className={`text-stone-700 ${(!item.price || item.price === 0) ? 'font-bold text-red-700' : ''}`}>
                                          <span className="font-bold">{item.quantity}x</span> {item.name}
                                          {(!item.price || item.price === 0) && <span className="ml-2 text-xs bg-red-100 text-red-600 px-1 rounded">Preț Lipsă</span>}
                                        </span>
                                        <span className={`${(!item.price || item.price === 0) ? 'text-red-600 font-bold' : 'text-stone-500'}`}>
                                          {item.price ? `${(item.price * item.quantity).toFixed(2)} RON` : 'Suna pt. pret'}
                                        </span>
                                      </div>
                                    ))}
                                    {order.details && (
                                      <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 italic mt-2 border border-yellow-100">
                                        Note: {order.details}
                                      </div>
                                    )}
                                    {hasUnpricedItems && (
                                      <div className="bg-red-50 p-3 rounded-lg border border-red-200 flex items-start gap-2 mt-2">
                                        <Phone className="text-red-500 shrink-0 mt-0.5" size={16} />
                                        <div>
                                          <div className="text-red-800 font-bold text-xs uppercase mb-1">Acțiune Necesară</div>
                                          <div className="text-red-700 text-sm">
                                            Sună clientul pentru a comunica prețul final.
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <div className="mt-4 pt-2 border-t border-stone-200 flex flex-col gap-1 text-sm">
                                    <div className="flex justify-between text-stone-500"><span>Subtotal:</span> <span>{itemsTotal.toFixed(2)} RON</span></div>
                                    {order.delivery_type === 'delivery' && (
                                      <div className="flex justify-between text-stone-500"><span>Livrare:</span> <span>{shipping.toFixed(2)} RON</span></div>
                                    )}
                                    <div className="flex justify-between text-stone-500"><span>Ambalaj:</span> <span>{packaging.toFixed(2)} RON</span></div>
                                    <div className="flex justify-between font-bold text-stone-800 text-base mt-1 pt-1 border-t border-stone-200">
                                      <span>Total:</span> <span>{grandTotal.toFixed(2)} RON</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-200">
                                <button
                                  onClick={() => handleToggleOrderStatus(order.id, order.status)}
                                  className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${order.status === 'completed'
                                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                    : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                                    }`}
                                >
                                  {order.status === 'completed' ? <><RotateCcw size={16} /> Redeschide</> : <><Check size={16} /> Finalizează</>}
                                </button>
                                <button
                                  onClick={() => handleDeleteOrder(order.id)}
                                  className="px-4 py-2 rounded-lg font-bold bg-red-100 text-red-600 hover:bg-red-200 flex items-center gap-2"
                                >
                                  <Trash2 size={16} /> Șterge
                                </button>
                              </div>
                            </div >
                          </details >
                        </div >
                      );
                    })}
                  </div >
                )}
              </div >
            )}

            {/* --- HERO TAB --- */}
            {
              activeTab === 'hero' && (
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
              )
            }
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
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-stone-800">{currentProduct.id ? 'Editează Produs' : 'Produs Nou'}</h3>
                <button onClick={() => setIsEditingProduct(false)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors text-stone-500">
                  <X size={24} />
                </button>
              </div>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm text-stone-600 mb-1">Preț (RON)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={currentProduct.price || 0}
                      onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm text-stone-600 mb-1">Unitate (ex: buc, kg)</label>
                    <input
                      type="text"
                      value={currentProduct.unit || 'buc'}
                      onChange={e => setCurrentProduct({ ...currentProduct, unit: e.target.value })}
                      className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                    />
                  </div>
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

      {/* CAROUSEL EDIT MODAL */}
      {
        isEditingCarousel && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-stone-800">Editează Imagine Carusel</h3>
                <button onClick={() => setIsEditingCarousel(false)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors text-stone-500">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (currentCarouselItem.id) {
                    await updateCarouselImage(currentCarouselItem.id, currentCarouselItem);
                    setIsEditingCarousel(false);
                    await refreshData();
                    showNotification('Imagine actualizată cu succes!');
                  }
                } catch (err: any) {
                  showNotification(err.message || 'Eroare la salvare', 'error');
                }
              }} className="space-y-4">

                <div className="relative h-40 rounded-lg overflow-hidden border border-stone-200">
                  <img src={currentCarouselItem.image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Nume (Opțional)</label>
                  <input
                    type="text"
                    value={currentCarouselItem.name || ''}
                    onChange={e => setCurrentCarouselItem({ ...currentCarouselItem, name: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                    placeholder="ex: Tort Aniversar"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Descriere (Opțional)</label>
                  <textarea
                    rows={3}
                    value={currentCarouselItem.description || ''}
                    onChange={e => setCurrentCarouselItem({ ...currentCarouselItem, description: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                    placeholder="Detalii despre produs..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm text-stone-600 mb-1">Preț (RON)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={currentCarouselItem.price || 0}
                      onChange={e => setCurrentCarouselItem({ ...currentCarouselItem, price: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm text-stone-600 mb-1">Unitate</label>
                    <input
                      type="text"
                      value={currentCarouselItem.unit || 'buc'}
                      onChange={e => setCurrentCarouselItem({ ...currentCarouselItem, unit: e.target.value })}
                      className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsEditingCarousel(false)} className="flex-1 py-3 bg-stone-200 hover:bg-stone-300 rounded-xl font-bold text-stone-600">Anulează</button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-bakery-500 hover:bg-bakery-600 rounded-xl font-bold text-white shadow-md"
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
