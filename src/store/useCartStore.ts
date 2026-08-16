import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;          // UUID for Supabase products, stringified number for legacy
    name: string;
    slug: string;
    price: number;       // numeric (e.g. 4999)
    image: string;
    quantity: number;
    category: string;    // display name
    categorySlug: string;
}

interface CartStore {
    cart: CartItem[];
    wishlist: string[];
    discount: number;
    appliedCoupon: string | null;
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    applyCoupon: (couponCode: string) => { success: boolean; message: string };
    removeCoupon: () => void;
    clearCart: () => void;
    toggleWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
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
                const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

                const { COUPONS } = require("@/lib/data");
                const coupon = COUPONS.find((c: any) => c.code.toUpperCase() === couponCode.toUpperCase());

                if (!coupon) {
                    return { success: false, message: "Invalid coupon code." };
                }
                if (coupon.minSpend && subtotal < coupon.minSpend) {
                    return { success: false, message: `Minimum spend of ₹${coupon.minSpend} required.` };
                }

                const discountVal = coupon.discountType === "percentage"
                    ? Math.floor((subtotal * coupon.discountValue) / 100)
                    : coupon.discountValue;

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
            // Rehydrated manually post-mount (see StoreHydration) so the client's
            // first render matches the server's — persisted state read
            // synchronously during render would mismatch the SSR'd markup.
            skipHydration: true,
        }
    )
);
