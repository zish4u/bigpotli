import { MapPin } from "lucide-react";

interface Props {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  patna?: string;
}

export default function BiharDistrictCoverage({
  tier1,
  tier2,
  tier3,
  patna = "Patna",
}: Props) {
  const districts = [patna, ...tier1, ...tier2, ...tier3];

  return (
    <section id="bihar-districts" className="bg-brand-deep py-14 scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-2">
          We Deliver Across Bihar
        </h2>
        <p className="text-white/50 text-sm text-center max-w-xl mx-auto mb-8">
          From Patna to the farthest reaches of Seemanchal, we ship free to
          every corner of Bihar — with Cash on Delivery on orders above
          ₹1,000.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {districts.map((district) => {
            const isTier1 = district === patna || tier1.includes(district);
            return (
              <span
                key={district}
                className={
                  isTier1
                    ? "flex items-center gap-1.5 bg-brand-gold-light/20 border border-brand-gold-light/30 text-brand-gold-light text-xs md:text-sm px-3.5 py-1.5 rounded-full font-semibold"
                    : "flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/70 text-xs md:text-sm px-3.5 py-1.5 rounded-full"
                }
              >
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {district}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
