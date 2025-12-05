
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
  cvLink?: string;
  status: 'new' | 'starred' | 'rejected' | 'trashed' | 'hired' | 'fired';
  dateApplied: string;
}

export interface CarouselImage {
  id: string;
  image_url: string;
  display_order: number;
  created_at: string;
  name?: string;
  description?: string;
  price?: number;
  unit?: string;
}

export interface StoreSettings {
  id: string;
  shipping_fee: number;
  packaging_fee: number;
  pricing_enabled: boolean;
  fee_rules: {
    standard: {
      packaging: { threshold: number; fee: number }[];
      delivery: { threshold: number; fee: number }[];
    };
    special: {
      packaging: { threshold: number; fee: number }[];
      delivery: { threshold: number; fee: number }[];
    };
  };
}

export interface HeroImage {
  id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  image_url: string;
  name_ro: string;
  description_ro: string;
  tag_ro?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  price?: number;
  unit?: string;
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

const DEFAULT_APPLICATIONS: Application[] = [];

// --- CONNECTION CHECK ---
export const checkDbConnection = async (): Promise<boolean> => {
  try {
    const { error: jobsError } = await supabase.from('jobs').select('id').limit(1);
    if (jobsError) return false;

    const { error: carouselError } = await supabase.from('carousel_images').select('id').limit(1);
    if (carouselError) return false;

    return true;
  } catch (e: any) {
    return false;
  }
};

// --- STORE SETTINGS OPERATIONS ---

export const getStoreSettings = async (): Promise<StoreSettings> => {
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .single();

    if (error) {
      // Return defaults if not found
      return {
        id: '1',
        shipping_fee: 15,
        packaging_fee: 2,
        pricing_enabled: true,
        fee_rules: { standard: { packaging: [], delivery: [] }, special: { packaging: [], delivery: [] } }
      };
    }
    return data;
  } catch (err) {
    return {
      id: '1',
      shipping_fee: 15,
      packaging_fee: 2,
      pricing_enabled: true,
      fee_rules: { standard: { packaging: [], delivery: [] }, special: { packaging: [], delivery: [] } }
    };
  }
};

export const saveStoreSettings = async (settings: StoreSettings): Promise<void> => {
  const { error } = await supabase
    .from('store_settings')
    .upsert(settings);

  if (error) throw error;
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
        return DEFAULT_JOBS;
      }
      throw error;
    }

    // Convert DB jobs to Job[] format
    const dbJobs: Job[] = data ? data.map((row: any) => ({
      id: row.id,
      title: row.title,
      type: row.type,
      location: row.location,
      description: row.description,
      active: row.active,
      datePosted: row.created_at
    })) : [];

    // If we have jobs in DB, check which default jobs are not yet in DB
    if (dbJobs.length > 0) {
      const dbTitles = new Set(dbJobs.map(j => j.title));
      const remainingDefaults = DEFAULT_JOBS.filter(dj => !dbTitles.has(dj.title));
      // Return DB jobs first, then remaining defaults
      return [...dbJobs, ...remainingDefaults];
    }

    // If DB is completely empty, return default jobs
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
      // Optional: handle storage cleanup errors silently
    }
  } catch (error: any) {
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
        cvLink: row.cv_link,
        status: row.status,
        dateApplied: row.created_at
      }));
    }
    return DEFAULT_APPLICATIONS;
  } catch (err: any) {
    return DEFAULT_APPLICATIONS;
  }
};

// File upload validation constants
const CV_ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const CV_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const IMAGE_ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const IMAGE_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const validateFile = (file: File, allowedExtensions: string[], maxSize: number): void => {
  // Validate file size
  if (file.size > maxSize) {
    throw new Error(`Fișierul este prea mare. Maxim ${Math.round(maxSize / 1024 / 1024)}MB.`);
  }

  // Validate file extension
  const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    throw new Error(`Tip de fișier invalid. Tipuri permise: ${allowedExtensions.join(', ')}`);
  }
};

