import type { Metadata } from "next";
import PolicyLayout from "@/components/policy/PolicyLayout";
import { siteConfig, getFullAddress } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions that govern your use of bigpotli.com and orders placed with Bigpotli.",
};

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms & Conditions" effectiveDate="16 August 2026">
      <p>
        These terms govern your use of bigpotli.com, operated by Bigpotli Traders LLP
        ("Bigpotli", "we", "us"). By browsing our site or placing an order, you agree to these
        terms.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 18 years old, or place orders under the supervision of a parent or
        guardian, to shop with us. By using this site, you confirm the information you provide is
        accurate and complete.
      </p>

      <h2>Products & Pricing</h2>
      <p>
        We make every effort to display our products, colours, and fabrics accurately. Actual
        colours may vary slightly due to photography, lighting, or your screen settings. Prices
        are listed in Indian Rupees (₹) and are subject to change without notice; the price
        charged is the one shown at the time you complete checkout.
      </p>

      <h2>Order Acceptance</h2>
      <p>
        Placing an order is an offer to purchase. We reserve the right to refuse or cancel any
        order — for example due to stock unavailability, pricing errors, or suspected fraud. If
        we cancel a prepaid order, you'll receive a full refund to your original payment method.
      </p>

      <h2>Payments</h2>
      <p>
        We accept payments via Razorpay (cards, UPI, netbanking, and wallets) and Cash on
        Delivery on eligible orders. See our{" "}
        <a href="/policies/shipping">Shipping &amp; Delivery Policy</a> for COD terms.
      </p>

      <h2>Cancellations, Exchanges & Refunds</h2>
      <p>
        Order cancellations and exchanges are governed by our{" "}
        <a href="/policies/cancellation-exchange">Cancellation &amp; Exchange Policy</a>, and
        return eligibility by our <a href="/policies/refund-policy">Refund Policy</a>.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site — including product photography, text, logos, and design — is
        the property of Bigpotli Traders LLP or its licensors, and may not be copied, reproduced,
        or used commercially without our written permission.
      </p>

      <h2>User Accounts</h2>
      <p>
        You're responsible for maintaining the confidentiality of your account credentials and
        for all activity under your account. Let us know immediately if you suspect unauthorized
        access.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the extent permitted by law, Bigpotli isn't liable for indirect, incidental, or
        consequential damages arising from your use of the site or our products, beyond the value
        of the order in question.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes will be subject to the
        exclusive jurisdiction of the courts in Patna, Bihar.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these terms from time to time; the "Effective" date at the top reflects the
        latest revision. Continued use of the site after changes means you accept the updated
        terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these terms? Reach us at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
      </p>
      <p>Registered address: {getFullAddress()}</p>
    </PolicyLayout>
  );
}
