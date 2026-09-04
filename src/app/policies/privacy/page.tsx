import type { Metadata } from "next";
import PolicyLayout from "@/components/policy/PolicyLayout";
import { siteConfig, getFullAddress } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bigpotli collects, uses, and protects your personal information when you shop with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" effectiveDate="16 August 2026">
      <p>
        Bigpotli Traders LLP ("Bigpotli", "we", "us") respects your privacy. This policy explains
        what information we collect when you use bigpotli.com, how we use it, and the choices you
        have.
      </p>

      <h2>Information We Collect</h2>
      <p>When you browse or shop with us, we may collect:</p>
      <ul>
        <li>
          <strong>Account details:</strong> name, email address, phone number, and password, when
          you create an account
        </li>
        <li>
          <strong>Order details:</strong> shipping address, billing address, and items purchased
        </li>
        <li>
          <strong>Payment information:</strong> processed directly by Razorpay, our payment
          gateway — we never see or store your full card, UPI, or bank details
        </li>
        <li>
          <strong>Usage data:</strong> pages visited, products viewed, and device/browser
          information, collected automatically via cookies and analytics tools
        </li>
        <li>
          <strong>Communications:</strong> messages you send us over email, WhatsApp, or contact
          forms
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process, ship, and support your orders</li>
        <li>To send order confirmations, shipping updates, and respond to support requests</li>
        <li>To personalize your experience and show you relevant products</li>
        <li>
          To send marketing updates and offers, and to measure and improve our marketing — where
          you've opted in, you can unsubscribe anytime
        </li>
        <li>To improve our website, products, and services</li>
        <li>To detect and prevent fraud or abuse</li>
      </ul>

      <h2>Cookies & Analytics</h2>
      <p>
        We use cookies and similar technologies to keep you signed in, remember your cart, and
        understand how visitors use our site. We use Google Analytics and Meta (Facebook) Pixel to
        measure site traffic, marketing performance, and ad conversions.
      </p>
      <p>
        As part of this, identifiers you give us directly — such as your email address and the
        name on your account — may be shared with Google and Meta in encrypted (hashed) form. This
        lets those platforms match your visit or purchase to an ad you may have seen or clicked
        (for example, Meta Advanced Matching or Google Enhanced Conversions), and helps us measure
        and target our advertising more effectively. Google and Meta process this information
        under their own privacy policies. You can disable cookies in your browser settings, though
        some features of the site may not work correctly without them.
      </p>

      <h2>Who We Share Data With</h2>
      <p>We share information only where necessary to run our store and market it effectively:</p>
      <ul>
        <li><strong>Razorpay</strong> — to process payments securely</li>
        <li><strong>Courier partners</strong> — to deliver your orders</li>
        <li><strong>Supabase</strong> — our database and authentication provider, which stores your account and order data securely</li>
        <li>
          <strong>Google and Meta</strong> — for analytics and advertising, including matching
          your email address or account name (in hashed form) to measure and target ad campaigns
        </li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>

      <h2>Data Security</h2>
      <p>
        We use industry-standard measures — including encrypted connections (HTTPS) and access
        controls on our database — to protect your information. No method of transmission or
        storage is 100% secure, but we work to protect your data at every step.
      </p>

      <h2>Your Rights</h2>
      <p>
        You can access, correct, or request deletion of your personal information at any time by
        emailing us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. You can also
        update your account details directly from your{" "}
        <a href="/account">account page</a>.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Bigpotli is not directed at children under 18. We don't knowingly collect personal
        information from children.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The "Effective" date at the top of this page
        reflects the latest revision. Continued use of the site after changes means you accept
        the updated policy.
      </p>

      <h2>Grievance Officer</h2>
      <p>
        In accordance with the Information Technology Act, 2000 and rules made thereunder, for
        any privacy concerns or grievances, please contact our Grievance Officer at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
      </p>
      <p>Registered address: {getFullAddress()}</p>
    </PolicyLayout>
  );
}
