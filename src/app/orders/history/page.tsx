"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";

// Mock data for order history
const MOCK_ORDERS = [
    {
        id: "BP-00129",
        date: "Dec 15, 2024",
        status: "Delivered",
        amount: "₹12,499",
        items: [
            { name: "Luxury Embroidered Abaya", image: "https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=200&auto=format&fit=crop" }
        ]
    },
    {
        id: "BP-00245",
        date: "Dec 21, 2024",
        status: "Processing",
        amount: "₹4,250",
        items: [
            { name: "Premium Chiffon Hijab", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop" },
            { name: "Cotton Basic Abaya", image: "https://images.unsplash.com/photo-1609357605129-26f69abb5db8?q=80&w=200&auto=format&fit=crop" }
        ]
    }
];

export default function OrderHistoryPage() {
    const { isLoggedIn, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login"); // Only for logged in users
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="bg-white py-12 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <button onClick={() => router.push("/")} className="text-sm font-bold text-gray-400 hover:text-brand-plum flex items-center gap-1 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Store
                    </button>
                    <h1 className="font-serif text-4xl text-brand-plum">Order History</h1>
                    <p className="text-gray-500 mt-2">Manage and track your previous purchases</p>
                </div>
            </div>

            <div className="flex-grow container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto space-y-6">
                    {MOCK_ORDERS.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                            <div className="flex flex-col md:flex-row justify-between pb-6 border-b border-gray-50 gap-4">
                                <div className="flex gap-10">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Placed</p>
                                        <p className="text-sm font-bold text-brand-plum-dark">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                        <p className="text-sm font-bold text-brand-plum-dark">{order.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                        <p className="text-sm font-bold text-brand-plum-dark">#{order.id}</p>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/orders/track/${order.id}`} className="bg-gray-50 text-brand-plum px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-plum hover:text-white transition-all inline-flex items-center gap-2">
                                        Track Order <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${order.status === "Delivered" ? "bg-green-500" : "bg-blue-500"}`}></span>
                                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider font-mono">{order.status}</p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                            <div className="relative h-16 w-12 rounded-md overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <p className="text-xs font-bold text-brand-plum-dark max-w-[150px] line-clamp-2">{item.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {MOCK_ORDERS.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-serif text-brand-plum">No orders yet</h3>
                            <p className="text-gray-500">You haven't placed any orders with Bigpotli yet.</p>
                            <Link href="/" className="inline-block mt-6 text-brand-gold font-bold underline">Start Shopping</Link>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
