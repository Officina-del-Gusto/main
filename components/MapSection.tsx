import React, { useState } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Mail } from 'lucide-react';

type LocationKey = 'dragasani' | 'babeni';

const locations = {
  dragasani: {
    id: 'dragasani',
    title: 'Drăgășani',
    addressLine1: 'Strada Decebal, Bloc J',
    addressLine2: 'Drăgășani 245700, România',
    // Properly encoded URL for "Officina del Gusto Drăgășani"
    mapSrc: 'https://maps.google.com/maps?q=Officina+del+Gusto+Dr%C4%83g%C4%83%C8%99ani&t=&z=17&ie=UTF8&iwloc=&output=embed',
    mapLink: 'https://maps.app.goo.gl/3tqYZfiPDNWVssdT6'
  },
  babeni: {
    id: 'babeni',
    title: 'Băbeni',
    addressLine1: 'Strada Dragoș Vrânceanu 145',
    addressLine2: 'Băbeni 245100, România',
    // Google Maps shortened link for Officina del Gusto Băbeni
    mapSrc: 'https://maps.google.com/maps?q=Strada+Drago%C8%99+Vr%C3%A2nceanu+145,+B%C4%83beni+245100,+Romania&t=&z=17&ie=UTF8&iwloc=&output=embed',
    mapLink: 'https://maps.app.goo.gl/EvRhmPqz1rA1H1b28'
  }
};

const MapSection: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<LocationKey>('dragasani');
  const currentLocation = locations[activeLocation];

  return (
    <section id="contact" className="py-24 bg-neutral-900 text-stone-50 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/food.png")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-bakery-400">Te așteptăm pe la noi!</h2>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setActiveLocation('dragasani')}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeLocation === 'dragasani'
                  ? 'bg-bakery-500 text-white shadow-lg scale-105 ring-2 ring-bakery-400 ring-offset-2 ring-offset-neutral-900'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              Drăgășani
            </button>
            <button
              onClick={() => setActiveLocation('babeni')}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeLocation === 'babeni'
                  ? 'bg-bakery-500 text-white shadow-lg scale-105 ring-2 ring-bakery-400 ring-offset-2 ring-offset-neutral-900'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              Băbeni
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-10 animate-fade-in">
            <div>
              <div className="w-20 h-1 bg-bakery-500 rounded-full mb-6"></div>
              <p className="text-stone-300 text-lg leading-relaxed">
                Fie că ești în drum spre serviciu sau vrei să iei ceva bun pentru acasă, 
                oprește-te la noi în <strong>{currentLocation.title}</strong>. Mirosul de patiserie caldă te va ghida.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-5 group">
                <div className="mt-1 bg-stone-800 p-4 rounded-full group-hover:bg-bakery-600 transition-colors border border-stone-700">
                  <MapPin className="text-bakery-300" size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-white mb-1">Adresa {currentLocation.title}</h4>
                  <p className="text-stone-400">{currentLocation.addressLine1}</p>
                  <p className="text-stone-400">{currentLocation.addressLine2}</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="mt-1 bg-stone-800 p-4 rounded-full group-hover:bg-bakery-600 transition-colors border border-stone-700">
                  <Phone className="text-bakery-300" size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-white mb-1">Comenzi Telefonice</h4>
                  <a href="tel:+40754554194" className="text-stone-400 hover:text-bakery-300 transition-colors text-lg font-medium block mt-1">
                    0754 554 194
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="mt-1 bg-stone-800 p-4 rounded-full group-hover:bg-bakery-600 transition-colors border border-stone-700">
                  <Mail className="text-bakery-300" size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-white mb-1">Email</h4>
                  <a href="mailto:odgdragasani@gmail.com" className="text-stone-400 hover:text-bakery-300 transition-colors text-lg font-medium block mt-1">
                    odgdragasani@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <a 
                href={currentLocation.mapLink}
                target="_blank" 
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-bakery-500 hover:bg-bakery-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-bakery-500/30 transition-all transform hover:-translate-y-1"
              >
                <Navigation size={20} />
                Navighează
              </a>
              <a 
                href="https://www.facebook.com/ODGOfficinaDelGusto" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 px-6 rounded-xl transition-all"
              >
                <ExternalLink size={20} />
                Facebook
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-stone-800 relative group transition-all duration-500">
             {/* Map Overlay for interactivity suggestion */}
             <div className="absolute inset-0 bg-black/30 pointer-events-none group-hover:bg-transparent transition-colors z-10 flex items-center justify-center">
                <span className="bg-white/90 text-neutral-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Click pentru a interacționa
                </span>
             </div>
             
             <iframe 
              key={activeLocation} // Force re-render on location change
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              src={currentLocation.mapSrc}
              allowFullScreen
              title={`Locatie Officina del Gusto ${currentLocation.title}`}
              loading="lazy"
              className="grayscale-[20%] hover:grayscale-0 transition-all duration-500 w-full h-full"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;