"use client";

import { usePersistedState } from "@/lib/use-persisted-state";

const KEY = "edumongolia-registry-saved";

export function FavoriteButton({ code }: { code: string }) {
  const [saved, setSaved] = usePersistedState<string[]>(KEY, []);
  const on = saved.includes(code);
  return (
    <button
      type="button"
      className="rounded-full bg-card px-3 py-1 text-sm ring-1 ring-foreground/10"
      onClick={() => setSaved(on ? saved.filter((item) => item !== code) : [...saved, code])}
    >
      {on ? "Хадгалснаас хасах" : "Хадгалах"}
    </button>
  );
}
