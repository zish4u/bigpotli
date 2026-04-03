import { useCartStore } from "@/store/useCartStore";

export function useWishlist() {
  const { wishlist, toggleWishlist, isInWishlist } = useCartStore();
  return { wishlist, toggleWishlist, isInWishlist };
}
