-- Corrects meta_description copy that implied unconditional COD — COD is only
-- available on orders above ₹1,000. Run this if 003_add_new_categories.sql (or
-- seed.sql) was already applied before this threshold was added to those files,
-- so the live categories table matches the source-of-truth SQL.

update categories set meta_description =
  'Shop premium Abayas online. Free delivery across Bihar – Patna, Gaya, Muzaffarpur & all districts. COD available on orders ₹1,000+.'
  where slug = 'abaya';

update categories set meta_description =
  'Shop premium Hijabs online. Free delivery across Bihar. COD available on orders ₹1,000+.'
  where slug = 'hijab';

update categories set meta_description =
  'Shop Pakistani suits online with COD (orders ₹1,000+). Free delivery to Patna, Gaya, Muzaffarpur & all Bihar districts.'
  where slug = 'pakistani-suit';

update categories set meta_description =
  'Shop unstitched Pakistani lawn suits online. Free delivery across Bihar. COD available on orders ₹1,000+.'
  where slug = 'lawn-suit';

update categories set meta_description =
  'Shop designer and cotton kurtis online with COD (orders ₹1,000+). Free delivery to Patna & all Bihar districts.'
  where slug = 'kurti';

update categories set meta_description =
  'Shop ethnic co-ord sets online with COD (orders ₹1,000+). Free delivery across Bihar.'
  where slug = 'co-ord-set';
