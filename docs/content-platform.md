# EduMongolia content platform, first stage

This note is the review copy. It does not deploy the site, apply SQL, or touch the eSIM Mongolia repository.

## Architecture

The site is Next.js App Router. Public pages stay static where they can. Payment, price overrides, and unlocked text run on the server.

What already works stays:

- Study-abroad, scholarship, and school pages
- The grade 8–12 exam bank at `/bank` and the topic bank at `/school`
- Projects at `/papers`
- QPay invoice, check, and callback routes under `/api/payments/qpay`
- Separate EduMongolia payment file `data/edu-payments.json`

New catalog routes:

| Page | Path |
|---|---|
| Examinations | `/exams` |
| Projects | `/papers` |
| IQ tests | `/iq` |
| Quiz library | `/quizzes` |
| Reading stories | `/stories` |
| Learning resources | `/resources` |
| Account | `/account` |
| About | `/about` |
| Contact | `/contact` |

The header keeps the existing menus and adds this row.

## Prices

Default prices live in `lib/catalog/prices.ts`. An administrator changes them on `/admin` with `EDU_ADMIN_TOKEN`. The saved file is `data/edu-catalog.json` and is not committed.

A project price is `project.amount + max(0, pages - project_page.included_units) * project_page.amount`. Both numbers are rows. The charge path is `chargedPrice` on the server. The browser does not send the amount QPay uses.

## Database

`supabase/content-platform.sql` is the SQL for a new Supabase project. It creates `profiles` and `user_roles` if the China schema is not there, then adds the catalog, order, entitlement, and attempt tables, indexes, and row level security. Supabase is still not connected from this app, and `@supabase/supabase-js` is not installed. The Free plan stays the target.

Students can read their own orders and results. They cannot write payments, entitlements, or scores. Those writes wait for the service role after a verified QPay check.

## Admin

`/admin` now shows the price table and the QPay name checklist. Saving prices requires `EDU_ADMIN_TOKEN`. The public admin page still has the older local desks. Question editing, user management, and sales statistics wait until Supabase auth and the `admin` role are connected. Do not treat the current public `/admin` page as a finished lock.

## QPay

EduMongolia asks QPay for a short-lived access token with the merchant username and password on each invoice. It does not store or refresh a QPay refresh token, so it does not rotate a token that eSIM Mongolia might also hold.

Before production:

- Confirm with QPay that this merchant may take EduMongolia payments.
- Put `EDU_QPAY_USERNAME`, `EDU_QPAY_PASSWORD`, `EDU_QPAY_INVOICE_CODE`, and `EDU_SITE_URL` on the EduMongolia host only.
- Leave eSIM Mongolia credentials and its refresh-token store unchanged.
- Keep EduMongolia callbacks on `/api/payments/qpay/callback`.
- Move secrets to Supabase Edge Function secrets only when the database is connected, and still do not share a refresh token between the two apps.

Access is granted only after the server's payment check. A second callback for the same payment does not grant a second entitlement.

## Not in this stage

Timed exam attempts, one-attempt consumption, score calculation, and admin question editing need the SQL above applied and a signed-in profile. Those are the next stage after this review.
