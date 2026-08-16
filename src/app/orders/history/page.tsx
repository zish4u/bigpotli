"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    products: { name: string; slug: string } | null;
}

interface Order {
    id: string;
    created_at: string | null;
    status: string | null;
    total: number;
    order_items: OrderItem[];
}

export default function OrderHistoryPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (!user) {
                router.replace("/login");
                return;
            }

            const { data } = await supabase
                .from("orders")
                .select("id, created_at, status, total, order_items(id, quantity, price, products(name, slug))")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            setOrders((data as unknown as Order[]) ?? []);
            setLoading(false);
        });
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center py-24">
                    <p className="text-gray-400 font-medium">Loading your orders...</p>
                </div>
                <Footer />
            </main>
        );
    }

    if (!orders) return null;

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
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                            <div className="flex flex-col md:flex-row justify-between pb-6 border-b border-gray-50 gap-4">
                                <div className="flex gap-10">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Placed</p>
                                        <p className="text-sm font-bold text-brand-plum-dark">
                                            {order.created_at
                                                ? new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                                                : "—"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                        <p className="text-sm font-bold text-brand-plum-dark">{formatPrice(order.total)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                        <p className="text-sm font-bold text-brand-plum-dark">#{order.id.slice(0, 8).toUpperCase()}</p>
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
                                    <span className={`w-3 h-3 rounded-full ${order.status === "delivered" ? "bg-green-500" : "bg-blue-500"}`}></span>
                                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider font-mono">{order.status ?? "confirmed"}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {order.order_items.map((item) => (
                                        <div key={item.id} className="flex gap-3 items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                                            <p className="text-xs font-bold text-brand-plum-dark max-w-[180px] line-clamp-2">
                                                {item.products?.name ?? "Product"}
                                            </p>
                                            <span className="text-[11px] text-gray-400 font-bold flex-shrink-0">× {item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
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
