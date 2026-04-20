-- Create reviews table
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  content text not null,
  status text default 'approved'::text not null check (status in ('pending', 'approved', 'rejected'))
);

-- Enable RLS
alter table public.reviews enable row level security;

-- Policies

-- Anyone can read approved reviews
create policy "Anyone can read approved reviews"
  on public.reviews
  for select
  using (status = 'approved');

-- Anyone can insert a review (anonymously)
create policy "Anyone can insert reviews"
  on public.reviews
  for insert
  with check (true);

-- Only service role / admins can update or delete
create policy "Admins can update reviews"
  on public.reviews
  for update
  using (auth.role() = 'service_role');

create policy "Admins can delete reviews"
  on public.reviews
  for delete
  using (auth.role() = 'service_role');
