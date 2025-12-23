"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Truck, CreditCard, ArrowLeft, CheckCircle2, Tag, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { trackPurchase, trackBeginCheckout } from "@/lib/analytics";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart, applyCoupon, removeCoupon, discount, appliedCoupon } = useCartStore();
    const { isLoggedIn, user } = useAuthStore();

    const [couponInput, setCouponInput] = useState("");
    const [couponMessage, setCouponMessage] = useState<{ text: string, success: boolean } | null>(null);

    const [formData, setFormData] = useState({
        firstName: isLoggedIn ? user?.name.split(" ")[0] : "",
        lastName: isLoggedIn ? (user?.name.split(" ")[1] || "") : "",
        email: isLoggedIn ? user?.email : "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
    });

    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    useEffect(() => {
        if (cart.length > 0) {
            trackBeginCheckout(cart);
        }
    }, []);

    const subtotal = cart.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ""));
        return acc + price * item.quantity;
    }, 0);

    const shipping = subtotal > 15000 ? 0 : 500;
    const total = subtotal + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleApplyCoupon = () => {
        if (!couponInput) return;
        const result = applyCoupon(couponInput);
        setCouponMessage({ text: result.message, success: result.success });
        if (result.success) {
            setCouponInput("");
        }
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock order placement
        const orderId = `BP-ORDER-${Math.floor(Math.random() * 1000000000)}`;
        trackPurchase(orderId, total - discount, cart);
        setIsOrderPlaced(true);
        setTimeout(() => {
            clearCart();
            router.push("/");
        }, 5000);
    };

    if (cart.length === 0 && !isOrderPlaced) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-2xl font-serif text-brand-plum">Your cart is empty</h2>
                    <button onClick={() => router.push("/")} className="bg-brand-plum text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all">
                        Start Shopping
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    if (isOrderPlaced) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-grow flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 text-center space-y-6">
                        <div className="flex justify-center">
                            <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-brand-plum">Order Placed Successfully!</h2>
                        <p className="text-gray-600">
                            Thank you for chooses Bigpotli. Your order has been received and is being processed.
                            We'll send you an email with tracking details shortly.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-200">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Order Transaction ID</p>
                            <p className="text-sm font-mono font-bold text-brand-plum">BP-ORDER-782490123</p>
                        </div>
                        <p className="text-xs text-gray-400">Redirecting to home in 5 seconds...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-6 py-12">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-brand-plum hover:text-brand-gold mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Shopping
                </button>

                <h1 className="font-serif text-4xl text-brand-plum mb-12">Checkout</h1>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Shipping Information */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-brand-plum mb-8 flex items-center gap-3">
                                <Truck className="w-6 h-6 text-brand-gold" /> Shipping Address
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">First Name</label>
                                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Last Name</label>
                                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Shipping Address</label>
                                    <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">City</label>
                                    <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">State / Province</label>
                                    <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Zip / Postal Code</label>
                                    <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-brand-plum mb-8 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-brand-gold" /> Payment Method
                            </h2>

                            <div className="space-y-4">
                                <label className="flex items-center gap-4 p-4 border border-brand-plum bg-brand-plum/5 rounded-xl cursor-pointer">
                                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-brand-plum" />
                                    <div className="flex-grow">
                                        <p className="font-bold text-brand-plum">International Credit/Debit Card</p>
                                        <p className="text-xs text-gray-500">Secure checkout via Stripe</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input type="radio" name="payment" className="w-5 h-5 accent-brand-plum" />
                                    <div className="flex-grow">
                                        <p className="font-bold text-gray-700">UPI / Local Wallet (India Only)</p>
                                        <p className="text-xs text-gray-500">Fast checkout via PhonePe/Razorpay</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 opacity-50">
                                    <input type="radio" name="payment" disabled className="w-5 h-5 accent-brand-plum" />
                                    <div className="flex-grow">
                                        <p className="font-bold text-gray-700">Cash on Delivery</p>
                                        <p className="text-xs text-gray-500 italic text-red-400">Not available for international orders</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-32">
                            <h2 className="text-xl font-bold font-serif text-brand-plum mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-16 w-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            <span className="absolute -top-1 -right-1 bg-brand-plum text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="text-sm font-bold text-brand-plum-dark truncate">{item.name}</h4>
                                            <p className="text-xs text-brand-gold font-bold uppercase">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Code */}
                            <div className="mb-8 pt-6 border-t border-gray-100">
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Have a Coupon?</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                        className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-all text-sm font-bold uppercase"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="bg-brand-plum text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-md active:scale-95"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponMessage && (
                                    <p className={`mt-2 text-xs font-bold ${couponMessage.success ? "text-green-600" : "text-red-500"}`}>
                                        {couponMessage.text}
                                    </p>
                                )}
                                {appliedCoupon && (
                                    <div className="mt-3 inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-3 py-1.5 rounded-full border border-brand-gold/20">
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{appliedCoupon} Applied</span>
                                        <button
                                            type="button"
                                            onClick={() => { removeCoupon(); setCouponMessage(null); }}
                                            className="hover:text-brand-plum transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount ({appliedCoupon})</span>
                                        <span className="font-bold">-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Estimated Shipping</span>
                                    <span className={`${shipping === 0 ? "text-green-600 font-bold" : "font-bold"}`}>
                                        {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax GST (12%)</span>
                                    <span className="font-bold">Included</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-brand-plum pt-4 border-t border-brand-plum/10">
                                    <span>Total</span>
                                    <span className="text-brand-gold">₹{Math.max(0, total - discount).toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-plum text-white py-4 rounded-full mt-8 font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-lg hover:shadow-2xl"
                            >
                                Place Order Now
                            </button>

                            <div className="mt-6 flex flex-col items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3 text-green-500" /> Secure SSL Encryption
                                </div>
                                <p>Guaranteed Safe Checkout</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </main>
    );
}
