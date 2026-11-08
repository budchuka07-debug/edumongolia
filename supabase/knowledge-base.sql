-- China Education Knowledge Base.
-- Apply after supabase/schema.sql. Do not run this on Supabase from this repository yet.
-- Adds registries, fees, imports, and verification. It does not insert real universities.

create extension if not exists pg_trgm;

-- Existing year column is the establishment year. Keep the name used by schema.sql.
comment on column universities.founded_year is
  'Establishment year. Leave null until an official source records it.';
comment on column universities.website is
  'Official website. This is official_website in the knowledge-base documentation.';
comment on column universities.international_website is
  'International admission URL. Null when the university has not published one.';

alter table universities
  add column institution_code text,
  add column name_zh text,
  add column name_en text,
  add column name_mn text,
  add column institution_type text,
  add column international_student_status text not null default 'unknown',
  add column publication_status text not null default 'draft',
  add column verification_status text not null default 'pending_verification';

alter table universities
  add constraint universities_institution_type_check check (
    institution_type is null or institution_type in (
      'regular_undergraduate', 'higher_vocational', 'adult', 'other'
    )
  ),
  add constraint universities_international_status_check check (
    international_student_status in ('unknown', 'accepts', 'does_not_accept', 'not_published')
  ),
  add constraint universities_publication_status_check check (
    publication_status in ('draft', 'pending_review', 'verified', 'published', 'expired', 'archived')
  ),
  add constraint universities_verification_status_check check (
    verification_status in (
      'officially_verified', 'partner_provided', 'pending_verification', 'needs_update', 'expired'
    )
  );

create unique index universities_institution_code_idx
  on universities (institution_code)
  where institution_code is not null;

create index universities_name_zh_trgm_idx on universities using gin (name_zh gin_trgm_ops);
create index universities_name_en_trgm_idx on universities using gin (name_en gin_trgm_ops);
create index universities_publication_idx on universities (publication_status, international_student_status);

comment on column universities.international_student_status is
  'Unknown until a source says the institution accepts international students. The national registry does not imply this.';

-- Three overlapping registries. One university row can belong to any combination.
create table university_registries (
  university_id uuid not null references universities (id) on delete cascade,
  registry text not null check (registry in (
    'moe_national', 'international_admission', 'dongxueji_partner'
  )),
  member_code text,
  as_of date,
  source_id uuid references source_references (id),
  created_at timestamptz not null default now(),
  primary key (university_id, registry)
);

create index university_registries_registry_idx on university_registries (registry);

comment on table university_registries is
  'Membership only. The Ministry list, the international-admission list, and a partner network are not the same set.';

-- Published counts from a registry release. This is not a list of institutions.
create table registry_statistics (
  id uuid primary key default gen_random_uuid(),
  registry text not null,
  as_of date not null,
  metric text not null,
  value integer not null check (value >= 0),
  source_id uuid references source_references (id),
  verification_status text not null default 'pending_verification',
  note text,
  unique (registry, as_of, metric)
);

create table university_aliases (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  alias text not null,
  alias_type text not null check (alias_type in ('official', 'historical', 'abbreviation', 'transliteration')),
  locale text check (locale in ('mn', 'en', 'zh')),
  unique (university_id, alias, alias_type)
);

create index university_aliases_alias_trgm_idx on university_aliases using gin (alias gin_trgm_ops);

alter table university_campuses
  add column name_zh text,
  add column name_en text,
  add column address text,
  add column is_main boolean not null default false;

alter table university_contacts
  add column is_public boolean not null default false,
  add column source_id uuid references source_references (id);

comment on column university_contacts.is_public is
  'Private partner contacts stay false and are excluded from public policies.';

create table university_classifications (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  classification text not null,
  academic_year_id uuid references academic_years (id),
  source_id uuid references source_references (id),
  unique (university_id, classification, academic_year_id)
);

create table university_accreditations (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  body text not null,
  reference_code text,
  valid_from date,
  valid_until date,
  source_id uuid references source_references (id)
);

create table university_source_links (
  university_id uuid not null references universities (id) on delete cascade,
  source_id uuid not null references source_references (id),
  field_name text not null default '',
  primary key (university_id, source_id, field_name)
);

create table university_admission_profiles (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  international_student_status text not null default 'unknown'
    check (international_student_status in ('unknown', 'accepts', 'does_not_accept', 'not_published')),
  admission_url text,
  source_id uuid references source_references (id),
  publication_status text not null default 'draft',
  unique (university_id, academic_year_id)
);

