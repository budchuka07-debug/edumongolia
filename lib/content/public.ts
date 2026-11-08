import { centers, offers, teachers, type OfferKind } from "@/lib/content/directory";
import { papers } from "@/lib/content/papers";
import { centerStatus, isPublicStatus, offerStatus, paperStatus, teacherStatus } from "@/lib/content/publication";

export function publicTeachers() {
  return teachers.filter(() => isPublicStatus(teacherStatus()));
}

export function publicCenters() {
  return centers.filter(() => isPublicStatus(centerStatus()));
}

export function publicOffers(kinds?: OfferKind[]) {
  return offers.filter((offer) => isPublicStatus(offerStatus(offer.id)) && (!kinds || kinds.includes(offer.kind)));
}

export function publicPapers() {
  return papers.filter(() => isPublicStatus(paperStatus()));
}
