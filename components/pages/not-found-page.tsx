"use client";

import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-heading text-4xl font-semibold">{t.notFound.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{t.notFound.body}</p>
      <Link href="/" className={cn(buttonVariants(), "mt-6")}>
        {t.notFound.home}
      </Link>
    </div>
  );
}
