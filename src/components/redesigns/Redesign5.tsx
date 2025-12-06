import React from 'react';

// Redesign 5: Elegant Dark - Luxurious dark mode, premium patisserie
const Redesign5: React.FC = () => {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#1A1A1A', fontFamily: "'Georgia', serif" }}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6" style={{ backgroundColor: 'rgba(26, 26, 26, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="text-2xl" style={{ color: '#D4AF37', fontStyle: 'italic', fontFamily: "'Times New Roman', serif" }}>
                        Officina del Gusto
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        {['Acasă', 'Colecția', 'Comenzi Speciale', 'Locații', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-sm tracking-wide transition-colors hover:opacity-80"
                                style={{ color: '#F5F0E8' }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="px-6 py-2.5 text-sm tracking-wide transition-all border" style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
                        Rezervă Acum
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.3)'
                    }}
                />
                {/* Gold overlay gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0.9) 100%)' }} />

                <div className="relative z-10 text-center px-8 max-w-4xl">
                    <div className="mb-8">
                        <div className="w-24 h-px mx-auto mb-6" style={{ backgroundColor: '#D4AF37' }} />
                        <span className="text-sm tracking-[0.4em] uppercase" style={{ color: '#D4AF37' }}>Brutărie & Patiserie de Lux</span>
                        <div className="w-24 h-px mx-auto mt-6" style={{ backgroundColor: '#D4AF37' }} />
                    </div>
                    <h1 className="mb-8" style={{ fontSize: '64px', color: '#F5F0E8', fontWeight: 400, lineHeight: 1.2, fontStyle: 'italic' }}>
                        Experiență Culinară<br />
                        <span style={{ color: '#D4AF37' }}>de Excepție</span>
                    </h1>
                    <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245, 240, 232, 0.7)' }}>
                        Fiecare creație din laboratorul nostru este o simfonie de arome și texturi, concepută să încânte cele mai rafinate gusturi.
                    </p>
                    <div className="flex items-center justify-center gap-6">
                        <button className="px-10 py-4 text-sm tracking-wide transition-all hover:scale-105" style={{ backgroundColor: '#D4AF37', color: '#1A1A1A' }}>
                            Descoperă Meniul
                        </button>
                        <button className="px-10 py-4 text-sm tracking-wide transition-all border hover:scale-105" style={{ borderColor: '#F5F0E8', color: '#F5F0E8' }}>
                            Vizitează-ne
                        </button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2" style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}>
                        <div className="w-1 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#D4AF37' }} />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#121212' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#D4AF37' }}>De Ce Noi</span>
                        <h2 className="mt-4" style={{ fontSize: '42px', color: '#F5F0E8', fontStyle: 'italic' }}>
                            Rafinament în Fiecare Detaliu
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: '✧', title: 'Ingrediente Premium', desc: 'Selecție riguroasă de ingrediente de cea mai înaltă calitate din surse locale și internaționale.' },
                            { icon: '✧', title: 'Meșteșug Artistic', desc: 'Fiecare produs este o operă de artă, creată cu precizie și atenție la cele mai fine detalii.' },
                            { icon: '✧', title: 'Tradiție & Inovație', desc: 'Îmbinăm rețete clasice cu tehnici moderne pentru experiențe gustative memorabile.' }
                        ].map((feature) => (
                            <div key={feature.title} className="text-center p-8 border transition-all hover:border-opacity-100" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                                <div className="text-4xl mb-6" style={{ color: '#D4AF37' }}>{feature.icon}</div>
                                <h3 className="text-xl mb-4" style={{ color: '#F5F0E8' }}>{feature.title}</h3>
                                <p className="leading-relaxed" style={{ color: 'rgba(245, 240, 232, 0.6)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Signature Collection */}
            <section className="py-24 px-8" style={{ backgroundColor: '#1A1A1A' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#D4AF37' }}>Colecția Signature</span>
                            <h2 className="mt-4" style={{ fontSize: '42px', color: '#F5F0E8', fontStyle: 'italic' }}>
                                Creații de Excepție
                            </h2>
                        </div>
                        <a href="#" className="text-sm tracking-wide flex items-center gap-2" style={{ color: '#D4AF37' }}>
                            Explorează Tot →
                        </a>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: 'Croissant cu Unt', price: '15', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
                            { name: 'Pain au Chocolat', price: '18', img: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400' },
                            { name: 'Pâine Artizanală', price: '25', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400' },
                            { name: 'Tort Signature', price: '120', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' }
                        ].map((product) => (
                            <div key={product.name} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden mb-6" style={{ backgroundColor: '#2A2A2A' }}>
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                                    />
                                    <div className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: '#D4AF37', margin: '16px' }} />
                                </div>
                                <h3 className="text-lg mb-1" style={{ color: '#F5F0E8' }}>{product.name}</h3>
                                <p style={{ color: '#D4AF37' }}>{product.price} RON</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#121212' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-6xl mb-8" style={{ color: '#D4AF37' }}>"</div>
                    <blockquote className="text-2xl leading-relaxed mb-8" style={{ color: '#F5F0E8', fontStyle: 'italic' }}>
                        Arta cofetăriei constă în transformarea ingredientelor simple în momente de pură fericire.
                    </blockquote>
                    <div className="w-16 h-px mx-auto mb-4" style={{ backgroundColor: '#D4AF37' }} />
                    <cite className="text-sm tracking-wide" style={{ color: '#D4AF37' }}>— Chef Patiser, Officina del Gusto</cite>
                </div>
            </section>

            {/* Locations Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#1A1A1A' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#D4AF37' }}>Locații</span>
                        <h2 className="mt-4" style={{ fontSize: '42px', color: '#F5F0E8', fontStyle: 'italic' }}>
                            Vino să Ne Cunoști
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            { city: 'Drăgășani', address: 'Str. Tudor Vladimirescu 62', hours: 'Lun-Sâm: 07:00 - 20:00' },
                            { city: 'Băbeni', address: 'Str. Constituției 34', hours: 'Lun-Sâm: 07:00 - 20:00' }
                        ].map((location) => (
                            <div key={location.city} className="p-12 border text-center" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                                <h3 className="text-2xl mb-4" style={{ color: '#D4AF37' }}>{location.city}</h3>
                                <p className="mb-2" style={{ color: '#F5F0E8' }}>{location.address}</p>
                                <p className="text-sm" style={{ color: 'rgba(245, 240, 232, 0.6)' }}>{location.hours}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-8" style={{ backgroundColor: '#D4AF37' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="mb-6" style={{ fontSize: '42px', color: '#1A1A1A', fontStyle: 'italic' }}>
                        Rezervă pentru Ocazii Speciale
                    </h2>
                    <p className="mb-8 text-lg" style={{ color: 'rgba(26, 26, 26, 0.8)' }}>
                        Evenimente, nunți, aniversări — creăm experiențe culinare personalizate.
                    </p>
                    <button className="px-12 py-4 text-sm tracking-wide transition-all hover:scale-105" style={{ backgroundColor: '#1A1A1A', color: '#D4AF37' }}>
                        Contactează-ne
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8" style={{ backgroundColor: '#121212', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div style={{ color: '#D4AF37', fontStyle: 'italic', fontSize: '20px' }}>
                        Officina del Gusto
                    </div>
                    <div className="flex items-center gap-8">
                        {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                            <a key={social} href="#" className="text-sm tracking-wide transition-colors hover:opacity-80" style={{ color: 'rgba(245, 240, 232, 0.6)' }}>{social}</a>
                        ))}
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(245, 240, 232, 0.4)' }}>© 2024 Officina del Gusto</p>
                </div>
            </footer>
        </div>
    );
};

export default Redesign5;
