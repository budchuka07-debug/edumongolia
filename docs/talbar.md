# Талбарын тайлбар

Хоосон тоо `null`. Дэлгэц «Их сургууль тодорхойлоогүй» эсвэл «Нийтлэгдээгүй». Тэг гэж үзэхгүй.

## Их сургууль

`universities`: id, slug, улс, муж, хот, төрөл (улсын/хувийн эсвэл хоосон), үүссэн он, сайт, олон улсын элсэлтийн сайт, имэйл, утас. Нэр, танилцуулга, хаяг `translations` дээр mn, en, zh.

`university_campuses`, `university_contacts` тусдаа. Лого, зураг `media`. Олон нийтийн зураг л `public = true`.

Зэрэг, мэргэжил их сургуулийн багана биш. `programs` мөрөөс гарна. Ингэснээр сургууль бүр өөр хөтөлбөртэй.

## Хөтөлбөр

`programs`: их сургууль, факультет, мэргэжил, зэрэг, сургалтын хэл, жил, жилийн төлбөр, өргөдлийн хураамж, байр, албан холбоос. Бүгд тухайн хөтөлбөрийнх.

`program_requirements` нь хичээлийн жилээр нэг мөр: нас, боловсрол, голч, голчийн хэмжүүр. Давхар `(program_id, academic_year_id)` хориотой.

Хэл `language_requirements`. Нэг `group_key` доторх шалгалтаас нэгийг хангахад болно. `mandatory = false` бол сонголтот.

CSCA болон бусад хичээл `examination_requirements`. Доод оноо хоосон байж болно. Сонголтот мөр унагаахгүй.

Баримт `program_document_requirements`. Жагсаалт байхгүй бол тухайн жилд шаардлага нийтлэгдээгүй.

## Тэтгэлэг

`scholarships` хичээлийн жилтэй. 2026/2027 ба 2027/2028 хоёр мөр. Нөхцөл хуулах триггер байхгүй.

Ангилал: CSC, их сургууль, муж, хот, Торгоны зам, Бүс ба зам, хятад хэлний багш, бүрэн, хэсэгчилсэн, төлбөрөөс чөлөөлөх. Ангилал олон байж болно. «Бүрэн» гэсэн ангилал мөнгөн дүн биш.

`scholarship_benefits`: төлбөр, байр, сарын тэтгэмж, даатгал, хураамж. Хоосон бол нийтлэгдээгүй.

`scholarship_nationalities` мөр байхгүй бол иргэншил нийтлэгдээгүй. Хоосон жагсаалтыг «бүх улс» гэж уншихгүй.

`scholarship_universities`, `scholarship_programs` холбоо. Холбоогүй тэтгэлэг бүх сургуульд харагдахгүй.

## Шалгалт

`examinations` ба `examination_subjects`: HSK 1–6, HSKK, IELTS Academic, TOEFL iBT, Duolingo, CSCA (мэргэжлийн хятад хэл, математик, физик, хими), SAT.

`maximum_score`, `exam_pass_score` нь шалгалтын өөрийн хэмжүүр. Их сургуулийн доод оноо `examination_requirements.min_score`.

`examination_sessions` нь өдөр. Хичээлийн жил хоосон байж болно. CSCA-ийн нийтлэгдсэн өдрийг жилтэй нь албадан холбоогүй.

## Эх сурвалж

`source_references`: төрөл, холбоос, хичээлийн жил, баталгаажуулсан огноо, шинэчилсэн огноо, төлөв (`verified`, `pending`, `expired`, `needs_update`).

## Хүн, өргөдөл

3–4-р үе. `profiles`, `user_roles`, `agents`, `partners`, `partner_members`.

`applications.status`: draft, submitted, under_review, documents_required, pre_admission, university_review, accepted, rejected, scholarship_approved, visa_preparation, completed.

`application_status_history`: өмнөх төлөв, шинэ төлөв, хэн, хэзээ, тайлбар.

`application_documents.storage_path` хувийн bucket. Нийтийн URL байхгүй.
