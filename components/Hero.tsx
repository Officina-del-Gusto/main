import React, { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  "https://i.ibb.co/jkGvV4ys/transparent-Photoroom.jpg",
  "https://i.ibb.co/BvT77MJ/Whats-App-Image-2025-11-29-at-01-44-53-95d8e75c.jpg",
  "https://i.ibb.co/GQ2vMbMM/Whats-App-Image-2025-11-29-at-01-46-19-c44ae1ab.jpg",
  "https://i.ibb.co/36XPpSf/Whats-App-Image-2025-11-29-at-01-46-19-4cb8cb4a.jpg"
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden group">
      
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        {heroImages.map((img, index) => (
          <div 
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Officina del Gusto Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* LIGHTER Overlay - significantly reduced opacity so images are bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-bakery-900/90"></div>
      </div>

      {/* Discrete Navigation Arrows (Visible on Hover) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/50 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/50 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>
      
      {/* Slide Indicators - Moved higher to avoid overlapping buttons */}
      <div className="absolute bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
              index === currentImageIndex ? 'bg-bakery-400 w-8' : 'bg-white/50 hover:bg-white/80 w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-10 md:pt-10">
        <div className="mb-8 inline-block mt-28 sm:mt-20 md:mt-0">
          <div className="py-2 px-6 border border-white/30 rounded-full text-bakery-50 text-sm md:text-base font-medium tracking-widest uppercase bg-black/40 backdrop-blur-md flex items-center gap-2 shadow-lg">
            <MapPin size={16} className="text-bakery-400" />
            <a 
              href="https://maps.app.goo.gl/3tqYZfiPDNWVssdT6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-bakery-300 transition-colors underline decoration-transparent hover:decoration-bakery-300"
            >
              Drăgășani
            </a>
            <span className="text-bakery-400 mx-1">•</span>
            <a 
              href="https://maps.app.goo.gl/EvRhmPqz1rA1H1b28" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-bakery-300 transition-colors underline decoration-transparent hover:decoration-bakery-300"
            >
              Băbeni
            </a>
          </div>
        </div>
        
        {/* Text shadows increased to compensate for lighter background */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Officina del Gusto
        </h1>
        
        <p className="font-cursive text-3xl md:text-5xl text-bakery-300 mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_0_0_30px_rgb(0_0_0_/_80%),_0_2px_4px_rgb(0_0_0_/_100%)]">
          Magia gustului autentic
        </p>

        <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-[0_4px_6px_rgba(0,0,0,1)] bg-black/20 backdrop-blur-sm rounded-xl p-3">
          Te trezești cu mirosul covrigilor calzi? Noi suntem deja aici de la ora 6:00, 
          pregătind cele mai bune merdenele, pizza și plăcinte pentru tine.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button 
            onClick={scrollToProducts}
            className="px-10 py-4 bg-bakery-500 hover:bg-bakery-600 text-white rounded-full font-serif font-bold text-lg transition-all transform hover:scale-105 shadow-[0_4px_14px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 border-2 border-transparent"
          >
            Vezi Bunătățile
          </button>
          <a 
            href="#contact" 
            className="px-10 py-4 bg-black/40 hover:bg-black/60 text-white border-2 border-bakery-200/50 rounded-full font-serif font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-lg"
          >
            <MapPin size={20} />
            Locațiile Noastre
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;