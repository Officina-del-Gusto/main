import React from 'react';

// Redesign 4: Bold Modern - Contemporary, urban, high-contrast
const Redesign4: React.FC = () => {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#1F1F1F', fontFamily: "'Arial', sans-serif" }}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5" style={{ backgroundColor: 'rgba(31, 31, 31, 0.95)', backdropFilter: 'blur(10px)' }}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="text-2xl font-black tracking-tight" style={{ color: '#FFFFFF' }}>
                        O<span style={{ color: '#FF6B4A' }}>d</span>G
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {['ACASĂ', 'PRODUSE', 'COMENZI', 'DESPRE', 'CONTACT'].map((item, i) => (
                            <a
                                key={item}
                                href="#"
                                className="text-xs font-bold tracking-widest transition-colors"
                                style={{ color: i === 0 ? '#FF6B4A' : '#FFFFFF' }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="px-6 py-3 text-xs font-black tracking-widest transition-all hover:scale-105" style={{ backgroundColor: '#FF6B4A', color: '#FFFFFF' }}>
                        ORDER NOW
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center px-8 pt-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#FF6B4A' }} />
                            <span className="text-xs font-bold tracking-widest" style={{ color: '#FF6B4A' }}>ARTISAN BAKERY</span>
                        </div>
                        <h1 className="font-black leading-none" style={{ fontSize: '80px', color: '#FFFFFF', letterSpacing: '-3px' }}>
                            FRESH.<br />
                            <span style={{ color: '#FF6B4A' }}>BOLD.</span><br />
                            DAILY.
                        </h1>
                        <p className="text-lg max-w-md leading-relaxed" style={{ color: '#888888' }}>
                            Premium artisan bakery crafting bold flavors for the modern taste. Every bite is an experience.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <button className="px-8 py-4 text-xs font-black tracking-widest transition-all hover:scale-105" style={{ backgroundColor: '#FF6B4A', color: '#FFFFFF' }}>
                                EXPLORE MENU
                            </button>
                            <button className="px-8 py-4 text-xs font-black tracking-widest border-2 transition-all hover:scale-105" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
                                OUR STORY
                            </button>
                        </div>
                        <div className="flex items-center gap-8 pt-8">
                            <div className="text-center">
                                <div className="text-4xl font-black" style={{ color: '#FF6B4A' }}>25+</div>
                                <div className="text-xs tracking-wider" style={{ color: '#666' }}>YEARS</div>
                            </div>
                            <div className="w-px h-12" style={{ backgroundColor: '#333' }} />
                            <div className="text-center">
                                <div className="text-4xl font-black" style={{ color: '#FF6B4A' }}>50K+</div>
                                <div className="text-xs tracking-wider" style={{ color: '#666' }}>CUSTOMERS</div>
                            </div>
                            <div className="w-px h-12" style={{ backgroundColor: '#333' }} />
                            <div className="text-center">
                                <div className="text-4xl font-black" style={{ color: '#FF6B4A' }}>2</div>
                                <div className="text-xs tracking-wider" style={{ color: '#666' }}>LOCATIONS</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-8 rounded-3xl transform -rotate-6" style={{ backgroundColor: '#FF6B4A' }} />
                        <div className="absolute -inset-4 rounded-3xl transform rotate-3" style={{ backgroundColor: '#2A2A2A' }} />
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
                                alt="Bold bread"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,31,31,0.8) 0%, transparent 50%)' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-xs font-bold tracking-widest" style={{ color: '#FF6B4A' }}>OUR MENU</span>
                            <h2 className="mt-2 font-black" style={{ fontSize: '48px', color: '#1F1F1F', letterSpacing: '-2px' }}>
                                BESTSELLERS
                            </h2>
                        </div>
                        <a href="#" className="text-xs font-bold tracking-widest flex items-center gap-2" style={{ color: '#FF6B4A' }}>
                            VIEW ALL →
                        </a>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { name: 'ARTISAN LOAF', price: '12', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400' },
                            { name: 'CROISSANT', price: '8', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
                            { name: 'SOURDOUGH', price: '15', img: 'https://images.unsplash.com/photo-1585478259715-876acc5be8fc?w=400' },
                            { name: 'BAGUETTE', price: '6', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400' }
                        ].map((product) => (
                            <div key={product.name} className="group cursor-pointer">
                                <div className="relative aspect-square overflow-hidden mb-4" style={{ backgroundColor: '#F5F5F5' }}>
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 107, 74, 0.9)' }}>
                                        <span className="text-white font-black text-sm tracking-widest">ADD TO CART</span>
                                    </div>
                                </div>
                                <h3 className="font-black text-sm tracking-wide" style={{ color: '#1F1F1F' }}>{product.name}</h3>
                                <p className="font-bold" style={{ color: '#FF6B4A' }}>{product.price} RON</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="py-12 px-8" style={{ backgroundColor: '#FF6B4A' }}>
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12">
                    {['🌾 NATURAL INGREDIENTS', '🕐 FRESH DAILY', '🚚 FAST DELIVERY', '⭐ PREMIUM QUALITY'].map((feature) => (
                        <span key={feature} className="text-sm font-black tracking-widest" style={{ color: '#FFFFFF' }}>
                            {feature}
                        </span>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#1F1F1F' }}>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-xs font-bold tracking-widest" style={{ color: '#FF6B4A' }}>ABOUT US</span>
                        <h2 className="font-black" style={{ fontSize: '48px', color: '#FFFFFF', letterSpacing: '-2px' }}>
                            PASSION IN<br />EVERY BITE
                        </h2>
                        <p className="text-lg leading-relaxed" style={{ color: '#888' }}>
                            Since 1998, we've been crafting exceptional baked goods with passion and precision. Our commitment to quality ingredients and traditional techniques sets us apart.
                        </p>
                        <button className="px-8 py-4 text-xs font-black tracking-widest transition-all hover:scale-105" style={{ backgroundColor: '#FF6B4A', color: '#FFFFFF' }}>
                            LEARN MORE
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square rounded-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=400" alt="Baker" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square rounded-2xl overflow-hidden mt-8">
                            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" alt="Bread" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-black mb-6" style={{ fontSize: '56px', color: '#1F1F1F', letterSpacing: '-2px' }}>
                        READY TO <span style={{ color: '#FF6B4A' }}>ORDER?</span>
                    </h2>
                    <p className="text-lg mb-8" style={{ color: '#666' }}>
                        Experience the bold flavors of Officina del Gusto.
                    </p>
                    <button className="px-12 py-5 text-sm font-black tracking-widest transition-all hover:scale-105" style={{ backgroundColor: '#FF6B4A', color: '#FFFFFF' }}>
                        START YOUR ORDER
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8" style={{ backgroundColor: '#1F1F1F', borderTop: '1px solid #333' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xl font-black" style={{ color: '#FFFFFF' }}>
                        O<span style={{ color: '#FF6B4A' }}>d</span>G
                    </div>
                    <div className="flex items-center gap-8">
                        {['INSTAGRAM', 'FACEBOOK', 'TIKTOK'].map((social) => (
                            <a key={social} href="#" className="text-xs font-bold tracking-widest" style={{ color: '#666' }}>{social}</a>
                        ))}
                    </div>
                    <p className="text-xs" style={{ color: '#666' }}>© 2024 OFFICINA DEL GUSTO</p>
                </div>
            </footer>
        </div>
    );
};

export default Redesign4;
