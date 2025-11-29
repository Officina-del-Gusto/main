
import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, X, Upload, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Job, getJobs, submitApplication, uploadCV } from '../utils/mockData';
import emailjs from '@emailjs/browser';

// EmailJS Credentials
const EMAILJS_SERVICE_ID = "service_7kfjg5q"; 
const EMAILJS_TEMPLATE_ID = "template_hdk6gfp"; 
const EMAILJS_PUBLIC_KEY = "tpzvd85CgW2Vc_aeG"; 

const JobsSection: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Loading States
  const [isLoading, setIsLoading] = useState(false); // For form submission
  const [isFetching, setIsFetching] = useState(true); // For initial data fetch
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Filter State
  const [locationFilter, setLocationFilter] = useState<'all' | 'Drăgășani' | 'Băbeni'>('all');

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredLocation: 'Drăgășani'
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      setIsFetching(true);
      try {
        const allJobs = await getJobs();
        setJobs(allJobs.filter(j => j.active));
      } catch (error) {
        console.warn("Failed to load jobs", error);
      } finally {
        setIsFetching(false);
      }
    };
    loadJobs();
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setShowSuccess(false);
    setSubmitError(null);
    
    // Strict Location Locking Logic
    const isDragasani = job.location === 'Drăgășani';
    const isBabeni = job.location === 'Băbeni';
    const isSingleLocation = isDragasani || isBabeni;
    
    setFormData(prev => ({
      ...prev, 
      // If single location, force it. Otherwise default to Drăgășani.
      preferredLocation: isSingleLocation ? job.location : 'Drăgășani'
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setFormData({ name: '', phone: '', email: '', message: '', preferredLocation: 'Drăgășani' });
    setCvFile(null);
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      let downloadUrl = '';
      
      if (cvFile) {
        downloadUrl = await uploadCV(cvFile);
      }

      // Prepend location preference to message for DB storage
      const fullMessage = `[Locație Dorită: ${formData.preferredLocation}]\n\n${formData.message}`;

      const newApplication = {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        applicantName: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: fullMessage,
        cvFileName: cvFile ? cvFile.name : undefined,
        cvUrl: downloadUrl,
        status: 'new' as const,
        dateApplied: new Date().toISOString()
      };

      await submitApplication(newApplication);

      // EmailJS Params
      const templateParams = {
        to_name: "Officina del Gusto",
        applicant_name: formData.name,
        job_title: selectedJob.title,
        applicant_phone: formData.phone,
        applicant_email: formData.email,
        message: formData.message,
        preferred_location: formData.preferredLocation,
        cv_link: downloadUrl || "Fără CV"
      };

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      setShowSuccess(true);
      
      setTimeout(() => {
        handleCloseModal();
        setIsLoading(false);
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Submission failed", error);
      setSubmitError("A apărut o eroare la trimitere. Te rugăm să încerci din nou.");
      setIsLoading(false);
    }
  };

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    if (locationFilter === 'all') return true;
    // Check if job matches filter OR if job is set for "Both Locations" (contains &)
    return job.location === locationFilter || job.location.includes('&');
  });

  // Helper to determine if location select should be locked
  const isLocked = selectedJob ? (selectedJob.location === 'Drăgășani' || selectedJob.location === 'Băbeni') : false;

  return (
    <section id="jobs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-cursive text-3xl text-bakery-500 block mb-2">Alătură-te echipei</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bakery-900 mb-6">Cariere la Officina</h2>
          <p className="text-bakery-700 max-w-2xl mx-auto text-lg mb-8">
            Căutăm oameni pasionați, harnici și cu zâmbetul pe buze. Dacă vrei să lucrezi într-un mediu cald (la propriu și la figurat), te așteptăm!
          </p>

          {/* Location Tabs */}
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={() => setLocationFilter('all')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                locationFilter === 'all' 
                  ? 'bg-bakery-500 text-white shadow-md' 
                  : 'bg-stone-100 text-bakery-800 hover:bg-stone-200'
              }`}
            >
              Toate
            </button>
            <button
              onClick={() => setLocationFilter('Drăgășani')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                locationFilter === 'Drăgășani' 
                  ? 'bg-bakery-500 text-white shadow-md' 
                  : 'bg-stone-100 text-bakery-800 hover:bg-stone-200'
              }`}
            >
              Drăgășani
            </button>
            <button
              onClick={() => setLocationFilter('Băbeni')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                locationFilter === 'Băbeni' 
                  ? 'bg-bakery-500 text-white shadow-md' 
                  : 'bg-stone-100 text-bakery-800 hover:bg-stone-200'
              }`}
            >
              Băbeni
            </button>
          </div>
        </div>

        {isFetching ? (
          <div className="text-center p-10 bg-bakery-50 rounded-2xl border border-bakery-100 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-bakery-500 mb-2" size={32} />
            <p className="text-bakery-700 text-xl font-medium">Se încarcă lista...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center p-10 bg-bakery-50 rounded-2xl border border-bakery-100">
            <p className="text-bakery-700 text-xl font-medium">Nu sunt joburi active momentan.</p>
            <p className="text-bakery-500 mt-2">Revino curând pentru noi oportunități!</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center p-10 bg-bakery-50 rounded-2xl border border-bakery-100">
            <p className="text-bakery-700 text-lg font-medium">
              Nu sunt joburi active momentan în {locationFilter}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-bakery-50 rounded-2xl p-8 border border-bakery-100 hover:shadow-lg transition-all duration-300 animate-fade-in flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-bakery-800">{job.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-bakery-600 font-medium">
                      <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-full text-bakery-500 shadow-sm">
                    <Briefcase size={24} />
                  </div>
                </div>
                <p className="text-bakery-700 mb-6 leading-relaxed flex-grow">
                  {job.description}
                </p>
                <button 
                  onClick={() => handleApplyClick(job)}
                  className="w-full py-3 bg-bakery-500 hover:bg-bakery-600 text-white font-bold rounded-xl transition-colors shadow-md mt-auto"
                >
                  Aplică Acum
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in">
            
            <button 
              onClick={handleCloseModal}
              disabled={isLoading}
              className="absolute top-4 right-4 p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors text-stone-500 disabled:opacity-50"
            >
              <X size={24} />
            </button>

            {showSuccess ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-bakery-900 mb-2">Mulțumim!</h3>
                <p className="text-bakery-700">Am primit aplicația ta. Te vom contacta în curând dacă profilul tău se potrivește.</p>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-bakery-900 mb-1">Aplică pentru postul:</h3>
                <p className="text-bakery-500 font-medium text-lg mb-6">{selectedJob?.title}</p>
                
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm font-bold">
                    <AlertTriangle size={18} />
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">Nume și Prenume *</label>
                    <input 
                      type="text" 
                      required
                      disabled={isLoading}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder="Ex: Popescu Maria"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">Număr de Telefon *</label>
                    <input 
                      type="tel" 
                      required
                      disabled={isLoading}
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder="Ex: 07xx xxx xxx"
                    />
                  </div>

                  {/* Location Dropdown */}
                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">
                      Locație Dorită {isLocked && <span className="text-bakery-500 font-normal">(Stabilită de job)</span>} *
                    </label>
                    <select 
                      required
                      disabled={isLoading || isLocked}
                      value={formData.preferredLocation}
                      onChange={e => setFormData({...formData, preferredLocation: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all text-black font-medium ${
                        (isLoading || isLocked)
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                          : 'bg-white'
                      }`}
                    >
                      {!isLocked ? (
                        <>
                          <option value="Drăgășani">Drăgășani</option>
                          <option value="Băbeni">Băbeni</option>
                          <option value="Oricare">Oricare</option>
                        </>
                      ) : (
                        <option value={selectedJob?.location}>{selectedJob?.location}</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">Email (Opțional)</label>
                    <input 
                      type="email" 
                      disabled={isLoading}
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder="Ex: maria@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">Mesaj (Opțional)</label>
                    <textarea 
                      rows={3}
                      disabled={isLoading}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder="Spune-ne câteva cuvinte despre tine..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">Încarcă CV (Opțional)</label>
                    <div className={`relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-bakery-50'}`}>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        disabled={isLoading}
                        onChange={e => setCvFile(e.target.files ? e.target.files[0] : null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex flex-col items-center pointer-events-none">
                        <Upload className="text-bakery-400 mb-2" size={24} />
                        {cvFile ? (
                          <span className="text-bakery-800 font-bold">{cvFile.name}</span>
                        ) : (
                          <span className="text-gray-500 text-sm">Apasă pentru a încărca (PDF, Imagine)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-bakery-500 hover:bg-bakery-600 disabled:bg-stone-400 text-white font-bold text-lg rounded-xl shadow-lg mt-4 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" /> Se trimite...
                      </>
                    ) : "Trimite Aplicația"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default JobsSection;
