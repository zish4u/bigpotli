import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("slug, created_at, categories(slug)"),
    supabase.from("categories").select("slug"),
  ]);

  const baseUrl = "https://bigpotli.com";
  const staticPages = ["", "/new-arrivals"];
  const policyPages = [
    "/policies/cancellation-exchange",
    "/policies/refund-policy",
    "/policies/shipping",
    "/policies/privacy",
    "/policies/terms",
  ];

  const urls = [
    ...staticPages.map(
      (p) =>
        `<url><loc>${baseUrl}${p}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    ),
    ...policyPages.map(
      (p) =>
        `<url><loc>${baseUrl}${p}</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`
    ),
    ...(categories ?? []).map(
      (c) =>
        `<url><loc>${baseUrl}/${c.slug}</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`
    ),
    ...(products ?? []).map((p) => {
      const categorySlug = (p.categories as unknown as { slug: string } | null)?.slug ?? "";
      const lastmod = p.created_at ? `<lastmod>${p.created_at}</lastmod>` : "";
      return `<url><loc>${baseUrl}/${categorySlug}/${p.slug}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.7</priority></url>`;
    }),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
