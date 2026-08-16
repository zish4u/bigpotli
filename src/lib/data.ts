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
