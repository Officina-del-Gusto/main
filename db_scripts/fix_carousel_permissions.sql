-- Ensure carousel_images table exists
create table if not exists public.carousel_images (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.carousel_images enable row level security;

-- Create policies to allow access (Public/Anon for now)
create policy "Enable read access for all users" on public.carousel_images
  for select using (true);

create policy "Enable insert for all users" on public.carousel_images
  for insert with check (true);

create policy "Enable update for all users" on public.carousel_images
  for update using (true);

create policy "Enable delete for all users" on public.carousel_images
  for delete using (true);

-- Enable Realtime
alter publication supabase_realtime add table public.carousel_images;
