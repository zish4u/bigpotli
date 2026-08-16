import type { Metadata } from "next";
import PolicyLayout from "@/components/policy/PolicyLayout";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "Bigpotli's shipping charges, delivery timelines, and Cash on Delivery terms across Bihar and India.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping & Delivery Policy" effectiveDate="16 August 2026">
      <p>
        Bigpotli ships across Bihar and the rest of India through trusted courier partners.
        Here's what to expect once you place an order.
      </p>

      <h2>Order Processing Time</h2>
      <p>
        Orders are packed and handed to our courier partner within <strong>1–2 business days</strong>{" "}
        of confirmation. You'll receive a confirmation with your order details by email or
        WhatsApp once it's placed, and a tracking update once it ships.
      </p>

      <h2>Delivery Timelines</h2>
      <ul>
        <li><strong>Patna and nearby districts:</strong> 2–4 business days after dispatch</li>
        <li><strong>Rest of Bihar:</strong> 3–6 business days after dispatch</li>
        <li><strong>Rest of India:</strong> 5–9 business days after dispatch</li>
      </ul>
      <p>
        These timelines are estimates from our courier partners and can vary with location,
        weather, and local holidays.
      </p>

      <h2>Shipping Charges</h2>
      <p>
        Shipping is <strong>free on orders over ₹5,000</strong>. Orders below that are charged a
        flat <strong>₹500</strong> shipping fee, calculated at checkout before you pay.
      </p>

      <h2>Cash on Delivery (COD)</h2>
      <p>
        COD is available on orders of <strong>₹1,000 and above</strong>. Orders below ₹1,000 must
        be prepaid online via Razorpay (cards, UPI, netbanking, and wallets). Please keep the
        exact amount ready for our delivery partner where possible.
      </p>

      <h2>Delivery Attempts</h2>
      <p>
        Our courier partners typically make up to two delivery attempts. If both attempts are
        unsuccessful, the order is returned to us — please reach out to us to arrange
        redelivery or a refund for prepaid orders.
      </p>

      <h2>Tracking Your Order</h2>
      <p>
        Once your order ships, you can track it from{" "}
        <a href="/orders/history">Order History</a> in your account, or by using the tracking
        link we send you.
      </p>

      <h2>Address Accuracy</h2>
      <p>
        Please double-check your delivery address, pincode, and phone number at checkout. We
        aren't able to reroute a package once it has shipped, and re-delivery due to an
        incorrect address may incur an additional shipping charge.
      </p>

      <h2>Questions?</h2>
      <p>
        Write to us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a> and we'll help track down
        your order.
      </p>
    </PolicyLayout>
  );
}
