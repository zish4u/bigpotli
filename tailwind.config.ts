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
                    plum: {
                        DEFAULT: "#541E50",
                        light: "#6e2a6a",
                        dark: "#3d143a",
                    },
                    gold: {
                        DEFAULT: "#C5A059",
                        light: "#d4b87a",
                        dark: "#a6874a",
                    },
                },
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
