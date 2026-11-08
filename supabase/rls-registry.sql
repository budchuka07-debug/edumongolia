-- Row level security for profile tables added in registry-profile.sql.
-- Apply after supabase/rls-knowledge-base.sql so app_has_role already exists.

alter table university_statistics enable row level security;
alter table university_rankings enable row level security;
alter table admission_rounds enable row level security;

drop policy if exists university_statistics_public_read on university_statistics;
create policy university_statistics_public_read on university_statistics
  for select using (
    verification_status = 'officially_verified'
    and exists (
      select 1 from universities
      where universities.id = university_statistics.university_id
        and universities.publication_status = 'published'
    )
  );

drop policy if exists university_rankings_public_read on university_rankings;
create policy university_rankings_public_read on university_rankings
  for select using (
    verification_status = 'officially_verified'
    and exists (
      select 1 from universities
      where universities.id = university_rankings.university_id
        and universities.publication_status = 'published'
    )
  );

drop policy if exists admission_rounds_public_read on admission_rounds;
create policy admission_rounds_public_read on admission_rounds
  for select using (publication_status = 'published' and verification_status = 'officially_verified');

drop policy if exists university_statistics_admin_write on university_statistics;
create policy university_statistics_admin_write on university_statistics
  for all using (app_has_role('admin') or app_has_role('super_admin'))
  with check (app_has_role('admin') or app_has_role('super_admin'));

drop policy if exists university_rankings_admin_write on university_rankings;
create policy university_rankings_admin_write on university_rankings
  for all using (app_has_role('admin') or app_has_role('super_admin'))
  with check (app_has_role('admin') or app_has_role('super_admin'));

drop policy if exists admission_rounds_admin_write on admission_rounds;
create policy admission_rounds_admin_write on admission_rounds
  for all using (app_has_role('admin') or app_has_role('super_admin'))
  with check (app_has_role('admin') or app_has_role('super_admin'));
