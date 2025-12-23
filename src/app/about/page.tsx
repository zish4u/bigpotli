import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Story Section */}
                <section className="py-24 container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h1 className="font-serif text-5xl md:text-7xl text-brand-plum underline decoration-brand-gold/30 underline-offset-8">Our Story</h1>
                        <p className="text-xl text-gray-600 leading-relaxed italic">
                            Bigpotli was born out of a desire to blend the timeless traditional silhouettes of the Indian subcontinent with the modest requirements of modern women.
                        </p>
                        <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
                    </div>
                </section>

                {/* Vision Image */}
                <section className="relative h-[60vh] w-full">
                    <Image
                        src="https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=1920&auto=format&fit=crop"
                        alt="Bigpotli Craftsmanship"
                        fill
                        className="object-cover"
                    />
                </section>

                {/* Values */}
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="text-center space-y-4">
                                <div className="text-4xl">✨</div>
                                <h3 className="font-serif text-2xl text-brand-plum">Authenticity</h3>
                                <p className="text-gray-500 text-sm">We source directly from artisanal clusters across India to ensure every stitch tells a story of heritage.</p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="text-4xl">👑</div>
                                <h3 className="font-serif text-2xl text-brand-plum">Grace</h3>
                                <p className="text-gray-500 text-sm">Modesty isn't just a style; it's a way of being. Our designs are curated to empower women with quiet confidence.</p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="text-4xl">🌿</div>
                                <h3 className="font-serif text-2xl text-brand-plum">Ethics</h3>
                                <p className="text-gray-500 text-sm">From fair wages to sustainable packaging, we believe beauty shouldn't come at the cost of the world.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
