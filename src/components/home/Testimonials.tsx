import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Fatima Khatoon",
    city: "Patna",
    rating: 5,
    text: "Finally found an abaya store that delivers to Bihar! The quality is amazing and I got my order in 3 days. Will definitely order again.",
  },
  {
    name: "Zainab Ansari",
    city: "Muzaffarpur",
    rating: 5,
    text: "The chiffon hijab is so light and beautiful. Exactly as shown in the photos. COD option made it very easy to order.",
  },
  {
    name: "Rukhsana Begum",
    city: "Gaya",
    rating: 5,
    text: "I bought the unstitched suit for Eid. Fabric quality is excellent. My tailor loved it too. Highly recommend Bigpotli!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
            Reviews
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-deep">
            What Women Say
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-brand-ivory rounded-2xl p-7 border border-brand-rose/20"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-gold fill-current" />
                ))}
              </div>
              <p className="text-brand-muted leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-brand-deep text-sm">{t.name}</p>
                <p className="text-brand-muted text-xs">{t.city}, Bihar</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