-- Academic structure. A program is one row, never a bundle inside the university.
create table departments (
  id uuid primary key default gen_random_uuid(),
  faculty_id uuid not null references faculties (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table majors (
  id uuid primary key default gen_random_uuid(),
  discipline_id uuid references disciplines (id),
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table programs drop constraint programs_degree_level_check;
alter table programs
  add constraint programs_degree_level_check check (degree_level in (
    'language', 'foundation', 'associate', 'bachelor', 'master', 'phd', 'doctoral',
    'exchange', 'short_term', 'summer', 'winter', 'non_degree'
  ));

alter table programs drop constraint programs_instruction_language_check;
alter table programs
  add constraint programs_instruction_language_check check (
    instruction_language in ('zh', 'en', 'both', 'other')
  );

alter table programs
  add column major_id uuid references majors (id),
  add column department_id uuid references departments (id),
  add column study_mode text check (study_mode in ('full_time', 'part_time')),
  add column academic_year_id uuid references academic_years (id),
  add column admission_status text not null default 'unpublished'
    check (admission_status in ('unpublished', 'open', 'closed', 'not_offered')),
  add column publication_status text not null default 'draft',
  add column verification_status text not null default 'pending_verification';

comment on column programs.annual_tuition_cny is
  'Legacy nullable column. New amounts go to tuition_fees with an explicit period. Do not copy a semester fee into this yearly column.';

create table program_languages (
  program_id uuid not null references programs (id) on delete cascade,
  language_code text not null check (language_code in ('zh', 'en', 'mn', 'other')),
  primary key (program_id, language_code)
);

create table program_intakes (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  intake_label text,
  opens_on date,
  closes_on date,
  source_id uuid references source_references (id),
  unique (program_id, academic_year_id, intake_label),
  constraint program_intakes_order check (closes_on is null or opens_on is null or closes_on >= opens_on)
);

create table program_campuses (
  program_id uuid not null references programs (id) on delete cascade,
  campus_id uuid not null references university_campuses (id) on delete cascade,
  primary key (program_id, campus_id)
);

create index programs_degree_idx on programs (degree_level, publication_status);
create index programs_major_idx on programs (major_id);

-- Scholarships. Benefits stay in scholarship_benefits, not in admission requirement rows.
create table scholarship_providers (
  id uuid primary key default gen_random_uuid(),
  provider_type text not null check (provider_type in (
    'csc', 'university', 'province', 'municipality', 'embassy', 'other'
  )),
  country_id uuid references countries (id),
  university_id uuid references universities (id),
  created_at timestamptz not null default now()
);

alter table scholarships
  add column provider_id uuid references scholarship_providers (id),
  add column publication_status text not null default 'draft',
  add column verification_status text not null default 'pending_verification';

alter table scholarship_categories drop constraint scholarship_categories_category_check;
alter table scholarship_categories
  add constraint scholarship_categories_category_check check (category in (
    'csc', 'csc_type_a', 'csc_type_b', 'university', 'provincial', 'municipal',
    'belt_road', 'silk_road', 'confucius', 'full', 'partial', 'tuition_waiver'
  ));

alter table scholarship_degree_levels drop constraint scholarship_degree_levels_degree_level_check;
alter table scholarship_degree_levels
  add constraint scholarship_degree_levels_degree_level_check check (degree_level in (
    'language', 'foundation', 'associate', 'bachelor', 'master', 'phd', 'doctoral',
    'exchange', 'short_term', 'summer', 'winter', 'non_degree'
  ));

create table scholarship_eligibility (
  id uuid primary key default gen_random_uuid(),
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  min_age integer,
  max_age integer,
  min_gpa numeric,
  gpa_scale numeric,
  notes_source_id uuid references source_references (id),
  unique (scholarship_id, academic_year_id),
  constraint scholarship_eligibility_age check (max_age is null or min_age is null or max_age >= min_age)
);

create table scholarship_documents (
  scholarship_id uuid not null references scholarships (id) on delete cascade,
  document_type_id uuid not null references document_types (id),
  academic_year_id uuid not null references academic_years (id),
  required boolean not null default true,
  primary key (scholarship_id, document_type_id, academic_year_id)
);

-- Examinations. A requirement always names a university or a program and a year.
create table examination_score_scales (
  id uuid primary key default gen_random_uuid(),
  examination_id uuid not null references examinations (id) on delete cascade,
  subject_id uuid references examination_subjects (id) on delete cascade,
  minimum_score numeric,
  maximum_score numeric,
  unique (examination_id, subject_id),
  constraint examination_score_scales_order check (
    maximum_score is null or minimum_score is null or maximum_score >= minimum_score
  )
);

create table university_exam_requirements (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  subject_id uuid not null references examination_subjects (id),
  min_score numeric,
  mandatory boolean not null,
  test_language text,
  validity_months integer,
  alternative_subject_id uuid references examination_subjects (id),
  source_id uuid references source_references (id),
  unique (university_id, academic_year_id, subject_id)
);

create table program_exam_requirements (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  academic_year_id uuid not null references academic_years (id),
  subject_id uuid not null references examination_subjects (id),
  min_score numeric,
  mandatory boolean not null,
  test_language text,
  validity_months integer,
  alternative_subject_id uuid references examination_subjects (id),
  source_id uuid references source_references (id),
  unique (program_id, academic_year_id, subject_id)
);

comment on table program_exam_requirements is
  'One row per subject the program asks for. Absence of a CSCA subject means it is not required, not that the score is zero.';

create index program_exam_requirements_program_idx
  on program_exam_requirements (program_id, academic_year_id);

-- Money. Period is required so a yearly tuition cannot be stored as a monthly fee.
create table tuition_fees (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id),
  program_id uuid references programs (id),
  academic_year_id uuid not null references academic_years (id),
  amount numeric not null check (amount >= 0),
  currency char(3) not null,
  period text not null check (period in ('year', 'semester', 'program')),
  valid_from date,
  valid_until date,
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification'
);

create table accommodation_fees (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id),
  campus_id uuid references university_campuses (id),
  academic_year_id uuid not null references academic_years (id),
  amount numeric not null check (amount >= 0),
  currency char(3) not null,
  period text not null check (period in ('year', 'semester', 'month')),
  room_type text,
  valid_from date,
  valid_until date,
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification'
);

create table application_fees (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id),
  program_id uuid references programs (id),
  academic_year_id uuid references academic_years (id),
  amount numeric not null check (amount >= 0),
  currency char(3) not null,
  period text not null default 'once' check (period = 'once'),
  valid_from date,
  valid_until date,
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification'
);

