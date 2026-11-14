"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
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
type GroupId = (typeof groupOrder)[number];

function bucket(href: string): GroupId {
  if (
    href.startsWith("/#") ||
    href === "/centers" ||
    href === "/tutors" ||
    href === "/online" ||
    href.startsWith("/centers?") ||
    href === "/programs/foreign" ||
    href === "/kids" ||
    href.startsWith("/kids/") ||
    href === "/school" ||
    href.startsWith("/school/") ||
    href === "/bank" ||
    href.startsWith("/bank/")
  ) {
    return "education";
  }
  if (href === "/scholarships" || href.startsWith("/scholarships?") || href.startsWith("/china-scholarships") || href.startsWith("/international-scholarships")) return "scholarships";
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
  const panelId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const [route, setRoute] = useState(pathname);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<GroupId | null>(null);
  const [mobileGroups, setMobileGroups] = useState<GroupId[]>([]);

  if (route !== pathname) {
    setRoute(pathname);
    setOpen(false);
    setMenu(null);
    setMobileGroups([]);
  }

  const groupTitle: Record<GroupId, string> = {
    education: locale === "en" ? "Education" : "Боловсрол",
    scholarships: locale === "en" ? "Scholarships" : "Тэтгэлэг",
    abroad: locale === "en" ? "Study abroad" : "Гадаадад суралцах",
    services: locale === "en" ? "Education services" : "Боловсролын үйлчилгээ",
    partners: locale === "en" ? "Partners" : "Хамтрагчид",
    account: locale === "en" ? "My account" : "Миний бүртгэл",
  };

  const abroadLinks =
    locale === "en"
      ? [
          { href: "/study-abroad/china", label: "Study in China" },
          { href: "/china-universities", label: "Universities" },
          { href: "/china-universities/registry", label: "Ministry registry" },
          { href: "/china-cities", label: "Cities" },
          { href: "/china-videos", label: "Videos" },
          { href: "/china-programs", label: "Programs and majors" },
          { href: "/study-abroad", label: "Study abroad" },
          { href: "/eligibility-checker", label: "Eligibility check" },
          { href: "/admission-requirements", label: "Admission requirements" },
          { href: "/examination-requirements", label: "Examination requirements" },
          { href: "/csca", label: "CSCA" },
          { href: "/china-scholarships", label: "Find a scholarship" },
          { href: "/apply", label: "Ask for advice" },
        ]
      : [
          { href: "/study-abroad/china", label: "Хятад дахь сургалт" },
          { href: "/china-universities", label: "Их сургуулиуд" },
          { href: "/china-universities/registry", label: "Яамны бүртгэл" },
          { href: "/china-cities", label: "Хотын амьдрах орчин" },
          { href: "/china-videos", label: "Видео" },
          { href: "/china-programs", label: "Хөтөлбөр, мэргэжил" },
          { href: "/study-abroad", label: "Гадаадад суралцах" },
          { href: "/eligibility-checker", label: "Элсэлтийн шалгуур" },
          { href: "/admission-requirements", label: "Элсэлтийн нөхцөл" },
          { href: "/examination-requirements", label: "Шалгалтын нөхцөл" },
          { href: "/csca", label: "CSCA" },
          { href: "/china-scholarships", label: "Тэтгэлэг хайх" },
          { href: "/apply", label: "Зөвлөгөө авах" },
        ];

  const grouped = groupOrder.map((id) => ({
    id,
    title: groupTitle[id],
    links: id === "abroad" ? abroadLinks : hub.rail.filter((item) => bucket(item.href) === id && item.href !== "/study-abroad/china" && item.href !== "/china-universities" && item.href !== "/china-universities/registry" && item.href !== "/china-cities" && item.href !== "/china-videos" && item.href !== "/china-programs" && item.href !== "/eligibility-checker" && item.href !== "/admission-requirements" && item.href !== "/examination-requirements" && item.href !== "/csca" && item.href !== "/apply" && item.href !== "/study-abroad"),
  }));

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(null);
        setOpen(false);
      }
    }
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function toggleMobile(id: GroupId) {
    setMobileGroups((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur"
      onMouseLeave={() => setMenu(null)}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Logo />
          <span className="truncate font-heading text-base leading-none font-semibold">{t.brand}</span>
        </Link>
        <nav aria-label={hub.railLabel} className="ml-auto hidden items-center gap-0.5 lg:flex">
          {grouped.map((group) => (
            <button
              key={group.id}
              type="button"
              className={cn(
                "rounded-md px-2 py-2 text-sm font-medium",
                menu === group.id ? "bg-muted text-foreground" : "text-foreground/80 hover:bg-muted",
              )}
              aria-expanded={menu === group.id}
              aria-controls={panelId}
              onMouseEnter={() => setMenu(group.id)}
              onFocus={() => setMenu(group.id)}
              onClick={() => setMenu((current) => (current === group.id ? null : group.id))}
            >
              {group.title}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <div className="flex rounded-lg border border-border bg-card p-0.5" role="group" aria-label={t.header.language}>
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
            className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "lg:hidden")}
            aria-label={open ? t.header.close : t.header.menu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {menu ? (
        <div id={panelId} className="absolute inset-x-0 top-full z-50 hidden border-b border-border bg-card shadow-lg lg:block">
          <div className="mx-auto grid max-h-[70vh] max-w-6xl gap-1 overflow-y-auto px-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
            {grouped
              .find((group) => group.id === menu)
              ?.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => setMenu(null)}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      ) : null}
      {open ? (
        <nav className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border bg-card lg:hidden" aria-label={t.header.menu}>
          <div className="mx-auto max-w-6xl px-2 py-2">
            {grouped.map((group) => {
              const expanded = mobileGroups.includes(group.id);
              return (
                <div key={group.id} className="border-b border-border">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold"
                    aria-expanded={expanded}
                    onClick={() => toggleMobile(group.id)}
                  >
                    {group.title}
                    <ChevronDownIcon className={cn("size-4", expanded && "rotate-180")} />
                  </button>
                  {expanded ? (
                    <div className="pb-2">
                      {group.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-3 text-sm hover:bg-muted"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
