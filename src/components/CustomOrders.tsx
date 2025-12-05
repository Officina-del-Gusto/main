import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Phone, Mail, Sparkles, PartyPopper, Gift, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getCarouselImages, DEFAULT_CAROUSEL_IMAGES, CarouselImage } from '../utils/mockData';
import { supabase } from '../supabaseClient';

const logWarning = (...args: unknown[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

const featureIcons = [PartyPopper, Gift, Calendar, Sparkles];

interface CustomOrdersProps {
  onOpenOrderModal?: () => void;
}

const CustomOrders: React.FC<CustomOrdersProps> = ({ onOpenOrderModal }) => {
  const { dictionary } = useLanguage();
  const content = dictionary.customOrders;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [orderImages, setOrderImages] = useState<CarouselImage[]>(DEFAULT_CAROUSEL_IMAGES);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  // Fetch carousel images from database with Realtime Subscription
  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await getCarouselImages();
        if (images && images.length > 0) {
          setOrderImages(prev => {
            // Simple check if IDs match to avoid unnecessary re-renders
            const prevIds = prev.map(img => img.id).join(',');
            const newIds = images.map(img => img.id).join(',');
            if (prevIds === newIds) return prev;
            return images;
          });
        }
      } catch (error) {
        logWarning('Failed to load carousel images, using defaults', error);
      }
    };

    // Load immediately
    loadImages();

    // Subscribe to Realtime changes
    const channel = supabase
      .channel('carousel-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'carousel_images'
        },
        () => {
          loadImages();
        }
      )
      .subscribe();

    // Polling fallback (every 5 seconds) to ensure consistency
    const intervalId = setInterval(loadImages, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(intervalId);
    };
  }, []);




  const openLightbox = (index: number) => {
    // Get actual image index from duplicated array
    const actualIndex = index % orderImages.length;
    setCurrentImageIndex(actualIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? orderImages.length - 1 : prev - 1));
  }, [orderImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === orderImages.length - 1 ? 0 : prev + 1));
  }, [orderImages.length]);

  // Continuous smooth scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || orderImages.length === 0) return;

    let isMounted = true;

    const cardWidth = 288; // w-72 = 18rem = 288px
    const gap = 24; // gap-6 = 1.5rem = 24px
    const totalWidth = (cardWidth + gap) * orderImages.length;

    const animate = () => {
      if (!isMounted) return;
      if (!isPaused && !lightboxOpen) {
        scrollPositionRef.current += 0.5; // Speed: lower = slower

        // Reset position when we've scrolled one full set
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
        }

        if (scrollContainer) {
          scrollContainer.style.transform = `translateX(-${scrollPositionRef.current}px)`;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, lightboxOpen, orderImages.length]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  // Create duplicated array for seamless loop
  const duplicatedImages = [...orderImages, ...orderImages, ...orderImages];

  return (
    <>
      <section id="custom-orders" className="py-16 bg-gradient-to-b from-amber-50/80 via-orange-50/50 to-bakery-50/30 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="font-cursive text-3xl text-bakery-500 block mb-2">{content.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bakery-900 mb-4">{content.title}</h2>
            <p className="text-bakery-700 max-w-2xl mx-auto text-lg leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Infinite Smooth Scrolling Carousel */}
          <div
            className="relative mb-12 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-amber-50/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-amber-50/80 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling Track */}
            <div
              ref={scrollRef}
              className="flex gap-6 py-4"
              style={{ width: 'max-content' }}
            >
              {duplicatedImages.map((image, index) => (
                <button
                  key={`${image.id}-${index}`}
                  onClick={() => openLightbox(index)}
                  className="relative flex-shrink-0 w-72 h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer focus:outline-none group hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={image.image_url}
                    alt={`Comandă personalizată - ${image.name || 'Produs'} - exemplu ${(index % orderImages.length) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-900/60 via-bakery-900/10 to-transparent"></div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="bg-white/95 text-bakery-800 px-4 py-2 rounded-full text-sm font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                      🔍 {dictionary.customOrders.viewImage || 'View'}
                    </span>
                  </div>

                  {/* Name Overlay at bottom */}
                  {image.name && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-bold text-lg drop-shadow-md truncate">{image.name}</p>
                      {image.price && <p className="text-white/90 text-sm font-medium drop-shadow-md">{image.price} RON</p>}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid - Features and CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {content.features.map((feature, index) => {
                const Icon = featureIcons[index] || Sparkles;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-shadow border border-bakery-100"
                  >
                    <div className="w-10 h-10 bg-bakery-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-bakery-600" />
                    </div>
                    <span className="text-bakery-800 font-medium text-sm leading-snug">{feature}</span>
                  </div>
                );
              })}
            </div>

            {/* Contact CTAs */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl border border-bakery-100 flex flex-col justify-center">
              <h3 className="font-serif text-xl font-bold text-bakery-800 mb-4 text-center">
                {content.eyebrow}
              </h3>
              <div className="flex flex-col gap-3">
                {onOpenOrderModal && (
                  <button
                    onClick={onOpenOrderModal}
                    className="w-full flex items-center justify-center gap-3 bg-bakery-500 hover:bg-bakery-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg hover:shadow-bakery-500/30 transition-all transform hover:-translate-y-1"
                  >
                    <PartyPopper size={20} />
                    {dictionary.navbar.mobileMenu.orderNow}
                  </button>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:+40${content.phoneNumber.replace(/\s/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-3 bg-white hover:bg-bakery-50 border-2 border-bakery-500 text-bakery-700 font-bold py-3 px-5 rounded-xl transition-all transform hover:-translate-y-1"
                  >
                    <Phone size={20} />
                    {content.phoneCta}
                  </a>
                  <a
                    href={`mailto:${content.emailAddress}`}
                    className="flex-1 inline-flex items-center justify-center gap-3 bg-white hover:bg-bakery-50 border-2 border-bakery-500 text-bakery-700 font-bold py-3 px-5 rounded-xl transition-all transform hover:-translate-y-1"
                  >
                    <Mail size={20} />
                    {content.emailCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${lightboxOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeLightbox}
      >
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${lightboxOpen ? 'opacity-100' : 'opacity-0'
          }`}></div>

        {/* Image Container */}
        <div
          className={`relative z-10 max-w-5xl max-h-[90vh] mx-4 transition-all duration-300 ${lightboxOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={orderImages[currentImageIndex]?.image_url}
            alt={`Comandă personalizată Officina del Gusto - ${orderImages[currentImageIndex]?.name || 'Produs'} ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
          />

          {/* Image Details */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl mt-4 max-w-2xl mx-auto shadow-lg text-center">
            <h3 className="text-2xl font-bold text-bakery-800 mb-1">{orderImages[currentImageIndex]?.name || 'Comandă Personalizată'}</h3>
            {orderImages[currentImageIndex]?.description && (
              <p className="text-stone-600 mb-2">{orderImages[currentImageIndex]?.description}</p>
            )}
            {orderImages[currentImageIndex]?.price && (
              <div className="inline-block bg-bakery-100 text-bakery-800 px-3 py-1 rounded-full font-bold text-sm">
                {orderImages[currentImageIndex]?.price} RON {orderImages[currentImageIndex]?.unit ? `/ ${orderImages[currentImageIndex]?.unit}` : ''}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image Counter */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {currentImageIndex + 1} / {orderImages.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomOrders;