create table insurance_fees (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references universities (id),
  academic_year_id uuid references academic_years (id),
  amount numeric not null check (amount >= 0),
  currency char(3) not null,
  period text not null check (period in ('year', 'semester', 'once')),
  valid_from date,
  valid_until date,
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification'
);

create table other_fees (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities (id),
  program_id uuid references programs (id),
  academic_year_id uuid references academic_years (id),
  fee_type text not null,
  amount numeric not null check (amount >= 0),
  currency char(3) not null,
  period text not null check (period in ('year', 'semester', 'month', 'once')),
  valid_from date,
  valid_until date,
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification'
);

create table living_cost_estimates (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references cities (id),
  academic_year_id uuid references academic_years (id),
  amount numeric not null check (amount >= 0),
  currency char(3) not null,
  period text not null check (period in ('month', 'year')),
  source_id uuid not null references source_references (id),
  verification_status text not null default 'pending_verification',
  note text
);

create index tuition_fees_program_idx on tuition_fees (program_id, academic_year_id);

-- Documents. Student uploads stay in application_documents. These rows are requirements only.
create table application_checklists (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid not null references academic_years (id),
  university_id uuid references universities (id),
  program_id uuid references programs (id),
  scholarship_id uuid references scholarships (id),
  degree_level text,
  document_type_id uuid not null references document_types (id),
  required boolean not null default true,
  source_id uuid references source_references (id)
);

-- Sources and change history.
alter table source_references drop constraint source_references_source_type_check;
alter table source_references
  add constraint source_references_source_type_check check (source_type in (
    'official_university', 'csc', 'embassy', 'csca', 'scholarship_notice',
    'government_portal', 'exam_body', 'platform_note',
    'ministry_of_education', 'dongxueji_partner', 'other_platform'
  ));

alter table source_references drop constraint source_references_status_check;
alter table source_references
  add constraint source_references_status_check check (status in (
    'verified', 'pending', 'expired', 'needs_update',
    'officially_verified', 'partner_provided', 'pending_verification'
  ));

