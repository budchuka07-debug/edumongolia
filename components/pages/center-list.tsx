"use client";

import { useSearchParams } from "next/navigation";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { EmptyState } from "@/components/empty-state";
import { CenterCard } from "@/components/directory/cards";
import { publicCenters } from "@/lib/content/public";

export function CenterList() {
  const { locale } = useI18n();
  const hub = useHub();
  const licensedOnly = useSearchParams().get("licensed") === "1";
  const published = publicCenters();
  const list = licensedOnly ? published.filter((center) => center.licensed) : published;
  const page = licensedOnly
    ? { title: hub.sections.licensed, lead: hub.pages.centers.lead }
    : hub.pages.centers;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{page.lead}</p>
      <div className="mt-4 flex gap-2 text-sm">
        <a href="/centers" className={licensedOnly ? "text-muted-foreground" : "font-semibold text-primary"}>
          {hub.all}
        </a>
        <a href="/centers?licensed=1" className={licensedOnly ? "font-semibold text-primary" : "text-muted-foreground"}>
          {hub.licensed}
        </a>
      </div>
      {list.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title={locale === "en" ? "There is no verified information to show yet." : "Одоогоор баталгаажсан мэдээлэл байхгүй байна."}
            lead={locale === "en" ? "A licensed badge is shown only after the license is checked." : "Тусгай зөвшөөрлийн тэмдэг зөвхөн зөвшөөрлийг шалгасны дараа гарна."}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {list.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      )}
    </div>
  );
}
