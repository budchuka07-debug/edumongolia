"use client";

import { usePersistedState } from "@/lib/use-persisted-state";
import { emptyInnerMongoliaDraft, innerMongoliaDraftKey, innerMongoliaScholarshipPath, type InnerMongoliaDraft } from "@/lib/scholarships/inner-mongolia";

const fields: { key: keyof InnerMongoliaDraft; label: string }[] = [
  { key: "academicYear", label: "Хичээлийн жил" },
  { key: "opensOn", label: "Бүртгэл нээгдэх огноо" },
  { key: "closesOn", label: "Бүртгэл хаагдах огноо" },
  { key: "quotaTotal", label: "Нийт квот" },
  { key: "quotaBachelor", label: "Бакалаврын квот" },
  { key: "quotaMaster", label: "Магистрын квот" },
  { key: "quotaDoctoral", label: "Докторын квот" },
];

export function InnerMongoliaAdmin() {
  const [draft, setDraft] = usePersistedState<InnerMongoliaDraft>(innerMongoliaDraftKey, emptyInnerMongoliaDraft);

  function update(key: keyof InnerMongoliaDraft, value: string) {
    setDraft({ ...draft, [key]: value });
  }

  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-semibold">Өвөр Монголын засгийн газрын тэтгэлэг</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        Энд хадгалсан огноо, квот зөвхөн энэ хөтөч дээрх ноорог. Нийтийн хуудас үүнийг уншихгүй. Supabase холбогдоогүй тул бүх зочдод гаргахын тулд нийтлэгдсэн өгөгдлийг шинэчилнэ.
      </p>
      <a className="mt-3 inline-block text-sm font-semibold text-primary" href={innerMongoliaScholarshipPath}>
        Нийтийн хуудас
      </a>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="flex flex-col gap-1 text-sm">
            {field.label}
            <input
              className="h-10 rounded-lg border border-border bg-card px-3"
              value={draft[field.key]}
              onChange={(event) => update(field.key, event.target.value)}
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 text-sm font-semibold text-primary"
        onClick={() => setDraft(emptyInnerMongoliaDraft)}
      >
        Ноорог цэвэрлэх
      </button>
    </section>
  );
}
