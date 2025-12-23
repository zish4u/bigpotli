"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-plum-dark text-white pt-24 pb-20 mt-auto">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
                <div className="space-y-6">
                    <h2 className="text-3xl font-serif text-brand-gold font-bold">Bigpotli</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Bigpotli is your premiere destination for exquisite Indian ethnic wear and modest fashion. We celebrate womanhood with grace and style.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-brand-gold transition-all text-white hover:scale-110"><Instagram className="w-5 h-5" /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-brand-gold transition-all text-white hover:scale-110"><Facebook className="w-5 h-5" /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full hover:bg-brand-gold transition-all text-white hover:scale-110"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-serif text-xl text-brand-gold mb-6 font-semibold">Discovery</h4>
                    <ul className="space-y-4 text-gray-400 text-sm font-medium">
                        <li><Link href="/category/unstitched" className="hover:text-brand-gold transition-colors">Unstitched Collection</Link></li>
                        <li><Link href="/category/abaya" className="hover:text-brand-gold transition-colors">Luxury Abayas</Link></li>
                        <li><Link href="/category/hijab" className="hover:text-brand-gold transition-colors">Premium Hijabs</Link></li>
                        <li><Link href="/new-arrivals" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-xl text-brand-gold mb-6 font-semibold">Contact Us</h4>
                    <ul className="space-y-4 text-gray-400 text-sm font-medium">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                            <span>123 Elegance Lane, Fashion Colony,<br />Mumbai, MH 400001</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-brand-gold flex-shrink-0" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-brand-gold flex-shrink-0" />
                            <span>support@bigpotli.com</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-xl text-brand-gold mb-6 font-semibold">Newsletter</h4>
                    <p className="text-gray-400 text-sm mb-6">Subscribe to receive exclusive offers and early access to new collections.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl flex-1 text-sm focus:outline-none focus:border-brand-gold transition-all w-full"
                        />
                        <button className="bg-brand-gold text-white px-8 py-3 rounded-xl hover:bg-brand-gold/80 transition-all font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-brand-gold/20 whitespace-nowrap">Join</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-12 text-center">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    © 2024 Bigpotli. All Rights Reserved. Designed for Grace.
                </p>
            </div>
        </footer>
    );
}
