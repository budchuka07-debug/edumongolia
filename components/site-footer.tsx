"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { useI18n } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useI18n();
  const links = [
    { href: "/courses", label: t.nav.courses },
    { href: "/resources", label: t.nav.resources },
    { href: "/students", label: t.nav.students },
    { href: "/teachers", label: t.nav.teachers },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="size-8" />
            <p className="font-heading text-lg font-semibold">{t.brand}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{t.footer.note}</p>
          <p className="mt-3 text-sm font-medium text-primary">{t.footer.domain}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">{t.footer.explore}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">{t.footer.people}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/students" className="hover:text-foreground">
                {t.nav.students}
              </Link>
            </li>
            <li>
              <Link href="/teachers" className="hover:text-foreground">
                {t.nav.teachers}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
