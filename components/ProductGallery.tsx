import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const productMedia = [
  "https://www.jidlonacestach.cz/wp-content/uploads/2022/08/IMG_20220823_151420-scaled.jpg",
  "https://simonatrusca.com/wp-content/uploads/2023/10/img_1197-1.jpg",
  "https://savoriurbane.com/wp-content/uploads/2017/07/Pizza-cu-blat-pufos-cu-de-toate-pizza-romaneasca-8.jpg",
  "https://thumbor.unica.ro/unsafe/1200x800/smart/filters:format(webp):contrast(8):quality(75)/https://retete.unica.ro/wp-content/uploads/2017/10/placinta-cu-mere1-e1507731037783.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7mL15x6h8aTBLC4hXOnNgAys65Eq6uiDcw&s",
  "https://upload.wikimedia.org/wikipedia/commons/4/40/Strudel.jpg",
  "https://www.petitchef.ro/imgupl/recipe/foietaj-cu-ciocolata--lg-457846p714421.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrGvZUTO1xAcahiBNgm-SUMOFgLLJ7b9Us4w&s"
];

const ProductGallery: React.FC = () => {
  const { dictionary } = useLanguage();
  const translatedProducts = dictionary.productGallery.products.map((product, index) => ({
    id: index + 1,
    image: productMedia[index] ?? '',
    ...product,
  }));

  return (
    <section id="products" className="py-24 bg-bakery-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-cursive text-3xl text-bakery-500 block mb-2">{dictionary.productGallery.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bakery-900 mb-6">{dictionary.productGallery.title}</h2>
          <p className="text-bakery-700 max-w-2xl mx-auto text-lg">
            {dictionary.productGallery.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {translatedProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                {product.tag && (
                  <div className="absolute top-4 right-4 bg-bakery-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="p-6 relative">
                {/* Decorative element */}
                <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-bakery-500 group-hover:text-white transition-colors duration-300">
                  <span className="font-serif font-bold text-xl">OdG</span>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-3 group-hover:text-bakery-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-bakery-600 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="w-full h-px bg-bakery-100 group-hover:bg-bakery-200 transition-colors"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;