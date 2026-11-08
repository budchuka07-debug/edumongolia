-- EduMongolia, Хятадын боловсролын захад зориулсан PostgreSQL бүтэц.
-- Энэ файлыг Supabase дээр ажиллуулаагүй. 3-р үе шатанд холбоно.
-- jsonb зөвхөн audit_logs.context дээр. Шаардлага, тэтгэлэг, орчуулга тусдаа хүснэгтэд.

create extension if not exists pgcrypto;

create table countries (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  created_at timestamptz not null default now()
);

create table provinces (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references countries (id),
  created_at timestamptz not null default now()
);

create table cities (
  id uuid primary key default gen_random_uuid(),
  province_id uuid not null references provinces (id),
  created_at timestamptz not null default now()
);

create table academic_years (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  starts_on date not null,
  ends_on date not null,
  constraint academic_years_order check (ends_on > starts_on)
);

create table source_references (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in (
    'official_university', 'csc', 'embassy', 'csca', 'scholarship_notice', 'government_portal', 'exam_body', 'platform_note'
  )),
  url text not null,
  academic_year_id uuid references academic_years (id),
  verified_on date,
  updated_on date not null default current_date,
  status text not null check (status in ('verified', 'pending', 'expired', 'needs_update')),
  created_at timestamptz not null default now()
);

