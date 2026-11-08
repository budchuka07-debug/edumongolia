"use client";

import { useState } from "react";
import Link from "next/link";
import { VideoFrame } from "@/components/marketplace/partner-media";
import { useI18n } from "@/components/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/lib/marketplace/paths";
import { cn } from "cn";

export type HomeClip = {
  id: number;
  title: string;
  poster: string;
  url: string;
  slug?: string;
};

export type HomePhoto = {
  slug: string;
  nameZh: string;
  nameEn: string;
  image: string;
  href: string;
};

const copy = {
  mn: {
    eyebrow: "Хамтрагчийн зураг, видео",
    hero: "Сургалт, багш, тэтгэлэг, гадаадад суралцах боломжийг нэг дороос.",
    lead: "Хятадын их сургууль, хотын амьдрах орчныг хамтрагч байгууллагын видео, зургаар хар.",
    findTeacher: "Багш хайх",
    findChina: "Их сургууль хайх",
    videos: "Видео",
    cities: "Хотын амьдрах орчин",
    campuses: "Сургуулийн зураг",
    allVideos: "Бүх видео",
    allCities: "Бүх хот",
    source: "Эх нь хамтрагч байгууллага. Монгол орчуулга хянагдаагүй.",
  },
  en: {
    eyebrow: "Partner photos and video",
    hero: "Tutoring, teachers, scholarships, and study abroad in one place.",
    lead: "See Chinese universities and city life in the partner organization’s videos and photos.",
    findTeacher: "Find a teacher",
    findChina: "Find a university",
    videos: "Videos",
    cities: "City life",
    campuses: "Campus photos",
    allVideos: "All videos",
    allCities: "All cities",
    source: "Source: the partner organization. The Mongolian wording is not a reviewed translation.",
  },
} as const;

export function HomeFilm({
  videos,
  cities,
  campuses,
  partner,
  checkedOn,
}: {
  videos: HomeClip[];
  cities: HomePhoto[];
  campuses: HomePhoto[];
  partner: string;
  checkedOn: string;
}) {
  const { locale } = useI18n();
  const t = copy[locale];
  const [activeId, setActiveId] = useState(videos[0]?.id ?? 0);
  const active = videos.find((item) => item.id === activeId) ?? videos[0];
  if (!active) return null;

  return (
    <div className="border-b border-border">
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:py-12">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">{t.eyebrow}</p>
          <h1 className="mt-3 font-heading text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">{t.hero}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{t.lead}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/tutors" className={cn(buttonVariants({ size: "lg" }))}>{t.findTeacher}</Link>
            <Link href={paths.universities} className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>{t.findChina}</Link>
          </div>
          <p className="mt-4 max-w-xl text-xs leading-5 text-muted-foreground">
            {partner}. {t.source} {checkedOn}.
          </p>
        </div>
        <div>
          <VideoFrame title={active.title} url={active.url} poster={active.poster} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold">{t.videos}</h2>
          <Link href={paths.chinaVideos} className="text-sm font-semibold text-primary">{t.allVideos}</Link>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {videos.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActiveId(video.id)}
              className={cn(
                "w-44 shrink-0 overflow-hidden rounded-2xl border bg-card text-left",
                video.id === active.id ? "border-primary" : "border-border",
              )}
            >
              {video.poster ? <img src={video.poster} alt="" className="h-24 w-full object-cover" /> : <span className="block h-24 bg-muted" />}
              <span className="block h-10 overflow-hidden px-3 py-2 text-xs leading-5">{video.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold">{t.cities}</h2>
          <Link href={paths.chinaCities} className="text-sm font-semibold text-primary">{t.allCities}</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {cities.map((city) => (
            <Link key={city.slug} href={city.href} className="group relative overflow-hidden rounded-2xl">
              <img src={city.image} alt={city.nameZh} className="h-36 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-44" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 py-3 text-sm font-semibold text-white">
                {city.nameZh}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold">{t.campuses}</h2>
          <Link href={paths.universities} className="text-sm font-semibold text-primary">{t.findChina}</Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {campuses.map((campus) => (
            <Link key={campus.slug} href={campus.href} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img src={campus.image} alt={campus.nameZh} className="h-40 w-full object-cover" />
              <span className="block px-3 py-3 text-sm font-semibold">{campus.nameZh}</span>
              <span className="block px-3 pb-3 text-xs text-muted-foreground">{campus.nameEn}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
