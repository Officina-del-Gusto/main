
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Plus, Edit, Trash2, Power, 
  Star, Archive, Search, FileText, Check, X, LogOut, Save, Download, Home, RotateCcw, Eye, Layers, Database, AlertTriangle, Copy, Bell, ArrowRight
} from 'lucide-react';
import { 
  Job, Application, 
  getJobs, saveJob, deleteJob, toggleJobStatus, seedDatabase, checkDbConnection,
  getApplications, updateApplicationStatus, deleteApplication 
} from '../utils/mockData';

interface AdminDashboardProps {
  onLogout: () => void;
}

type AppFilter = 'all' | 'new' | 'starred' | 'rejected' | 'trashed';

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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [appFilter, setAppFilter] = useState<AppFilter>('all');
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  
  // UI State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [confirmConfig, setConfirmConfig] = useState<{isOpen: boolean, message: string, onConfirm: () => void} | null>(null);
  
  // Job Form State
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Job>>({});

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
        showNotification("Apasă 'Populează Joburi' pentru a salva acest job în baza de date înainte de editare.", 'error');
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
           showNotification("Nu poți edita un job default. Apasă 'Populează Joburi' mai întâi.", 'error');
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
             showNotification("Joburile default nu se pot șterge. Apasă 'Populează Joburi' mai întâi.", 'error');
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
       if (e.message === "DEFAULT_JOB_ERROR") {
          showNotification("Apasă 'Populează Joburi' pentru a putea modifica statusul.", 'error');
       } else {
          showNotification("Eroare la modificare status.", 'error');
       }
     }
  };

  const handleSeedDB = async () => {
    setConfirmConfig({
      isOpen: true,
      message: 'Această acțiune va salva joburile default în baza de date Supabase. Continui?',
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await seedDatabase();
          await refreshData();
          showNotification('Joburile au fost adăugate cu succes!');
          setDbError(false);
        } catch (e: any) {
          if (e.message === "CONNECTION_ERROR") {
             setDbError(true);
             showNotification('Eroare conexiune. Rulează scriptul SQL.', 'error');
          } else {
             showNotification('Eroare la populare.', 'error');
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

-- 5. Create Storage Bucket for CVs
insert into storage.buckets (id, name, public) 
values ('cvs', 'cvs', true)
on conflict (id) do nothing;

create policy "Public Upload CVs" on storage.objects 
for insert with check ( bucket_id = 'cvs' );

create policy "Public View CVs" on storage.objects 
for select using ( bucket_id = 'cvs' );

create policy "Public Delete CVs" on storage.objects 
for delete using ( bucket_id = 'cvs' );
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
          <div className="flex gap-3">
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
                  Se pare că tabelele nu există în noul proiect Supabase (Eroare 404). <br/>
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
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('jobs')} className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg shadow-sm transition-all ${activeTab === 'jobs' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <LayoutDashboard /> Anunțuri Joburi
          </button>
          <button onClick={() => setActiveTab('applications')} className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg shadow-sm transition-all ${activeTab === 'applications' ? 'bg-white text-bakery-500 ring-2 ring-bakery-500' : 'bg-white/50 text-stone-500 hover:bg-white'}`}>
            <Users /> Aplicații
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
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-stone-800">Joburi Postate</h2>
                      <div className="flex gap-3">
                        <button 
                          onClick={handleSeedDB}
                          className={`px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md ${
                            isDemoMode 
                              ? 'bg-bakery-500 hover:bg-bakery-600 text-white animate-pulse' 
                              : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                          }`}
                          title="Salvează joburile default în baza de date"
                        >
                          <Database size={20} /> Populează Joburi
                          {isDemoMode && <ArrowRight size={16} className="animate-bounce-x" />}
                        </button>
                        <button 
                          onClick={() => handleEditJob()}
                          className="bg-bakery-500 hover:bg-bakery-600 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
                        >
                          <Plus size={20} /> Adaugă Job
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
                      {jobs.length === 0 && <p className="text-center text-stone-500 py-10">Nu sunt joburi. Apasă "Populează Joburi" dacă e prima rulare.</p>}
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
                                  <td className="p-4 text-stone-600 text-sm"><div className="flex flex-col"><span>{app.phone}</span><span className="text-blue-500">{app.email}</span></div></td>
                                  <td className="p-4">
                                    {app.message && <div className="text-sm italic text-stone-500 mb-1 line-clamp-2 max-w-[200px]">"{app.message}"</div>}
                                    {app.cvUrl ? (
                                      <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-bakery-500 hover:bg-bakery-600 px-3 py-1.5 rounded-lg shadow-sm transition-colors mt-1"><Eye size={14} /> {app.cvFileName || "Vezi CV"}</a>
                                    ) : <span className="text-xs text-stone-400">Fără CV</span>}
                                  </td>
                                  <td className="p-4 text-right">
                                    <div className="flex justify-end gap-1">
                                      {app.status !== 'trashed' ? (
                                        <>
                                          <button onClick={() => handleAppStatus(app.id, app.status === 'starred' ? 'new' : 'starred')} className={`p-2 rounded hover:bg-stone-200 ${app.status === 'starred' ? 'text-yellow-500' : 'text-stone-400 hover:text-yellow-500'}`}><Star size={18} fill={app.status === 'starred' ? 'currentColor' : 'none'} /></button>
                                          <button onClick={() => handleAppStatus(app.id, app.status === 'rejected' ? 'new' : 'rejected')} className={`p-2 rounded hover:bg-stone-200 ${app.status === 'rejected' ? 'text-red-500' : 'text-stone-400 hover:text-red-500'}`}><Archive size={18} /></button>
                                          <button onClick={() => handleAppStatus(app.id, 'trashed')} className="p-2 rounded hover:bg-stone-200 text-stone-400 hover:text-stone-600"><Trash2 size={18} /></button>
                                        </>
                                      ) : (
                                        <>
                                          <button onClick={() => handleAppStatus(app.id, 'new')} className="p-2 rounded hover:bg-green-100 text-green-600"><RotateCcw size={18} /></button>
                                          <button onClick={() => handlePermanentDeleteApp(app.id, app.cvUrl)} className="p-2 rounded hover:bg-red-100 text-red-600"><X size={18} /></button>
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
            </>
        )}
      </div>

      {/* JOB EDIT MODAL */}
      {isEditingJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-stone-800">{currentJob.title ? 'Editează Job' : 'Job Nou'}</h3>
            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label className="block font-bold text-sm text-stone-600 mb-1">Titlu Job</label>
                <input type="text" required value={currentJob.title || ''} onChange={e => setCurrentJob({...currentJob, title: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400" placeholder="ex: Vânzătoare" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Locație</label>
                  <select value={currentJob.location || 'Drăgășani'} onChange={e => setCurrentJob({...currentJob, location: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 outline-none">
                    <option value="Drăgășani">Drăgășani</option>
                    <option value="Băbeni">Băbeni</option>
                    <option value="Drăgășani & Băbeni">Ambele Locații</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-sm text-stone-600 mb-1">Tip Program</label>
                  <select value={currentJob.type || 'Full-time'} onChange={e => setCurrentJob({...currentJob, type: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 outline-none">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-sm text-stone-600 mb-1">Descriere</label>
                <textarea required rows={4} value={currentJob.description || ''} onChange={e => setCurrentJob({...currentJob, description: e.target.value})} className="w-full p-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:ring-2 focus:ring-bakery-400 outline-none placeholder-stone-400" placeholder="Cerințe și beneficii..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsEditingJob(false)} className="flex-1 py-3 bg-stone-200 hover:bg-stone-300 rounded-xl font-bold text-stone-600">Anulează</button>
                <button type="submit" className="flex-1 py-3 bg-bakery-500 hover:bg-bakery-600 rounded-xl font-bold text-white shadow-md">Salvează</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
