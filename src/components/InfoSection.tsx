import React from 'react';
import { Clock, Wheat, Heart, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEditableContent } from '../contexts/useEditableContent';

const InfoSection: React.FC = () => {
  const { dictionary } = useLanguage();

  // Get editable content from DB (falls back to dictionary if not in DB)
  const heading = useEditableContent('infoSection.heading', dictionary.infoSection.heading);
  const description = useEditableContent('infoSection.description', dictionary.infoSection.description);

  // Schedule card
  const scheduleTitle = useEditableContent('infoSection.cards.schedule.title', dictionary.infoSection.cards.schedule.title);
  const scheduleDesc = useEditableContent('infoSection.cards.schedule.description', dictionary.infoSection.cards.schedule.description);

  // Quality card
  const qualityTitle = useEditableContent('infoSection.cards.quality.title', dictionary.infoSection.cards.quality.title);
  const qualityDesc = useEditableContent('infoSection.cards.quality.description', dictionary.infoSection.cards.quality.description);

  // Passion card
  const passionTitle = useEditableContent('infoSection.cards.passion.title', dictionary.infoSection.cards.passion.title);
  const passionDesc = useEditableContent('infoSection.cards.passion.description', dictionary.infoSection.cards.passion.description);

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-bakery-900/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-bakery-900 mb-4">{heading.value}</h2>
          <div className="w-20 h-1 bg-bakery-400 mx-auto rounded-full mb-6"></div>
          <p className="text-bakery-700 max-w-3xl mx-auto text-lg leading-relaxed">
            {description.value}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Schedule Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-bakery-900/5 border border-bakery-100 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-bakery-100 text-bakery-600 rounded-2xl flex items-center justify-center mb-6">
              <Clock size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-4">{scheduleTitle.value}</h3>
            <p className="text-bakery-600 mb-4">{scheduleDesc.value}</p>
            <div className="bg-bakery-50 rounded-xl p-4 border border-bakery-100">
              <div className="flex justify-between items-center mb-2 border-b border-bakery-200 pb-2">
                <span className="font-bold text-bakery-800">{dictionary.infoSection.cards.schedule.weekdaysLabel}</span>
                <span className="font-bold text-bakery-600">{dictionary.infoSection.cards.schedule.weekdaysValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-bakery-500">{dictionary.infoSection.cards.schedule.sundayLabel}</span>
                <span className="text-bakery-400 italic">{dictionary.infoSection.cards.schedule.sundayValue}</span>
              </div>
            </div>
          </div>

          {/* Quality Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-bakery-900/5 border border-bakery-100 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-bakery-100 text-bakery-600 rounded-2xl flex items-center justify-center mb-6">
              <Wheat size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-4">{qualityTitle.value}</h3>
            <p className="text-bakery-600">
              {qualityDesc.value}
            </p>
            <ul className="mt-4 space-y-2 text-bakery-700">
              {dictionary.infoSection.cards.quality.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-bakery-400"></div> {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Passion Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-bakery-900/5 border border-bakery-100 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-bakery-100 text-bakery-600 rounded-2xl flex items-center justify-center mb-6">
              <Heart size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-4">{passionTitle.value}</h3>
            <p className="text-bakery-600">
              {passionDesc.value}
            </p>
            <div className="mt-6 pt-6 border-t border-bakery-100 flex items-center gap-3">
              <Coffee className="text-bakery-400" />
              <span className="text-bakery-700 font-cursive text-xl">{dictionary.infoSection.cards.passion.motto}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;