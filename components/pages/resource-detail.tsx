"use client";

import Link from "next/link";
import { getCourse } from "@/lib/content/courses";
import { getResource } from "@/lib/content/resources";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function ResourceDetail({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const resource = getResource(slug);
  const [saved, setSaved] = usePersistedState<string[]>("edumongolia-saved", []);

  if (!resource) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-semibold">{t.resources.notFound}</h1>
        <Link href="/resources" className={cn(buttonVariants(), "mt-6")}>
          {t.resources.back}
        </Link>
      </div>
    );
  }

  const related = resource.relatedCourse ? getCourse(resource.relatedCourse) : undefined;
  const isSaved = saved.includes(resource.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/resources" className="text-sm font-medium text-primary">
        {t.resources.back}
      </Link>
      <div className="mt-3">
        <Badge variant="outline">{t.resources.kinds[resource.kind]}</Badge>
      </div>
      <h1 className="mt-3 font-heading text-4xl font-semibold">{resource.title[locale]}</h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground">{resource.summary[locale]}</p>
      <Button
        className="mt-5"
        variant={isSaved ? "secondary" : "outline"}
        onClick={() =>
          setSaved((current) =>
            current.includes(resource.slug)
              ? current.filter((item) => item !== resource.slug)
              : [...current, resource.slug],
          )
        }
      >
        {isSaved ? t.resources.saved : t.resources.save}
      </Button>
      <div className="mt-8 space-y-4 text-sm leading-7">
        {resource.body[locale].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {related && (
        <p className="mt-8 text-sm">
          {t.resources.related}:{" "}
          <Link href={`/courses/${related.slug}`} className="font-semibold text-primary">
            {related.title[locale]}
          </Link>
        </p>
      )}
    </article>
  );
}
