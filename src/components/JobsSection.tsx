import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, MapPin, Clock, X, Upload, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Job, getJobs, submitApplication, uploadCV } from '../utils/mockData';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';
import { useEditableContent } from '../contexts/useEditableContent';
import { useScrollLock } from '../hooks/useScrollLock';

// EmailJS Credentials - MUST be set in environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const logWarning = (...args: unknown[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

// Simple text sanitizer to prevent XSS
const sanitizeText = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Rate limiting helper
const checkRateLimit = (): boolean => {
  const lastSubmission = localStorage.getItem('lastJobApplication');
  if (lastSubmission) {
    const timeSinceLastSubmit = Date.now() - parseInt(lastSubmission, 10);
    const RATE_LIMIT_MS = 60000; // 1 minute between submissions
    return timeSinceLastSubmit < RATE_LIMIT_MS;
  }
  return false;
};

const JobsSection: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { dictionary } = useLanguage();
  const jobsText = dictionary.jobs;

  // Get editable content from DB
  const eyebrow = useEditableContent('jobs.eyebrow', jobsText.eyebrow);
  const title = useEditableContent('jobs.title', jobsText.title);
  const description = useEditableContent('jobs.description', jobsText.description);

  useScrollLock(isModalOpen);

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
    preferredLocation: 'Drăgășani',
    cvLink: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const successTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      setIsFetching(true);
      try {
        const allJobs = await getJobs();
        setJobs(allJobs.filter(j => j.active));
      } catch (error) {
        logWarning('Failed to load jobs', error);
      } finally {
        setIsFetching(false);
      }
    };
    loadJobs();
  }, []);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
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
    setFormData({ name: '', phone: '', email: '', message: '', preferredLocation: 'Drăgășani', cvLink: '' });
    setCvFile(null);
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    // Rate limiting check
    if (checkRateLimit()) {
      setSubmitError(jobsText.rateLimit);
      return;
    }

    // Phone validation - Allow international numbers or Romanian format
    const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, ''); // Remove spaces, dashes, parentheses

    // Accept international format (+country code) OR Romanian format
    const internationalRegex = /^\+[1-9][0-9]{7,14}$/; // International format: + followed by country code and 8-15 digits
    const romanianRegex = /^(0040|0)(7[0-9]{8}|[23][0-9]{8})$/; // Romanian format

    if (!internationalRegex.test(cleanPhone) && !romanianRegex.test(cleanPhone)) {
      setSubmitError(jobsText.phoneInvalid);
      return;
    }

    // Additional check: prevent obvious fake numbers like 123456, 111111, etc.
    const digitsOnly = cleanPhone.replace(/^\+?[0-9]{1,3}/, ''); // Remove country code
    if (/^(0+|1+|2+|3+|4+|5+|6+|7+|8+|9+|123456|654321)$/.test(digitsOnly)) {
      setSubmitError(jobsText.phoneFake);
      return;
    }

    // Validate CV Link if present
    if (formData.cvLink) {
      if (!formData.cvLink.startsWith('https://')) {
        setSubmitError('Link-ul către CV trebuie să înceapă cu https://');
        return;
      }
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      let downloadUrl = '';

      if (cvFile) {
        downloadUrl = await uploadCV(cvFile);
      }

      // Prepend location preference to message for DB storage
      const fullMessage = `[${jobsText.locationPrefix}: ${formData.preferredLocation}]\n\n${formData.message}`;

      const newApplication = {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        applicantName: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: fullMessage,
        cvFileName: cvFile ? cvFile.name : undefined,
        cvUrl: downloadUrl,
        cvLink: formData.cvLink || undefined,
        status: 'new' as const,
        dateApplied: new Date().toISOString()
      };

      await submitApplication(newApplication);

      // Set rate limit timestamp
      localStorage.setItem('lastJobApplication', Date.now().toString());

      // EmailJS Params - Send notification to owner (sanitized)
      const templateParams: Record<string, string> = {
        job_title: sanitizeText(selectedJob.title),
        applicant_name: sanitizeText(formData.name),
        preferred_location: sanitizeText(formData.preferredLocation),
        applicant_phone: sanitizeText(formData.phone),
        applicant_email: formData.email ? sanitizeText(formData.email) : "Nu a fost furnizat",
        message: formData.message ? sanitizeText(formData.message) : "Fără mesaj",
        cv_link: downloadUrl || formData.cvLink || "Nu a fost încărcat CV"
      };

      // Add reply_to if applicant provided email
      if (formData.email) {
        templateParams.reply_to = sanitizeText(formData.email);
      }

      // Only send email if credentials are configured
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
          );
        } catch (_emailError) {
          // Don't block application submission if email fails
        }
      }

      setShowSuccess(true);
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = window.setTimeout(() => {
        handleCloseModal();
        setIsLoading(false);
        setShowSuccess(false);
        successTimeoutRef.current = null;
      }, 3000);

    } catch (_error) {
      setSubmitError(jobsText.submitError);
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
          <span className="font-cursive text-3xl text-bakery-500 block mb-2">{eyebrow.value}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bakery-900 mb-6">{title.value}</h2>
          <p className="text-bakery-700 max-w-2xl mx-auto text-lg mb-8">
            {description.value}
          </p>

          {/* Location Tabs */}
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={() => setLocationFilter('all')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${locationFilter === 'all'
                ? 'bg-bakery-500 text-white shadow-md'
                : 'bg-stone-100 text-bakery-800 hover:bg-stone-200'
                }`}
            >
              {jobsText.filters.all}
            </button>
            <button
              onClick={() => setLocationFilter('Drăgășani')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${locationFilter === 'Drăgășani'
                ? 'bg-bakery-500 text-white shadow-md'
                : 'bg-stone-100 text-bakery-800 hover:bg-stone-200'
                }`}
            >
              {jobsText.filters.dragasani}
            </button>
            <button
              onClick={() => setLocationFilter('Băbeni')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${locationFilter === 'Băbeni'
                ? 'bg-bakery-500 text-white shadow-md'
                : 'bg-stone-100 text-bakery-800 hover:bg-stone-200'
                }`}
            >
              {jobsText.filters.babeni}
            </button>
          </div>
        </div>

        {isFetching ? (
          <div className="text-center p-10 bg-bakery-50 rounded-2xl border border-bakery-100 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-bakery-500 mb-2" size={32} />
            <p className="text-bakery-700 text-xl font-medium">{jobsText.loading}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center p-10 bg-bakery-50 rounded-2xl border border-bakery-100">
            <p className="text-bakery-700 text-xl font-medium">{jobsText.none}</p>
            <p className="text-bakery-500 mt-2">{dictionary.jobs.description}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center p-10 bg-bakery-50 rounded-2xl border border-bakery-100">
            <p className="text-bakery-700 text-lg font-medium">
              {jobsText.noneFiltered} {locationFilter !== 'all' ? locationFilter : ''}
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
                  {jobsText.applyButton}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >

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
                <h3 className="text-2xl font-serif font-bold text-bakery-900 mb-2">{jobsText.successTitle}</h3>
                <p className="text-bakery-700">{jobsText.successMessage}</p>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-bakery-900 mb-1">{jobsText.modalTitle}</h3>
                <p className="text-bakery-500 font-medium text-lg mb-6">{selectedJob?.title}</p>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm font-bold">
                    <AlertTriangle size={18} />
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">{jobsText.form.name.label}</label>
                    <input
                      type="text"
                      required
                      disabled={isLoading}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder={jobsText.form.name.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">{jobsText.form.phone.label}</label>
                    <input
                      type="tel"
                      required
                      disabled={isLoading}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder={jobsText.form.phone.placeholder}
                    />
                    <p className="text-xs text-bakery-600 mt-1">{jobsText.form.phone.helper}</p>
                  </div>

                  {/* Location Dropdown */}
                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">
                      {jobsText.form.location.label} {isLocked && <span className="text-bakery-500 font-normal">{jobsText.lockedLocationNote}</span>}
                    </label>
                    <select
                      required
                      disabled={isLoading || isLocked}
                      value={formData.preferredLocation}
                      onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all text-black font-medium ${(isLoading || isLocked)
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                        }`}
                    >
                      {!isLocked ? (
                        <>
                          <option value="Drăgășani">{jobsText.form.location.options.dragasani}</option>
                          <option value="Băbeni">{jobsText.form.location.options.babeni}</option>
                          <option value="Oricare">{jobsText.form.location.options.either}</option>
                        </>
                      ) : (
                        <option value={selectedJob?.location}>{selectedJob?.location}</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">{jobsText.form.email.label}</label>
                    <input
                      type="email"
                      disabled={isLoading}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder={jobsText.form.email.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">{jobsText.form.message.label}</label>
                    <textarea
                      rows={3}
                      disabled={isLoading}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder={jobsText.form.message.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">{jobsText.form.cv.label}</label>
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
                          <span className="text-gray-500 text-sm">{jobsText.form.cv.placeholder}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-bakery-800 mb-1">Link către CV (Opțional)</label>
                    <input
                      type="url"
                      disabled={isLoading}
                      value={formData.cvLink}
                      onChange={e => setFormData({ ...formData, cvLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-bakery-400 focus:ring-2 focus:ring-bakery-200 outline-none transition-all disabled:opacity-70 bg-white text-black placeholder-gray-500 font-medium"
                      placeholder="https://linkedin.com/in/..."
                    />
                    <p className="text-xs text-bakery-600 mt-1">Dacă nu ai un fișier, poți lăsa un link către profilul tău (LinkedIn, eJobs, etc).</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-bakery-500 hover:bg-bakery-600 disabled:bg-stone-400 text-white font-bold text-lg rounded-xl shadow-lg mt-4 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" /> {jobsText.form.submit.loading}
                      </>
                    ) : jobsText.form.submit.idle}
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
