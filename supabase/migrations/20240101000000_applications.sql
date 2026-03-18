create table public.applications (
  id              uuid        primary key default gen_random_uuid(),
  form_type       text        not null check (form_type in ('agency', 'private')),
  name            text        not null,
  email           text        not null,
  phone           text,
  country         text,
  description     text,
  company_name    text,
  website         text,
  linkedin_url    text,
  annual_clients  text,
  status          text        not null default 'pending'
                  check (status in ('pending', 'approved', 'rejected')),
  approval_token  uuid        not null default gen_random_uuid(),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table public.applications enable row level security;

create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger applications_updated_at
  before update on public.applications
  for each row execute function update_updated_at();
