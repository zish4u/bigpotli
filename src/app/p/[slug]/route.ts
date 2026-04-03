import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// Resolver: /p/[slug] → /[categorySlug]/[slug]
// Handles old /product/:slug URLs redirected here by next.config
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

  const { data: product } = await supabase
    .from("products")
    .select("slug, categories(slug)")
    .eq("slug", slug)
    .single();

  if (!product) redirect("/");

  const categorySlug = (product.categories as unknown as { slug: string } | null)?.slug;
  if (!categorySlug) redirect("/");

  redirect(`/${categorySlug}/${product.slug}`);
}
