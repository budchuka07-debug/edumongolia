import Link from "next/link";
import { cityForName, dongxuejiMedia, partnerMediaFor, videosForProfile, youtubeEmbed } from "@/lib/marketplace/dongxueji-media";
import { paths } from "@/lib/marketplace/paths";

export function PartnerMedia({ slug, cityEn, cityZh }: { slug: string; cityEn: string; cityZh: string }) {
  const profile = partnerMediaFor(slug);
  const videos = videosForProfile(slug);
  const city = cityForName(cityEn, cityZh);
  if (!profile && videos.length === 0 && !city) return null;
  const description = profile?.desZh || profile?.desEn || "";
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-10">
      <h2 className="font-heading text-2xl font-semibold">Хамтрагчийн зураг, танилцуулга</h2>
      <p className="text-sm leading-6 text-muted-foreground">
        {dongxuejiMedia.partner} нийтэлсэн эх. Шалгасан {dongxuejiMedia.checkedOn}. Монгол орчуулга хянагдаагүй тул эх бичвэрээр нь харуулна.
      </p>
      {profile && profile.images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {profile.images.map((src) => (
            <img key={src} src={src} alt={profile.nameZh} className="h-52 w-full rounded-2xl object-cover" />
          ))}
        </div>
      ) : null}
      {description ? <p className="whitespace-pre-line text-sm leading-7">{description}</p> : <p className="text-sm">Албан ёсны мэдээлэл одоогоор нийтлэгдээгүй.</p>}
      {city ? (
        <p className="text-sm">
          <Link className="font-semibold text-primary" href={paths.chinaCity(city.slug)}>
            {city.nameZh} хотын амьдрах орчин
          </Link>
        </p>
      ) : null}
      {videos.length > 0 ? (
        <div className="grid gap-4">
          {videos.map((video) => <VideoFrame key={video.id} title={video.title} url={video.url} poster={video.poster} />)}
        </div>
      ) : null}
    </section>
  );
}

export function VideoFrame({ title, url, poster }: { title: string; url: string; poster: string }) {
  const embed = youtubeEmbed(url);
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      {embed ? (
        <iframe className="aspect-video w-full" src={embed} title={title} allow="encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <video className="aspect-video w-full" controls playsInline poster={poster || undefined} src={url} />
      )}
      <figcaption className="px-4 py-3 text-sm">{title}</figcaption>
    </figure>
  );
}
