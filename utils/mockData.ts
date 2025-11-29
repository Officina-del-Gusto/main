
import { supabase } from '../supabaseClient';

export interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  active: boolean;
  datePosted: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  phone: string;
  email?: string;
  message?: string;
  cvFileName?: string;
  cvUrl?: string;
  status: 'new' | 'starred' | 'rejected' | 'trashed';
  dateApplied: string;
}

// --- DEFAULT DATA (Fallback when DB is empty/missing) ---
const DEFAULT_JOBS: Job[] = [
  {
    id: 'default-sales',
    title: 'Lucrător Comercial (Vânzătoare)',
    type: 'Full-time',
    location: 'Drăgășani',
    description: 'Te ocupi de servirea clienților cu zâmbetul pe buze, aranjarea produselor la raft și menținerea curățeniei. Experiența nu este obligatorie, te învățăm noi tot ce trebuie! Căutăm o persoană serioasă și punctuală.',
    active: false,
    datePosted: new Date().toISOString()
  },
  {
    id: 'default-baker',
    title: 'Patiser / Ajutor Patiser',
    type: 'Full-time',
    location: 'Băbeni',
    description: 'Ești pasionat de aluaturi? Căutăm o persoană harnică pentru prepararea produselor de patiserie (merdenele, ștrudele, covrigi). Oferim program de lucru stabil, salariu motivant și o echipă prietenoasă.',
    active: false,
    datePosted: new Date().toISOString()
  },
  {
    id: 'default-manager',
    title: 'Manager',
    type: 'Full-time',
    location: 'Drăgășani & Băbeni',
    description: 'Căutăm o persoană organizată pentru a coordona activitatea în ambele locații. Responsabilități: gestiune stocuri, coordonare echipă, asigurarea calității. Permis cat. B necesar.',
    active: false,
    datePosted: new Date().toISOString()
  }
];

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: 'default-app-1',
    jobId: 'default-sales',
    jobTitle: 'Lucrător Comercial',
    applicantName: 'Ana Maria Popescu',
    phone: '0740 123 456',
    email: 'ana.popescu@email.com',
    message: '[Locație Dorită: Drăgășani]\n\nBună ziua, am o experiență de 2 ani în vânzări și sunt foarte interesată de acest post. Sunt o persoană comunicativă și serioasă.',
    status: 'new',
    dateApplied: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];

// --- CONNECTION CHECK ---
export const checkDbConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('jobs').select('id').limit(1);
    if (error) {
        return false;
    }
    return true;
  } catch (e: any) {
    return false;
  }
};

// --- JOBS OPERATIONS ---

export const getJobs = async (): Promise<Job[]> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === '42P01' || error.message.includes('Could not find the table')) {
        console.warn("Database tables not found. Using default jobs (Demo Mode).");
        return DEFAULT_JOBS;
      }
      throw error;
    }

    if (data && data.length > 0) {
      return data.map((row: any) => ({
        id: row.id,
        title: row.title,
        type: row.type,
        location: row.location,
        description: row.description,
        active: row.active,
        datePosted: row.created_at
      }));
    }
    
    return DEFAULT_JOBS;

  } catch (err: any) {
    return DEFAULT_JOBS;
  }
};

