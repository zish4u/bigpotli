import type { Metadata } from "next";
import PolicyLayout from "@/components/policy/PolicyLayout";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cancellation & Exchange Policy",
  description:
    "Bigpotli's order cancellation window, exchange eligibility, processing timelines, and how compensation works.",
};

export default function CancellationExchangePolicyPage() {
  return (
    <PolicyLayout title="Cancellation & Exchange Policy" effectiveDate="16 August 2026">
      <p>
        This policy explains how order cancellations and exchanges work at Bigpotli. Please read
        it alongside our <a href="/policies/refund-policy">Refund Policy</a> and{" "}
        <a href="/policies/shipping">Shipping &amp; Delivery Policy</a> before placing an order.
      </p>

      <h2>Order Cancellation</h2>
      <p>
        Orders can be cancelled within <strong>6 hours of placing the order</strong>, provided
        they haven't already been dispatched. Cancellation requests are processed by our support
        team, available Monday–Saturday, 10 AM–7 PM — contact us at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a> with your order ID. Once an
        order has shipped, it can no longer be cancelled.
      </p>
      <p>
        For prepaid orders cancelled within this window, the full amount is refunded to the
        original payment method within 5–7 business days. Cash on Delivery orders aren't charged
        until delivery, so no refund is needed on cancellation.
      </p>

      <h2>Exchange Window</h2>
      <p>
        Exchange requests must be raised within <strong>2 days (48 hours) of delivery</strong>. To
        be eligible, the product must be unused, unwashed, and unworn, in its original packaging
        with all tags and labels attached. Items purchased on sale or at a clearance discount
        cannot be exchanged.
      </p>
      <p>
        For a damaged, defective, or wrong item, you must include a single, continuous,
        unedited video — no cuts or pauses — showing the parcel being opened for the first time
        and the issue with the product. Requests made after 48 hours of delivery, or without this
        video for a damage/defect claim, cannot be accepted.
      </p>
      <p>
        To start an exchange, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
        with your order ID, the reason for the exchange, and the required video/photos. See our{" "}
        <a href="/policies/refund-policy">Refund Policy</a> for full eligibility details and the
        return address.
      </p>

      <h2>Processing Timeline</h2>
      <ul>
        <li>Reverse pickup is arranged within 1–2 working days of an approved request</li>
        <li>Quality check is completed within 1 working day of the item reaching our warehouse</li>
        <li>The overall exchange, once picked up, is processed within 10–15 working days</li>
      </ul>

      <h2>Refund & Coupon Policy</h2>
      <p>
        Approved exchanges are settled as a <strong>coupon code or an alternative
        product/size</strong>, rather than a cash refund — courier charges are excluded from the
        coupon value.
      </p>
      <ul>
        <li><strong>Prepaid orders:</strong> a coupon code, or an exchange for another product/size</li>
        <li><strong>Cash on Delivery orders:</strong> a coupon code only</li>
      </ul>

      <h2>Lost or Undelivered Orders</h2>
      <p>
        If a shipment is confirmed lost in transit or never delivered, we issue a full refund,
        including any shipping charges paid, for orders that were paid online. For Cash on
        Delivery orders, no payment was collected, so a replacement is arranged instead where
        stock allows.
      </p>

      <h2>Items That Cannot Be Exchanged</h2>
      <ul>
        <li>Items marked "Final Sale" or purchased at a clearance discount</li>
        <li>Hijabs, undergarments, and other items where hygiene applies, once the seal is opened</li>
        <li>Custom-stitched or altered products made to your measurements</li>
        <li>Minor colour variation caused by screen, camera, or lighting differences</li>
        <li>A change of mind after delivery — this isn't treated as a product defect</li>
        <li>Damaged or defective claims submitted without the required video proof</li>
      </ul>

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
