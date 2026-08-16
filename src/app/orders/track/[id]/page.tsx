"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Package, Truck, CheckCircle2, MapPin, ArrowLeft, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";

interface ShippingAddress {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

interface OrderDetail {
    id: string;
    created_at: string | null;
    status: string | null;
    total: number;
    payment_id: string | null;
    shipping_address: ShippingAddress | null;
    order_items: { id: number; quantity: number; price: number; products: { name: string } | null }[];
}

const STATUS_COPY: Record<string, { label: string; icon: typeof CheckCircle2 }> = {
    confirmed: { label: "Order Confirmed", icon: CheckCircle2 },
    shipped: { label: "Shipped", icon: Truck },
    delivered: { label: "Delivered", icon: MapPin },
    cancelled: { label: "Cancelled", icon: Package },
};

export default function OrderTrackingPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [order, setOrder] = useState<OrderDetail | null | undefined>(undefined);

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (!user) {
                router.replace("/login");
                return;
            }

            const { data } = await supabase
                .from("orders")
                .select("id, created_at, status, total, payment_id, shipping_address, order_items(id, quantity, price, products(name))")
                .eq("id", id)
                .eq("user_id", user.id)
                .single();

            setOrder((data as unknown as OrderDetail) ?? null);
        });
    }, [id, router]);

    if (order === undefined) {
        return (
            <main className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center py-24">
                    <p className="text-gray-400 font-medium">Loading order...</p>
                </div>
                <Footer />
            </main>
        );
    }

    const status = order?.status?.toLowerCase() ?? "confirmed";
    const statusCopy = STATUS_COPY[status] ?? STATUS_COPY.confirmed;
    const StatusIcon = statusCopy.icon;
    const address = order?.shipping_address;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="bg-white py-12 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <button onClick={() => router.push("/orders/history")} className="text-sm font-bold text-gray-400 hover:text-brand-plum flex items-center gap-1 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to History
                    </button>
                    <h1 className="font-serif text-4xl text-brand-plum">Order Details</h1>
                    {order && <p className="text-gray-500 mt-2">#{order.id.slice(0, 8).toUpperCase()}</p>}
                </div>
            </div>

            <div className="flex-grow container mx-auto px-6 py-12">
                {!order ? (
                    <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-serif text-brand-plum">Order not found</h3>
                        <p className="text-gray-500">
                            We couldn&apos;t find that order, or it doesn&apos;t belong to your account.
                        </p>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                                <StatusIcon className="w-6 h-6 text-brand-gold" />
                            </div>
                            <div>
                                <p className="font-serif text-xl text-brand-plum">{statusCopy.label}</p>
                                <p className="text-sm text-gray-500">
                                    {order.created_at
                                        ? `Placed on ${new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`
                                        : "Placed recently"}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Items</h2>
                            {order.order_items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                                    <div>
                                        <p className="text-sm font-bold text-brand-plum-dark">{item.products?.name ?? "Product"}</p>
                                        <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-brand-plum-dark">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <p className="text-sm font-bold text-gray-500">Total</p>
                                <p className="text-lg font-bold text-brand-gold">{formatPrice(order.total)}</p>
                            </div>
                        </div>

                        {address && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-2">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Shipping To</h2>
                                <p className="text-sm font-bold text-brand-plum-dark">
                                    {[address.firstName, address.lastName].filter(Boolean).join(" ")}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {[address.address, address.city, address.state, address.zipCode].filter(Boolean).join(", ")}
                                </p>
                                {address.phone && <p className="text-sm text-gray-600">{address.phone}</p>}
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest justify-center">
                            <ShieldCheck className="w-4 h-4 text-brand-gold" />
                            Payment Verified
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
