import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getProducts, DEFAULT_PRODUCTS, Product } from '../utils/mockData';
import { ShoppingBag } from 'lucide-react';

const logWarning = (...args: unknown[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

interface ProductGalleryProps {
  onOpenOrderModal?: () => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ onOpenOrderModal }) => {
  const { dictionary } = useLanguage();
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const dbProducts = await getProducts();
        if (dbProducts.length > 0) {
          setProducts(dbProducts);
        }
      } catch (error) {
        logWarning('Error loading products, fallback to defaults', error);
        // Keep default products on error
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);
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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bakery-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.filter(p => p.is_active).map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image_url}
                    alt={product.name_ro}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  {product.tag_ro && (
                    <div className="absolute top-4 right-4 bg-bakery-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
                      {product.tag_ro}
                    </div>
                  )}
                </div>
                <div className="p-6 relative flex-grow flex flex-col">
                  {/* Decorative element */}
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-bakery-500 group-hover:text-white transition-colors duration-300">
                    <span className="font-serif font-bold text-xl">OdG</span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-bakery-800 mb-3 group-hover:text-bakery-600 transition-colors">
                    {product.name_ro}
                  </h3>
                  <p className="text-bakery-600 text-sm leading-relaxed mb-4 flex-grow">
                    {product.description_ro}
                  </p>

                  {onOpenOrderModal && (
                    <button
                      onClick={onOpenOrderModal}
                      className="w-full mt-auto py-3 bg-bakery-100 text-bakery-800 font-bold rounded-xl hover:bg-bakery-500 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                    >
                      <ShoppingBag size={18} />
                      Comandă Acum
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;