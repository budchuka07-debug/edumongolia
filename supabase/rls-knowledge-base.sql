-- Row level security for the knowledge base. Apply after supabase/rls.sql
-- and supabase/knowledge-base.sql, once Supabase Auth exists.
-- auth.uid() is provided by Supabase. This file is not applied from the app.

-- Role checks run as the function owner so a public reader does not need
-- permission on user_roles. A FOR ALL admin policy would otherwise run on
-- every public select and fail closed for the wrong reason.
create or replace function app_has_role(requested text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from user_roles
    where profile_id = auth.uid() and role = requested
  );
$$;

revoke all on function app_has_role(text) from public;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    grant execute on function app_has_role(text) to anon;
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    grant execute on function app_has_role(text) to authenticated;
  end if;
end $$;

drop policy if exists universities_admin_write on universities;
drop policy if exists universities_admin_insert on universities;
drop policy if exists universities_admin_update on universities;
drop policy if exists universities_admin_delete on universities;
create policy universities_admin_insert on universities
  for insert with check (app_has_role('admin') or app_has_role('super_admin'));
create policy universities_admin_update on universities
  for update using (app_has_role('admin') or app_has_role('super_admin'))
  with check (app_has_role('admin') or app_has_role('super_admin'));
create policy universities_admin_delete on universities
  for delete using (app_has_role('admin') or app_has_role('super_admin'));

drop policy if exists universities_public_read on universities;
create policy universities_public_read on universities
  for select using (publication_status = 'published');

drop policy if exists programs_public_read on programs;
create policy programs_public_read on programs
  for select using (publication_status = 'published');

drop policy if exists scholarships_public_read on scholarships;
create policy scholarships_public_read on scholarships
  for select using (publication_status = 'published');

alter table university_registries enable row level security;
alter table university_aliases enable row level security;
alter table university_admission_profiles enable row level security;
alter table university_contacts enable row level security;
alter table tuition_fees enable row level security;
alter table accommodation_fees enable row level security;
alter table application_fees enable row level security;
alter table insurance_fees enable row level security;
alter table other_fees enable row level security;
alter table program_exam_requirements enable row level security;
alter table university_exam_requirements enable row level security;
alter table partner_university_network enable row level security;
alter table partner_program_data enable row level security;
alter table partner_scholarship_data enable row level security;
alter table partner_communications enable row level security;
alter table moe_registry_rows enable row level security;
alter table import_jobs enable row level security;
alter table import_errors enable row level security;
alter table data_verifications enable row level security;
alter table data_change_logs enable row level security;

drop policy if exists university_registries_public_read on university_registries;
create policy university_registries_public_read on university_registries
  for select using (
    exists (
      select 1 from universities
      where universities.id = university_registries.university_id
        and universities.publication_status = 'published'
    )
  );

drop policy if exists university_contacts_public_read on university_contacts;
create policy university_contacts_public_read on university_contacts
  for select using (is_public = true);

drop policy if exists tuition_public_read on tuition_fees;
create policy tuition_public_read on tuition_fees
  for select using (verification_status = 'officially_verified');

drop policy if exists accommodation_public_read on accommodation_fees;
create policy accommodation_public_read on accommodation_fees
  for select using (verification_status = 'officially_verified');

drop policy if exists partner_network_admin on partner_university_network;
create policy partner_network_admin on partner_university_network
  for select using (app_has_role('admin') or app_has_role('super_admin'));

drop policy if exists partner_communications_private on partner_communications;
create policy partner_communications_private on partner_communications
  for select using (
    exists (
      select 1 from partner_members
      where partner_members.partner_id = partner_communications.partner_id
        and partner_members.profile_id = auth.uid()
    )
    or app_has_role('admin')
    or app_has_role('super_admin')
  );

drop policy if exists import_jobs_admin on import_jobs;
create policy import_jobs_admin on import_jobs
  for all using (app_has_role('admin') or app_has_role('super_admin'))
  with check (app_has_role('admin') or app_has_role('super_admin'));

comment on policy universities_public_read on universities is
  'Draft and partner-only rows are not public. Publication is a separate step from import.';
