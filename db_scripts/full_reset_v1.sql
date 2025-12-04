-- FULL DATABASE RESET SCRIPT
-- This script will drop all existing tables and recreate them with the correct schema.
-- It also sets up storage buckets and RLS policies.

-- 1. DROP EXISTING TABLES (Clean Slate)
drop table if exists public.order_requests;
drop table if exists public.hero_images;
drop table if exists public.products;
drop table if exists public.carousel_images;
drop table if exists public.applications;
drop table if exists public.jobs;

-- 2. CREATE TABLES

-- Jobs Table
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null,
  location text not null,
  description text not null,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Applications Table
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  job_id text not null,
  job_title text not null,
  applicant_name text not null,
  phone text not null,
  email text,
  message text,
  cv_url text,
  cv_filename text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Carousel Images Table
create table public.carousel_images (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  display_order integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Products Table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  name_ro text not null,
  description_ro text not null,
  tag_ro text,
  display_order integer not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Hero Images Table
create table public.hero_images (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Requests Table
create table public.order_requests (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  phone_number text not null,
  items jsonb not null,
  needed_by timestamptz not null,
  delivery_type text not null default 'pickup', -- 'pickup', 'delivery'
  delivery_address text, -- null if pickup
  status text not null default 'pending', -- 'pending', 'contacted', 'completed'
  created_at timestamptz default now()
);

-- 3. ENABLE RLS (Row Level Security)
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.carousel_images enable row level security;
alter table public.products enable row level security;
alter table public.hero_images enable row level security;
alter table public.order_requests enable row level security;

-- 4. CREATE POLICIES (Permissive for Admin Panel functionality without strict Auth)

-- Jobs Policies
create policy "Enable all access for jobs" on public.jobs for all using (true) with check (true);

-- Applications Policies
create policy "Enable all access for applications" on public.applications for all using (true) with check (true);

-- Carousel Policies
create policy "Enable all access for carousel" on public.carousel_images for all using (true) with check (true);

-- Products Policies
create policy "Enable all access for products" on public.products for all using (true) with check (true);

-- Hero Images Policies
create policy "Enable all access for hero_images" on public.hero_images for all using (true) with check (true);

-- Order Requests Policies
create policy "Enable all access for orders" on public.order_requests for all using (true) with check (true);

-- 5. STORAGE BUCKETS
-- Create 'cvs' bucket if not exists
insert into storage.buckets (id, name, public) 
values ('cvs', 'cvs', true)
on conflict (id) do nothing;

-- Create 'images' bucket if not exists
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

-- Storage Policies (Permissive)
create policy "Public Access CVs" on storage.objects for all using ( bucket_id = 'cvs' ) with check ( bucket_id = 'cvs' );
create policy "Public Access Images" on storage.objects for all using ( bucket_id = 'images' ) with check ( bucket_id = 'images' );

-- 6. REALTIME SUBSCRIPTIONS
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table public.jobs;
alter publication supabase_realtime add table public.applications;
alter publication supabase_realtime add table public.carousel_images;
alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.hero_images;
alter publication supabase_realtime add table public.order_requests;
