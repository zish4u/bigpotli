export interface Review {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    oldPrice: string;
    image: string;
    images: string[];
    isNew: boolean;
    category: string;
    description: string;
    details: string[];
    reviews: Review[];
    rating: number;
    ratingCount: number;
    colors?: string[];
}

export const CATEGORIES = [
    { slug: "unstitched", name: "Unstitched Collection", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop" },
    { slug: "stitched", name: "Stitched Ethnic", image: "https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800&auto=format&fit=crop" },
    { slug: "abaya", name: "Luxury Abayas", image: "https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800&auto=format&fit=crop" },
    { slug: "hijab", name: "Premium Hijabs", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
];

const MOCK_REVIEWS: Review[] = [
    { id: "r1", userName: "Ayesha K.", rating: 5, date: "Nov 12, 2024", comment: "The quality of the fabric is exceptional. Absolutely love the embroidery!" },
    { id: "r2", userName: "Sana M.", rating: 4, date: "Dec 05, 2024", comment: "Beautiful design, fits perfectly. The gold details are very premium." },
    { id: "r3", userName: "Mariam F.", rating: 5, date: "Dec 18, 2024", comment: "Prompt delivery and the packaging was very royal. Great experience." },
];

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Luxury Embroidered Abaya",
        price: "₹4,999",
        oldPrice: "₹5,999",
        image: "https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560935104-da23eeca09dc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618333303493-2715ed8c386b?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: true,
        category: "abaya",
        description: "Experience elegance with our hand-embroidered luxury abaya made from premium Nida fabric.",
        details: ["Premium Nida Fabric", "Hand-stitched Embroidery", "Includes matching Hijab", "Breathable Material"],
        reviews: MOCK_REVIEWS,
        rating: 4.9,
        ratingCount: 48,
        colors: ["Midnight Black", "Emerald Green", "Deep Maroon"]
    },
    {
        id: 2,
        name: "Floral Silk Unstitched Suit",
        price: "₹2,499",
        oldPrice: "₹3,299",
        image: "https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: false,
        category: "unstitched",
        description: "Beautiful floral patterns on premium silk fabric, perfect for festive occasions.",
        details: ["3-Piece Unstitched Set", "Pure Silk Dupatta", "Cotton Satin Bottom", "Digital Floral Print"],
        reviews: MOCK_REVIEWS.slice(0, 2),
        rating: 4.7,
        ratingCount: 32,
        colors: ["Ocean Blue", "Dusty Pink", "Lavender"]
    },
    {
        id: 3,
        name: "Premium Chiffon Hijab - Navy",
        price: "₹799",
        oldPrice: "₹1,200",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620916566398-39f11438784e?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: true,
        category: "hijab",
        description: "Lightweight and breathable chiffon hijab for daily wear with a premium non-slip texture.",
        details: ["Breathable Chiffon", "Standard Size (180x75cm)", "Non-slip texture", "Durable color"],
        reviews: MOCK_REVIEWS.slice(1, 3),
        rating: 4.8,
        ratingCount: 156,
        colors: ["Navy Blue", "Slate Gray", "Burgundy"]
    },
    {
        id: 4,
        name: "Designer Georgette Suit",
        price: "₹3,750",
        oldPrice: "₹4,500",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: false,
        category: "stitched",
        description: "Elegant georgette suit with intricate designer details and matching trousers.",
        details: ["Fully Stitched", "Inner Micro-silk Lining", "Heavy Sequins Work", "Comfort Fit"],
        reviews: MOCK_REVIEWS,
        rating: 4.6,
        ratingCount: 24,
        colors: ["Royal Blue", "Golden Peach", "Silver Gray"]
    },
    {
        id: 5,
        name: "Daily Wear Cotton Abaya",
        price: "₹1,999",
        oldPrice: "₹2,500",
        image: "https://images.unsplash.com/photo-1609357605129-26f69abb5db8?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609357605129-26f69abb5db8?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: false,
        category: "abaya",
        description: "Comfortable cotton abaya perfect for regular use and casual outings.",
        details: ["Soft Cotton Blend", "Side Pockets", "Machine Washable", "Daily Comfort"],
        reviews: MOCK_REVIEWS.slice(0, 1),
        rating: 4.5,
        ratingCount: 12,
        colors: ["Charcoal", "Olive Green", "Beige"]
    },
    {
        id: 6,
        name: "Embroidered Pashmina unstitched",
        price: "₹3,800",
        oldPrice: "₹4,500",
        image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=800&auto=format&fit=crop"
        ],
        isNew: true,
        category: "unstitched",
        description: "Warm and stylish pashmina suit with heavy embroidery for those chilly days.",
        details: ["Pure Pashmina Wool", "Rich Kashuri Embroidery", "Warm Texture", "Vibrant colors"],
        reviews: MOCK_REVIEWS,
        rating: 5.0,
        ratingCount: 89,
        colors: ["Ivory White", "Camel Brown", "Terracotta"]
    },
];

export interface Coupon {
    code: string;
    description: string;
    discountType: "percentage" | "flat";
    discountValue: number;
    minSpend?: number;
}

export const COUPONS: Coupon[] = [
    { code: "BIGPOTLI10", description: "10% OFF on all orders", discountType: "percentage", discountValue: 10 },
    { code: "WELCOME20", description: "₹200 OFF on your first order", discountType: "flat", discountValue: 200, minSpend: 1000 },
    { code: "EIDSPECIAL", description: "₹500 OFF on orders over ₹5,000", discountType: "flat", discountValue: 500, minSpend: 5000 },
];
