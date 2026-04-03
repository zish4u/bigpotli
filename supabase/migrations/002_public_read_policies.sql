-- Enable RLS on public-read tables (categories, products, product_images)
-- and grant anonymous read access so the storefront can fetch data

alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;

create policy "Public can read categories"
  on categories for select using (true);

create policy "Public can read products"
  on products for select using (true);

create policy "Public can read product_images"
  on product_images for select using (true);

create policy "Public can read order_items"
  on order_items for select using (true);

-- Also grant direct access for PostgREST anon role
grant select on categories to anon;
grant select on products to anon;
grant select on product_images to anon;
grant select on reviews to anon;
