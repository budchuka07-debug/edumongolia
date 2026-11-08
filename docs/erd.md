# Өгөгдлийн холбоо

```mermaid
erDiagram
  countries ||--o{ provinces : has
  provinces ||--o{ cities : has
  cities ||--o{ universities : located
  universities ||--o{ faculties : has
  universities ||--o{ programs : offers
  disciplines ||--o{ programs : classifies
  academic_years ||--o{ program_requirements : scopes
  programs ||--o{ program_requirements : requires
  academic_years ||--o{ scholarships : scopes
  scholarships ||--o{ scholarship_benefits : pays
  scholarships ||--o{ scholarship_deadlines : closes
  scholarships }o--o{ universities : scholarship_universities
  scholarships }o--o{ programs : scholarship_programs
  examinations ||--o{ examination_subjects : has
  examination_subjects ||--o{ examination_requirements : sets
  programs ||--o{ language_requirements : asks
  programs ||--o{ examination_requirements : asks
  profiles ||--o{ applications : submits
  programs ||--o{ applications : receives
  applications ||--o{ application_documents : stores
  applications ||--o{ application_status_history : tracks
  agents ||--o{ application_assignments : handles
  partners ||--o{ partner_members : includes
  partners ||--o{ referrals : sends
```

Бүтэн хүснэгт `supabase/schema.sql` дотор. Орчуулга `translations` хүснэгтэд `entity_table + entity_id + field_name + locale`. Одоогийн код орчуулгыг TypeScript объект дээр хадгална. 3-р үед мөр болгоно.

`audit_logs.context` л jsonb. Төлбөр, оноо, баримт бичгийг jsonb-д хийхгүй.
