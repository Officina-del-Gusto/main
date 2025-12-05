import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Calendar, Phone, User, Check, Minus, Plus, Loader, ArrowRight, Copy } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { getProducts, getCarouselImages, getStoreSettings, submitOrder, Product, CarouselImage, OrderItem, StoreSettings, OrderRequest } from '../utils/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollLock } from '../hooks/useScrollLock';

const EMAILJS_SERVICE_ID = 'service_7kfjg5q';
const EMAILJS_TEMPLATE_ID = 'template_2nfnq8o';
const EMAILJS_PUBLIC_KEY = 'tpzvd85CgW2Vc_aeG';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
    useScrollLock(isOpen);
    const { dictionary } = useLanguage();
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [customItems, setCustomItems] = useState<CarouselImage[]>([]);
    const [cart, setCart] = useState<Map<string, OrderItem>>(new Map());
    const [storeSettings, setStoreSettings] = useState<StoreSettings>({
        id: '1',
        shipping_fee: 15,
        packaging_fee: 2,
        pricing_enabled: true,
        fee_rules: { standard: { packaging: [], delivery: [] }, special: { packaging: [], delivery: [] } }
    });

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        deliveryType: 'pickup' as 'pickup' | 'delivery',
        address: ''
    });

    const [showUnpricedWarning, setShowUnpricedWarning] = useState(false);
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);
    const [createdOrder, setCreatedOrder] = useState<OrderRequest | null>(null);

    const resetState = () => {
        setStep(1);
        setCart(new Map());
        setFormData({
            name: '',
            phone: '',
            date: '',
            deliveryType: 'pickup',
            address: ''
        });
        setShowCloseConfirm(false);
        setShowUnpricedWarning(false);
        setCreatedOrder(null);
    };

    const handleClose = () => {
        if (cart.size > 0 && step < 4) {
            setShowCloseConfirm(true);
        } else {
            resetState();
            onClose();
        }
    };

    const confirmClose = () => {
        resetState();
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            if (step === 4) {
                resetState();
            }
            loadData();
        }
    }, [isOpen]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [fetchedProducts, fetchedCustom, fetchedSettings] = await Promise.all([
                getProducts(),
                getCarouselImages(),
                getStoreSettings()
            ]);
            setProducts(fetchedProducts);
            setCustomItems(fetchedCustom);
            setStoreSettings(fetchedSettings);
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
                    name: 'name_ro' in item ? item.name_ro : (item.name || `Produs special #${item.display_order}`),
                    image_url: item.image_url,
                    quantity: 1,
                    type,
                    price: item.price || 0,
                    display_order: item.display_order
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

    // Helper function to calculate fees (used in Step 1, Step 3, and email)
    const calculateFees = () => {
        const standardItems = Array.from(cart.values()).filter(i => i.type === 'product');
        const specialItems = Array.from(cart.values()).filter(i => i.type === 'custom');

        const standardCount = standardItems.reduce((sum, item) => sum + item.quantity, 0);
        const specialCount = specialItems.reduce((sum, item) => sum + item.quantity, 0);

        const standardSubtotal = standardItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
        const specialSubtotal = specialItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
        const subtotal = standardSubtotal + specialSubtotal;

        // Helper to find applicable fee from rules
        const getFee = (baseFee: number, rules: { threshold: number, fee: number }[] | undefined, value: number) => {
            if (!rules || rules.length === 0) return baseFee;
            const sortedRules = [...rules].sort((a, b) => a.threshold - b.threshold);
            let applicableFee = baseFee;
            for (const rule of sortedRules) {
                if (value >= rule.threshold) {
                    applicableFee = rule.fee;
                }
            }
            return applicableFee;
        };

        // Calculate Packaging Fee
        let finalPackagingFee = 0;
        const hasStandardRules = storeSettings.fee_rules?.standard?.packaging?.length > 0;
        const hasSpecialRules = storeSettings.fee_rules?.special?.packaging?.length > 0;

        if (hasStandardRules || hasSpecialRules) {
            const stdFee = standardCount > 0 ? getFee(storeSettings.packaging_fee, storeSettings.fee_rules?.standard?.packaging, standardCount) : 0;
            const spcFee = specialCount > 0 ? getFee(0, storeSettings.fee_rules?.special?.packaging, specialCount) : 0;
            finalPackagingFee = stdFee + spcFee;
        } else {
            finalPackagingFee = storeSettings.packaging_fee;
        }

        // Calculate Shipping Fee
        let finalShippingFee = 0;
        if (formData.deliveryType === 'delivery') {
            const hasStdShipRules = storeSettings.fee_rules?.standard?.delivery?.length > 0;
            const hasSpcShipRules = storeSettings.fee_rules?.special?.delivery?.length > 0;

            if (hasStdShipRules || hasSpcShipRules) {
                const stdShip = standardCount > 0 ? getFee(storeSettings.shipping_fee, storeSettings.fee_rules?.standard?.delivery, standardSubtotal) : 0;
                const spcShip = specialCount > 0 ? getFee(0, storeSettings.fee_rules?.special?.delivery, specialSubtotal) : 0;
                finalShippingFee = stdShip + spcShip;
            } else {
                finalShippingFee = storeSettings.shipping_fee;
            }
        }

        const total = subtotal + finalPackagingFee + finalShippingFee;

        return {
            subtotal,
            standardSubtotal,
            specialSubtotal,
            standardCount,
            specialCount,
            packagingFee: finalPackagingFee,
            shippingFee: finalShippingFee,
            total
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 2) {
            setStep(3);
            return;
        }

        // Check for unpriced items
        const hasUnpricedItems = Array.from(cart.values()).some(item => !item.price || item.price === 0);
        if (hasUnpricedItems) {
            setShowUnpricedWarning(true);
            return;
        }

        await processOrderSubmission();
    };

    const processOrderSubmission = async () => {
        setLoading(true);
        try {
            // 1. Submit to Supabase
            const newOrder = await submitOrder({
                customer_name: formData.name,
                phone_number: formData.phone,
                items: Array.from(cart.values()),
                needed_by: formData.date,
                delivery_type: formData.deliveryType,
                delivery_address: formData.deliveryType === 'delivery' ? formData.address : undefined,
                status: 'pending'
            });
            setCreatedOrder(newOrder);

            // 2. Send Email via EmailJS with comprehensive order data
            const now = new Date();
            const orderDate = now.toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const orderTime = now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });

            // Check if order is urgent (needed within 2 days)
            const neededDate = new Date(formData.date);
            const daysUntilNeeded = Math.ceil((neededDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            const isUrgent = daysUntilNeeded <= 2;

            // Use calculateFees helper for consistent calculations
            const fees = calculateFees();

            const templateParams = {
                // Order identification
                order_id: newOrder?.id?.slice(0, 8).toUpperCase() || 'N/A',
                order_date: orderDate,
                order_time: orderTime,

                // Customer info
                customer_name: formData.name || 'Client Anonim',
                phone_number: formData.phone,

                // Delivery info
                needed_by: new Date(formData.date).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
                delivery_type_label: formData.deliveryType === 'delivery' ? '🚚 Livrare la Domiciliu' : '🏪 Ridicare Personală',
                delivery_type_class: formData.deliveryType === 'delivery' ? 'badge-delivery' : 'badge-pickup',
                delivery_address: formData.deliveryType === 'delivery' ? formData.address : '',

                // Urgency
                is_urgent: isUrgent,
                days_until_needed: daysUntilNeeded,

                // Items with full details
                items: Array.from(cart.values()).map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    type: item.type === 'product' ? 'Produs Standard' : 'Comandă Specială',
                    price: item.price || 0,
                    price_display: item.price ? `${(item.price * item.quantity).toFixed(2)} RON` : 'Preț la cerere',
                    unit_price: item.price ? `${item.price} RON/buc` : ''
                })),

                // Item counts for quick reference
                standard_count: fees.standardCount,
                special_count: fees.specialCount,
                total_items: fees.standardCount + fees.specialCount,

                // Pricing (business owner sees this)
                subtotal: fees.subtotal.toFixed(2),
                packaging_fee: fees.packagingFee.toFixed(2),
                shipping_fee: fees.shippingFee.toFixed(2),
                total: fees.total.toFixed(2),
                has_unpriced: Array.from(cart.values()).some(item => !item.price || item.price === 0),

                // Plain text items list (backup for simple templates)
                items_text: Array.from(cart.values()).map(item =>
                    `• ${item.quantity}x ${item.name}${item.price ? ` - ${(item.price * item.quantity).toFixed(2)} RON` : ' (preț la cerere)'}`
                ).join('\n')
            };

            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                );
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Failed to send email:', emailError);
                // Don't block the success flow if email fails, but maybe log it
            }

            setStep(4);
        } catch (error) {
            alert('Eroare la trimiterea comenzii. Vă rugăm încercați din nou.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in">

                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-bakery-50">
                    <h2 className="text-xl font-serif font-bold text-bakery-800 flex items-center gap-2">
                        <ShoppingBag className="text-bakery-500" />
                        {step === 1 && 'Alege Produsele'}
                        {step === 2 && 'Detalii Livrare'}
                        {step === 3 && 'Revizuire Comandă'}
                        {step === 4 && 'Comandă Trimisă!'}
                    </h2>
                    <button onClick={handleClose} className="p-2 hover:bg-bakery-100 rounded-full transition-colors">
                        <X size={24} className="text-stone-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {step === 1 && (
                        <div className="flex flex-col lg:flex-row h-full">
                            {/* LEFT: Product List */}
                            <div className="flex-1 overflow-y-auto p-6 lg:border-r border-stone-200">
                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <Loader className="animate-spin text-bakery-500" size={40} />
                                    </div>
                                ) : (
                                    <div className="space-y-8 pb-4">
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
                                                                <div>
                                                                    <h4 className="font-bold text-stone-800 text-sm">{product.name_ro}</h4>
                                                                    {storeSettings.pricing_enabled && (
                                                                        <div className="text-xs text-stone-500 font-bold mt-1">
                                                                            {product.price ? `${product.price} RON / ${product.unit || 'buc'}` : 'Suna pt. pret'}
                                                                        </div>
                                                                    )}
                                                                </div>
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
                                                {customItems.map((item) => {
                                                    const quantity = cart.get(item.id)?.quantity || 0;
                                                    return (
                                                        <div key={item.id} className={`relative group rounded-xl overflow-hidden border transition-all ${quantity > 0 ? 'ring-2 ring-bakery-500' : 'border-stone-200'}`}>
                                                            <img src={item.image_url} alt="Custom" className="w-full h-32 object-cover" />
                                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                                                                <div className="text-white text-xs font-bold truncate px-1">{item.name || `Produs special #${item.display_order}`}</div>
                                                                {storeSettings.pricing_enabled && (
                                                                    <div className="text-white/80 text-[10px] px-1">{item.price ? `${item.price} RON` : 'Suna pt. pret'}</div>
                                                                )}
                                                            </div>
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
                                    </div>
                                )}
                            </div>

                            {/* RIGHT: Order Summary */}
                            <div className="w-full lg:w-[400px] bg-stone-50 p-6 shrink-0 border-t lg:border-t-0 flex flex-col">
                                <h3 className="font-bold text-xl text-stone-800 mb-4 flex items-center gap-2">
                                    <ShoppingBag size={20} /> Sumar Comandă
                                </h3>

                                {cart.size === 0 ? (
                                    <div className="text-center py-4 text-stone-400">
                                        <p>Coșul este gol.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 flex-1 flex flex-col min-h-0">
                                        <div className="space-y-2 overflow-y-auto pr-2 flex-1 min-h-0">
                                            {/* Standard Products */}
                                            {Array.from(cart.values()).filter(i => i.type === 'product').length > 0 && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-stone-500 uppercase mb-2">Produse Standard</h4>
                                                    {Array.from(cart.values())
                                                        .filter(i => i.type === 'product')
                                                        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                                                        .map(item => (
                                                            <div key={item.id} className="flex justify-between items-start text-sm border-b border-stone-200 pb-2 mb-2 last:mb-0 last:border-0">
                                                                <div>
                                                                    <div className="font-bold text-stone-700">{item.name}</div>
                                                                    <div className="text-xs text-stone-500">
                                                                        {item.quantity} x {storeSettings.pricing_enabled ? (item.price ? `${item.price} RON` : 'Suna pt. pret') : ''}
                                                                    </div>
                                                                </div>
                                                                <div className="font-bold text-stone-800">
                                                                    {storeSettings.pricing_enabled ? (item.price ? `${(item.price * item.quantity).toFixed(2)} RON` : 'Suna pt. pret') : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            )}

                                            {/* Special Products */}
                                            {Array.from(cart.values()).filter(i => i.type === 'custom').length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="text-xs font-bold text-stone-500 uppercase mb-2">Comenzi Speciale</h4>
                                                    {Array.from(cart.values())
                                                        .filter(i => i.type === 'custom')
                                                        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                                                        .map(item => (
                                                            <div key={item.id} className="flex justify-between items-start text-sm border-b border-stone-200 pb-2 mb-2 last:mb-0 last:border-0">
                                                                <div>
                                                                    <div className="font-bold text-stone-700">{item.name}</div>
                                                                    <div className="text-xs text-stone-500">
                                                                        {item.quantity} x {storeSettings.pricing_enabled ? (item.price ? `${item.price} RON` : 'Suna pt. pret') : ''}
                                                                    </div>
                                                                </div>
                                                                <div className="font-bold text-stone-800">
                                                                    {storeSettings.pricing_enabled ? (item.price ? `${(item.price * item.quantity).toFixed(2)} RON` : 'Suna pt. pret') : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>

                                        {storeSettings.pricing_enabled && (() => {
                                            // Calculate Fees Logic
                                            const standardItems = Array.from(cart.values()).filter(i => i.type === 'product');
                                            const specialItems = Array.from(cart.values()).filter(i => i.type === 'custom');

                                            const standardCount = standardItems.reduce((sum, item) => sum + item.quantity, 0);
                                            const specialCount = specialItems.reduce((sum, item) => sum + item.quantity, 0);

                                            const standardSubtotal = standardItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
                                            const specialSubtotal = specialItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
                                            const subtotal = standardSubtotal + specialSubtotal;

                                            // Helper to find applicable fee
                                            const getFee = (baseFee: number, rules: { threshold: number, fee: number }[] | undefined, value: number) => {
                                                if (!rules || rules.length === 0) return baseFee;
                                                // Sort rules by threshold ascending
                                                const sortedRules = [...rules].sort((a, b) => a.threshold - b.threshold);
                                                // Find the last rule that matches (highest threshold exceeded)
                                                let applicableFee = baseFee;
                                                let foundRule = false;

                                                for (const rule of sortedRules) {
                                                    if (value >= rule.threshold) {
                                                        applicableFee = rule.fee;
                                                        foundRule = true;
                                                    }
                                                }
                                                // If no rule matched (value < lowest threshold), what happens? 
                                                // Usually rules are "over X amount". If < X, base fee applies? 
                                                // Or if rules exist, they override base? 
                                                // Let's assume: Base fee applies unless a rule is triggered.
                                                // BUT, if the user says "only first rule applies", maybe they want the logic to be:
                                                // Check rules. If match, use rule. Else base.
                                                return applicableFee;
                                            };

                                            // Calculate Packaging Fee
                                            // Standard: based on count? Or value? Usually count for packaging.
                                            // Special: based on count?
                                            // The interface has `threshold` (number). Let's assume it's COUNT for packaging and VALUE for delivery, 
                                            // OR consistent. The UI says "Peste X prod." for packaging and "Comanda > X RON" for delivery.

                                            // Standard Packaging
                                            const stdPkgFee = getFee(
                                                storeSettings.packaging_fee, // Base is global, but maybe we should split it? 
                                                // Actually storeSettings has one global `packaging_fee`. 
                                                // If rules exist, they likely override the TOTAL packaging fee or add to it?
                                                // Let's assume the rules calculate the fee for that *segment*.
                                                // Wait, the UI shows "Standard Products" rules and "Special Products" rules separately.
                                                // So we should calculate fee for Standard items + fee for Special items.
                                                // But there is only one global `packaging_fee` in the DB root.
                                                // Let's assume the global `packaging_fee` is the default if NO rules exist, 
                                                // OR it's the base fee for "Standard" if no specific standard rule matches?
                                                // Let's try: Total Fee = Fee(Standard) + Fee(Special).
                                                // If no rules for Standard, use 0? Or use global base?
                                                // The user complaint "only first rule applies" suggests they expect rules to work.

                                                // REVISED LOGIC based on UI:
                                                // Global `packaging_fee` might be a fallback or a base.
                                                // Let's treat the rules as:
                                                // If Standard Rules exist: Calculate Standard Fee based on Standard Count.
                                                // If Special Rules exist: Calculate Special Fee based on Special Count.
                                                // If NO rules, maybe use global `packaging_fee` * (total items)? Or just a flat fee?
                                                // Given the "Peste X prod = Y RON", it sounds like a flat fee for that tier.

                                                storeSettings.fee_rules?.standard?.packaging,
                                                standardCount
                                            );

                                            const specialPkgFee = getFee(
                                                0, // Default to 0 for special if no rules, or should it share the global base? 
                                                // Let's assume 0 if not defined, to avoid double charging if global base is used for standard.
                                                storeSettings.fee_rules?.special?.packaging,
                                                specialCount
                                            );

                                            // If NO rules defined at all, use the global base fee (once).
                                            // If rules defined, sum them up?
                                            // This is ambiguous. Let's look at the "Global Settings" UI again. 
                                            // It has "Taxa Ambalaj (RON)" input.
                                            // And "Reguli Dinamice".
                                            // If I set Taxa Ambalaj = 2 RON. And I have no rules. I expect 2 RON total? Or 2 RON per item? Usually flat 2 RON.
                                            // If I add a rule "Over 5 items = 5 RON".
                                            // If I have 3 items, I expect 2 RON (base).
                                            // If I have 6 items, I expect 5 RON (rule).

                                            // So:
                                            // 1. Start with Base Global Fee.
                                            // 2. Check Standard Rules. If match, REPLACE Base with Rule Fee?
                                            // 3. Check Special Rules. If match, ADD to total?
                                            // This seems complex.

                                            // SIMPLIFIED INTERPRETATION:
                                            // The "Standard" and "Special" sections in Admin are just grouping.
                                            // Let's assume the user wants:
                                            // Packaging Fee = (Rule for Standard Items) + (Rule for Special Items).
                                            // If no rule matches for a group, what?
                                            // Let's use the `getFee` with `0` as base for the groups, and if BOTH are 0 (no rules matched), use the Global Base.

                                            let finalPackagingFee = 0;
                                            const hasStandardRules = storeSettings.fee_rules?.standard?.packaging?.length > 0;
                                            const hasSpecialRules = storeSettings.fee_rules?.special?.packaging?.length > 0;

                                            if (hasStandardRules || hasSpecialRules) {
                                                // Rules exist, so we calculate based on them.
                                                // For Standard:
                                                if (hasStandardRules) {
                                                    finalPackagingFee += getFee(0, storeSettings.fee_rules?.standard?.packaging, standardCount);
                                                } else {
                                                    // If no standard rules but special rules exist, do we charge base for standard?
                                                    // Let's assume yes, proportional? No, that's too hard.
                                                    // Let's assume if ANY rules exist, we rely on rules.
                                                }

                                                // For Special:
                                                if (hasSpecialRules) {
                                                    finalPackagingFee += getFee(0, storeSettings.fee_rules?.special?.packaging, specialCount);
                                                }

                                                // If we have items but no specific rule matched (e.g. count < threshold), `getFee` returns 0.
                                                // Should we fall back to base?
                                                // Let's say: if (finalPackagingFee === 0 && (standardCount > 0 || specialCount > 0)) finalPackagingFee = storeSettings.packaging_fee;
                                                // Actually, `getFee` returns `baseFee` if no rule matches.
                                                // Let's pass `0` as base to `getFee`.

                                                // Edge case: What if I want 2 RON base, and 5 RON if > 10 items.
                                                // My `getFee` with base 0 returns 0 for < 10 items.
                                                // So I should pass `storeSettings.packaging_fee` as base?
                                                // But if I have both Standard and Special items, I don't want to apply base twice.

                                                // Let's try this:
                                                // Calculate fee for ALL items using Standard Rules (if they are generic?)
                                                // The Admin UI splits them.

                                                // Let's go with:
                                                // Standard Fee = getFee(storeSettings.packaging_fee, standardRules, standardCount)
                                                // Special Fee = getFee(0, specialRules, specialCount) -> Special usually has extra packing needs?
                                                // Total = Standard + Special.

                                                // Wait, if I have 0 standard items, Standard Fee = 2 RON (base).
                                                // If I have 1 special item, Special Fee = 0 (base).
                                                // Total = 2. Correct.

                                                // If I have 10 standard items (Rule > 5 = 10 RON).
                                                // Standard Fee = 10.
                                                // Total = 10. Correct.

                                                // If I have 10 standard (10 RON) + 10 special (Rule > 5 = 20 RON).
                                                // Total = 30. Correct.

                                                // What if I have 0 standard and 1 special?
                                                // Standard Fee = 2 (base) because 0 items? No, 0 items should be 0 fee.

                                                const stdFee = standardCount > 0 ? getFee(storeSettings.packaging_fee, storeSettings.fee_rules?.standard?.packaging, standardCount) : 0;
                                                const spcFee = specialCount > 0 ? getFee(0, storeSettings.fee_rules?.special?.packaging, specialCount) : 0;

                                                // If only special items, we might want the base fee to apply if no special rules?
                                                // Let's stick to the split.
                                                finalPackagingFee = stdFee + spcFee;

                                                // Fallback: If total items > 0 but fee is 0 (maybe base was 0?), keep it 0.
                                                // But if we have items and NO rules matched and base > 0, we want at least base.
                                                // The `stdFee` logic handles this for standard.
                                                // For special, if we have special items and no special rules, we charge 0?
                                                // Maybe we should use `storeSettings.packaging_fee` as base for special too IF standard count is 0?
                                                // This is getting complicated.

                                                // Let's simplify:
                                                // If (standardCount > 0) apply Standard Rules (base: global).
                                                // If (specialCount > 0) apply Special Rules (base: 0? or global?).
                                                // Let's assume Special items have their own rules or 0.
                                            } else {
                                                // No rules at all. Flat fee.
                                                finalPackagingFee = storeSettings.packaging_fee;
                                            }

                                            // Calculate Shipping Fee
                                            // Similar logic.
                                            // Standard: based on VALUE (RON).
                                            // Special: based on VALUE (RON).

                                            let finalShippingFee = 0;
                                            if (formData.deliveryType === 'delivery') {
                                                const hasStdShipRules = storeSettings.fee_rules?.standard?.delivery?.length > 0;
                                                const hasSpcShipRules = storeSettings.fee_rules?.special?.delivery?.length > 0;

                                                if (hasStdShipRules || hasSpcShipRules) {
                                                    const stdShip = standardCount > 0 ? getFee(storeSettings.shipping_fee, storeSettings.fee_rules?.standard?.delivery, standardSubtotal) : 0;
                                                    const spcShip = specialCount > 0 ? getFee(0, storeSettings.fee_rules?.special?.delivery, specialSubtotal) : 0;
                                                    finalShippingFee = stdShip + spcShip;
                                                } else {
                                                    finalShippingFee = storeSettings.shipping_fee;
                                                }
                                            }

                                            const total = subtotal + finalPackagingFee + finalShippingFee;

                                            return (
                                                <div className="pt-4 border-t-2 border-stone-200 space-y-2">
                                                    <div className="flex justify-between text-stone-600 text-sm">
                                                        <span>Taxă Ambalaj:</span>
                                                        <span>{finalPackagingFee.toFixed(2)} RON</span>
                                                    </div>
                                                    {formData.deliveryType === 'delivery' && (
                                                        <div className="flex justify-between text-stone-600 text-sm">
                                                            <span>Taxă Livrare (estimat):</span>
                                                            <span>{finalShippingFee.toFixed(2)} RON</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                                                        <div className="text-stone-600 font-bold">Total Estimativ:</div>
                                                        <div className="font-bold text-xl text-bakery-600">
                                                            {total.toFixed(2)} RON
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        <div className="py-4 border-t border-stone-200">
                                            <label className="block text-sm font-bold text-stone-700 mb-2">Metoda de Livrare:</label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                                                    className={`flex-1 py-2 px-2 rounded-lg text-sm font-bold border transition-all flex items-center justify-center gap-1 ${formData.deliveryType === 'pickup' ? 'bg-bakery-50 border-bakery-500 text-bakery-800 ring-1 ring-bakery-500' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                                                >
                                                    <ShoppingBag size={16} /> {dictionary.orderModal.buttons.pickup}
                                                </button>
                                                <button
                                                    onClick={() => setFormData({ ...formData, deliveryType: 'delivery' })}
                                                    className={`flex-1 py-2 px-2 rounded-lg text-sm font-bold border transition-all flex items-center justify-center gap-1 ${formData.deliveryType === 'delivery' ? 'bg-bakery-50 border-bakery-500 text-bakery-800 ring-1 ring-bakery-500' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                                                >
                                                    {/* Truck icon replacement */}
                                                    <span>🚚 {dictionary.orderModal.buttons.delivery}</span>
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStep(2)}
                                            disabled={cart.size === 0}
                                            className="w-full bg-bakery-500 hover:bg-bakery-600 disabled:bg-stone-300 text-white py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 flex justify-center items-center gap-2"
                                        >
                                            {dictionary.orderModal.buttons.next} <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                            <div className="bg-bakery-50 p-4 rounded-xl mb-6 text-center">
                                <h3 className="font-bold text-bakery-800 mb-2">{dictionary.orderModal.steps.details}</h3>
                                <p className="text-sm text-stone-600">{dictionary.orderModal.steps.details}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">{dictionary.orderModal.labels.name} {dictionary.orderModal.labels.optional}</label>
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
                                <label className="block text-sm font-bold text-stone-700 mb-1">{dictionary.orderModal.labels.phone} <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-bold text-stone-700 mb-1">{dictionary.orderModal.labels.date} <span className="text-red-500">*</span></label>
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

                            {/* Delivery Type moved to Step 1 */}

                            {formData.deliveryType === 'delivery' && (
                                <div className="animate-fade-in">
                                    <label className="block text-sm font-bold text-stone-700 mb-1">{dictionary.orderModal.labels.address} <span className="text-red-500">*</span></label>
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
                                {loading ? <Loader className="animate-spin" /> : <>{dictionary.orderModal.steps.review} <Check size={20} /></>}
                            </button>
                        </form>
                    )
                    }

                    {
                        step === 3 && (
                            <div className="max-w-2xl mx-auto space-y-6">
                                <div className="bg-bakery-50 p-6 rounded-xl border border-bakery-100">
                                    <h3 className="font-bold text-bakery-800 mb-4 text-lg border-b border-bakery-200 pb-2">{dictionary.orderModal.summary.title}</h3>

                                    {/* Items List */}
                                    <div className="space-y-3 mb-6">
                                        {Array.from(cart.values()).map(item => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold bg-white px-2 py-1 rounded border border-bakery-200">{item.quantity}x</span>
                                                    <span className="text-stone-700">{item.name}</span>
                                                </div>
                                                <span className="font-bold text-stone-800">
                                                    {storeSettings.pricing_enabled && item.price ? `${(item.price * item.quantity).toFixed(2)} RON` : ''}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Fees & Totals */}
                                    {storeSettings.pricing_enabled && (() => {
                                        const fees = calculateFees();
                                        return (
                                            <div className="border-t border-bakery-200 pt-4 space-y-2 text-sm">
                                                <div className="flex justify-between text-stone-600">
                                                    <span>{dictionary.orderModal.summary.subtotal}:</span>
                                                    <span>{fees.subtotal.toFixed(2)} RON</span>
                                                </div>
                                                {formData.deliveryType === 'delivery' && (
                                                    <div className="flex justify-between text-stone-600">
                                                        <span>{dictionary.orderModal.summary.shippingFee}:</span>
                                                        <span>{fees.shippingFee.toFixed(2)} RON</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between text-stone-600">
                                                    <span>{dictionary.orderModal.summary.packagingFee}:</span>
                                                    <span>{fees.packagingFee.toFixed(2)} RON</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-bold text-bakery-800 border-t border-bakery-200 pt-2 mt-2">
                                                    <span>{dictionary.orderModal.summary.total}:</span>
                                                    <span>{fees.total.toFixed(2)} RON</span>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                <div className="bg-white border border-stone-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-stone-800 mb-4 text-lg">{dictionary.orderModal.steps.details}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="block text-stone-500 text-xs uppercase font-bold">{dictionary.orderModal.labels.name}</span>
                                            <span className="font-medium">{formData.name || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-stone-500 text-xs uppercase font-bold">{dictionary.orderModal.labels.phone}</span>
                                            <span className="font-medium">{formData.phone}</span>
                                        </div>
                                        <div>
                                            <span className="block text-stone-500 text-xs uppercase font-bold">{dictionary.orderModal.labels.date}</span>
                                            <span className="font-medium">{new Date(formData.date).toLocaleDateString('ro-RO')}</span>
                                        </div>
                                        <div>
                                            <span className="block text-stone-500 text-xs uppercase font-bold">{dictionary.orderModal.labels.deliveryMethod}</span>
                                            <span className="font-medium">{formData.deliveryType === 'delivery' ? dictionary.orderModal.buttons.delivery : dictionary.orderModal.buttons.pickup}</span>
                                        </div>
                                        {formData.deliveryType === 'delivery' && (
                                            <div className="sm:col-span-2">
                                                <span className="block text-stone-500 text-xs uppercase font-bold">{dictionary.orderModal.labels.address}</span>
                                                <span className="font-medium">{formData.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={loading}
                                        className="flex-1 bg-stone-200 text-stone-700 font-bold py-4 rounded-xl hover:bg-stone-300 transition-colors"
                                    >
                                        {dictionary.orderModal.buttons.back}
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex-[2] bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        {loading ? <Loader className="animate-spin" /> : <>{dictionary.orderModal.buttons.submit} <Check size={24} /></>}
                                    </button>
                                </div>
                            </div>
                        )
                    }

                    {
                        step === 4 && (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                    <Check size={48} className="text-green-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-stone-800">{dictionary.orderModal.steps.success}</h3>
                                <p className="text-stone-600 max-w-md">
                                    {dictionary.orderModal.messages.successMessage}
                                </p>

                                {createdOrder?.friendly_id && (
                                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-2 animate-fade-in">
                                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{dictionary.orderModal.messages.orderId}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-mono font-bold text-bakery-600">#{createdOrder.friendly_id}</span>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`#${createdOrder.friendly_id}`);
                                                    setIsCopied(true);
                                                    setTimeout(() => setIsCopied(false), 2000);
                                                }}
                                                className="p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-500 relative"
                                                title="Copiază ID"
                                            >
                                                {isCopied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                                {isCopied && (
                                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap animate-fade-in">
                                                        {dictionary.orderModal.messages.copied}
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleClose}
                                    className="bg-bakery-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-bakery-600 transition-colors shadow-lg"
                                >
                                    {dictionary.orderModal.buttons.close}
                                </button>
                            </div>
                        )

                    }
                </div >

                {/* Footer Actions */}

                {
                    step === 2 && (
                        <div className="p-4 border-t bg-stone-50">
                            <button onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-800 font-bold text-sm">
                                ← {dictionary.orderModal.buttons.back}
                            </button>
                        </div>
                    )
                }
            </div >
            {/* Unpriced Items Warning Modal */}
            {
                showUnpricedWarning && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                            <div className="flex justify-center mb-4 text-amber-500">
                                <Phone size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-center text-stone-800 mb-2">Confirmare Preț</h3>
                            <p className="text-stone-600 text-center mb-6">
                                {dictionary.orderModal.messages.unpricedWarning}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowUnpricedWarning(false)}
                                    className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors"
                                >
                                    {dictionary.orderModal.buttons.cancel}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowUnpricedWarning(false);
                                        processOrderSubmission();
                                    }}
                                    className="flex-1 py-3 bg-bakery-500 hover:bg-bakery-600 text-white font-bold rounded-xl transition-colors"
                                >
                                    {dictionary.orderModal.buttons.confirmUnpriced}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Close Confirmation Modal */}
            {
                showCloseConfirm && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                            <div className="flex justify-center mb-4 text-red-500">
                                <X size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-center text-stone-800 mb-2">{dictionary.orderModal.buttons.close}?</h3>
                            <p className="text-stone-600 text-center mb-6">
                                {dictionary.orderModal.messages.closeWarning}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCloseConfirm(false)}
                                    className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors"
                                >
                                    {dictionary.orderModal.buttons.cancel}
                                </button>
                                <button
                                    onClick={confirmClose}
                                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
                                >
                                    {dictionary.orderModal.buttons.confirmClose}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default OrderModal;
