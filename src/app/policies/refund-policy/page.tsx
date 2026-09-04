import type { Metadata } from "next";
import PolicyLayout from "@/components/policy/PolicyLayout";
import { siteConfig, getFullAddress } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Bigpotli's refund policy — non-returnable items, who pays return shipping, and the proof required for exchanges.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy" effectiveDate="16 August 2026">
      <p>
        This policy covers how returns and exchanges work at Bigpotli. For cancellation windows,
        refund timelines, and lost-order handling, see our{" "}
        <a href="/policies/cancellation-exchange">Cancellation &amp; Exchange Policy</a>.
      </p>

      <h2>Non-Returnable Items</h2>
      <ul>
        <li>Items purchased on sale or at a clearance discount cannot be returned or exchanged</li>
        <li>Hijabs, undergarments, and other items where hygiene applies, once the seal is opened</li>
        <li>Custom-stitched or altered products made to your measurements</li>
        <li>Minor colour variation caused by screen, camera, or lighting differences is not considered a defect</li>
        <li>A change of mind after delivery (not liking the fit, fabric, or style) is not eligible for return</li>
      </ul>

      <h2>Return Shipping</h2>
      <p>
        For exchanges approved due to a genuine defect, damage, or wrong item shipped, we cover
        the return shipping. For all other approved exchanges, return shipping is the customer's
        responsibility — either as a prepaid parcel you send us, or deducted from the coupon
        value issued for the exchange.
      </p>
      <p>
        Please don't ship an item back to us without prior authorisation from our support team —
        unauthorised returns will not be accepted at our facility.
      </p>

      <h2>Exchange Eligibility</h2>
      <p>To be eligible for an exchange, your request must meet all of the following:</p>
      <ul>
        <li>Raised within 48 hours of delivery</li>
        <li>The item is unworn, unused, unwashed, with all original tags attached</li>
        <li>Returned in its original packaging</li>
        <li>Accompanied by your order confirmation or invoice as proof of purchase</li>
      </ul>
      <p>
        For damage, defect, or wrong-item claims, you must share a single, unedited video —
        recorded continuously with no cuts or pauses — showing the parcel being opened for the
        first time and the issue with the product. Claims without this video cannot be processed.
      </p>

      <h2>How to Request an Exchange</h2>
      <p>
        Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or message us on{" "}
        <a href={siteConfig.phone.href}>WhatsApp at {siteConfig.phone.display}</a> with your order
        ID, the reason for the exchange, and the required video/photos. Once approved, we'll
        either arrange a reverse pickup or share our return address for you to ship the item back.
      </p>

      <h2>Return Address</h2>
      <p>{getFullAddress()}</p>

      <h2>Questions?</h2>
      <p>
        Reach our support team at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
      </p>
    </PolicyLayout>
  );
}
