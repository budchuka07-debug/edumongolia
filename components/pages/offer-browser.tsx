"use client";

import { useSearchParams } from "next/navigation";
import { type OfferKind } from "@/lib/content/directory";
import { publicOffers } from "@/lib/content/public";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { EmptyState } from "@/components/empty-state";
import { OfferCard } from "@/components/directory/cards";

export function OfferBrowser({
  pageKey,
  kinds,
}: {
  pageKey: "scholarships" | "discounts" | "foreign" | "international" | "travel" | "foreignUni";
  kinds: OfferKind[];
}) {
  const { locale } = useI18n();
  const hub = useHub();
  const scope = useSearchParams().get("scope");
  const page = hub.pages[pageKey];
  const active = pageKey === "scholarships" && scope === "foreign" ? (["foreign-uni"] as OfferKind[]) : kinds;
  const title = pageKey === "scholarships" && scope === "foreign" ? hub.pages.foreignUni.title : page.title;
  const lead = pageKey === "scholarships" && scope === "foreign" ? hub.pages.foreignUni.lead : page.lead;
  const list = publicOffers(active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{lead}</p>
      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={locale === "en" ? "There is no verified information to show yet." : "Одоогоор баталгаажсан мэдээлэл байхгүй байна."}
            lead={locale === "en" ? "A new opportunity will be published here after it is checked." : "Шинэ боломж нэмэгдэхэд энэ хэсэгт нийтлэгдэнэ."}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {list.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
