import { useCartStore } from "@/store/useCartStore";

export function useCart() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCartStore();

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return { cart, itemCount, subtotal, addToCart, removeFromCart, updateQuantity, clearCart };
}
