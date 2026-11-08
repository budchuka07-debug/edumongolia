import type { Metadata } from "next";
import { HubHome } from "@/components/pages/hub-home";
import { HomeFilm, type HomePhoto } from "@/components/pages/home-film";
import { dongxuejiMedia, partnerCities, partnerMediaFor, partnerVideos } from "@/lib/marketplace/dongxueji-media";
import { paths } from "@/lib/marketplace/paths";

export const metadata: Metadata = {
  title: "EduMongolia",
  description: "Сургалт, багш, тэтгэлэг, гадаадад суралцах боломжийг нэг дороос.",
};

const campusSlugs = [
  "peking-university",
  "tsinghua-university",
  "fudan-university",
  "shanghai-jiao-tong-university",
  "zhejiang-university",
  "sichuan-university",
  "nanjing-university",
  "wuhan-university",
];

export default function Page() {
  const campuses = campusSlugs.flatMap((slug) => {
    const profile = partnerMediaFor(slug);
    const image = profile?.images[0];
    if (!profile || !image) return [];
    const photo: HomePhoto = {
      slug,
      nameZh: profile.nameZh,
      nameEn: profile.nameEn,
      image,
      href: paths.university(slug),
    };
    return [photo];
  });

  return (
    <>
      <HomeFilm
        partner={dongxuejiMedia.partner}
        checkedOn={dongxuejiMedia.checkedOn}
        videos={partnerVideos.map((video) => ({
          id: video.id,
          title: video.title,
          poster: video.poster,
          url: video.url,
          slug: video.slug,
        }))}
        cities={partnerCities.map((city) => ({
          slug: city.slug,
          nameZh: city.nameZh,
          nameEn: city.nameEn,
          image: city.image,
          href: paths.chinaCity(city.slug),
        }))}
        campuses={campuses}
      />
      <HubHome />
    </>
  );
}
