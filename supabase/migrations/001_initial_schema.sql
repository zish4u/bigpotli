-- ── Profiles (extends Supabase Auth) ─────────────────────────────
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text unique,
  city text,
  state text default 'Bihar',
  pincode text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can view/edit own profile"
  on profiles for all using (auth.uid() = id);

-- ── Categories ────────────────────────────────────────────────────
create table categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);

-- ── Products ──────────────────────────────────────────────────────
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  compare_price numeric(10,2),
  category_id int references categories(id),
  stock int default 0,
  is_new boolean default false,
  is_featured boolean default false,
  rating numeric(3,2) default 0,
  review_count int default 0,
  tags text[],
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);
create index on products(category_id);
create index on products(slug);
create index on products using gin(tags);

-- ── Product Images ────────────────────────────────────────────────
create table product_images (
  id serial primary key,
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt text,
  position int default 0
);
create index on product_images(product_id);

-- ── Orders ────────────────────────────────────────────────────────
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  status text default 'pending',
  total numeric(10,2) not null,
  shipping_address jsonb,
  payment_id text,
  razorpay_order_id text,
  created_at timestamptz default now()
);
alter table orders enable row level security;
create policy "Users see own orders"
  on orders for select using (auth.uid() = user_id);

-- ── Order Items ───────────────────────────────────────────────────
create table order_items (
  id serial primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null,
  price numeric(10,2) not null
);

-- ── Reviews ───────────────────────────────────────────────────────
create table reviews (
  id serial primary key,
  product_id uuid references products(id) on delete cascade,
  user_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);
alter table reviews enable row level security;
create policy "Public can read reviews" on reviews for select using (true);
create policy "Auth users can insert reviews" on reviews for insert with check (auth.uid() = user_id);