export const uploadCV = async (file: File): Promise<string> => {
  // Validate file before upload
  validateFile(file, CV_ALLOWED_EXTENSIONS, CV_MAX_FILE_SIZE);

  try {
    // Sanitize filename - remove special characters
    const safeFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const { error } = await supabase.storage.from('cvs').upload(safeFileName, file);
    if (error) throw error;

    const { data } = supabase.storage.from('cvs').getPublicUrl(safeFileName);
    return data.publicUrl;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    throw new Error(message);
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
      cv_link: appData.cvLink,
      status: 'new'
    }]);
    if (error) throw error;
  } catch (error: any) {
    throw error;
  }
};

export const updateApplicationStatus = async (id: string, status: 'new' | 'starred' | 'rejected' | 'trashed' | 'hired' | 'fired') => {
  if (id.startsWith('default-')) return;
  try {
    const { error } = await supabase.from('applications').update({ status }).eq('id', id);
    if (error) throw error;
  } catch (e: any) { /* no-op */ }
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
  } catch (e: any) { /* no-op */ }
};

// --- DEFAULT CAROUSEL IMAGES (Fallback) ---
export const DEFAULT_CAROUSEL_IMAGES: CarouselImage[] = [
  { id: 'default-1', image_url: '/comenzi/WhatsApp Image 2025-12-01 at 22.38.42_602d6a64.jpg', display_order: 1, created_at: new Date().toISOString() },
  { id: 'default-2', image_url: '/comenzi/WhatsApp Image 2025-12-01 at 22.39.37_3243dc8f.jpg', display_order: 2, created_at: new Date().toISOString() },
  { id: 'default-3', image_url: '/comenzi/WhatsApp Image 2025-12-01 at 22.40.07_ebb8f61c.jpg', display_order: 3, created_at: new Date().toISOString() },
  { id: 'default-4', image_url: '/comenzi/WhatsApp Image 2025-12-01 at 22.40.09_e7abdd0e.jpg', display_order: 4, created_at: new Date().toISOString() },
];

export const DEFAULT_HERO_IMAGES: HeroImage[] = [
  { id: 'default-h1', image_url: "https://i.ibb.co/jkGvV4ys/transparent-Photoroom.jpg", display_order: 1, created_at: new Date().toISOString() },
  { id: 'default-h2', image_url: "https://i.ibb.co/BvT77MJ/Whats-App-Image-2025-11-29-at-01-44-53-95d8e75c.jpg", display_order: 2, created_at: new Date().toISOString() },
  { id: 'default-h3', image_url: "https://i.ibb.co/GQ2vMbMM/Whats-App-Image-2025-11-29-at-01-46-19-c44ae1ab.jpg", display_order: 3, created_at: new Date().toISOString() },
  { id: 'default-h4', image_url: "https://i.ibb.co/36XPpSf/Whats-App-Image-2025-11-29-at-01-46-19-4cb8cb4a.jpg", display_order: 4, created_at: new Date().toISOString() },
];

