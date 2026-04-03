"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
    setEmail("");
  }

  return (
    <section className="py-20 bg-brand-ivory">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
          Stay Updated
        </p>
        <h2 className="font-serif text-4xl text-brand-deep mb-3">
          Get Exclusive Deals
        </h2>
        <p className="text-brand-muted mb-8">
          Subscribe for Eid specials, new arrivals, and exclusive discounts —
          delivered to your inbox.
        </p>

        {status === "done" ? (
          <div className="bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-2xl p-5 font-bold">
            Thank you! You&apos;re now subscribed.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 min-h-[52px] px-5 rounded-full border-2 border-brand-rose/40 bg-white text-brand-deep placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold text-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="min-h-[52px] px-7 bg-brand-gold text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-plum transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
              aria-label="Subscribe to newsletter"
            >
              <Send className="w-4 h-4" />
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