alter table source_references
  add column title text,
  add column organization text,
  add column received_on date,
  add column document_reference text;

create table source_documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references source_references (id) on delete cascade,
  storage_path text,
  external_url text,
  received_on date,
  created_at timestamptz not null default now()
);

create table source_records (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references source_references (id),
  entity_table text not null,
  entity_id uuid not null,
  field_name text,
  created_at timestamptz not null default now()
);

create index source_records_entity_idx on source_records (entity_table, entity_id);

create table data_verifications (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  entity_id uuid not null,
  field_name text,
  status text not null check (status in (
    'officially_verified', 'partner_provided', 'pending_verification', 'needs_update', 'expired'
  )),
  verified_by uuid references profiles (id),
  verified_on date,
  source_id uuid references source_references (id),
  created_at timestamptz not null default now()
);

create table data_change_logs (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  entity_id uuid,
  field_name text not null,
  previous_value text,
  updated_value text,
  changed_by uuid references profiles (id),
  source_id uuid references source_references (id),
  created_at timestamptz not null default now()
);

-- Imports. Raw partner rows stay here and are never written over a verified field automatically.
create table import_jobs (
  id uuid primary key default gen_random_uuid(),
  source_kind text not null check (source_kind in ('excel', 'csv', 'json', 'official_file')),
  registry text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'started' check (status in ('started', 'matched', 'failed', 'applied'))
);

create table import_errors (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references import_jobs (id) on delete cascade,
  row_number integer,
  code text not null,
  message text not null,
  raw jsonb,
  created_at timestamptz not null default now()
);

create table partner_university_network (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id) on delete cascade,
  university_id uuid references universities (id),
  partner_institution_code text,
  name_zh text,
  name_en text,
  job_id uuid references import_jobs (id),
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index partner_university_network_code_idx
  on partner_university_network (partner_id, partner_institution_code)
  where partner_institution_code is not null;

create table partner_program_data (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id) on delete cascade,
  network_id uuid references partner_university_network (id) on delete cascade,
  program_id uuid references programs (id),
  academic_year_label text,
  raw jsonb not null,
  job_id uuid references import_jobs (id),
  created_at timestamptz not null default now()
);

create table partner_scholarship_data (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id) on delete cascade,
  scholarship_id uuid references scholarships (id),
  academic_year_label text,
  raw jsonb not null,
  job_id uuid references import_jobs (id),
  created_at timestamptz not null default now()
);

create table partner_communications (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id) on delete cascade,
  profile_id uuid references profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

comment on table partner_communications is
  'Private. Not readable by the public role. Do not store partnership contracts in a public column.';

create table moe_registry_rows (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references import_jobs (id),
  institution_code text,
  name_zh text,
  province_name text,
  city_name text,
  institution_type text,
  raw jsonb not null default '{}'::jsonb,
  university_id uuid references universities (id),
  created_at timestamptz not null default now()
);

-- Match candidates. This function does not update universities.
create or replace function match_university_candidates(
  p_code text,
  p_name_zh text,
  p_name_en text
)
returns table (university_id uuid, match_on text)
language sql
stable
as $$
  select id, 'institution_code'
  from universities
  where p_code is not null and institution_code = p_code
  union all
  select id, 'name_zh'
  from universities
  where p_name_zh is not null and name_zh = p_name_zh
  union all
  select university_id, 'alias'
  from university_aliases
  where p_name_zh is not null and alias = p_name_zh
     or p_name_en is not null and alias = p_name_en
  union all
  select id, 'name_en'
  from universities
  where p_name_en is not null and name_en = p_name_en
$$;

comment on function match_university_candidates is
  'Suggests an existing university. Callers must not overwrite a row whose verification_status is officially_verified.';

-- Published rules for a future eligibility check. No probability column.
create view published_program_exam_rules as
select
  program.university_id,
  requirement.program_id,
  requirement.academic_year_id,
  requirement.subject_id,
  requirement.min_score,
  requirement.mandatory,
  requirement.test_language
from program_exam_requirements requirement
join programs program on program.id = requirement.program_id
where program.publication_status = 'published';

create view sources as
select
  id,
  title,
  url,
  organization,
  source_type,
  document_reference,
  academic_year_id,
  received_on,
  verified_on,
  status as verification_status
from source_references;

comment on view sources is
  'Read-only name for source_references. Phase-1 rows remain in source_references.';
