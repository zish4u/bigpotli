import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const display = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-display",
});
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
    metadataBase: new URL("https://bigpotli.com"),
    title: {
        default: "Bigpotli – Abayas, Hijabs & Ethnic Wear | Shop Online in Bihar",
        template: "%s | Bigpotli",
    },
    description:
        "Shop premium ethnic wear, abayas, hijabs & unstitched suits online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & nearby cities. COD available on orders ₹1,000+.",
    keywords: [
        "buy abaya online Bihar",
        "affordable abaya online India",
        "abaya shop near me Bihar",
        "best abaya online shopping in India",
        "best hijab online store India",
        "hijab shop near me",
        "hijab store near me",
        "hijab shopping online India",
        "affordable hijab near me",
        "affordable kurti set for women online",
        "stitched suit for women under 500",
        "unstitched suit online Bihar",
        "dress material online Bihar",
        "salwar suit online Bihar COD",
        "ethnic co-ord set for women Bihar",
        "modest wear India",
        "Islamic clothing online Bihar",
        "ethnic wear Bihar",
        "affordable modest wear India",
    ],
    authors: [{ name: "Bigpotli" }],
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://bigpotli.com",
        siteName: "Bigpotli",
    },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: "https://bigpotli.com" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Google Tag Manager / GA4 */}
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                />
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
                {/* Meta Pixel */}
                <Script
                    id="fb-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                            fbq('track', 'PageView');
                        `,
                    }}
                />
            </head>
            <body className={`${display.variable} ${body.variable} font-sans antialiased text-brand-deep bg-brand-ivory`}>
                {children}
            </body>
        </html>
    );
}
