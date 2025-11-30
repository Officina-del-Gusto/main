import React from 'react';
import { Clock, Wheat, Heart, Coffee } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-bakery-900/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-bakery-900 mb-4">Tradiție și Pasiune</h2>
          <div className="w-20 h-1 bg-bakery-400 mx-auto rounded-full mb-6"></div>
          <p className="text-bakery-700 max-w-3xl mx-auto text-lg leading-relaxed">
            La <strong>Officina del Gusto</strong>, credem că ziua bună se cunoaște de dimineață, 
            mai exact de la prima oră când scoatem covrigii calzi din cuptor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Schedule Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-bakery-900/5 border border-bakery-100 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-bakery-100 text-bakery-600 rounded-2xl flex items-center justify-center mb-6">
              <Clock size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-4">Program Extins</h3>
            <p className="text-bakery-600 mb-4">Suntem aici pentru micul tău dejun, prânz sau gustare de seară.</p>
            <div className="bg-bakery-50 rounded-xl p-4 border border-bakery-100">
              <div className="flex justify-between items-center mb-2 border-b border-bakery-200 pb-2">
                <span className="font-bold text-bakery-800">Luni - Sâmbătă</span>
                <span className="font-bold text-bakery-600">06:00 - 20:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-bakery-500">Duminică</span>
                <span className="text-bakery-400 italic">Închis</span>
              </div>
            </div>
          </div>

          {/* Quality Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-bakery-900/5 border border-bakery-100 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-bakery-100 text-bakery-600 rounded-2xl flex items-center justify-center mb-6">
              <Wheat size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-4">Ingrediente Alese</h3>
            <p className="text-bakery-600">
              Nu facem compromisuri la calitate. Făina, brânza și ingredientele pentru pizza sunt atent selecționate pentru a oferi gustul autentic de casă.
            </p>
            <ul className="mt-4 space-y-2 text-bakery-700">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-bakery-400"></div> Aluat frământat zilnic</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-bakery-400"></div> Produse mereu proaspete</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-bakery-400"></div> Rețete tradiționale</li>
            </ul>
          </div>

          {/* Passion Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-bakery-900/5 border border-bakery-100 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-bakery-100 text-bakery-600 rounded-2xl flex items-center justify-center mb-6">
              <Heart size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-4">Din Dragoste</h3>
            <p className="text-bakery-600">
              Suntem o afacere de familie cu locații în <strong>Drăgășani</strong> și <strong>Băbeni</strong>. Ne place să vedem zâmbetele clienților noștri când gustă din produsele noastre.
            </p>
            <div className="mt-6 pt-6 border-t border-bakery-100 flex items-center gap-3">
               <Coffee className="text-bakery-400" />
               <span className="text-bakery-700 font-cursive text-xl">Gustul care te aduce înapoi</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;