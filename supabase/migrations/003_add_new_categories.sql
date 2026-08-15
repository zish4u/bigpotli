-- Add the 4 missing categories identified in improvements.md's keyword research
-- (Pakistani Suit, Lawn Suit, Kurti, Co-ord Set). No products yet — seeded later.

insert into categories (name, slug, description, image_url, meta_title, meta_description) values
  ('Pakistani Suits', 'pakistani-suit', 'Pakistani suits and dress material for women', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800', 'Buy Pakistani Suits Online in Bihar | COD | Bigpotli', 'Shop Pakistani suits online with COD. Free delivery to Patna, Gaya, Muzaffarpur & all Bihar districts.'),
  ('Lawn Suits', 'lawn-suit', 'Pakistani lawn suits for summer', 'https://images.unsplash.com/photo-1610030469915-9a08e01c1de1?q=80&w=800', 'Buy Pakistani Lawn Suits Online in Bihar | COD | Bigpotli', 'Shop unstitched Pakistani lawn suits online. Free delivery across Bihar. COD available.'),
  ('Kurtis', 'kurti', 'Cotton and designer kurtis for daily wear and festive occasions', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800', 'Buy Kurti Online in Bihar | COD | Bigpotli', 'Shop designer and cotton kurtis online with COD. Free delivery to Patna & all Bihar districts.'),
  ('Co-ord Sets', 'co-ord-set', 'Ethnic co-ord sets for women', 'https://images.unsplash.com/photo-1594235412402-b1ed69967243?q=80&w=800', 'Buy Co-ord Sets Online in Bihar | COD | Bigpotli', 'Shop ethnic co-ord sets online with COD. Free delivery across Bihar.')
on conflict (slug) do nothing;
