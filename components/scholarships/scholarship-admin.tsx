"use client";

import { usePersistedState } from "@/lib/use-persisted-state";

const KEY = "edumongolia-scholarship-draft";

type Draft = {
  nameMn: string;
  country: string;
  closesAt: string;
  notes: string;
};

const empty: Draft = { nameMn: "", country: "", closesAt: "", notes: "" };

export function ScholarshipAdmin() {
  const [draft, setDraft] = usePersistedState<Draft>(KEY, empty);
  return (
    <section className="mt-8">
      <h2 className="font-heading text-2xl font-semibold">Тэтгэлгийн ноорог</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        Энэ маягт зөвхөн энэ хөтөч дээр хадгална. Нийтийн жагсаалтад орохгүй. Supabase холбогдоогүй. Нийтлэхэд албан эх, шалгасан огноо хэрэгтэй.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(
          [
            ["nameMn", "Монгол нэр"],
            ["country", "Улс"],
            ["closesAt", "Хаах огноо"],
            ["notes", "Эх сурвалжийн тэмдэглэл"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-sm">
            {label}
            <input
              className="mt-1 h-10 w-full rounded-lg border border-border bg-card px-3"
              value={draft[key]}
              onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
            />
          </label>
        ))}
      </div>
      <button type="button" className="mt-3 text-sm font-semibold text-primary" onClick={() => setDraft(empty)}>
        Ноорог цэвэрлэх
      </button>
    </section>
  );
}
