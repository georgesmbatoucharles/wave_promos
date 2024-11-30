-- Create the promotions table if it doesn't exist
create table if not exists public.promotions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  terms_and_conditions text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  country text not null check (country in ('SN', 'CI')),
  is_active boolean default true,
  highlights text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.promotions enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Enable read access for all users" on public.promotions;
drop policy if exists "Enable insert for authenticated users only" on public.promotions;
drop policy if exists "Enable update for authenticated users only" on public.promotions;
drop policy if exists "Enable delete for authenticated users only" on public.promotions;

-- Create new policies that allow all operations for everyone
create policy "Enable read access for all users" on public.promotions
  for select using (true);

create policy "Enable insert for all users" on public.promotions
  for insert with check (true);

create policy "Enable update for all users" on public.promotions
  for update using (true);

create policy "Enable delete for all users" on public.promotions
  for delete using (true);

-- Ensure indexes exist
create index if not exists promotions_country_idx on public.promotions(country);
create index if not exists promotions_is_active_idx on public.promotions(is_active);
create index if not exists promotions_start_date_idx on public.promotions(start_date);
create index if not exists promotions_end_date_idx on public.promotions(end_date);

-- Update the function for handling updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Ensure trigger exists
drop trigger if exists handle_updated_at on public.promotions;
create trigger handle_updated_at
  before update on public.promotions
  for each row
  execute function public.handle_updated_at();