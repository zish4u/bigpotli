-- Seed data for Bigpotli — run after migrations

insert into categories (name, slug, description, image_url, meta_title, meta_description) values
  ('Abayas', 'abaya', 'Premium Abayas for every occasion', 'https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800', 'Buy Abayas Online in Bihar | Bigpotli', 'Shop premium Abayas online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & all districts. COD available on orders ₹1,000+.'),
  ('Hijabs', 'hijab', 'Elegant Hijabs in silk, chiffon & cotton', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800', 'Buy Hijabs Online in Bihar | Bigpotli', 'Shop premium Hijabs online. Free delivery across Bihar. COD available on orders ₹1,000+.'),
  ('Unstitched', 'unstitched', 'Unstitched suit fabric sets for women', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800', 'Buy Unstitched Suits Online in Bihar | Bigpotli', 'Shop premium Unstitched suits online. Free delivery across Bihar.'),
  ('Stitched Ethnic', 'stitched', 'Ready-to-wear ethnic wear for women', 'https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800', 'Buy Stitched Ethnic Wear Online in Bihar | Bigpotli', 'Shop premium Stitched Ethnic wear online. Free delivery across Bihar.');

-- Products
insert into products (name, slug, description, price, compare_price, category_id, stock, is_new, is_featured, rating, review_count, tags) values
  ('Luxury Embroidered Abaya', 'luxury-embroidered-abaya', 'Experience elegance with our hand-embroidered luxury abaya made from premium Nida fabric.', 4999, 5999, 1, 50, true, true, 4.9, 48, array['abaya', 'eid', 'premium', 'bihar']),
  ('Daily Wear Cotton Abaya', 'daily-wear-cotton-abaya', 'Comfortable daily-wear cotton abaya, perfect for everyday modest fashion.', 1999, 2500, 1, 80, false, false, 4.6, 31, array['abaya', 'cotton', 'daily', 'bihar']),
  ('Premium Chiffon Hijab - Navy', 'premium-chiffon-hijab-navy', 'Lightweight chiffon hijab in navy blue, perfect for formal and casual wear.', 799, 1200, 2, 200, false, true, 4.7, 62, array['hijab', 'chiffon', 'navy', 'bihar']),
  ('Floral Silk Unstitched Suit', 'floral-silk-unstitched-suit', 'Beautiful floral patterns on premium silk fabric, perfect for festive occasions.', 2499, 3299, 3, 35, false, false, 4.7, 32, array['unstitched', 'silk', 'festive', 'bihar']),
  ('Designer Georgette Suit', 'designer-georgette-suit', 'Stunning designer georgette suit set with intricate embroidery for special occasions.', 3750, 4500, 4, 25, true, true, 4.8, 19, array['stitched', 'georgette', 'designer', 'bihar']);

-- Product images
insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800', 'Luxury Embroidered Abaya front view', 0
from products p where p.slug = 'luxury-embroidered-abaya';

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1560935104-da23eeca09dc?q=80&w=800', 'Luxury Embroidered Abaya detail', 1
from products p where p.slug = 'luxury-embroidered-abaya';

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1609357605129-26f69abb5db8?q=80&w=800', 'Daily Wear Cotton Abaya front view', 0
from products p where p.slug = 'daily-wear-cotton-abaya';

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800', 'Premium Chiffon Hijab Navy', 0
from products p where p.slug = 'premium-chiffon-hijab-navy';

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800', 'Floral Silk Unstitched Suit', 0
from products p where p.slug = 'floral-silk-unstitched-suit';

insert into product_images (product_id, url, alt, position)
select p.id, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800', 'Designer Georgette Suit', 0
from products p where p.slug = 'designer-georgette-suit';
