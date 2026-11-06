"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";

export function SiteFooter() {
  const { t } = useI18n();
  const hub = useHub();
  const columns = [
    hub.rail.slice(0, 6),
    hub.rail.slice(6, 12),
    hub.rail.slice(12),
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="size-8" />
            <p className="font-heading text-lg font-semibold">{t.brand}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{hub.lead}</p>
          <p className="mt-3 text-sm font-medium text-primary">{t.footer.domain}</p>
        </div>
        {columns.map((links, index) => (
          <ul key={index} className="space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
}
