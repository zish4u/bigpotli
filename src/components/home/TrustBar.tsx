import { Truck, CreditCard, RefreshCw, MessageCircle } from "lucide-react";

const ITEMS = [
  { icon: Truck, label: "Free Delivery in Bihar", sub: "Orders over ₹5,000" },
  { icon: CreditCard, label: "COD Available", sub: "Pay on delivery" },
  { icon: RefreshCw, label: "Easy Returns", sub: "7-day return policy" },
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
              className="flex items-center gap-3 text-white"
            >
              <Icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
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
