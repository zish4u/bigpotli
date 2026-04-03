import { MapPin } from "lucide-react";

const CITIES = [
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Bhagalpur",
  "Darbhanga",
  "Purnia",
  "Arrah",
  "Begusarai",
  "Katihar",
  "Munger",
];

export default function BiharSection() {
  return (
    <section className="py-20 bg-brand-deep overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
          Loved Across Bihar
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
          Delivering to Every Corner of Bihar
        </h2>
        <p className="text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
          From Patna to Purnea, we deliver abayas, hijabs, and ethnic wear across
          Bihar with free shipping on orders over ₹5,000 and COD available everywhere.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CITIES.map((city) => (
            <div
              key={city}
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-2 rounded-full"
            >
              <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
              {city}
            </div>
          ))}
          <div className="flex items-center gap-1.5 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-sm px-4 py-2 rounded-full font-bold">
            + All Bihar Districts
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { num: "10,000+", label: "Happy Customers" },
            { num: "4.8★", label: "Average Rating" },
            { num: "500+", label: "Products in Stock" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="font-serif text-3xl text-brand-gold font-bold">{num}</p>
              <p className="text-white/50 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
