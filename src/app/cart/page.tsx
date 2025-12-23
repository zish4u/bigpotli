"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Plus, Minus, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCartStore();

    const subtotal = cart.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ""));
        return acc + price * item.quantity;
    }, 0);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-6">
                    <h1 className="font-serif text-4xl text-brand-plum mb-2">Shopping Cart</h1>
                    <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">
                        {cartCount} {cartCount === 1 ? "Item" : "Items"} in your bag
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                {cart.length === 0 ? (
                    <div className="text-center py-20 space-y-6">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-12 h-12 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-serif text-brand-plum">Your cart is empty</h2>
                        <p className="text-gray-500 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-brand-plum text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-lg">
                            Start Shopping <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="hidden md:grid grid-cols-4 gap-4 pb-4 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <div className="col-span-2">Product</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Total</div>
                            </div>

                            {cart.map((item) => {
                                const itemPrice = parseInt(item.price.replace(/[^\d]/g, ""));
                                return (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center pb-8 border-b border-gray-100">
                                        <div className="col-span-2 flex gap-6">
                                            <div className="relative h-32 w-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xs text-brand-gold font-bold uppercase tracking-widest">{item.category}</p>
                                                <h3 className="font-serif text-xl text-brand-plum">{item.name}</h3>
                                                <p className="text-gray-500 font-bold">{item.price}</p>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-xs text-red-500 font-bold uppercase flex items-center gap-1 hover:text-red-700 transition-colors"
                                                >
                                                    <X className="w-3 h-3" /> Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-50 text-brand-plum transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-bold text-brand-plum">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-50 text-brand-plum transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xl font-bold text-brand-plum">₹{(itemPrice * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-32">
                                <h2 className="text-xl font-bold font-serif text-brand-plum mb-6">Order Summary</h2>

                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span className={`${subtotal > 15000 ? "text-green-600 font-bold" : "font-bold"}`}>
                                            {subtotal > 15000 ? "FREE" : "₹500"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Estimated Tax (GST)</span>
                                        <span className="font-bold">Included</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-bold text-brand-plum pt-6 border-t border-brand-plum/10 mt-6">
                                        <span>Total</span>
                                        <span className="text-brand-gold">₹{(subtotal + (subtotal > 15000 ? 0 : 500)).toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full bg-brand-plum text-white py-4 rounded-full mt-8 font-bold uppercase tracking-widest hover:bg-brand-plum-light transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                                >
                                    Checkout <ArrowRight className="w-5 h-5" />
                                </Link>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-widest leading-none">
                                        <ShieldCheck className="w-5 h-5 text-brand-gold" />
                                        Secure Checkout
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-widest leading-none">
                                        <Truck className="w-5 h-5 text-brand-gold" />
                                        Reliable Delivery
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