// --- DEFAULT PRODUCTS (Fallback) ---
export const DEFAULT_PRODUCTS: Product[] = [
  { id: 'default-p1', image_url: 'https://simonatrusca.com/wp-content/uploads/2023/10/img_1197-1.jpg', name_ro: 'Merdenele', description_ro: 'Merdenele pufoase cu brânză dulce sau sărată, rețetă tradițională.', tag_ro: 'Popular', display_order: 1, is_active: true, created_at: new Date().toISOString() },
  { id: 'default-p2', image_url: 'https://www.jidlonacestach.cz/wp-content/uploads/2022/08/IMG_20220823_151420-scaled.jpg', name_ro: 'Covrigi', description_ro: 'Covrigi calzi cu sare sau susan, preparați în fiecare dimineață.', tag_ro: '', display_order: 2, is_active: true, created_at: new Date().toISOString() },
  { id: 'default-p3', image_url: 'https://savoriurbane.com/wp-content/uploads/2017/07/Pizza-cu-blat-pufos-cu-de-toate-pizza-romaneasca-8.jpg', name_ro: 'Pizza', description_ro: 'Pizza cu blat pufos și toppinguri proaspete, coaptă în cuptor.', tag_ro: 'Favorit', display_order: 3, is_active: true, created_at: new Date().toISOString() },
  { id: 'default-p4', image_url: 'https://thumbor.unica.ro/unsafe/1200x800/smart/filters:format(webp):contrast(8):quality(75)/https://retete.unica.ro/wp-content/uploads/2017/10/placinta-cu-mere1-e1507731037783.jpg', name_ro: 'Plăcinte', description_ro: 'Plăcinte cu mere, brânză sau dovleac – gustul copilăriei.', tag_ro: '', display_order: 4, is_active: true, created_at: new Date().toISOString() },
  { id: 'default-p5', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7mL15x6h8aTBLC4hXOnNgAys65Eq6uiDcw&s', name_ro: 'Cornuri', description_ro: 'Cornuri fragede cu ciocolată sau gem, ideale pentru micul dejun.', tag_ro: '', display_order: 5, is_active: true, created_at: new Date().toISOString() },
  { id: 'default-p6', image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Strudel.jpg', name_ro: 'Ștrudel', description_ro: 'Ștrudel vienez cu mere și scorțișoară, foi subțiri și crocante.', tag_ro: '', display_order: 6, is_active: true, created_at: new Date().toISOString() },
  { id: 'default-p7', image_url: 'https://www.petitchef.ro/imgupl/recipe/foietaj-cu-ciocolata--lg-457846p714421.webp', name_ro: 'Foietaj', description_ro: 'Produse din foietaj cu diverse umpluturi dulci sau sărate.', tag_ro: '', display_order: 7, is_active: true, created_at: new Date().toISOString() },
  { id: 'default-p8', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrGvZUTO1xAcahiBNgm-SUMOFgLLJ7b9Us4w&s', name_ro: 'Prăjituri', description_ro: 'Prăjituri de casă pentru ocazii speciale sau răsfăț zilnic.', tag_ro: 'Nou', display_order: 8, is_active: true, created_at: new Date().toISOString() },
];

// --- CAROUSEL IMAGES OPERATIONS ---

export const getCarouselImages = async (): Promise<CarouselImage[]> => {
  try {
    const { data, error } = await supabase
      .from('carousel_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return DEFAULT_CAROUSEL_IMAGES;
      }
      throw error;
    }

    return data && data.length > 0 ? data : DEFAULT_CAROUSEL_IMAGES;
  } catch (err: any) {
    return DEFAULT_CAROUSEL_IMAGES;
  }
};

export const uploadCarouselImage = async (file: File): Promise<string> => {
  // Validate file before upload
  validateFile(file, IMAGE_ALLOWED_EXTENSIONS, IMAGE_MAX_FILE_SIZE);

  const safeFileName = `carousel_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const { error } = await supabase.storage.from('images').upload(safeFileName, file);
  if (error) throw error;

  const { data } = supabase.storage.from('images').getPublicUrl(safeFileName);
  return data.publicUrl;
};

export const addCarouselImage = async (data: { image_url: string, name?: string, description?: string, price?: number, unit?: string }): Promise<void> => {
  // Get current max order
  const { data: existing } = await supabase
    .from('carousel_images')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? existing[0].display_order + 1 : 1;

  const { error } = await supabase.from('carousel_images').insert([{
    image_url: data.image_url,
    display_order: nextOrder,
    name: data.name,
    description: data.description,
    price: data.price || 0,
    unit: data.unit || 'buc'
  }]);
  if (error) throw error;
};

export const updateCarouselImage = async (id: string, data: Partial<CarouselImage>): Promise<void> => {
  if (id.startsWith('default-')) throw new Error("Cannot update default images");

  const { error } = await supabase.from('carousel_images').update({
    name: data.name,
    description: data.description,
    price: data.price,
    unit: data.unit
  }).eq('id', id);

  if (error) throw error;
};

export const deleteCarouselImage = async (id: string, imageUrl: string): Promise<void> => {
  if (id.startsWith('default-')) {
    throw new Error("Cannot delete default images. Add your own images first.");
  }

  // Delete from database
  const { error } = await supabase.from('carousel_images').delete().eq('id', id);
  if (error) throw error;

  // Try to delete from storage if it's a Supabase URL
  if (imageUrl.includes('supabase')) {
    try {
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        await supabase.storage.from('images').remove([fileName]);
      }
    } catch (e) {
      // Storage delete is optional
    }
  }
};

export const reorderCarouselImages = async (images: { id: string; display_order: number; image_url?: string; name?: string; description?: string; price?: number; unit?: string }[]): Promise<void> => {
  // Check if any items are defaults - if so, we need to migrate all to DB
  const hasDefaults = images.some(img => img.id.startsWith('default-'));

  if (hasDefaults) {
    // Rebuild payload directly from in-memory data to preserve custom uploads
    const allCarouselData = images
      .map((img, index) => ({
        image_url: img.image_url || DEFAULT_CAROUSEL_IMAGES.find(d => d.id === img.id)?.image_url || '',
        display_order: index + 1,
      }))
      .filter(item => item.image_url);

    // Delete all existing and insert fresh with new order
    await supabase.from('carousel_images').delete().not('id', 'is', null);

    if (allCarouselData.length > 0) {
      const { error } = await supabase.from('carousel_images').insert(allCarouselData);
      if (error) throw error;
    }
  } else {
    // All items are already in DB, just update order
    for (const img of images) {
      const { error } = await supabase.from('carousel_images').update({ display_order: img.display_order }).eq('id', img.id);
      if (error) throw error;
    }
  }
};

// --- PRODUCTS OPERATIONS ---

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return DEFAULT_PRODUCTS;
      }
      throw error;
    }

    return data && data.length > 0 ? data : DEFAULT_PRODUCTS;
  } catch (err: any) {
    return DEFAULT_PRODUCTS;
  }
};

export const uploadProductImage = async (file: File): Promise<string> => {
  // Validate file before upload
  validateFile(file, IMAGE_ALLOWED_EXTENSIONS, IMAGE_MAX_FILE_SIZE);

  const safeFileName = `product_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const { error } = await supabase.storage.from('images').upload(safeFileName, file);
  if (error) throw error;

  const { data } = supabase.storage.from('images').getPublicUrl(safeFileName);
  return data.publicUrl;
};

export const saveProduct = async (product: Partial<Product>): Promise<void> => {
  const payload = {
    image_url: product.image_url,
    name_ro: product.name_ro,
    description_ro: product.description_ro,
    tag_ro: product.tag_ro || null,
    is_active: product.is_active !== undefined ? product.is_active : true,
    price: product.price || 0,
    unit: product.unit || 'buc'
  };

  if (product.id?.startsWith('default-')) {
    // Converting default product to real one
    const { data: existing } = await supabase
      .from('products')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);

    const nextOrder = existing && existing.length > 0 ? existing[0].display_order + 1 : 1;

    const { error } = await supabase.from('products').insert([{
      ...payload,
      display_order: nextOrder
    }]);
    if (error) throw error;
  } else if (product.id) {
    // Update existing
    const { error } = await supabase.from('products').update(payload).eq('id', product.id);
    if (error) throw error;
  } else {
    // New product
    const { data: existing } = await supabase
      .from('products')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);

    const nextOrder = existing && existing.length > 0 ? existing[0].display_order + 1 : 1;

    const { error } = await supabase.from('products').insert([{
      ...payload,
      display_order: nextOrder
    }]);
    if (error) throw error;
  }
};

