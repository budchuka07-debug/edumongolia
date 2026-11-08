# Supabase-д бэлтгэсэн холболт

Одоо холбоогүй. `@supabase/supabase-js` суулгаагүй. Нууц түлхүүр байхгүй.

## Дараалал

1. Supabase төсөл үүсгээд `supabase/schema.sql`, `supabase/knowledge-base.sql`, `supabase/registry-profile.sql`, `supabase/rls.sql`, `supabase/rls-knowledge-base.sql`, дараа нь `supabase/rls-registry.sql` ажиллуулна. Сургуулийн мөрийг `supabase/seeds/moe-2026-06-17.sql` оруулна. Одоо холбохгүй. Тайлбар `docs/china-knowledge-base.md`, `docs/moe-registry.md`.
2. `lib/marketplace/catalog.ts` дээрх UUID-г seed болгоно. Хоосон тоог null хэвээр үлдээнэ.
3. `translations` хүснэгтэд mn, en, zh оруулна. Код дахь `Localized` объект түр зуурынх.
4. Auth: `profiles.id = auth.uid()`. Сурагч өөрийн өргөдөл, баримтаа уншина. Агент зөвхөн оноогдсон өргөдөл. Хамтрагч зөвхөн өөрийн байгууллага.
5. Storage bucket `application-documents` private. Паспорт, дүн, зураг олон нийтийн Cloudinary эсвэл public bucket руу орохгүй.
6. Админ бичилт `user_roles.role = 'admin'`.
7. Каталогийн уншилт олон нийтэд. Бичилт админд.

## Кодын зааг

- `lib/marketplace/queries.ts` одоо санах ойн каталог уншина. 3-р үед эдгээр функцийн гарын үсгийг хэвээр үлдээж, дотор талыг Supabase уншилтаар солино.
- `lib/marketplace/eligibility.ts` цэвэр дүрэм. Сүлжээ дуудахгүй. Сервер дээр дахин ашиглана.
- Зөвлөгөөний маягт одоо `localStorage`. Дараа нь `inquiries` хүснэгт.

## Юу хийхгүй

- Нэг jsonb баганад их сургууль, тэтгэлэг, оноо хийхгүй.
- 2026/2027 мөрийг 2027/2028 руу хуулах trigger бичихгүй.
- Баримтын public URL буцаахгүй.
