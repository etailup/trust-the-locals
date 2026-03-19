alter table public.profiles
  add column if not exists type text check (type in ('agency', 'private', 'hotel')),
  add column if not exists country text,
  add column if not exists website text,
  add column if not exists linkedin_url text,
  add column if not exists annual_clients text;
