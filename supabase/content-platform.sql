-- EduMongolia content catalog. Review only. Do not apply this to production in the same step as a deploy.
-- This file does not read or write eSIM Mongolia data.
-- Apply after supabase/schema.sql, which already creates profiles and user_roles.
-- Supabase Free plan. No storage of large files in these rows. Files belong in a private bucket later.

alter table profiles
  add column if not exists locale text not null default 'mn' check (locale in ('mn', 'en'));

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  kind text not null check (kind in ('exam', 'project', 'quiz', 'iq', 'story', 'resource')),
  name_mn text not null,
  name_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  kind text not null check (kind in ('exam', 'project', 'quiz', 'iq', 'story', 'resource')),
  category_id uuid references categories (id),
  title_mn text not null,
  title_en text not null,
  grade smallint check (grade between 1 and 12),
  subject text,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  language text not null default 'mn' check (language in ('mn', 'en')),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_prices (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code in ('exam', 'project', 'project_page', 'quiz', 'iq', 'story')),
  amount_mnt integer not null check (amount_mnt between 0 and 1000000),
  included_units integer not null default 1 check (included_units between 0 and 1000),
  updated_at timestamptz not null default now()
);

create table if not exists exams (
  product_id uuid primary key references products (id) on delete cascade,
  minutes integer not null check (minutes > 0),
  questions_per_attempt integer not null check (questions_per_attempt > 0)
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  prompt_mn text not null,
  prompt_en text not null,
  explanation_mn text not null default '',
  explanation_en text not null default '',
  position integer not null default 0
);

create table if not exists answer_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions (id) on delete cascade,
  label_mn text not null,
  label_en text not null,
  correct boolean not null default false,
  why_mn text,
  why_en text
);

create table if not exists projects (
  product_id uuid primary key references products (id) on delete cascade,
  pages integer not null default 1 check (pages > 0),
  objectives_mn text not null default '',
  objectives_en text not null default '',
  file_path text
);

create table if not exists quizzes (
  product_id uuid primary key references products (id) on delete cascade,
  timed boolean not null default false,
  minutes integer,
  reveal text not null default 'end' check (reveal in ('immediate', 'end'))
);

create table if not exists iq_tests (
  product_id uuid primary key references products (id) on delete cascade,
  minutes integer not null check (minutes > 0)
);

create table if not exists stories (
  product_id uuid primary key references products (id) on delete cascade,
  author text not null,
  body_mn text not null,
  body_en text not null,
  cover_path text
);

create table if not exists learning_resources (
  product_id uuid primary key references products (id) on delete cascade,
  summary_mn text not null default '',
  summary_en text not null default '',
  file_path text
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id),
  product_id uuid not null references products (id),
  amount_mnt integer not null check (amount_mnt >= 0),
  page_count integer,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamptz not null default now(),
  unique (id, profile_id)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references orders (id),
  qpay_invoice_id text,
  qpay_payment_id text unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  checked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists entitlements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id),
  product_id uuid not null references products (id),
  order_id uuid not null unique references orders (id),
  payment_id uuid not null unique references payments (id),
  uses_remaining integer not null default 1 check (uses_remaining >= 0),
  granted_at timestamptz not null default now()
);

create table if not exists exam_attempts (
  id uuid primary key default gen_random_uuid(),
  entitlement_id uuid not null unique references entitlements (id),
  profile_id uuid not null references profiles (id),
  started_at timestamptz not null default now(),
  deadline_at timestamptz not null,
  submitted_at timestamptz
);

create table if not exists attempt_answers (
  attempt_id uuid not null references exam_attempts (id) on delete cascade,
  question_id uuid not null references questions (id),
  option_id uuid references answer_options (id),
  primary key (attempt_id, question_id)
);

create table if not exists exam_results (
  attempt_id uuid primary key references exam_attempts (id) on delete cascade,
  score integer not null check (score >= 0),
  total integer not null check (total >= 0),
  created_at timestamptz not null default now()
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id),
  product_id uuid not null references products (id),
  score integer,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists iq_test_attempts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id),
  product_id uuid not null references products (id),
  score integer,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists content_access_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles (id),
  product_id uuid not null references products (id),
  action text not null,
  created_at timestamptz not null default now()
);

create index if not exists products_kind_grade_idx on products (kind, grade, difficulty);
create index if not exists questions_product_idx on questions (product_id, position);
create index if not exists orders_profile_idx on orders (profile_id, created_at desc);
create index if not exists entitlements_profile_idx on entitlements (profile_id, product_id);

insert into product_prices (code, amount_mnt, included_units)
values
  ('exam', 5000, 1),
  ('project', 10000, 1),
  ('project_page', 2000, 1),
  ('quiz', 2000, 1),
  ('iq', 10000, 1),
  ('story', 2000, 1)
on conflict (code) do nothing;

alter table categories enable row level security;
alter table products enable row level security;
alter table product_prices enable row level security;
alter table exams enable row level security;
alter table questions enable row level security;
alter table answer_options enable row level security;
alter table projects enable row level security;
alter table quizzes enable row level security;
alter table iq_tests enable row level security;
alter table stories enable row level security;
alter table learning_resources enable row level security;
alter table orders enable row level security;
alter table payments enable row level security;
alter table entitlements enable row level security;
alter table exam_attempts enable row level security;
alter table attempt_answers enable row level security;
alter table exam_results enable row level security;
alter table quiz_attempts enable row level security;
alter table iq_test_attempts enable row level security;
alter table content_access_logs enable row level security;

-- Published catalog is public. Correct options, orders, scores, and entitlements are not.
create policy products_public_read on products for select using (published = true);
create policy prices_public_read on product_prices for select using (true);
create policy categories_public_read on categories for select using (true);

create policy orders_own_read on orders for select using (profile_id = auth.uid());
create policy payments_own_read on payments for select using (
  exists (select 1 from orders where orders.id = payments.order_id and orders.profile_id = auth.uid())
);
create policy entitlements_own_read on entitlements for select using (profile_id = auth.uid());
create policy exam_results_own_read on exam_results for select using (
  exists (select 1 from exam_attempts where exam_attempts.id = exam_results.attempt_id and exam_attempts.profile_id = auth.uid())
);

-- Students do not insert or update payments, entitlements, or scores.
-- Those writes stay on the service role after QPay verification.
-- Admin writes use the existing user_roles row where role = 'admin', added in a later reviewed policy.
