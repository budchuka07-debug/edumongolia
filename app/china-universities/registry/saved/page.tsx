"use client";

import Link from "next/link";
import { usePersistedState } from "@/lib/use-persisted-state";
import { getMoeInstitution } from "@/lib/registry/moe";
import { paths } from "@/lib/marketplace/paths";

const KEY = "edumongolia-registry-saved";

export default function Page() {
  const [saved, setSaved] = usePersistedState<string[]>(KEY, []);
  const rows = saved.map((code) => getMoeInstitution(code)).filter((item) => item != null);
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Хадгалсан сургууль</h1>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Энэ жагсаалт тухайн хөтөчид үлдэнэ. Сургуулийн мэдээлэл яамны жагсаалтаас.
      </p>
      {rows.length === 0 ? <p className="text-sm">Хадгалсан сургууль алга.</p> : null}
      <ul className="space-y-2 text-sm">
        {rows.map((item) => (
          <li key={item.code} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border px-3 py-2">
            <Link className="font-medium text-primary" href={paths.registryInstitution(item.code)}>
              {item.nameZh}
            </Link>
            <button type="button" className="text-muted-foreground" onClick={() => setSaved(saved.filter((code) => code !== item.code))}>
              Хасах
            </button>
          </li>
        ))}
      </ul>
      {rows.length >= 2 ? (
        <Link className="text-sm font-semibold text-primary" href={`${paths.registryCompare}?codes=${rows.slice(0, 4).map((item) => item.code).join(",")}`}>
          Эхний дөрвийг харьцуулах
        </Link>
      ) : null}
      <Link className="text-sm font-semibold text-primary" href={paths.registry}>Жагсаалт</Link>
    </section>
  );
}