export const deleteProduct = async (id: string, imageUrl: string): Promise<void> => {
  if (id.startsWith('default-')) {
    throw new Error("Cannot delete default products. Add your own products first.");
  }

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;

  // Try to delete from storage if it's a Supabase URL
  if (imageUrl.includes('supabase')) {
    try {
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        await supabase.storage.from('images').remove([fileName]);
      }
    } catch (e) {
      // Storage delete is optional
    }
  }
};

export const toggleProductActive = async (id: string, currentStatus: boolean): Promise<void> => {
  if (id.startsWith('default-')) {
    throw new Error("Cannot toggle default products. Add your own products first.");
  }

  const { error } = await supabase.from('products').update({ is_active: !currentStatus }).eq('id', id);
  if (error) throw error;
};

export const reorderProducts = async (products: { id: string; display_order: number; image_url?: string; name_ro?: string; description_ro?: string; tag_ro?: string | null; is_active?: boolean; price?: number; unit?: string }[]): Promise<void> => {
  // Check if any items are defaults - if so, we need to migrate all to DB
  const hasDefaults = products.some(p => p.id.startsWith('default-'));

  if (hasDefaults) {
    // Preserve existing product data - prefer passed data, fallback to defaults
    const allProductData = products.map((p, index) => {
      const defaultProd = DEFAULT_PRODUCTS.find(d => d.id === p.id);
      return {
        image_url: p.image_url || defaultProd?.image_url || '',
        name_ro: p.name_ro || defaultProd?.name_ro || '',
        description_ro: p.description_ro || defaultProd?.description_ro || '',
        tag_ro: p.tag_ro || defaultProd?.tag_ro || null,
        display_order: index + 1,
        is_active: p.is_active ?? defaultProd?.is_active ?? true,
        price: p.price || 0,
        unit: p.unit || 'buc'
      };
    }).filter(item => item.image_url && item.name_ro);

    // Delete all existing and insert fresh with new order
    await supabase.from('products').delete().not('id', 'is', null);

    if (allProductData.length > 0) {
      const { error } = await supabase.from('products').insert(allProductData);
      if (error) throw error;
    }
  } else {
    // All items are already in DB, just update order
    for (const prod of products) {
      await supabase.from('products').update({ display_order: prod.display_order }).eq('id', prod.id);
    }
  }
};

