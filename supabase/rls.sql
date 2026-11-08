-- Мөр түвшний хамгаалалт. Supabase Auth холбогдсоны дараа ажиллуулна.
-- profiles.id нь auth.uid()-тай тэнцүү байна гэж үзнэ.
-- Паспорт, дүн, онооны баримт олон нийтийн bucket-д байхгүй.

alter table profiles enable row level security;
alter table applications enable row level security;
alter table application_documents enable row level security;
alter table application_status_history enable row level security;
alter table application_assignments enable row level security;
alter table application_messages enable row level security;
alter table partners enable row level security;
alter table partner_members enable row level security;
alter table referrals enable row level security;
alter table commissions enable row level security;
alter table inquiries enable row level security;

create policy profiles_own on profiles
  for select using (id = auth.uid());

create policy profiles_update_own on profiles
  for update using (id = auth.uid());

create policy applications_student on applications
  for all using (student_id = auth.uid())
  with check (student_id = auth.uid());

create policy applications_assigned_agent on applications
  for select using (
    exists (
      select 1
      from application_assignments assignment
      join agents agent on agent.id = assignment.agent_id
      where assignment.application_id = applications.id
        and agent.profile_id = auth.uid()
    )
  );

create policy documents_student on application_documents
  for select using (
    exists (
      select 1 from applications
      where applications.id = application_documents.application_id
        and applications.student_id = auth.uid()
    )
  );

create policy documents_assigned_agent on application_documents
  for select using (
    exists (
      select 1
      from applications
      join application_assignments assignment on assignment.application_id = applications.id
      join agents agent on agent.id = assignment.agent_id
      where applications.id = application_documents.application_id
        and agent.profile_id = auth.uid()
    )
  );

create policy partner_members_self on partner_members
  for select using (profile_id = auth.uid());

create policy partners_member on partners
  for select using (
    exists (
      select 1 from partner_members
      where partner_members.partner_id = partners.id
        and partner_members.profile_id = auth.uid()
    )
  );

-- Их сургууль, хөтөлбөр, тэтгэлгийн нийтлэг каталог унших нээлттэй.
-- Бичих эрх зөвхөн admin role. Доорх бодлогыг universities, programs, scholarships дээр давтана.
alter table universities enable row level security;
alter table programs enable row level security;
alter table scholarships enable row level security;

create policy universities_public_read on universities for select using (true);
create policy programs_public_read on programs for select using (true);
create policy scholarships_public_read on scholarships for select using (true);

create policy universities_admin_write on universities
  for all using (
    exists (select 1 from user_roles where profile_id = auth.uid() and role = 'admin')
  )
  with check (
    exists (select 1 from user_roles where profile_id = auth.uid() and role = 'admin')
  );

-- Storage: bucket "application-documents" нь private.
-- storage.objects дээрх бодлого нь application_documents.storage_path-тай таарна.
-- public URL үүсгэхгүй.
