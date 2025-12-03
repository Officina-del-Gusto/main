import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Calendar, Phone, User, Check, Minus, Plus, Loader } from 'lucide-react';
import { getProducts, getCarouselImages, submitOrder, Product, CarouselImage, OrderItem } from '../utils/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
    const { dictionary } = useLanguage();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [customItems, setCustomItems] = useState<CarouselImage[]>([]);
    const [cart, setCart] = useState<Map<string, OrderItem>>(new Map());

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        deliveryType: 'pickup' as 'pickup' | 'delivery',
        address: ''
    });

    useEffect(() => {
        if (isOpen) {
            loadData();
        }
    }, [isOpen]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [fetchedProducts, fetchedCustom] = await Promise.all([
                getProducts(),
                getCarouselImages()
            ]);
            setProducts(fetchedProducts);
            setCustomItems(fetchedCustom);
        } catch (error) {
            console.error('Failed to load items', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (id: string, item: Product | CarouselImage, type: 'product' | 'custom', delta: number) => {
        setCart(prev => {
            const newCart = new Map(prev);
            const currentItem = newCart.get(id);

            if (!currentItem && delta > 0) {
                newCart.set(id, {
                    id,
                    name: 'name_ro' in item ? item.name_ro : `Custom Order #${item.display_order}`,
                    image_url: item.image_url,
                    quantity: 1,
                    type
                });
            } else if (currentItem) {
                const newQuantity = currentItem.quantity + delta;
                if (newQuantity <= 0) {
                    newCart.delete(id);
                } else {
                    newCart.set(id, { ...currentItem, quantity: newQuantity });
                }
            }
            return newCart;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitOrder({
                customer_name: formData.name,
                phone_number: formData.phone,
                items: Array.from(cart.values()),
                needed_by: formData.date,
                delivery_type: formData.deliveryType,
                delivery_address: formData.deliveryType === 'delivery' ? formData.address : undefined,
                status: 'pending'
            });
            setStep(3);
        } catch (error) {
            alert('Eroare la trimiterea comenzii. Vă rugăm încercați din nou.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in">

                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-bakery-50">
                    <h2 className="text-xl font-serif font-bold text-bakery-800 flex items-center gap-2">
                        <ShoppingBag className="text-bakery-500" />
                        {step === 1 && 'Alege Produsele'}
                        {step === 2 && 'Detalii Comandă'}
                        {step === 3 && 'Comandă Trimisă!'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-bakery-100 rounded-full transition-colors">
                        <X size={24} className="text-stone-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {step === 1 && (
                        <div className="space-y-8">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <Loader className="animate-spin text-bakery-500" size={40} />
                                </div>
                            ) : (
                                <>
                                    {/* Products Section */}
                                    <section>
                                        <h3 className="text-lg font-bold text-stone-700 mb-4 border-l-4 border-bakery-500 pl-3">Produse Standard</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {products.map(product => {
                                                const quantity = cart.get(product.id)?.quantity || 0;
                                                return (
                                                    <div key={product.id} className={`border rounded-xl p-3 flex gap-3 transition-all ${quantity > 0 ? 'border-bakery-500 bg-bakery-50' : 'border-stone-200'}`}>
                                                        <img src={product.image_url} alt={product.name_ro} className="w-20 h-20 object-cover rounded-lg" />
                                                        <div className="flex-1 flex flex-col justify-between">
                                                            <h4 className="font-bold text-stone-800 text-sm">{product.name_ro}</h4>
                                                            <div className="flex items-center gap-3 mt-2">
                                                                <button
                                                                    onClick={() => updateQuantity(product.id, product, 'product', -1)}
                                                                    className={`p-1 rounded-full ${quantity > 0 ? 'bg-bakery-200 text-bakery-800' : 'bg-stone-100 text-stone-400'}`}
                                                                    disabled={quantity === 0}
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className="font-bold w-4 text-center">{quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(product.id, product, 'product', 1)}
                                                                    className="p-1 rounded-full bg-bakery-500 text-white hover:bg-bakery-600"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>

                                    {/* Custom Orders Section */}
                                    <section>
                                        <h3 className="text-lg font-bold text-stone-700 mb-4 border-l-4 border-bakery-500 pl-3 mt-8">Din Galerie (Comenzi Speciale)</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {customItems.map((item, idx) => {
                                                const quantity = cart.get(item.id)?.quantity || 0;
                                                return (
                                                    <div key={item.id} className={`relative group rounded-xl overflow-hidden border transition-all ${quantity > 0 ? 'ring-2 ring-bakery-500' : 'border-stone-200'}`}>
                                                        <img src={item.image_url} alt="Custom" className="w-full h-32 object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <div className="flex items-center gap-3 bg-white rounded-full p-1">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item, 'custom', -1)}
                                                                    className="p-1.5 hover:bg-stone-100 rounded-full"
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className="font-bold w-4 text-center">{quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item, 'custom', 1)}
                                                                    className="p-1.5 bg-bakery-500 text-white rounded-full"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {quantity > 0 && (
                                                            <div className="absolute top-2 right-2 bg-bakery-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                                                {quantity}x
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                            <div className="bg-bakery-50 p-4 rounded-xl mb-6">
                                <h3 className="font-bold text-bakery-800 mb-2">Sumar Comandă:</h3>
                                <ul className="space-y-2 text-sm">
                                    {Array.from(cart.values()).map(item => (
                                        <li key={item.id} className="flex justify-between border-b border-bakery-200 pb-1">
                                            <span>{item.name}</span>
                                            <span className="font-bold">x{item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Numele Tău (Opțional)</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-stone-400" size={20} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-bakery-500 outline-none"
                                        placeholder="ex: Popescu Ion"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Număr de Telefon <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 text-stone-400" size={20} />
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-bakery-500 outline-none"
                                        placeholder="07xx xxx xxx"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Data Dorită <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 text-stone-400" size={20} />
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-bakery-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">Metoda de Livrare</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 border rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-all ${formData.deliveryType === 'pickup' ? 'border-bakery-500 bg-bakery-50 text-bakery-800 ring-1 ring-bakery-500' : 'border-stone-200 hover:border-bakery-300'}`}>
                                        <input
                                            type="radio"
                                            name="deliveryType"
                                            value="pickup"
                                            checked={formData.deliveryType === 'pickup'}
                                            onChange={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                                            className="hidden"
                                        />
                                        <ShoppingBag size={20} />
                                        <span className="font-bold">Ridicare Personală</span>
                                    </label>
                                    <label className={`flex-1 border rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-all ${formData.deliveryType === 'delivery' ? 'border-bakery-500 bg-bakery-50 text-bakery-800 ring-1 ring-bakery-500' : 'border-stone-200 hover:border-bakery-300'}`}>
                                        <input
                                            type="radio"
                                            name="deliveryType"
                                            value="delivery"
                                            checked={formData.deliveryType === 'delivery'}
                                            onChange={() => setFormData({ ...formData, deliveryType: 'delivery' })}
                                            className="hidden"
                                        />
                                        <div className="flex items-center gap-2">
                                            {/* Truck icon replacement since Truck is not imported, using standard icon or just text */}
                                            <span className="font-bold">Livrare la Domiciliu</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {formData.deliveryType === 'delivery' && (
                                <div className="animate-fade-in">
                                    <label className="block text-sm font-bold text-stone-700 mb-1">Adresa de Livrare <span className="text-red-500">*</span></label>
                                    <textarea
                                        required
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-bakery-500 outline-none min-h-[80px]"
                                        placeholder="Strada, Număr, Bloc, Scara, Apartament, Oraș..."
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-bakery-500 text-white font-bold py-4 rounded-xl hover:bg-bakery-600 transition-colors flex justify-center items-center gap-2"
                            >
                                {loading ? <Loader className="animate-spin" /> : <>Trimite Comanda <Check size={20} /></>}
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={40} strokeWidth={3} />
                            </div>
                            <h3 className="text-2xl font-bold text-stone-800 mb-2">Comandă Trimisă cu Succes!</h3>
                            <p className="text-stone-600 mb-8">Vă vom contacta în scurt timp pentru confirmare.</p>
                            <button onClick={onClose} className="bg-bakery-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-bakery-600">
                                Închide
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {step === 1 && (
                    <div className="p-4 border-t bg-stone-50 flex justify-between items-center">
                        <div className="text-sm text-stone-500">
                            {cart.size} produse selectate
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            disabled={cart.size === 0}
                            className="bg-bakery-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-bakery-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Continuă
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div className="p-4 border-t bg-stone-50">
                        <button onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-800 font-bold text-sm">
                            ← Înapoi la produse
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderModal;
