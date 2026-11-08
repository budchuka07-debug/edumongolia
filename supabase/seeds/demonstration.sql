-- DEMONSTRATION ONLY.
-- These rows are not Chinese institutions, scholarships, fees, or admission rules.
-- They exist so a future migration test can see the publication and registry shape.
-- Do not mark them published. Do not copy them into the website catalog.

insert into countries (code)
values ('CN')
on conflict (code) do nothing;

insert into source_references (source_type, url, title, organization, status)
values (
  'ministry_of_education',
  'https://www.moe.gov.cn/',
  'DEMONSTRATION ONLY — Ministry of Education portal, not a downloaded registry file',
  'Ministry of Education of the People''s Republic of China',
  'pending_verification'
);

insert into provinces (country_id)
select id from countries where code = 'CN'
limit 1;

insert into cities (province_id)
select id from provinces
order by created_at desc
limit 1;

insert into universities (
  slug,
  country_id,
  province_id,
  city_id,
  name_zh,
  name_en,
  name_mn,
  demonstration,
  publication_status,
  verification_status,
  international_student_status,
  source_id
)
select
  'demonstration-only-not-a-university',
  country.id,
  province.id,
  city.id,
  '仅供演示，不是高等学校',
  'DEMONSTRATION ONLY — not a university',
  'ЗӨВХӨН ЖИШЭЭ — их сургууль биш',
  true,
  'draft',
  'pending_verification',
  'unknown',
  source.id
from countries country
join provinces province on province.country_id = country.id
join cities city on city.province_id = province.id
join source_references source on source.title like 'DEMONSTRATION ONLY%'
where country.code = 'CN'
limit 1;

-- Headline counts from the June 2026 project brief. The institution file is not in this repository.
-- Pending verification until the official list file and its URL are attached. These rows are counts, not schools.
insert into registry_statistics (registry, as_of, metric, value, source_id, verification_status, note)
select
  'moe_national',
  date '2026-06-01',
  metric,
  value,
  source.id,
  'pending_verification',
  'Count from the project brief for June 2026. Not an imported institution. Not marked officially verified because the list file is not attached.'
from source_references source
cross join (
  values
    ('higher_education_institutions', 3196),
    ('regular_higher_education_institutions', 2952),
    ('undergraduate_institutions', 1412),
    ('higher_vocational_institutions', 1540),
    ('adult_higher_education_institutions', 244)
) as figures(metric, value)
where source.title like 'DEMONSTRATION ONLY%'
on conflict (registry, as_of, metric) do nothing;
