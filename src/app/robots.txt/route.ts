export function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /checkout
Disallow: /account

Sitemap: https://bigpotli.com/sitemap.xml
`;
  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
