"use client";

import Link from "next/link";
import { usePersistedState } from "@/lib/use-persisted-state";
import { paths } from "@/lib/marketplace/paths";

const KEY = "edumongolia-university-saved";

export function UniversitySave({ slug }: { slug: string }) {
  const [saved, setSaved] = usePersistedState<string[]>(KEY, []);
  const on = saved.includes(slug);
  const next = on ? saved.filter((item) => item !== slug) : [...saved, slug].slice(0, 4);
  const compare = `${paths.universityCompare}?slugs=${encodeURIComponent(next.join(","))}`;
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="rounded-full bg-card px-3 py-1 text-sm ring-1 ring-foreground/10"
        onClick={() => setSaved(next)}
      >
        {on ? "Хадгалснаас хасах" : "Их сургууль хадгалах"}
      </button>
      <Link href={compare} className="rounded-full bg-card px-3 py-1 text-sm ring-1 ring-foreground/10">
        Харьцуулах
      </Link>
      <Link href={paths.apply} className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
        Зөвлөгөө авах
      </Link>
    </div>
  );
}
