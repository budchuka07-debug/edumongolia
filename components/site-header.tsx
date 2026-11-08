"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

function isCurrent(pathname: string, href: string) {
  if (href.includes("#") || href.includes("?")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const groupOrder = ["education", "scholarships", "abroad", "services", "partners", "account"] as const;

function bucket(href: string) {
  if (
    href.startsWith("/#") ||
    href === "/centers" ||
    href === "/tutors" ||
    href === "/online" ||
    href.startsWith("/centers?") ||
    href === "/programs/foreign"
  ) {
    return "education";
  }
  if (href === "/scholarships" || href.startsWith("/scholarships?") || href === "/china-scholarships") return "scholarships";
  if (
    href.startsWith("/study-abroad") ||
    href.startsWith("/china-") ||
    href.startsWith("/eligibility") ||
    href.startsWith("/admission") ||
    href.startsWith("/examination") ||
    href === "/csca" ||
    href === "/apply"
  ) {
    return "abroad";
  }
  if (href.startsWith("/papers") || href === "/discounts" || href.startsWith("/programs/")) return "services";
  if (href.startsWith("/register") || href === "/partners") return "partners";
  return "account";
}

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  const hub = useHub();
  const [open, setOpen] = useState(false);
  const groupTitle = {
    education: locale === "en" ? "Education" : "Боловсрол",
    scholarships: locale === "en" ? "Scholarships" : "Тэтгэлэг",
    abroad: locale === "en" ? "Study abroad" : "Гадаадад суралцах",
    services: locale === "en" ? "Education services" : "Боловсролын үйлчилгээ",
    partners: locale === "en" ? "Partners" : "Хамтрагчид",
    account: locale === "en" ? "My account" : "Миний бүртгэл",
  };
  const grouped = groupOrder.map((id) => ({
    id,
    title: groupTitle[id],
    links: hub.rail.filter((item) => bucket(item.href) === id),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Logo />
          <span className="min-w-0">
            <span className="block font-heading text-base leading-none font-semibold">{t.brand}</span>
            <span className="mt-1 hidden text-xs text-muted-foreground sm:block">{t.tagline}</span>
          </span>
        </Link>
        <div
          className="ml-auto flex rounded-lg border border-border bg-card p-0.5"
          role="group"
          aria-label={t.header.language}
        >
          {(["mn", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={locale === code}
              onClick={() => setLocale(code)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide",
                locale === code ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {code === "mn" ? "МН" : "EN"}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }))}
          aria-label={open ? t.header.close : t.header.menu}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
      <nav aria-label={hub.railLabel} className="mx-auto hidden max-w-6xl gap-2 px-4 py-2 lg:grid lg:grid-cols-6">
        {grouped.map((group) => (
          <div key={group.id}>
            <p className="px-2 text-xs font-semibold tracking-wide text-muted-foreground">{group.title}</p>
            <div className="mt-1 flex flex-col">
              {group.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-md px-2 py-1 text-sm",
                    isCurrent(pathname, item.href) ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      {open ? (
        <nav className="border-t border-border bg-card lg:hidden" aria-label={t.header.menu}>
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 sm:grid-cols-2">
            {grouped.map((group) => (
              <div key={group.id}>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground">{group.title}</p>
                {group.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
