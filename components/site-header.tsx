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

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  const hub = useHub();
  const [open, setOpen] = useState(false);

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
      <nav
        aria-label={hub.railLabel}
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:thin]"
      >
        {hub.rail.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-sm",
              isCurrent(pathname, item.href)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/80",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {open ? (
        <nav className="border-t border-border bg-card" aria-label={t.header.menu}>
          <div className="mx-auto grid max-w-6xl gap-1 px-2 py-2 sm:grid-cols-2">
            {hub.rail.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
