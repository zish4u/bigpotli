"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { CURRENT_OFFER } from "@/lib/offer";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function OfferBanner() {
  const offer = CURRENT_OFFER;
  const [timeLeft, setTimeLeft] = useState<{ d: string; h: string; m: string; s: string } | null>(null);

  useEffect(() => {
    if (!offer.endDate) return;
    const endDate = new Date(offer.endDate);

    function tick() {
      const diff = differenceInSeconds(endDate, new Date());
      if (diff <= 0) {
        setTimeLeft(null);
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
  }, [offer.endDate]);

  return (
    <section className="py-12 bg-brand-ivory">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-deep p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-gold/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

          <div className="flex-1 space-y-5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-gold-light/20 border border-brand-gold-light/30 text-brand-gold-light text-[10px] font-bold uppercase px-4 py-2 tracking-[0.3em] rounded-full">
              <span className="animate-pulse w-2 h-2 rounded-full bg-brand-gold-light" />
              {offer.badgeLabel}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              {offer.headingPrefix}{" "}
              <span className="text-brand-gold-light italic">{offer.headingHighlight}</span>{" "}
              {offer.headingSuffix} <br />
              <span className="text-2xl font-sans font-bold text-brand-rose">
                {offer.discountText}
              </span>
            </h2>
            <p className="text-white/60 max-w-sm leading-relaxed">{offer.description}</p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start items-center">
              <Link
                href={offer.ctaHref}
                className="bg-brand-gold text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-deep transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                {offer.ctaLabel}
              </Link>
              {timeLeft && (
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
                    Ends in
                  </p>
                  <p className="text-white font-mono font-bold text-lg tracking-tight">
                    {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 relative z-10 w-full max-w-sm md:max-w-none">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl group">
                <Image
                  src={offer.images.primary.src}
                  alt={offer.images.primary.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden relative shadow-xl group">
                <Image
                  src={offer.images.secondary.src}
                  alt={offer.images.secondary.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl group">
                <Image
                  src={offer.images.tertiary.src}
                  alt={offer.images.tertiary.alt}
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
