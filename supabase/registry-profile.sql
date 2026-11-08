-- University profile columns for the national registry.
-- Apply after supabase/schema.sql and supabase/knowledge-base.sql.
-- This file does not insert institutions. The importer writes supabase/seeds/moe-2026-06-17.sql.
-- Do not connect this repository to Supabase yet.

alter table provinces add column if not exists name_zh text;
alter table provinces add column if not exists name_mn text;
alter table cities add column if not exists name_zh text;

create unique index if not exists provinces_country_name_zh_idx
  on provinces (country_id, name_zh)
  where name_zh is not null;

create unique index if not exists cities_province_name_zh_idx
  on cities (province_id, name_zh)
  where name_zh is not null;

alter table universities alter column city_id drop not null;

alter table universities add column if not exists officially_registered boolean not null default false;
alter table universities add column if not exists international_admission_status text not null default 'unpublished';
alter table universities add column if not exists admission_source text;
alter table universities add column if not exists last_verified_at timestamptz;
alter table universities add column if not exists administering_authority text;
alter table universities add column if not exists education_level text;
alter table universities add column if not exists ownership text;
alter table universities add column if not exists registry_location text;
alter table universities add column if not exists registry_remark text;
alter table universities add column if not exists district text;
alter table universities add column if not exists address_zh text;
alter table universities add column if not exists latitude numeric;
alter table universities add column if not exists longitude numeric;

comment on column universities.officially_registered is
  'True when the institution code is on a Ministry of Education registry file. This does not mean it accepts international students.';
comment on column universities.international_admission_status is
  'Unpublished until an admission source names this institution. international_student_status stays unknown in that case.';
comment on column universities.ownership is
  'private only when the registry remark is 民办. A blank remark is not stored as public.';
comment on column universities.city_id is
  'Null when the source list has a province section and no city column, as in the adult-institution file.';

alter table universities drop constraint if exists universities_admission_status_check;
alter table universities
  add constraint universities_admission_status_check check (
    international_admission_status in ('unpublished', 'open', 'closed', 'not_offered', 'unknown')
  );

alter table universities drop constraint if exists universities_ownership_check;
alter table universities
  add constraint universities_ownership_check check (
    ownership is null or ownership in ('private', 'public', 'cooperative')
  );

alter table universities drop constraint if exists universities_education_level_check;
alter table universities
  add constraint universities_education_level_check check (
    education_level is null or education_level in ('undergraduate', 'vocational')
  );

create table if not exists university_statistics (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  reporting_year integer not null,
  total_students integer check (total_students is null or total_students >= 0),
  undergraduate_students integer check (undergraduate_students is null or undergraduate_students >= 0),
  master_students integer check (master_students is null or master_students >= 0),
  doctoral_students integer check (doctoral_students is null or doctoral_students >= 0),
  international_students integer check (international_students is null or international_students >= 0),
  faculty_staff integer check (faculty_staff is null or faculty_staff >= 0),
  faculty_count integer check (faculty_count is null or faculty_count >= 0),
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification',
  unique (university_id, reporting_year)
);

comment on table university_statistics is
  'Every count needs a reporting year and a source. Do not insert a guessed headcount.';

create table if not exists university_rankings (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  organization text not null,
  ranking_year integer not null,
  rank integer check (rank is null or rank > 0),
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification',
  unique (university_id, organization, ranking_year)
);

create table if not exists admission_rounds (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  program_id uuid references programs (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  degree_level text,
  teaching_language text check (teaching_language is null or teaching_language in ('zh', 'en', 'both', 'other')),
  round_name text not null default '',
  opens_on date,
  early_deadline date,
  regular_deadline date,
  final_deadline date,
  spring_intake boolean,
  autumn_intake boolean,
  enrollment_on date,
  application_url text,
  interview_required boolean,
  source_id uuid not null references source_references (id),
  publication_status text not null default 'draft',
  verification_status text not null default 'pending_verification',
  unique (university_id, program_id, academic_year_id, teaching_language, round_name)
);

comment on table admission_rounds is
  'Deadlines stay null until that university and program publish them. Do not copy one university deadline onto another.';
