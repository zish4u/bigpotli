"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, User, Heart, LogOut, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { SITE_ANNOUNCEMENT } from "@/lib/announcement";

function toAuthUser(supabaseUser: SupabaseUser) {
    return {
        id: supabaseUser.id,
        name:
            (supabaseUser.user_metadata?.full_name as string | undefined) ||
            supabaseUser.email?.split("@")[0] ||
            "Account",
        email: supabaseUser.email ?? "",
    };
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { isLoggedIn, user, login, logout } = useAuthStore();
    const { cart, wishlist } = useCartStore();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = wishlist.length;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Cart/wishlist use skipHydration so the client's first render matches
    // the server's; rehydrate from localStorage here, once, after mount.
    // (useAuthStore also uses skipHydration but is never rehydrated from its
    // own localStorage snapshot — the effect below always repopulates it
    // from the real Supabase session instead, so pulling in the possibly
    // stale local copy first would just risk a flash of wrong data.)
    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    // Mirror the real Supabase session into the local auth store so the
    // header (and everything reading useAuthStore) reflects who's actually
    // signed in, not stale/mocked local state.
    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(({ data: { user: supabaseUser } }) => {
            if (supabaseUser) login(toAuthUser(supabaseUser));
            else logout();
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) login(toAuthUser(session.user));
            else logout();
        });

        return () => subscription.unsubscribe();
    }, [login, logout]);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        logout();
        setIsUserMenuOpen(false);
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"}`}>
            {/* Top Banner */}
            {SITE_ANNOUNCEMENT && (
                <div className="bg-brand-plum py-2 px-4 text-center">
                    <p className="text-white text-xs font-medium tracking-widest uppercase">
                        {SITE_ANNOUNCEMENT}
                    </p>
                </div>
            )}

            <nav className="container mx-auto px-4 md:px-6">
                <div className="flex h-20 md:h-28 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-brand-plum" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
                        <Image
                            src="/logo_old.jpg"
                            alt="Bigpotli Logo"
                            width={64}
                            height={64}
                            className="h-10 w-10 md:h-14 md:w-14 rounded-full mix-blend-multiply"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-brand-plum-dark">
                        <li><Link href="/abaya" className="hover:text-brand-gold transition-colors">Abaya</Link></li>
                        <li><Link href="/pakistani-suit" className="hover:text-brand-gold transition-colors">Pakistani Suit</Link></li>
                        <li><Link href="/new-arrivals" className="text-brand-gold hover:text-brand-plum transition-colors">New Arrivals</Link></li>
                    </ul>

                    {/* Actions */}
                    <div className="flex items-center space-x-3 md:space-x-5">
                        <button className="p-2 text-brand-plum hover:text-brand-gold transition-colors hidden sm:block">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-1 p-2 text-brand-plum hover:text-brand-gold transition-colors"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <User className="w-5 h-5" />
                                {isLoggedIn && <span className="hidden md:block text-xs font-bold">{user?.name}</span>}
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {isLoggedIn ? (
                                        <>
                                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                                <p className="text-xs text-gray-400">Signed in as</p>
                                                <p className="text-sm font-bold text-brand-plum truncate">{user?.email}</p>
                                            </div>
                                            <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-plum">Account Settings</Link>
                                            <Link href="/orders/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-plum">Order History</Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-plum">Sign In</Link>
                                            <Link href="/signup" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-plum">Create Account</Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link href="/wishlist" className="p-2 text-brand-plum hover:text-brand-gold transition-colors relative hidden sm:block">
                            <Heart className="w-5 h-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/cart" className="p-2 text-brand-plum hover:text-brand-gold transition-colors relative">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-brand-plum text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu (Overlay) */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white fixed inset-0 z-50 p-6 flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <Image src="/logo_old.jpg" alt="Logo" width={48} height={48} className="h-8 w-8 rounded-full" />
                            <button onClick={() => setIsMenuOpen(false)} className="p-4"><X className="w-6 h-6" /></button>
                        </div>
                        <ul className="flex flex-col space-y-6 text-xl font-bold uppercase tracking-wider text-brand-plum-dark">
                            <li><Link href="/abaya" onClick={() => setIsMenuOpen(false)}>Abaya</Link></li>
                            <li><Link href="/pakistani-suit" onClick={() => setIsMenuOpen(false)}>Pakistani Suit</Link></li>
                            <li><Link href="/new-arrivals" onClick={() => setIsMenuOpen(false)} className="text-brand-gold">New Arrivals</Link></li>
                            <hr className="border-gray-100" />
                            {isLoggedIn ? (
                                <>
                                    <li><Link href="/account" onClick={() => setIsMenuOpen(false)}>My Account</Link></li>
                                    <li><Link href="/orders/history" onClick={() => setIsMenuOpen(false)}>My Orders</Link></li>
                                    <li><button onClick={() => { handleSignOut(); setIsMenuOpen(false); }} className="text-red-600">Sign Out</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link></li>
                                    <li><Link href="/signup" onClick={() => setIsMenuOpen(false)}>Join Us</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
