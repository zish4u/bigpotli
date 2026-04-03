import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cart,
      shippingAddress,
      total,
    } = await req.json();

    // 1. Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Save order to Supabase
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        status: "confirmed",
        total,
        shipping_address: shippingAddress,
        payment_id: razorpay_payment_id,
        razorpay_order_id,
      })
      .select()
      .single();

    if (error || !order) {
      console.error("Order save failed:", error);
      return NextResponse.json({ error: "Order save failed" }, { status: 500 });
    }

    // 3. Save order items
    const orderItems = cart.map((item: { id: string; price: number; quantity: number }) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await supabase.from("order_items").insert(orderItems);

    return NextResponse.json({ success: true, order_id: order.id });
  } catch (err) {
    console.error("Payment verification failed:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
