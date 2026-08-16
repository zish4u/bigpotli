import type { Metadata } from "next";
import PolicyLayout from "@/components/policy/PolicyLayout";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cancellation & Exchange Policy",
  description:
    "Bigpotli's order cancellation, exchange, and refund policy — eligibility window, non-returnable items, and how to start a request.",
};

export default function CancellationExchangePolicyPage() {
  return (
    <PolicyLayout title="Cancellation & Exchange Policy" effectiveDate="16 August 2026">
      <p>
        At Bigpotli, we want you to love what you order. This policy explains how order
        cancellations, exchanges, and refunds work. Please read it alongside our{" "}
        <a href="/policies/shipping">Shipping &amp; Delivery Policy</a> before placing an order.
      </p>

      <h2>Order Cancellation</h2>
      <p>
        You can cancel an order any time <strong>before it has been shipped</strong> by
        contacting us at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a> with your order ID. Once an
        order has shipped, it can no longer be cancelled — you're welcome to request an exchange
        after delivery instead, per the terms below.
      </p>
      <p>
        For prepaid orders cancelled before shipping, the full amount is refunded to the original
        payment method within 5–7 business days. For Cash on Delivery orders, no payment is
        collected until delivery, so no refund is needed on cancellation.
      </p>

      <h2>Exchange Window</h2>
      <p>
        We accept exchange requests within <strong>7 days of delivery</strong>. To be eligible,
        the product must be:
      </p>
      <ul>
        <li>Unused, unworn, and unwashed</li>
        <li>In its original packaging with all tags and labels attached</li>
        <li>Free of any alterations, perfume, or makeup marks</li>
      </ul>
      <p>
        To start an exchange, email us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
        with your order ID, the reason for the exchange, and clear photos of the product. We'll
        confirm eligibility and arrange a pickup or share a return address within 1–2 business
        days.
      </p>

      <h2>Damaged, Defective, or Wrong Item Received</h2>
      <p>
        If your order arrives damaged, defective, or different from what you ordered, please
        record an unboxing video and email us within <strong>48 hours of delivery</strong> at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with the video, photos, and
        your order ID. Once verified, we'll arrange a free replacement or a full refund — your
        choice — including any shipping charges you paid.
      </p>

      <h2>Items That Cannot Be Returned or Exchanged</h2>
      <ul>
        <li>Items marked "Final Sale" or purchased at a clearance discount</li>
        <li>Hijabs, undergarments, and other items where hygiene applies, once the seal is opened</li>
        <li>Products damaged due to misuse, wash, or normal wear after delivery</li>
        <li>Custom-stitched or altered products made to your measurements</li>
      </ul>

      <h2>Refunds</h2>
      <p>
        Approved refunds for prepaid orders are credited to the original payment method
        (card, UPI, wallet, or netbanking via Razorpay) within 5–7 business days of us receiving
        and inspecting the returned item. Where an exchange isn't possible — for example, if a
        replacement size or design is out of stock — we'll offer a refund or store credit instead.
      </p>
      <p>
        Orders paid via Cash on Delivery that qualify for a refund (e.g. a damaged item) are
        refunded via bank transfer or UPI; we'll ask for your account details over email once
        the refund is approved.
      </p>

      <h2>Return Shipping</h2>
      <p>
        For exchanges due to a genuine defect, damage, or wrong item, we cover return shipping.
        For exchanges requested for reasons such as size or preference, return shipping is the
        customer's responsibility unless we've arranged a reverse pickup in your area.
      </p>

      <h2>Need Help?</h2>
      <p>
        Reach our support team at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>, and we'll sort it out
        quickly.
      </p>
    </PolicyLayout>
  );
}
