import React from 'react';

// Redesign 3: Warm Rustic - Cozy, traditional, family bakery feel
const Redesign3: React.FC = () => {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F5E6D3', fontFamily: "'Georgia', serif" }}>
            {/* Subtle texture overlay */}
            <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")' }} />

            {/* Navigation */}
            <nav className="relative z-50 px-8 py-6" style={{ backgroundColor: '#4A3728' }}>
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🌾</span>
                        <div>
                            <div className="text-xl font-bold" style={{ color: '#F5E6D3', fontFamily: "'Brush Script MT', cursive" }}>
                                Officina del Gusto
                            </div>
                            <div className="text-xs tracking-wider" style={{ color: '#CD7F32' }}>
                                Brutărie Tradițională
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {['Acasă', 'Produse', 'Despre Noi', 'Comenzi', 'Contact'].map((item) => (
                            <a key={item} href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#F5E6D3' }}>
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:scale-105" style={{ backgroundColor: '#CD7F32', color: '#FFFFFF' }}>
                        🥖 Comandă
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 px-8 overflow-hidden">
                {/* Decorative wheat */}
                <div className="absolute top-0 right-0 text-9xl opacity-10 transform rotate-12">🌾</div>
                <div className="absolute bottom-0 left-0 text-9xl opacity-10 transform -rotate-12">🌾</div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 relative z-10">
                        <div className="inline-block px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#CD7F32', color: '#FFFFFF' }}>
                            ✨ Din 1998 - Tradiție și Pasiune
                        </div>
                        <h1 className="leading-tight" style={{ fontSize: '52px', color: '#4A3728', fontFamily: "'Brush Script MT', cursive" }}>
                            Cu Dragoste,<br />Pentru Tine
                        </h1>
                        <p className="text-lg leading-relaxed max-w-md" style={{ color: '#6B5344' }}>
                            Fiecare pâine spune o poveste. A noastră începe în zori, când aroma proaspătă de copt umple brutăria și inimile celor care ne trec pragul.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <button className="px-8 py-4 text-sm font-bold rounded-full transition-all hover:scale-105 shadow-lg" style={{ backgroundColor: '#4A3728', color: '#F5E6D3' }}>
                                🛒 Vezi Produsele
                            </button>
                            <button className="px-8 py-4 text-sm font-bold rounded-full border-2 transition-all hover:scale-105" style={{ borderColor: '#4A3728', color: '#4A3728' }}>
                                📖 Povestea Noastră
                            </button>
                        </div>
                        <div className="flex items-center gap-6 pt-6">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏠</span>
                                <span className="text-sm font-semibold" style={{ color: '#6B5344' }}>Drăgășani</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏠</span>
                                <span className="text-sm font-semibold" style={{ color: '#6B5344' }}>Băbeni</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl transform rotate-3" style={{ backgroundColor: '#CD7F32', opacity: 0.3 }} />
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1608198093002-ad4e005f94c3?w=800"
                                alt="Fresh baked bread"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -right-4 p-4 rounded-2xl shadow-xl" style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">👨‍🍳</span>
                                <div>
                                    <p className="text-xs" style={{ color: '#888' }}>Făcut manual</p>
                                    <p className="font-bold" style={{ color: '#4A3728' }}>Cu Pasiune</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-8" style={{ backgroundColor: '#4A3728' }}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center mb-12" style={{ fontSize: '36px', color: '#F5E6D3', fontFamily: "'Brush Script MT', cursive" }}>
                        De Ce Ne Aleg Clienții
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: '🌾', title: 'Ingrediente Locale', desc: 'De la ferme din zonă' },
                            { icon: '🕐', title: 'Proaspăt Zilnic', desc: 'Coaptă în fiecare dimineață' },
                            { icon: '❤️', title: 'Rețete de Familie', desc: 'Transmise generații' },
                            { icon: '🤝', title: 'Comunitate', desc: 'Vecinii noștri dragi' }
                        ].map((feature) => (
                            <div key={feature.title} className="text-center p-6 rounded-2xl transition-transform hover:scale-105" style={{ backgroundColor: 'rgba(245, 230, 211, 0.1)' }}>
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="font-bold mb-2" style={{ color: '#F5E6D3' }}>{feature.title}</h3>
                                <p className="text-sm" style={{ color: '#CD7F32' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 px-8" style={{ backgroundColor: '#F5E6D3' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-sm" style={{ color: '#CD7F32' }}>🥐 Din Cuptorul Nostru 🥖</span>
                        <h2 className="mt-2" style={{ fontSize: '40px', color: '#4A3728', fontFamily: "'Brush Script MT', cursive" }}>
                            Delicii Proaspete
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Pâine de Casă', price: '10 RON', tag: 'Preferată', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
                            { name: 'Cozonac Tradițional', price: '35 RON', tag: 'Special', img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400' },
                            { name: 'Plăcinte Poale-n Brâu', price: '5 RON', tag: 'Românesc', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' }
                        ].map((product) => (
                            <div key={product.name} className="group cursor-pointer">
                                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-4">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#CD7F32', color: '#FFFFFF' }}>
                                        {product.tag}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg" style={{ color: '#4A3728' }}>{product.name}</h3>
                                <p className="font-bold" style={{ color: '#CD7F32' }}>{product.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <button className="px-8 py-4 text-sm font-bold rounded-full transition-all hover:scale-105" style={{ backgroundColor: '#CD7F32', color: '#FFFFFF' }}>
                            Vezi Toate Produsele →
                        </button>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-20 px-8" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-4xl mb-6 block">💬</span>
                    <blockquote className="text-2xl italic leading-relaxed mb-6" style={{ color: '#4A3728' }}>
                        "De fiecare dată când intru în brutărie, mă simt ca acasă. Mirosul de pâine proaspătă îmi aduce aminte de bunica mea."
                    </blockquote>
                    <p className="font-bold" style={{ color: '#CD7F32' }}>— Maria I., Client fidel din 2005</p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-8" style={{ backgroundColor: '#CD7F32' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="mb-4" style={{ fontSize: '36px', color: '#FFFFFF', fontFamily: "'Brush Script MT', cursive" }}>
                        Hai la Noi! 🥖
                    </h2>
                    <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Te așteptăm cu brațele deschise și cu pâine caldă.
                    </p>
                    <button className="px-10 py-4 text-sm font-bold rounded-full transition-all hover:scale-105" style={{ backgroundColor: '#4A3728', color: '#F5E6D3' }}>
                        📍 Găsește-ne pe Hartă
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8" style={{ backgroundColor: '#4A3728' }}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🌾</span>
                        <span style={{ color: '#F5E6D3', fontFamily: "'Brush Script MT', cursive", fontSize: '20px' }}>Officina del Gusto</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" style={{ color: '#CD7F32' }}>📘 Facebook</a>
                        <a href="#" style={{ color: '#CD7F32' }}>📸 Instagram</a>
                        <a href="#" style={{ color: '#CD7F32' }}>📱 WhatsApp</a>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(245,230,211,0.6)' }}>© 2024 Officina del Gusto</p>
                </div>
            </footer>
        </div>
    );
};

export default Redesign3;
