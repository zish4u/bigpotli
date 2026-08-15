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
                    // Red family, matched to the /public/logo_old.jpg mark (#C22629)
                    plum: {
                        DEFAULT: "#C22629",
                        light: "#DC4B4E",
                        dark: "#8C1A1C",
                    },
                    gold: {
                        DEFAULT: "#C8973A",
                        light: "#d9ad5a",
                        dark: "#a67828",
                    },
                    ivory: "#FAF7F2",
                    deep: "#1B0E0E",
                    muted: "#7A5854",
                    rose: "#F1CBC4",
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
