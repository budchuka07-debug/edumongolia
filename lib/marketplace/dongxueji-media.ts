import media from "@/data/dongxueji/media.json";

export type PartnerVideo = {
  id: number;
  title: string;
  poster: string;
  url: string;
  universityId: number | null;
  slug?: string;
};

export type CityLife = {
  id: number;
  slug: string;
  nameEn: string;
  nameZh: string;
  provinceZh: string;
  provinceMn: string;
  image: string;
  desEn: string;
  desZh: string;
  lat: number | null;
  lng: number | null;
  pageUrl: string;
};

export type PartnerProfileMedia = {
  id: number;
  slug: string;
  nameEn: string;
  nameZh: string;
  desEn: string;
  desZh: string;
  images: string[];
  videoIds: number[];
};

type MediaFile = {
  checkedOn: string;
  sourceUrl: string;
  partner: string;
  cities: CityLife[];
  videos: PartnerVideo[];
  profiles: PartnerProfileMedia[];
};

const file = media as MediaFile;

export const dongxuejiMedia = {
  checkedOn: file.checkedOn,
  sourceUrl: file.sourceUrl,
  partner: file.partner,
};

export const partnerCities = [...file.cities].sort((a, b) => (b.desEn.length + b.desZh.length) - (a.desEn.length + a.desZh.length) || a.nameEn.localeCompare(b.nameEn));
export const partnerVideos = file.videos;
const profiles = new Map(file.profiles.map((item) => [item.slug, item]));
const videosById = new Map(file.videos.map((item) => [item.id, item]));

export function partnerMediaFor(slug: string) {
  return profiles.get(slug) ?? null;
}

export function videosForProfile(slug: string) {
  const profile = profiles.get(slug);
  if (!profile) return [];
  return profile.videoIds.map((id) => videosById.get(id)).filter((item): item is PartnerVideo => item != null);
}

export function cityBySlug(slug: string) {
  return partnerCities.find((item) => item.slug === slug) ?? null;
}

export function cityForName(nameEn: string, nameZh: string) {
  const en = nameEn.trim().toLowerCase();
  const zh = nameZh.trim();
  return partnerCities.find((item) => item.nameEn.toLowerCase() === en || item.nameZh === zh || item.nameEn.toLowerCase().includes(en) || (zh && item.nameZh.includes(zh))) ?? null;
}

export function youtubeEmbed(url: string) {
  const watch = url.match(/[?&]v=([^&]+)/);
  const short = url.match(/youtu\.be\/([^?&]+)/);
  const id = watch?.[1] || short?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
