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
                        DEFAULT: "#C8973A",
                        light: "#d9ad5a",
                        dark: "#a67828",
                    },
                    ivory: "#FAF7F2",
                    deep: "#1C1209",
                    muted: "#7A6652",
                    rose: "#E8C4B0",
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
