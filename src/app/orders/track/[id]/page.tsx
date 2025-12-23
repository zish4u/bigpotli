"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Package, Truck, CheckCircle2, MapPin, Calendar, ArrowLeft, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OrderTrackingPage() {
    const { id } = useParams();
    const router = useRouter();

    // Mock tracking data
    const trackingSteps = [
        { title: "Order Placed", date: "Dec 21, 10:30 AM", status: "completed", icon: CheckCircle2 },
        { title: "Processing", date: "Dec 21, 02:45 PM", status: "completed", icon: ShieldCheck },
        { title: "Shipped", date: "Dec 22, 09:15 AM", status: "current", icon: Truck },
        { title: "Out for Delivery", date: "Pending", status: "upcoming", icon: Package },
        { title: "Delivered", date: "Pending", status: "upcoming", icon: MapPin },
    ];

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="bg-white py-12 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <button onClick={() => router.back()} className="text-sm font-bold text-gray-400 hover:text-brand-plum flex items-center gap-1 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to History
                    </button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className="font-serif text-4xl text-brand-plum">Track Your Order</h1>
                            <p className="text-gray-500 mt-2 font-mono font-bold">#{id}</p>
                        </div>
                        <div className="flex items-center gap-4 bg-brand-plum/5 px-6 py-3 rounded-2xl border border-brand-plum/10">
                            <Calendar className="w-5 h-5 text-brand-gold" />
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected Delivery</p>
                                <p className="text-sm font-bold text-brand-plum">Dec 27 - Dec 29, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Tracking Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                            <h2 className="text-xl font-bold font-serif text-brand-plum mb-10">Shipping Progress</h2>

                            <div className="space-y-12">
                                {trackingSteps.map((step, idx) => (
                                    <div key={idx} className="relative flex gap-6">
                                        {/* Line connection */}
                                        {idx !== trackingSteps.length - 1 && (
                                            <div className={`absolute left-4 top-10 bottom-0 w-0.5 ml-[11px] ${step.status === "completed" ? "bg-brand-gold" : "bg-gray-100"}`}></div>
                                        )}

                                        <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all ${step.status === "completed" ? "bg-brand-gold text-white" :
                                                step.status === "current" ? "bg-brand-plum text-white ring-4 ring-brand-plum/10" :
                                                    "bg-gray-100 text-gray-300"
                                            }`}>
                                            <step.icon className="w-4 h-4" />
                                        </div>

                                        <div className="space-y-1">
                                            <p className={`text-sm font-bold uppercase tracking-wider ${step.status === "upcoming" ? "text-gray-300" : "text-brand-plum-dark"
                                                }`}>
                                                {step.title}
                                            </p>
                                            <p className="text-xs text-gray-400 font-medium">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-brand-plum mb-6">Delivery Address</h3>
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                <MapPin className="w-6 h-6 text-brand-gold flex-shrink-0" />
                                <div className="text-sm text-gray-600 leading-relaxed uppercase font-bold tracking-tight">
                                    <p className="text-brand-plum-dark font-black">Zishan Ahmad</p>
                                    <p>123 Elegance Lane, Fashion District</p>
                                    <p>Dubai, UAE - 400102</p>
                                    <p>Contact: +91 91234 56789</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mini Summary */}
                    <div className="space-y-8">
                        <div className="bg-brand-plum text-white p-8 rounded-2xl shadow-xl space-y-6">
                            <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em]">Order Summary</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-60">Status</span>
                                    <span className="font-bold">Shipped</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-60">Courier</span>
                                    <span className="font-bold">Aramex / DHL</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-60">Tracking #</span>
                                    <span className="font-bold text-brand-gold">BPX-900123</span>
                                </div>
                            </div>
                            <button className="w-full bg-white text-brand-plum py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors">
                                View Invoice
                            </button>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-2xl bg-white space-y-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Need help?</p>
                            <p className="text-xs text-gray-500 text-center">Our concierge service is available 24/7 for you.</p>
                            <button className="w-full border border-brand-plum text-brand-plum py-3 rounded-full text-xs font-bold uppercase hover:bg-brand-plum hover:text-white transition-all">
                                Contact Concierge
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
