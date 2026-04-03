import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Razorpay webhook — called by Razorpay after payment events
// Webhook secret must be set in Razorpay dashboard and stored as RAZORPAY_WEBHOOK_SECRET
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET ?? "")
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  switch (event.event) {
    case "payment.captured":
      // Payment confirmed — order status already set to 'confirmed' via /api/payment/verify
      // Can be used to send confirmation email, update stock, etc.
      console.log("Payment captured:", event.payload.payment.entity.id);
      break;
    case "payment.failed":
      // TODO: mark order as failed in Supabase
      console.log("Payment failed:", event.payload.payment.entity.id);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
