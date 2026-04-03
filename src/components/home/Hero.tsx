import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1920&auto=format&fit=crop"
        alt="Modest & Ethnic Wear for Women in Bihar"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/70 via-brand-deep/30 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl space-y-6">
            <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.4em]">
              Bihar&apos;s Trusted Modest Wear Store
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              Modest &amp; Ethnic Wear{" "}
              <span className="text-brand-gold italic">for Women</span>{" "}
              in Bihar
            </h1>
            <p className="text-white/80 text-lg max-w-lg leading-relaxed">
              Shop abayas, hijabs, kurti sets &amp; unstitched suits online.
              Free delivery across Bihar — Patna, Gaya, Muzaffarpur &amp; all districts.
              COD available.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/abaya"
                className="bg-brand-gold text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-deep transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 group"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/unstitched"
                className="border-2 border-white/60 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-deep transition-all"
              >
                View Unstitched
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
