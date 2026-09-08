-- PumpBuild database schema
-- Run this once in your Supabase project's SQL Editor (Project > SQL Editor > New query).

create table if not exists builders (
  id text primary key,
  category text not null check (category in ('developer', 'founder')),
  name text not null,
  handle text,
  github text,
  twitter text,
  bio text,
  language text,
  repo text,
  repo_stars text,
  company_name text,
  stage text,
  product_url text,
  claimed_usd numeric not null default 0,
  status text not null default 'queued' check (status in ('queued', 'building', 'trading')),
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  github text,
  website text,
  wallet text,
  pitch text,
  submitted_at timestamptz not null default now()
);

alter table builders enable row level security;
alter table applications enable row level security;

-- Anyone (including logged-out visitors) can read the leaderboard.
create policy "Public can read builders"
  on builders for select
  using (true);

-- Only a logged-in admin (via Supabase Auth) can add, edit, or remove builders.
create policy "Authenticated can insert builders"
  on builders for insert
  to authenticated
  with check (true);

create policy "Authenticated can update builders"
  on builders for update
  to authenticated
  using (true);

create policy "Authenticated can delete builders"
  on builders for delete
  to authenticated
  using (true);

-- Anyone can submit an application through the public Apply form...
create policy "Public can submit applications"
  on applications for insert
  with check (true);

-- ...but only a logged-in admin can read the submissions back.
create policy "Authenticated can read applications"
  on applications for select
  to authenticated
  using (true);
