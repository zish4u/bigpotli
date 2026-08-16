import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    // Plum/mauve & ivory palette (user-supplied): primary #4A2545,
                    // accent #6B3A63, secondary/ivory #F5EDE4, background #FFFFFF.
                    plum: {
                        DEFAULT: "#4A2545",
                        light: "#6B3A63",
                        dark: "#30182D",
                    },
                    gold: {
                        DEFAULT: "#6B3A63",
                        // Warm rose-gold, tuned for contrast when used as text/icons
                        // on dark plum surfaces (footer, banners, badges) — the
                        // DEFAULT accent is too close in luminance to those
                        // backgrounds to read there (~1.9:1 contrast).
                        light: "#DDBFA0",
                        dark: "#4A2545",
                    },
                    ivory: "#FFFFFF",
                    deep: "#1C0F1A",
                    muted: "#6E5C69",
                    rose: "#F5EDE4",
                    green: "#2D5016",
                },
            },
            fontFamily: {
                serif: ["var(--font-display)", "Georgia", "serif"],
                sans: ["var(--font-body)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
