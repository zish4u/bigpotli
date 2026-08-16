import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, effectiveDate, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="bg-brand-ivory border-b border-gray-100">
        <div className="container mx-auto px-6 pt-6 pb-8">
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-plum-dark">{title}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl text-brand-deep font-bold">{title}</h1>
          <p className="text-brand-muted text-xs uppercase tracking-widest font-bold mt-2">
            Effective {effectiveDate}
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-6 py-12 pb-24 md:pb-12">
        <article className="max-w-3xl policy-article">{children}</article>
      </main>

      <Footer />
      <MobileNav />
      <WhatsAppButton />
    </div>
  );
}
