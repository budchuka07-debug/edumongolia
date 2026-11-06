"use client";

import { useI18n } from "@/components/language-provider";

export function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-heading text-4xl font-semibold">{t.about.title}</h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground">{t.about.lead}</p>
      <div className="mt-8 space-y-6">
        {t.about.sections.map((section) => (
          <section key={section.title} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm leading-7">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
