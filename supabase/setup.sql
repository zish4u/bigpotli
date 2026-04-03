-- ── Step 1: Public read policies ───────────────────────────────────
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;

drop policy if exists "Public can read categories" on categories;
drop policy if exists "Public can read products" on products;
drop policy if exists "Public can read product_images" on product_images;

create policy "Public can read categories" on categories for select using (true);
create policy "Public can read products" on products for select using (true);
create policy "Public can read product_images" on product_images for select using (true);

grant select on categories to anon;
grant select on products to anon;
grant select on product_images to anon;
grant select on reviews to anon;

-- ── Step 2: Seed categories ─────────────────────────────────────────
insert into categories (name, slug, description, image_url, meta_title, meta_description) values
  ('Abayas', 'abaya', 'Premium Abayas for every occasion',
   'https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800',
   'Buy Abayas Online in Bihar | Bigpotli',
   'Shop premium Abayas online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & all districts.'),
  ('Hijabs', 'hijab', 'Elegant Hijabs in silk, chiffon & cotton',
   'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800',
   'Buy Hijabs Online in Bihar | Bigpotli',
   'Shop premium Hijabs online. Free delivery across Bihar.'),
  ('Unstitched', 'unstitched', 'Unstitched suit fabric sets for women',
   'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800',
   'Buy Unstitched Suits Online in Bihar | Bigpotli',
   'Shop premium Unstitched suits online. Free delivery across Bihar.'),
  ('Stitched Ethnic', 'stitched', 'Ready-to-wear ethnic wear for women',
   'https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800',
   'Buy Stitched Ethnic Wear Online in Bihar | Bigpotli',
   'Shop premium Stitched Ethnic wear online. Free delivery across Bihar.')
on conflict (slug) do nothing;

-- ── Step 3: Seed products ───────────────────────────────────────────
insert into products (name, slug, description, price, compare_price, category_id, stock, is_new, is_featured, rating, review_count, tags)
select 'Luxury Embroidered Abaya', 'luxury-embroidered-abaya',
  'Experience elegance with our hand-embroidered luxury abaya made from premium Nida fabric.',
  4999, 5999, c.id, 50, true, true, 4.9, 48, array['abaya','eid','premium','bihar']
from categories c where c.slug = 'abaya'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, compare_price, category_id, stock, is_new, is_featured, rating, review_count, tags)
select 'Daily Wear Cotton Abaya', 'daily-wear-cotton-abaya',
  'Comfortable daily-wear cotton abaya, perfect for everyday modest fashion.',
  1999, 2500, c.id, 80, false, false, 4.6, 31, array['abaya','cotton','daily','bihar']
from categories c where c.slug = 'abaya'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, compare_price, category_id, stock, is_new, is_featured, rating, review_count, tags)
select 'Premium Chiffon Hijab - Navy', 'premium-chiffon-hijab-navy',
  'Lightweight chiffon hijab in navy blue, perfect for formal and casual wear.',
  799, 1200, c.id, 200, false, true, 4.7, 62, array['hijab','chiffon','navy','bihar']
from categories c where c.slug = 'hijab'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, compare_price, category_id, stock, is_new, is_featured, rating, review_count, tags)
select 'Floral Silk Unstitched Suit', 'floral-silk-unstitched-suit',
  'Beautiful floral patterns on premium silk fabric, perfect for festive occasions.',
  2499, 3299, c.id, 35, false, false, 4.7, 32, array['unstitched','silk','festive','bihar']
from categories c where c.slug = 'unstitched'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, compare_price, category_id, stock, is_new, is_featured, rating, review_count, tags)
select 'Designer Georgette Suit', 'designer-georgette-suit',
  'Stunning designer georgette suit with intricate embroidery for special occasions.',
  3750, 4500, c.id, 25, true, true, 4.8, 19, array['stitched','georgette','designer','bihar']
from categories c where c.slug = 'stitched'
on conflict (slug) do nothing;

-- ── Step 4: Seed product images ─────────────────────────────────────
insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800', 'Luxury Embroidered Abaya', 0
from products p where p.slug = 'luxury-embroidered-abaya'
on conflict do nothing;

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1560935104-da23eeca09dc?q=80&w=800', 'Luxury Embroidered Abaya detail', 1
from products p where p.slug = 'luxury-embroidered-abaya'
on conflict do nothing;

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1609357605129-26f69abb5db8?q=80&w=800', 'Daily Wear Cotton Abaya', 0
from products p where p.slug = 'daily-wear-cotton-abaya'
on conflict do nothing;

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800', 'Premium Chiffon Hijab Navy', 0
from products p where p.slug = 'premium-chiffon-hijab-navy'
on conflict do nothing;

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800', 'Floral Silk Unstitched Suit', 0
from products p where p.slug = 'floral-silk-unstitched-suit'
on conflict do nothing;

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800', 'Designer Georgette Suit', 0
from products p where p.slug = 'designer-georgette-suit'
on conflict do nothing;
