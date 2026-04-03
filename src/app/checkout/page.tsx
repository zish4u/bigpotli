"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { ShieldCheck, Truck, CreditCard, ArrowLeft, CheckCircle2, Tag, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { trackPurchase, trackBeginCheckout } from "@/lib/analytics";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart, applyCoupon, removeCoupon, discount, appliedCoupon } = useCartStore();

    const [couponInput, setCouponInput] = useState("");
    const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [placedOrderId, setPlacedOrderId] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "Bihar",
        zipCode: "",
        country: "India",
    });

    useEffect(() => {
        if (cart.length > 0) {
            trackBeginCheckout(cart);
        }
    }, []);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 5000 ? 0 : 500;
    const total = Math.max(0, subtotal + shipping - discount);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleApplyCoupon = () => {
        if (!couponInput) return;
        const result = applyCoupon(couponInput);
        setCouponMessage({ text: result.message, success: result.success });
        if (result.success) setCouponInput("");
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // 1. Create Razorpay order
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ total }),
            });

            if (!res.ok) throw new Error("Failed to create payment order");
            const { order_id, amount, currency } = await res.json();

            // 2. Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount,
                currency,
                name: "Bigpotli",
                description: "Ethnic & Modest Wear",
                order_id,
                handler: async (response: {
                    razorpay_order_id: string;
                    razorpay_payment_id: string;
                    razorpay_signature: string;
                }) => {
                    // 3. Verify payment server-side and save order
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...response,
                            cart,
                            shippingAddress: formData,
                            total,
                        }),
                    });

                    if (verifyRes.ok) {
                        const { order_id: savedOrderId } = await verifyRes.json();
                        trackPurchase(savedOrderId, total, cart);
                        setPlacedOrderId(savedOrderId);
                        clearCart();
                        setIsOrderPlaced(true);
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
                },
                theme: { color: "#8B4A6E" },
                modal: {
                    ondismiss: () => setIsProcessing(false),
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment error:", err);
            alert("Something went wrong. Please try again.");
            setIsProcessing(false);
        }
    };

    if (cart.length === 0 && !isOrderPlaced) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-2xl font-serif text-brand-plum">Your cart is empty</h2>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-brand-plum text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all"
                    >
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
                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
                        <h2 className="text-3xl font-serif font-bold text-brand-plum">Order Confirmed!</h2>
                        <p className="text-gray-600">
                            Thank you for shopping at Bigpotli. Your order has been confirmed and will be processed shortly.
                        </p>
                        {placedOrderId && (
                            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-200">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Order ID</p>
                                <p className="text-sm font-mono font-bold text-brand-plum">{placedOrderId}</p>
                            </div>
                        )}
                        <button
                            onClick={() => router.push("/")}
                            className="w-full bg-brand-plum text-white py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <main className="min-h-screen bg-gray-50 flex flex-col">
                <Header />

                <div className="flex-grow container mx-auto px-6 py-12">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm font-bold text-brand-plum hover:text-brand-gold mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <h1 className="font-serif text-4xl text-brand-plum mb-12">Checkout</h1>

                    <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
                                        <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Street Address</label>
                                        <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">City</label>
                                        <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">State</label>
                                        <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Pin Code</label>
                                        <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-brand-plum mb-4 flex items-center gap-3">
                                    <CreditCard className="w-6 h-6 text-brand-gold" /> Payment
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Secure payment via Razorpay — UPI, Cards, Net Banking, Wallets all accepted.
                                </p>
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
                                                <p className="text-xs text-brand-gold font-bold">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Coupon */}
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
                                            <Tag className="w-3 h-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{appliedCoupon} Applied</span>
                                            <button type="button" onClick={() => { removeCoupon(); setCouponMessage(null); }}>
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
                                        <span>Shipping</span>
                                        <span className={`${shipping === 0 ? "text-green-600 font-bold" : "font-bold"}`}>
                                            {shipping === 0 ? "FREE" : `₹${shipping}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-400">
                                        <span>Tax (GST 12%)</span>
                                        <span>Included</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-brand-plum pt-4 border-t border-brand-plum/10">
                                        <span>Total</span>
                                        <span className="text-brand-gold">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-brand-plum text-white py-4 rounded-full mt-8 font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-lg hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? "Opening Razorpay..." : `Pay ₹${total.toLocaleString()}`}
                                </button>

                                <div className="mt-6 flex flex-col items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                    <div className="flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3 text-green-500" /> Secured by Razorpay
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <Footer />
            </main>
        </>
    );
}
