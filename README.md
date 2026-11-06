# EduMongolia

Монгол, англи хэлтэй сургалтын вэб. Хичээл, хэвлэмэл нөөц, сурагчийн ширээ, багшийн самбар. Төслийн домайн: [edumongolia.com](https://edumongolia.com).

## Локал дээр ажиллуулах

```bash
npm install
npm run dev
```

Хөгжүүлэлтийн сервер `3847` порт дээр нээгдэнэ.

## Бүтэц

- `app/` — хуудасны зам
- `components/` — толгой, хөл, хуудасны харагдац
- `lib/content/` — хичээл, нөөц, жишээ анги
- `lib/i18n/` — монгол, англи үг
- `netlify.toml` — Netlify дээрх бүтээх тохиргоо

Хэл солих товч толгойд байна. Ахиц, хадгалсан нөөц, багшийн тэмдэглэл тухайн хөтөч дээр үлдэнэ.

## GitHub ба Netlify

Энэ кодыг GitHub репо болгосны дараа Netlify-д холбоно.

1. GitHub дээр `edumongolia` нэртэй репо үүсгээд энэ кодыг оруул.
2. [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project** → GitHub репогоо сонго.
3. Build тохиргоо `netlify.toml`-оос авна: `npm run build`, publish `.next`. Next.js-ийг Netlify өөрөө OpenNext-ээр ажиллуулна. Plugin хувилбар бүү тогтоо.
4. Сайт `*.netlify.app` дээр нээгдсэний дараа **Domain management** → **Add a domain** → `edumongolia.com`.
5. `www.edumongolia.com`-ийг мөн нэм. `netlify.toml` www-г apex руу 301-ээр явуулна.
6. Домайны DNS-ээ (registrar) Netlify-ийн заасан бичлэг рүү заа:
   - оройн домайн `edumongolia.com`: `A` бичлэг `75.2.60.5`, эсвэл `ALIAS`/`ANAME`/`CNAME` `apex-loadbalancer.netlify.com`
   - `www`: `CNAME` таны `*.netlify.app` хаяг руу
7. DNS шалгагдмагц Netlify Let’s Encrypt сертификатыг өөрөө гаргана.

Домайн, Netlify, GitHub данс энд холбогдоогүй. Дээрх алхмыг өөрийн бүртгэлээр баталгаажуулна. Нууц үгээ чат руу бүү явуул.
