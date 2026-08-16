"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const OFFER_END = new Date("2026-04-20T23:59:59+05:30");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function OfferBanner() {
  const [timeLeft, setTimeLeft] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    function tick() {
      const diff = differenceInSeconds(OFFER_END, new Date());
      if (diff <= 0) {
        setTimeLeft({ d: "00", h: "00", m: "00", s: "00" });
        return;
      }
      const d = Math.floor(diff / 86400);
      const h = Math.floor((diff % 86400) / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setTimeLeft({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-12 bg-brand-ivory">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-deep p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-gold/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

          <div className="flex-1 space-y-5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-gold-light/20 border border-brand-gold-light/30 text-brand-gold-light text-[10px] font-bold uppercase px-4 py-2 tracking-[0.3em] rounded-full">
              <span className="animate-pulse w-2 h-2 rounded-full bg-brand-gold-light" />
              Eid Special
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              Luxury{" "}
              <span className="text-brand-gold-light italic">Eid</span>{" "}
              Collection <br />
              <span className="text-2xl font-sans font-bold text-brand-rose">
                Up to 40% OFF
              </span>
            </h2>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Premium embroidery &amp; fabrics. Free delivery to Patna, Gaya, Muzaffarpur &amp; all Bihar districts.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start items-center">
              <Link
                href="/abaya"
                className="bg-brand-gold text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-deep transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                Shop the Offer
              </Link>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
                  Ends in
                </p>
                <p className="text-white font-mono font-bold text-lg tracking-tight">
                  {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 relative z-10 w-full max-w-sm md:max-w-none">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=400&auto=format&fit=crop"
                  alt="Eid Collection Abaya"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden relative shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1560935104-da23eeca09dc?q=80&w=400&auto=format&fit=crop"
                  alt="Ethnic Wear"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop"
                  alt="Hijab Collection"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden relative bg-brand-gold flex flex-col items-center justify-center p-4 text-center shadow-xl">
                <p className="text-brand-deep font-black text-2xl leading-none">FREE</p>
                <p className="text-white font-bold text-[9px] uppercase tracking-widest mt-1">
                  Shipping over ₹5k
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
