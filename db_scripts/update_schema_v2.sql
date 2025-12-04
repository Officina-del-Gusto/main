-- Update Schema V2: Pricing, Units, and Store Settings

-- 1. Update Products Table
alter table public.products 
add column if not exists price numeric default 0,
add column if not exists unit text default 'buc';

-- 2. Update Carousel Images Table
alter table public.carousel_images
add column if not exists name text,
add column if not exists description text,
add column if not exists price numeric default 0,
add column if not exists unit text default 'buc';

-- 3. Create Store Settings Table
create table if not exists public.store_settings (
  id integer primary key default 1,
  shipping_fee numeric default 15,
  packaging_fee numeric default 2,
  pricing_enabled boolean default true,
  constraint single_row check (id = 1)
);

-- Insert default settings if not exists
insert into public.store_settings (id, shipping_fee, packaging_fee, pricing_enabled)
values (1, 15, 2, true)
on conflict (id) do nothing;

-- Enable RLS for store_settings
alter table public.store_settings enable row level security;

-- Policies for store_settings
create policy "Public Read Settings" on public.store_settings for select using (true);
create policy "Public Update Settings" on public.store_settings for update using (true);
create policy "Public Insert Settings" on public.store_settings for insert with check (true);

-- Add to Realtime
alter publication supabase_realtime add table public.store_settings;
