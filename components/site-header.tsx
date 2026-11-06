"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { useI18n } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

const links = [
  { href: "/courses", key: "courses" },
  { href: "/resources", key: "resources" },
  { href: "/students", key: "students" },
  { href: "/teachers", key: "teachers" },
  { href: "/about", key: "about" },
] as const;

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);

  const language = (
    <div
      className="flex rounded-lg border border-border bg-card p-0.5"
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
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code === "mn" ? "МН" : "EN"}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Logo />
          <span className="min-w-0">
            <span className="block font-heading text-base leading-none font-semibold">
              {t.brand}
            </span>
            <span className="mt-1 hidden text-xs text-muted-foreground sm:block">
              {t.tagline}
            </span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label={t.nav.home}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                isCurrent(pathname, link.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted",
              )}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>
        <div className="ml-auto lg:ml-3">{language}</div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label={t.header.menu}
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100%,20rem)]">
            <SheetHeader>
              <SheetTitle>{t.brand}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label={t.header.menu}>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base hover:bg-muted"
              >
                {t.nav.home}
              </Link>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base hover:bg-muted"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
