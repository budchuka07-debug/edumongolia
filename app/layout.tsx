import type { Metadata } from "next";
import { Literata, Manrope } from "next/font/google";
import { Suspense } from "react";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const heading = Literata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "EduMongolia",
    template: "%s · EduMongolia",
  },
  description:
    "Монгол, англи хэлтэй хичээл, нөөц, сурагчийн ширээ, багшийн самбар. edumongolia.com",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mn" className={`${sans.variable} ${heading.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <Suspense fallback={<div className="h-16 border-b border-border" />}>
            <SiteHeader />
          </Suspense>
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
