import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-6 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-10">
                            <div>
                                <h1 className="font-serif text-5xl text-brand-plum mb-6">Let's Connect</h1>
                                <p className="text-gray-600 leading-relaxed">
                                    Have a question about our collections or need assistance with your order? Our team is here to help you experience the best of Bigpotli.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-plum">Our Boutique</h4>
                                        <p className="text-gray-500 text-sm">{siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-plum">Call Us</h4>
                                        <p className="text-gray-500 text-sm">{siteConfig.phone.display}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-plum">Email Support</h4>
                                        <p className="text-gray-500 text-sm">support@bigpotli.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-serif text-2xl text-brand-plum mb-8">Send a Message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                                        <input type="text" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-gold transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                                        <input type="email" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-gold transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                                    <input type="text" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-gold transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                                    <textarea rows={4} className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-gold transition-colors"></textarea>
                                </div>
                                <button className="w-full bg-brand-plum text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-plum-light transition-colors shadow-lg shadow-brand-plum/20">
                                    Send Message <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
