"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/abaya", label: "Shop", icon: ShoppingBag },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/account", label: "Account", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { cart } = useCartStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 safe-area-pb"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          const isCart = href === "/cart";
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 py-3 min-h-[60px] relative transition-colors ${
                active ? "text-brand-gold" : "text-brand-muted"
              }`}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
