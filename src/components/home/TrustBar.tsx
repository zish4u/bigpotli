import { Truck, CreditCard, RefreshCw, MessageCircle } from "lucide-react";

const ITEMS = [
  { icon: Truck, label: "Free Delivery in Bihar", sub: "Orders over ₹5,000" },
  { icon: CreditCard, label: "COD Available", sub: "Orders over ₹1,000" },
  { icon: RefreshCw, label: "Easy Exchanges", sub: "48-hour exchange window" },
  { icon: MessageCircle, label: "WhatsApp Support", sub: "Hijab shop near me" },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-deep py-5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ITEMS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 text-white text-center"
            >
              <Icon className="w-5 h-5 text-brand-gold-light flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide leading-tight">
                  {label}
                </p>
                <p className="text-[10px] text-white/50 leading-tight">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
