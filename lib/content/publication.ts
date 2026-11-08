export type PublicationStatus =
  | "draft"
  | "pending_review"
  | "verified"
  | "published"
  | "expired"
  | "archived";

export function isPublicStatus(status: PublicationStatus) {
  return status === "published";
}

/**
 * Seed listings were written as examples. They stay in the data files for the
 * admin desk and are not public until a record is marked published.
 * The English immersion week is the operator's own Booking Mongolia program:
 * dates and price stay on that site, and this record does not invent a fee.
 */
const publishedOfferIds = new Set(["english-immersion"]);

export function teacherStatus(): PublicationStatus {
  return "draft";
}

export function centerStatus(): PublicationStatus {
  return "draft";
}

export function paperStatus(): PublicationStatus {
  return "draft";
}

export function offerStatus(id: string): PublicationStatus {
  return publishedOfferIds.has(id) ? "published" : "draft";
}
