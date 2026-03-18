-- supabase/migrations/20260318000000_add_is_admin_to_profiles.sql
alter table public.profiles
  add column if not exists is_admin boolean not null default false;
