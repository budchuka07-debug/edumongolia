"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { resources } from "@/lib/content/resources";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ResourcesPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [saved, setSaved] = usePersistedState<string[]>("edumongolia-saved", []);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const haystack = `${resource.title[locale]} ${resource.summary[locale]}`.toLowerCase();
      return needle.length === 0 || haystack.includes(needle);
    });
  }, [locale, query]);

  function toggle(slug: string) {
    setSaved((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-4xl font-semibold">{t.resources.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{t.resources.lead}</p>
      <Input
        className="mt-6 max-w-md"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.resources.search}
        aria-label={t.resources.search}
      />
      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">{t.resources.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {visible.map((resource) => {
            const isSaved = saved.includes(resource.slug);
            return (
              <li key={resource.slug} className="flex flex-col rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                <Badge variant="outline" className="w-fit">
                  {t.resources.kinds[resource.kind]}
                </Badge>
                <h2 className="mt-3 font-heading text-2xl font-semibold">{resource.title[locale]}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {resource.summary[locale]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/resources/${resource.slug}`}>
                    <Button>{t.resources.read}</Button>
                  </Link>
                  <Button variant={isSaved ? "secondary" : "outline"} onClick={() => toggle(resource.slug)}>
                    {isSaved ? t.resources.saved : t.resources.save}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