export const saveJob = async (job: Partial<Job>) => {
  try {
    if (job.id?.startsWith('default-')) {
      // Throw error to be caught by UI
      throw new Error("DEFAULT_JOB_ERROR");
    }

    const dbPayload = {
      title: job.title,
      type: job.type,
      location: job.location,
      description: job.description,
      active: job.active !== undefined ? job.active : true
    };

    if (job.id) {
      const { error } = await supabase.from('jobs').update(dbPayload).eq('id', job.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('jobs').insert([dbPayload]);
      if (error) throw error;
    }
  } catch (error: any) {
    console.error("DB Save failed:", error.message || error);
    throw error;
  }
};

export const deleteJob = async (id: string) => {
  try {
    if (id.startsWith('default-')) {
       throw new Error("DEFAULT_JOB_ERROR");
    }
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (error) throw error;
  } catch (e: any) { 
    console.error("DB Delete failed", e.message || e);
    throw e;
  }
};

export const toggleJobStatus = async (id: string, currentStatus: boolean) => {
  try {
    // If it's a default job (not in DB), insert it first then set active
    if (id.startsWith('default-')) {
      const defaultJob = DEFAULT_JOBS.find(j => j.id === id);
      if (!defaultJob) {
        throw new Error("DEFAULT_JOB_NOT_FOUND");
      }
      
      const dbPayload = {
        title: defaultJob.title,
        type: defaultJob.type,
        location: defaultJob.location,
        description: defaultJob.description,
        active: !currentStatus  // Toggle: if currently false, set to true
      };
      
      const { error } = await supabase.from('jobs').insert([dbPayload]);
      if (error) throw error;
      return;
    }
    
    // For existing DB jobs, simply toggle
    const { error } = await supabase.from('jobs').update({ active: !currentStatus }).eq('id', id);
    if (error) throw error;
  } catch (e: any) { 
    console.error("DB Toggle failed", e.message || e);
    throw e;
  }
};

export const activateAllJobs = async () => {
  try {
    const connected = await checkDbConnection();
    if (!connected) {
        throw new Error("CONNECTION_ERROR");
    }

    // Get existing jobs from DB
    const { data: existingJobs, error: fetchError } = await supabase
      .from('jobs')
      .select('title');
    
    if (fetchError) throw fetchError;
    
    const existingTitles = new Set(existingJobs?.map(j => j.title) || []);
    
    // Find default jobs that don't exist in DB yet
    const jobsToInsert = DEFAULT_JOBS
      .filter(job => !existingTitles.has(job.title))
      .map(job => ({
        title: job.title,
        type: job.type,
        location: job.location,
        description: job.description,
        active: true
      }));
    
    // Insert new jobs if any
    if (jobsToInsert.length > 0) {
      const { error: insertError } = await supabase.from('jobs').insert(jobsToInsert);
      if (insertError) throw insertError;
    }
    
    // Set ALL jobs in DB to active (using .not('id', 'is', null) to match all rows)
    const { error: updateError } = await supabase.from('jobs').update({ active: true }).not('id', 'is', null);
    if (updateError) throw updateError;
  } catch (error: any) {
    console.error("Error activating all jobs:", error.message || error);
    throw error;
  }
};

export const deactivateAllJobs = async () => {
  try {
    const connected = await checkDbConnection();
    if (!connected) {
        throw new Error("CONNECTION_ERROR");
    }

    // Get existing jobs from DB
    const { data: existingJobs, error: fetchError } = await supabase
      .from('jobs')
      .select('title');
    
    if (fetchError) throw fetchError;
    
    const existingTitles = new Set(existingJobs?.map(j => j.title) || []);
    
    // Find default jobs that don't exist in DB yet
    const jobsToInsert = DEFAULT_JOBS
      .filter(job => !existingTitles.has(job.title))
      .map(job => ({
        title: job.title,
        type: job.type,
        location: job.location,
        description: job.description,
        active: false
      }));
    
    // Insert new jobs if any
    if (jobsToInsert.length > 0) {
      const { error: insertError } = await supabase.from('jobs').insert(jobsToInsert);
      if (insertError) throw insertError;
    }
    
    // Set ALL jobs in DB to inactive (using .not('id', 'is', null) to match all rows)
    const { error: updateError } = await supabase.from('jobs').update({ active: false }).not('id', 'is', null);
    if (updateError) throw updateError;
  } catch (error: any) {
    console.error("Error deactivating all jobs:", error.message || error);
    throw error;
  }
};

export const deleteAllJobs = async () => {
  try {
    const connected = await checkDbConnection();
    if (!connected) {
        throw new Error("CONNECTION_ERROR");
    }

    // Delete all jobs from DB (using .not('id', 'is', null) to match all rows)
    const { error } = await supabase.from('jobs').delete().not('id', 'is', null);
    if (error) throw error;
  } catch (error: any) {
    console.error("Error deleting all jobs:", error.message || error);
    throw error;
  }
};

export const resetDatabase = async () => {
  try {
    const connected = await checkDbConnection();
    if (!connected) {
        throw new Error("CONNECTION_ERROR");
    }

    // Delete all jobs from DB (using .not('id', 'is', null) to match all rows)
    const { error: jobsError } = await supabase.from('jobs').delete().not('id', 'is', null);
    if (jobsError) throw jobsError;

    // Delete all applications from DB
    const { error: appsError } = await supabase.from('applications').delete().not('id', 'is', null);
    if (appsError) throw appsError;

    // Try to clear CVs from storage bucket (optional - may fail if bucket doesn't exist)
    try {
      const { data: files } = await supabase.storage.from('cvs').list();
      if (files && files.length > 0) {
        const fileNames = files.map(f => f.name);
        await supabase.storage.from('cvs').remove(fileNames);
      }
    } catch (storageError: any) {
      console.warn("Could not clear CVs storage:", storageError.message);
    }
  } catch (error: any) {
    console.error("Error resetting database:", error.message || error);
    throw error;
  }
};

// --- APPLICATIONS OPERATIONS ---

export const getApplications = async (): Promise<Application[]> => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
       return DEFAULT_APPLICATIONS;
    }

    if (data && data.length > 0) {
      return data.map((row: any) => ({
        id: row.id,
        jobId: row.job_id,
        jobTitle: row.job_title,
        applicantName: row.applicant_name,
        phone: row.phone,
        email: row.email,
        message: row.message,
        cvUrl: row.cv_url,
        cvFileName: row.cv_filename,
        status: row.status,
        dateApplied: row.created_at
      }));
    }
    return DEFAULT_APPLICATIONS; 
  } catch (err: any) {
    return DEFAULT_APPLICATIONS;
  }
};

export const uploadCV = async (file: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const { error } = await supabase.storage.from('cvs').upload(fileName, file);
    if (error) throw error;
    
    const { data } = supabase.storage.from('cvs').getPublicUrl(fileName);
    return data.publicUrl;
  } catch (error: any) {
    console.error("CV Upload failed:", error.message || error);
    throw error;
  }
};

export const submitApplication = async (appData: Omit<Application, 'id'>) => {
  try {
    const { error } = await supabase.from('applications').insert([{
      job_id: appData.jobId,
      job_title: appData.jobTitle,
      applicant_name: appData.applicantName,
      phone: appData.phone,
      email: appData.email,
      message: appData.message,
      cv_url: appData.cvUrl,
      cv_filename: appData.cvFileName,
      status: 'new'
    }]);
    if (error) throw error;
  } catch (error: any) {
    console.error("DB Submit failed:", error.message || error);
    throw error;
  }
};

export const updateApplicationStatus = async (id: string, status: 'new' | 'starred' | 'rejected' | 'trashed') => {
  if (id.startsWith('default-')) return; 
  try {
    const { error } = await supabase.from('applications').update({ status }).eq('id', id);
    if (error) throw error;
  } catch (e: any) { console.error("DB Status Update failed", e.message || e) }
};

export const deleteApplication = async (id: string, cvUrl?: string) => {
  if (id.startsWith('default-')) return;
  try {
    await supabase.from('applications').delete().eq('id', id);
    if (cvUrl) {
      const urlParts = cvUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
         await supabase.storage.from('cvs').remove([fileName]);
      }
    }
  } catch (e: any) { console.error("DB Delete failed", e.message || e) }
};