// --- HERO IMAGES OPERATIONS ---

export const getHeroImages = async (): Promise<HeroImage[]> => {
  try {
    const { data, error } = await supabase
      .from('hero_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return DEFAULT_HERO_IMAGES;
      }
      throw error;
    }

    return data && data.length > 0 ? data : DEFAULT_HERO_IMAGES;
  } catch (err: any) {
    return DEFAULT_HERO_IMAGES;
  }
};

export const uploadHeroImage = async (file: File): Promise<string> => {
  validateFile(file, IMAGE_ALLOWED_EXTENSIONS, IMAGE_MAX_FILE_SIZE);

  const safeFileName = `hero_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const { error } = await supabase.storage.from('images').upload(safeFileName, file);
  if (error) throw error;

  const { data } = supabase.storage.from('images').getPublicUrl(safeFileName);
  return data.publicUrl;
};

export const addHeroImage = async (imageUrl: string): Promise<void> => {
  const { data: existing } = await supabase
    .from('hero_images')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? existing[0].display_order + 1 : 1;

  const { error } = await supabase.from('hero_images').insert([{
    image_url: imageUrl,
    display_order: nextOrder
  }]);
  if (error) throw error;
};

export const deleteHeroImage = async (id: string, imageUrl: string): Promise<void> => {
  if (id.startsWith('default-')) {
    throw new Error("Cannot delete default images. Add your own images first.");
  }

  const { error } = await supabase.from('hero_images').delete().eq('id', id);
  if (error) throw error;

  if (imageUrl.includes('supabase')) {
    try {
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        await supabase.storage.from('images').remove([fileName]);
      }
    } catch (e) {
      // Storage delete is optional
    }
  }
};

export const reorderHeroImages = async (images: { id: string; display_order: number; image_url?: string }[]): Promise<void> => {
  const hasDefaults = images.some(img => img.id.startsWith('default-'));

  if (hasDefaults) {
    const allHeroData = images
      .map((img, index) => ({
        image_url: img.image_url || DEFAULT_HERO_IMAGES.find(d => d.id === img.id)?.image_url || '',
        display_order: index + 1,
      }))
      .filter(item => item.image_url);

    await supabase.from('hero_images').delete().not('id', 'is', null);

    if (allHeroData.length > 0) {
      const { error } = await supabase.from('hero_images').insert(allHeroData);
      if (error) throw error;
    }
  } else {
    for (const img of images) {
      const { error } = await supabase.from('hero_images').update({ display_order: img.display_order }).eq('id', img.id);
      if (error) throw error;
    }
  }
};
// ... existing code ...

export interface OrderItem {
  id: string;
  name: string;
  image_url: string;
  quantity: number;
  type: 'product' | 'custom';
  price?: number;
  display_order?: number;
}

export interface OrderRequest {
  id?: string;
  friendly_id?: string;
  customer_name: string;
  phone_number: string;
  items: OrderItem[];
  needed_by: string;
  delivery_type: 'pickup' | 'delivery';
  pickup_location?: 'dragasani' | 'babeni' | string;
  delivery_address?: string;
  details?: string;
  status: 'pending' | 'contacted' | 'completed';
  created_at?: string;
}

const ROMANIAN_WORDS = [
  'Mamaliga', 'Sarmale', 'Papanasi', 'Dracula', 'Balaur', 'Viteaz', 'Haiduc', 'Miorita',
  'Carpati', 'Dunarea', 'Lupul', 'Ursul', 'Vulpea', 'Rasul', 'Zimbrul', 'Bradul',
  'Stejarul', 'Fagul', 'Teiul', 'Salcamul', 'Trandafir', 'Bujor', 'Crinul', 'Lalea',
  'Soare', 'Luna', 'Stea', 'Norul', 'Ploaia', 'Zapada', 'Munte', 'Mare', 'Delta',
  'Codru', 'Izvor', 'Piatra', 'Stanca', 'Aurul', 'Argint', 'Cupru', 'Fier', 'Otel'
];

const generateRomanianId = (): string => {
  const word = ROMANIAN_WORDS[Math.floor(Math.random() * ROMANIAN_WORDS.length)];
  const number = Math.floor(Math.random() * 1000) + 1;
  return `${word}-${number}`;
};

export const submitOrder = async (order: OrderRequest): Promise<OrderRequest> => {
  try {
    const { data, error } = await supabase
      .from('order_requests')
      .insert([{
        friendly_id: generateRomanianId(),
        customer_name: order.customer_name,
        phone_number: order.phone_number,
        items: order.items,
        needed_by: order.needed_by,
        delivery_type: order.delivery_type,
        delivery_address: order.delivery_address,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

export const getOrders = async (): Promise<OrderRequest[]> => {
  try {
    const { data, error } = await supabase
      .from('order_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === '42P01') return []; // Table doesn't exist yet
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const deleteOrder = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('order_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (id: string, status: 'pending' | 'contacted' | 'completed'): Promise<void> => {
  try {
    const { error } = await supabase
      .from('order_requests')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// --- PAGE CONTENT OPERATIONS (Page Editor Feature) ---

export type Language = 'ro' | 'en' | 'it' | 'fr' | 'es' | 'zh' | 'ru';

export interface PageContent {
  id: string;
  section_key: string;
  content_ro: string;
  content_en?: string;
  content_it?: string;
  content_fr?: string;
  content_es?: string;
  content_zh?: string;
  content_ru?: string;
  needs_translation: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get all page content entries
 */
export const getAllPageContent = async (): Promise<PageContent[]> => {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('section_key', { ascending: true });

    if (error) {
      if (error.code === '42P01') return []; // Table doesn't exist yet
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
};

/**
 * Get a single page content entry by section key
 */
export const getPageContent = async (sectionKey: string): Promise<PageContent | null> => {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('section_key', sectionKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  } catch (error) {
    return null;
  }
};

/**
 * Get content for a specific section and language
 */
export const getPageContentText = async (sectionKey: string, lang: Language = 'ro'): Promise<string | null> => {
  const content = await getPageContent(sectionKey);
  if (!content) return null;

  const langKey = `content_${lang}` as keyof PageContent;
  return (content[langKey] as string) || content.content_ro || null;
};

/**
 * Save page content (Romanian only, marks as needing translation)
 */
export const savePageContent = async (sectionKey: string, contentRo: string): Promise<void> => {
  try {
    const existing = await getPageContent(sectionKey);

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('page_content')
        .update({
          content_ro: contentRo,
          needs_translation: true
        })
        .eq('section_key', sectionKey);

      if (error) throw error;
    } else {
      // Insert new
      const { error } = await supabase
        .from('page_content')
        .insert([{
          section_key: sectionKey,
          content_ro: contentRo,
          needs_translation: true
        }]);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error saving page content:', error);
    throw error;
  }
};

/**
 * Bulk save multiple page content entries
 */
export const bulkSavePageContent = async (entries: { sectionKey: string; contentRo: string }[]): Promise<void> => {
  for (const entry of entries) {
    await savePageContent(entry.sectionKey, entry.contentRo);
  }
};

/**
 * Check if any content needs translation
 */
export const hasContentPendingTranslation = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('id')
      .eq('needs_translation', true)
      .limit(1);

    if (error) return false;
    return (data?.length ?? 0) > 0;
  } catch {
    return false;
  }
};

/**
 * Get all content that needs translation
 */
export const getContentNeedingTranslation = async (): Promise<PageContent[]> => {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('needs_translation', true);

    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
};

/**
 * Update translations for a page content entry
 */
export const updatePageContentTranslations = async (
  sectionKey: string,
  translations: Partial<Record<Language, string>>
): Promise<void> => {
  try {
    const updateData: Record<string, any> = { needs_translation: false };

    for (const [lang, text] of Object.entries(translations)) {
      if (lang !== 'ro') {
        updateData[`content_${lang}`] = text;
      }
    }

    const { error } = await supabase
      .from('page_content')
      .update(updateData)
      .eq('section_key', sectionKey);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating translations:', error);
    throw error;
  }
};

/**
 * Delete a page content entry
 */
export const deletePageContent = async (sectionKey: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('page_content')
      .delete()
      .eq('section_key', sectionKey);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting page content:', error);
    throw error;
  }
};

// --- PAGE CONTENT HISTORY OPERATIONS ---

export interface ContentHistory {
  id: string;
  content_id: string;
  section_key: string;
  content_ro: string;
  content_en?: string;
  content_it?: string;
  content_fr?: string;
  content_es?: string;
  content_zh?: string;
  content_ru?: string;
  version_number: number;
  changed_at: string;
  change_description?: string;
}

/**
 * Get version history for a content entry
 */
export const getContentHistory = async (sectionKey: string): Promise<ContentHistory[]> => {
  try {
    const { data, error } = await supabase
      .from('page_content_history')
      .select('*')
      .eq('section_key', sectionKey)
      .order('version_number', { ascending: false });

    if (error) {
      if (error.code === '42P01') return []; // Table doesn't exist
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching content history:', error);
    return [];
  }
};

/**
 * Get all history entries
 */
export const getAllContentHistory = async (): Promise<ContentHistory[]> => {
  try {
    const { data, error } = await supabase
      .from('page_content_history')
      .select('*')
      .order('changed_at', { ascending: false })
      .limit(50);

    if (error) {
      if (error.code === '42P01') return []; // Table doesn't exist
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching all history:', error);
    return [];
  }
};

/**
 * Revert content to a specific version
 */
export const revertToVersion = async (historyId: string): Promise<void> => {
  try {
    // Get the history entry
    const { data: historyEntry, error: fetchError } = await supabase
      .from('page_content_history')
      .select('*')
      .eq('id', historyId)
      .single();

    if (fetchError) throw fetchError;
    if (!historyEntry) throw new Error('History entry not found');

    // Update the main content with the historical values
    const { error: updateError } = await supabase
      .from('page_content')
      .update({
        content_ro: historyEntry.content_ro,
        content_en: historyEntry.content_en,
        content_it: historyEntry.content_it,
        content_fr: historyEntry.content_fr,
        content_es: historyEntry.content_es,
        content_zh: historyEntry.content_zh,
        content_ru: historyEntry.content_ru,
        needs_translation: false
      })
      .eq('section_key', historyEntry.section_key);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error reverting to version:', error);
    throw error;
  }
};

/**
 * Reset all content to defaults by deleting all page_content entries
 * This makes the site revert to the fallback dictionary translations
 */
export const resetAllContent = async (): Promise<void> => {
  try {
    const { error } = await supabase
      .from('page_content')
      .delete()
      .neq('section_key', ''); // Delete all rows

    if (error) throw error;
  } catch (error) {
    console.error('Error resetting all content:', error);
    throw error;
  }
};
