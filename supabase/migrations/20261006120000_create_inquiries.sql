-- Contact inquiries from the public site.
-- Apply in the Supabase SQL editor, or via the CLI after `npx supabase init`.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  budget text,
  project_type text,
  message text not null,
  created_at timestamptz not null default now(),
  constraint inquiries_name_len check (char_length(name) between 2 and 120),
  constraint inquiries_email_len check (char_length(email) between 5 and 255),
  constraint inquiries_email_format check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  constraint inquiries_message_len check (char_length(message) between 20 and 5000),
  constraint inquiries_company_len check (company is null or char_length(company) <= 160)
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;

create policy "Anyone can submit an inquiry"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 2 and 120
    and char_length(email) between 5 and 255
    and char_length(message) between 20 and 5000
  );

-- No SELECT policy for anon/authenticated: submissions are write-only from the site.
-- Read inquiries in the Dashboard or with a secret key on a server you control.

grant insert on table public.inquiries to anon, authenticated;
revoke select, update, delete on table public.inquiries from anon, authenticated;
