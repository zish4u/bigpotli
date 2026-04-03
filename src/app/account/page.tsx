"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Order } from "@/types/database.types";
import { Package, User, LogOut, ChevronRight } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      const [{ data: prof }, { data: ords }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      setProfile(prof);
      setOrders(ords ?? []);
      setLoading(false);
    });
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-ivory">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-10 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl text-brand-deep font-bold mb-8">
          My Account
        </h1>

        {/* Profile */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-brand-rose/30 flex items-center justify-center">
              <User className="w-6 h-6 text-brand-plum" />
            </div>
            <div>
              <p className="font-bold text-brand-deep">
                {profile?.full_name ?? "—"}
              </p>
              <p className="text-brand-muted text-sm">{profile?.phone ?? "No phone"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: "City", value: profile?.city },
              { label: "State", value: profile?.state ?? "Bihar" },
              { label: "Pincode", value: profile?.pincode },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-brand-muted text-xs uppercase tracking-wide mb-0.5">
                  {label}
                </p>
                <p className="text-brand-deep font-medium">{value ?? "—"}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Orders */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <Package className="w-5 h-5 text-brand-gold" />
            <h2 className="font-bold text-brand-deep text-lg">Recent Orders</h2>
          </div>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-brand-muted text-sm">No orders yet.</p>
              <Link
                href="/abaya"
                className="inline-block mt-4 text-brand-gold font-bold text-sm hover:underline"
              >
                Start Shopping →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="font-bold text-brand-deep text-sm font-mono">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-brand-muted text-xs">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString("en-IN")
                        : "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-brand-plum">
                      ₹{order.total.toLocaleString("en-IN")}
                    </p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        order.status === "delivered"
                          ? "bg-brand-green/10 text-brand-green"
                          : order.status === "cancelled"
                          ? "bg-red-50 text-red-500"
                          : "bg-brand-gold/10 text-brand-gold"
                      }`}
                    >
                      {order.status ?? "pending"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-muted/30" />
                </div>
              ))}
            </div>
          )}
        </section>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-red-500 font-bold hover:text-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </main>

      <Footer />
    </div>
  );
}