create table universities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  country_id uuid not null references countries (id),
  province_id uuid not null references provinces (id),
  city_id uuid not null references cities (id),
  university_type text check (university_type in ('public', 'private')),
  founded_year integer,
  website text,
  international_website text,
  email text,
  phone text,
  demonstration boolean not null default false,
  source_id uuid references source_references (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table university_campuses (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  city_id uuid references cities (id),
  created_at timestamptz not null default now()
);

create table university_contacts (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  role text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table university_academic_years (
  university_id uuid not null references universities (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  primary key (university_id, academic_year_id)
);

create table faculties (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table disciplines (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  university_id uuid not null references universities (id),
  faculty_id uuid references faculties (id),
  discipline_id uuid not null references disciplines (id),
  degree_level text not null check (degree_level in ('bachelor', 'master', 'phd', 'non_degree')),
  instruction_language text not null check (instruction_language in ('zh', 'en', 'both')),
  duration_years numeric,
  annual_tuition_cny numeric,
  application_fee_cny numeric,
  annual_accommodation_cny numeric,
  official_url text,
  demonstration boolean not null default false,
  source_id uuid references source_references (id),
  created_at timestamptz not null default now(),
  constraint programs_money_nonnegative check (
    (annual_tuition_cny is null or annual_tuition_cny >= 0)
    and (application_fee_cny is null or application_fee_cny >= 0)
    and (annual_accommodation_cny is null or annual_accommodation_cny >= 0)
  )
);

create table program_requirements (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  min_age integer,
  max_age integer,
  min_education text check (min_education in ('middle', 'high_school', 'bachelor', 'master', 'doctor')),
  min_gpa numeric,
  gpa_scale numeric,
  unique (program_id, academic_year_id),
  constraint program_requirements_age check (max_age is null or min_age is null or max_age >= min_age)
);

create table scholarships (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  country_id uuid not null references countries (id),
  academic_year_id uuid not null references academic_years (id),
  official_url text,
  demonstration boolean not null default false,
  source_id uuid references source_references (id),
  created_at timestamptz not null default now(),
  unique (slug, academic_year_id)
);

create table scholarship_categories (
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  category text not null check (category in (
    'csc', 'university', 'provincial', 'municipal', 'silk_road', 'belt_road', 'confucius', 'full', 'partial', 'tuition_waiver'
  )),
  primary key (scholarship_id, category)
);

create table scholarship_degree_levels (
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  degree_level text not null check (degree_level in ('bachelor', 'master', 'phd', 'non_degree')),
  primary key (scholarship_id, degree_level)
);

create table scholarship_universities (
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  university_id uuid not null references universities (id),
  academic_year_id uuid not null references academic_years (id),
  primary key (scholarship_id, university_id, academic_year_id)
);

create table scholarship_programs (
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  program_id uuid not null references programs (id),
  academic_year_id uuid not null references academic_years (id),
  primary key (scholarship_id, program_id, academic_year_id)
);

create table scholarship_requirements (
  id uuid primary key default gen_random_uuid(),
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  min_age integer,
  max_age integer,
  min_education text,
  min_gpa numeric,
  gpa_scale numeric,
  unique (scholarship_id, academic_year_id)
);

-- null массив биш: мөр байхгүй бол иргэншил нийтлэгдээгүй.
create table scholarship_nationalities (
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  country_code text not null,
  primary key (scholarship_id, academic_year_id, country_code)
);

create table scholarship_benefits (
  id uuid primary key default gen_random_uuid(),
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  tuition_coverage text check (tuition_coverage in ('full', 'partial', 'waiver', 'none')),
  accommodation_coverage text check (accommodation_coverage in ('full', 'partial', 'waiver', 'none')),
  monthly_stipend_cny numeric,
  medical_insurance boolean,
  application_fee_cny numeric,
  unique (scholarship_id, academic_year_id)
);

create table scholarship_deadlines (
  id uuid primary key default gen_random_uuid(),
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  opens_on date,
  closes_on date,
  unique (scholarship_id, academic_year_id),
  constraint scholarship_deadlines_order check (closes_on is null or opens_on is null or closes_on >= opens_on)
);

create table examinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  family text not null check (family in ('chinese', 'english', 'csca', 'other')),
  official_url text,
  source_id uuid references source_references (id)
);

create table examination_subjects (
  id uuid primary key default gen_random_uuid(),
  examination_id uuid not null references examinations (id) on delete cascade,
  slug text not null,
  category text not null,
  maximum_score numeric,
  exam_pass_score numeric,
  unique (examination_id, slug)
);

create table examination_sessions (
  id uuid primary key default gen_random_uuid(),
  examination_id uuid not null references examinations (id) on delete cascade,
  academic_year_id uuid references academic_years (id),
  starts_on date not null,
  ends_on date not null,
  registration_opens_on date,
  registration_closes_on date,
  source_id uuid references source_references (id)
);

create table examination_requirements (
  id uuid primary key default gen_random_uuid(),
  owner_type text not null check (owner_type in ('program', 'scholarship', 'university')),
  program_id uuid references programs (id) on delete cascade,
  scholarship_id uuid references scholarships (id) on delete cascade,
  university_id uuid references universities (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  subject_id uuid not null references examination_subjects (id),
  min_score numeric,
  mandatory boolean not null default true,
  constraint examination_requirements_owner check (
    (owner_type = 'program' and program_id is not null and scholarship_id is null and university_id is null)
    or (owner_type = 'scholarship' and scholarship_id is not null and program_id is null and university_id is null)
    or (owner_type = 'university' and university_id is not null and program_id is null and scholarship_id is null)
  )
);

create unique index examination_requirements_program_idx
  on examination_requirements (program_id, academic_year_id, subject_id)
  where program_id is not null;

create table language_requirements (
  id uuid primary key default gen_random_uuid(),
  owner_type text not null check (owner_type in ('program', 'scholarship')),
  program_id uuid references programs (id) on delete cascade,
  scholarship_id uuid references scholarships (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  examination_id uuid not null references examinations (id),
  group_key text,
  hsk_level integer,
  min_score numeric,
  mandatory boolean not null default true
);

create table academic_requirements (
  id uuid primary key default gen_random_uuid(),
  owner_type text not null check (owner_type in ('program', 'scholarship')),
  program_id uuid references programs (id) on delete cascade,
  scholarship_id uuid references scholarships (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  min_age integer,
  max_age integer,
  min_education text,
  min_gpa numeric,
  gpa_scale numeric
);

create unique index academic_requirements_program_year_idx
  on academic_requirements (program_id, academic_year_id)
  where program_id is not null;

create unique index academic_requirements_scholarship_year_idx
  on academic_requirements (scholarship_id, academic_year_id)
  where scholarship_id is not null;

create table document_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  sensitive boolean not null default true
);

create table program_document_requirements (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  document_type_id uuid not null references document_types (id),
  academic_year_id uuid not null references academic_years (id),
  required boolean not null default true,
  unique (program_id, document_type_id, academic_year_id)
);

create table profiles (
  id uuid primary key,
  display_name text,
  nationality_code text,
  created_at timestamptz not null default now()
);

create table user_roles (
  profile_id uuid not null references profiles (id) on delete cascade,
  role text not null check (role in ('student', 'agent', 'partner', 'admin')),
  primary key (profile_id, role)
);

create table agents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles (id),
  created_at timestamptz not null default now()
);

create table partners (
  id uuid primary key default gen_random_uuid(),
  partner_type text not null check (partner_type in ('chinese_university', 'education_agency', 'recruitment_partner', 'educational_institution')),
  verification_status text not null default 'pending' check (verification_status in ('verified', 'pending', 'expired', 'needs_update')),
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table partner_members (
  partner_id uuid not null references partners (id) on delete cascade,
  profile_id uuid not null references profiles (id) on delete cascade,
  primary key (partner_id, profile_id)
);

create table partner_universities (
  partner_id uuid not null references partners (id) on delete cascade,
  university_id uuid not null references universities (id),
  primary key (partner_id, university_id)
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles (id),
  program_id uuid not null references programs (id),
  scholarship_id uuid references scholarships (id),
  academic_year_id uuid not null references academic_years (id),
  status text not null check (status in (
    'draft', 'submitted', 'under_review', 'documents_required', 'pre_admission',
    'university_review', 'accepted', 'rejected', 'scholarship_approved', 'visa_preparation', 'completed'
  )),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications (id) on delete cascade,
  document_type_id uuid not null references document_types (id),
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications (id) on delete cascade,
  previous_status text,
  new_status text not null,
  updated_by uuid references profiles (id),
  comment text,
  created_at timestamptz not null default now()
);

create table application_assignments (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications (id) on delete cascade,
  agent_id uuid not null references agents (id),
  assigned_at timestamptz not null default now(),
  unique (application_id, agent_id)
);

create table application_messages (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications (id) on delete cascade,
  author_id uuid not null references profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table referrals (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id),
  application_id uuid references applications (id),
  created_at timestamptz not null default now()
);

create table commission_rules (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id),
  academic_year_id uuid not null references academic_years (id),
  rate_percent numeric,
  unique (partner_id, academic_year_id)
);

create table commissions (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid not null references commission_rules (id),
  application_id uuid not null references applications (id),
  amount_cny numeric,
  created_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  commission_id uuid references commissions (id),
  amount_cny numeric,
  paid_on date,
  created_at timestamptz not null default now()
);

create table saved_universities (
  profile_id uuid not null references profiles (id) on delete cascade,
  university_id uuid not null references universities (id) on delete cascade,
  primary key (profile_id, university_id)
);

create table saved_scholarships (
  profile_id uuid not null references profiles (id) on delete cascade,
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  primary key (profile_id, scholarship_id)
);

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles (id),
  name text not null,
  phone text not null,
  note text,
  created_at timestamptz not null default now()
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  updated_on date not null default current_date
);

create table media (
  id uuid primary key default gen_random_uuid(),
  owner_table text not null,
  owner_id uuid not null,
  storage_path text not null,
  public boolean not null default false,
  created_at timestamptz not null default now()
);

create table translations (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  entity_id uuid not null,
  field_name text not null,
  locale text not null check (locale in ('mn', 'en', 'zh')),
  value text not null,
  unique (entity_table, entity_id, field_name, locale)
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles (id),
  action text not null,
  entity_table text not null,
  entity_id uuid,
  context jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index programs_university_idx on programs (university_id);
create index programs_discipline_idx on programs (discipline_id);
create index scholarships_year_idx on scholarships (academic_year_id);
create index applications_student_idx on applications (student_id);
create index applications_status_idx on applications (status);
create index translations_entity_idx on translations (entity_table, entity_id);
create index source_references_status_idx on source_references (status);
