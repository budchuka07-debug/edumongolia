"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export type MotionCity = {
  slug: string;
  nameZh: string;
  image: string;
  href: string;
};

export function CityFilm({ cities }: { cities: MotionCity[] }) {
  const photos = cities.filter((city) => city.image);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  useEffect(() => {
    const list = photosRef.current;
    if (list.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let elapsed = 0;
    let index = 0;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      elapsed += dt;
      const row = track.current;
      if (row) {
        x -= dt * 0.09;
        const half = row.scrollWidth / 2;
        if (half > 0 && -x >= half) x += half;
        row.style.transform = `translate3d(${x}px,0,0)`;
      }
      if (elapsed >= 2600) {
        elapsed = 0;
        const current = photosRef.current;
        index = (index + 1) % current.length;
        const root = stage.current;
        if (root) {
          Array.from(root.querySelectorAll("[data-city-slide]")).forEach((child, item) => {
            (child as HTMLElement).style.opacity = item === index ? "1" : "0";
          });
        }
        if (caption.current) caption.current.textContent = current[index]?.nameZh ?? "";
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [photos.length]);

  if (photos.length === 0) return null;
  const loop = [...photos, ...photos];

  return (
    <div>
      <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
        <div ref={stage} className="absolute inset-0">
          {photos.map((city, index) => (
            <Link
              key={city.slug}
              href={city.href}
              data-city-slide
              className="absolute inset-0"
              style={{ opacity: index === 0 ? 1 : 0, transition: "opacity 700ms ease" }}
            >
              <img src={city.image} alt={city.nameZh} className="h-full w-full object-cover" />
            </Link>
          ))}
        </div>
        <p ref={caption} className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 py-5 text-xl font-semibold text-white">
          {photos[0].nameZh}
        </p>
      </div>
      <div className="mt-3 overflow-hidden">
        <div ref={track} className="flex w-max">
          {loop.map((city, index) => (
            <Link key={`${city.slug}-${index}`} href={city.href} className="relative mr-3 h-32 w-52 shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-60">
              <MovingPhoto src={city.image} alt={index < photos.length ? city.nameZh : ""} className="h-full w-full object-cover" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-sm font-semibold text-white">
                {city.nameZh}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MovingPhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const wave = (Math.sin((now - start) / 1400) + 1) / 2;
      if (ref.current) {
        ref.current.style.transform = `scale(${1.12 + wave * 0.1}) translate3d(${(wave - 0.5) * 8}%, ${(0.5 - wave) * 4}%, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <img ref={ref} src={src} alt={alt} className={className} />;
}
