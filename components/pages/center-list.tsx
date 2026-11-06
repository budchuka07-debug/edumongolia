"use client";

import { useSearchParams } from "next/navigation";
import { centers } from "@/lib/content/directory";
import { useHub } from "@/components/directory/use-hub";
import { CenterCard } from "@/components/directory/cards";

export function CenterList() {
  const hub = useHub();
  const licensedOnly = useSearchParams().get("licensed") === "1";
  const list = licensedOnly ? centers.filter((center) => center.licensed) : centers;
  const page = licensedOnly
    ? { title: hub.sections.licensed, lead: hub.pages.centers.lead }
    : hub.pages.centers;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{page.lead}</p>
      <p className="mt-2 text-sm text-muted-foreground">{hub.sample}</p>
      <div className="mt-4 flex gap-2 text-sm">
        <a href="/centers" className={licensedOnly ? "text-muted-foreground" : "font-semibold text-primary"}>
          {hub.all}
        </a>
        <a href="/centers?licensed=1" className={licensedOnly ? "font-semibold text-primary" : "text-muted-foreground"}>
          {hub.licensed}
        </a>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {list.map((center) => (
          <CenterCard key={center.id} center={center} />
        ))}
      </div>
    </div>
  );
}
