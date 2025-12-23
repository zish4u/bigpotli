import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    price: string;
    image: string;
    quantity: number;
    category: string;
}

interface CartStore {
    cart: CartItem[];
    wishlist: number[]; // IDs of products
    discount: number;
    appliedCoupon: string | null;
    addToCart: (product: any) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    applyCoupon: (couponCode: string) => { success: boolean; message: string };
    removeCoupon: () => void;
    clearCart: () => void;
    toggleWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            wishlist: [],
            discount: 0,
            appliedCoupon: null,

            addToCart: (product) => {
                const { cart } = get();
                const existingItem = cart.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },

            removeFromCart: (productId) => {
                set({ cart: get().cart.filter((item) => item.id !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;
                set({
                    cart: get().cart.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            applyCoupon: (couponCode) => {
                const { cart } = get();
                const subtotal = cart.reduce((acc, item) => {
                    const price = parseInt(item.price.replace(/[^\d]/g, ""));
                    return acc + price * item.quantity;
                }, 0);

                const { COUPONS } = require("@/lib/data");
                const coupon = COUPONS.find((c: any) => c.code.toUpperCase() === couponCode.toUpperCase());

                if (!coupon) {
                    return { success: false, message: "Invalid coupon code." };
                }

                if (coupon.minSpend && subtotal < coupon.minSpend) {
                    return { success: false, message: `Minimum spend of ₹${coupon.minSpend} required.` };
                }

                let discountVal = 0;
                if (coupon.discountType === "percentage") {
                    discountVal = Math.floor((subtotal * coupon.discountValue) / 100);
                } else {
                    discountVal = coupon.discountValue;
                }

                set({ discount: discountVal, appliedCoupon: coupon.code });
                return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
            },

            removeCoupon: () => set({ discount: 0, appliedCoupon: null }),

            clearCart: () => set({ cart: [], discount: 0, appliedCoupon: null }),

            toggleWishlist: (productId) => {
                const { wishlist } = get();
                if (wishlist.includes(productId)) {
                    set({ wishlist: wishlist.filter((id) => id !== productId) });
                } else {
                    set({ wishlist: [...wishlist, productId] });
                }
            },

            isInWishlist: (productId) => get().wishlist.includes(productId),
        }),
        {
            name: 'bigpotli-cart-storage',
        }
    )
);
