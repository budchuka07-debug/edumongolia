import type { Metadata } from "next";
import Link from "next/link";
import { VideoFrame } from "@/components/marketplace/partner-media";
import { dongxuejiMedia, partnerVideos } from "@/lib/marketplace/dongxueji-media";
import { paths } from "@/lib/marketplace/paths";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хамтрагчийн видео",
  description: "DongXueJi-ийн нийтэлсэн сургуулийн видео. Өөр эхээс видео нэмээгүй.",
  path: "/china-videos",
});

export default function Page() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <header>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Хамтрагч</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Видео</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          {partnerVideos.length} видеог {dongxuejiMedia.partner} нийтэлсэн. Шалгасан {dongxuejiMedia.checkedOn}. Эх нь тэдний видео жагсаалт. Өөр байгууллагаас видео оруулаагүй.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        {partnerVideos.map((video) => (
          <div key={video.id} className="flex flex-col gap-2">
            <VideoFrame title={video.title} url={video.url} poster={video.poster} />
            {video.slug ? (
              <Link className="text-sm font-semibold text-primary" href={paths.university(video.slug)}>
                Сургуулийн хуудас
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
