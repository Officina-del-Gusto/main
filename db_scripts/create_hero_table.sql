-- Create the table for Hero Images
create table if not exists public.hero_images (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.hero_images enable row level security;

-- Create policies to allow access
-- NOTE: Since the application currently uses a simple client-side login and not Supabase Auth,
-- we must allow public (anon) access for these operations to work from the Admin Panel.
-- In a production environment with Supabase Auth, these should be restricted to authenticated users.

create policy "Enable read access for all users" on public.hero_images
  for select using (true);

create policy "Enable insert for all users" on public.hero_images
  for insert with check (true);

create policy "Enable update for all users" on public.hero_images
  for update using (true);

create policy "Enable delete for all users" on public.hero_images
  for delete using (true);

-- Enable Realtime for this table
alter publication supabase_realtime add table public.hero_images;
