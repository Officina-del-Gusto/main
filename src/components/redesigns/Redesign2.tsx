import React from 'react';

// Redesign 2: Artisan Minimal - Scandinavian-inspired, clean, premium feel
const Redesign2: React.FC = () => {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FAF8F5', fontFamily: "'Inter', sans-serif" }}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4" style={{ backgroundColor: 'rgba(250, 248, 245, 0.95)', backdropFilter: 'blur(10px)' }}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#2D2D2D' }}>
                        <span style={{ color: '#C4A962' }}>O</span>dG
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        {['Despre Noi', 'Produse', 'Comenzi', 'Locații', 'Contact'].map((item) => (
                            <a key={item} href="#" className="text-sm tracking-wide transition-colors" style={{ color: '#5A5A5A' }}>
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="px-6 py-2.5 text-sm font-semibold rounded-full transition-all" style={{ backgroundColor: '#C4A962', color: '#FFFFFF' }}>
                        Comandă Acum
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-sm uppercase tracking-[0.3em]" style={{ color: '#C4A962' }}>Brutărie Artizanală</span>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '64px', lineHeight: 1.1, color: '#2D2D2D', fontWeight: 400 }}>
                            Artă în <br />
                            <span style={{ fontStyle: 'italic', color: '#C4A962' }}>Fiecare Felie</span>
                        </h1>
                        <p className="text-lg leading-relaxed max-w-md" style={{ color: '#6B6B6B' }}>
                            Descoperă gustul autentic al pâinii făcute cu pasiune, ingrediente naturale și rețete transmise din generație în generație.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <button className="px-8 py-4 text-sm font-semibold tracking-wide rounded-full transition-all" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}>
                                Vezi Produsele
                            </button>
                            <button className="px-8 py-4 text-sm font-semibold tracking-wide rounded-full border-2 transition-all" style={{ borderColor: '#2D2D2D', color: '#2D2D2D' }}>
                                Află Povestea
                            </button>
                        </div>
                        <div className="flex items-center gap-2 pt-8">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#C4A962" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm" style={{ color: '#6B6B6B' }}>Drăgășani & Băbeni</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#E8E4DF' }}>
                            <img
                                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
                                alt="Artisan bread"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C4A962' }}>
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <p className="font-semibold" style={{ color: '#2D2D2D' }}>100% Natural</p>
                                    <p className="text-sm" style={{ color: '#888' }}>Fără aditivi sau conservanți</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm uppercase tracking-[0.3em]" style={{ color: '#C4A962' }}>De Ce Noi</span>
                        <h2 className="mt-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', color: '#2D2D2D' }}>
                            Calitate Fără Compromis
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: '🌾', title: 'Ingrediente Selectate', desc: 'Folosim doar făină de cea mai bună calitate și ingrediente proaspete.' },
                            { icon: '👨‍🍳', title: 'Meșteșug Artizanal', desc: 'Fiecare produs este făcut manual cu grijă și atenție la detalii.' },
                            { icon: '❤️', title: 'Făcut cu Pasiune', desc: 'Dragostea pentru meseria noastră se simte în fiecare muscătură.' }
                        ].map((feature) => (
                            <div key={feature.title} className="text-center p-8">
                                <div className="text-5xl mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-4" style={{ color: '#2D2D2D' }}>{feature.title}</h3>
                                <p style={{ color: '#6B6B6B' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Preview */}
            <section className="py-24 px-8" style={{ backgroundColor: '#FAF8F5' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-sm uppercase tracking-[0.3em]" style={{ color: '#C4A962' }}>Colecția Noastră</span>
                            <h2 className="mt-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', color: '#2D2D2D' }}>
                                Produse Populare
                            </h2>
                        </div>
                        <a href="#" className="text-sm font-semibold flex items-center gap-2" style={{ color: '#C4A962' }}>
                            Vezi Toate →
                        </a>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: 'Pâine Artizanală', price: '12 RON', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400' },
                            { name: 'Croissant Clasic', price: '8 RON', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
                            { name: 'Cozonac Traditional', price: '45 RON', img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400' },
                            { name: 'Cornuri cu Ciocolată', price: '6 RON', img: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400' }
                        ].map((product) => (
                            <div key={product.name} className="group cursor-pointer">
                                <div className="aspect-square rounded-2xl overflow-hidden mb-4" style={{ backgroundColor: '#E8E4DF' }}>
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="font-semibold" style={{ color: '#2D2D2D' }}>{product.name}</h3>
                                <p style={{ color: '#C4A962' }}>{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#2D2D2D' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', color: '#FFFFFF' }}>
                        Comandă Acum pentru <span style={{ color: '#C4A962' }}>Mâine Dimineață</span>
                    </h2>
                    <p className="mb-8 text-lg" style={{ color: '#AAAAAA' }}>
                        Plasează comanda până la ora 20:00 și te vom servi cu produse proaspete chiar de dimineață.
                    </p>
                    <button className="px-10 py-4 text-sm font-semibold tracking-wide rounded-full transition-all" style={{ backgroundColor: '#C4A962', color: '#FFFFFF' }}>
                        Începe Comanda
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8" style={{ backgroundColor: '#FAF8F5' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#2D2D2D' }}>
                        <span style={{ color: '#C4A962' }}>O</span>dG
                    </div>
                    <div className="flex items-center gap-8">
                        {['Facebook', 'Instagram', 'WhatsApp'].map((social) => (
                            <a key={social} href="#" className="text-sm" style={{ color: '#6B6B6B' }}>{social}</a>
                        ))}
                    </div>
                    <p className="text-sm" style={{ color: '#888' }}>© 2024 Officina del Gusto</p>
                </div>
            </footer>
        </div>
    );
};

export default Redesign2;
