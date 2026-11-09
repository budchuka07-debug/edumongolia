export type StoredScholarshipStatus = "draft" | "pending" | "verified" | "upcoming" | "open" | "closed" | "archived";

export type PublicScholarshipStatus = "upcoming" | "open" | "closed" | "unannounced" | "archived";

export function publicScholarshipStatus(input: {
  opensAt: string | null;
  closesAt: string | null;
  storedStatus: StoredScholarshipStatus;
  now?: Date;
}): PublicScholarshipStatus {
  if (input.storedStatus === "archived" || input.storedStatus === "draft" || input.storedStatus === "pending") {
    return input.storedStatus === "archived" ? "archived" : "unannounced";
  }
  const now = input.now ?? new Date();
  const opens = input.opensAt ? new Date(input.opensAt) : null;
  const closes = input.closesAt ? new Date(input.closesAt) : null;
  if (closes && now.getTime() > closes.getTime()) return "closed";
  if (opens && now.getTime() < opens.getTime()) return "upcoming";
  if (opens && closes && now.getTime() >= opens.getTime() && now.getTime() <= closes.getTime()) return "open";
  if (!opens && closes && now.getTime() <= closes.getTime()) return "open";
  if (input.storedStatus === "closed") return "closed";
  return "unannounced";
}

export const nextRoundUnannounced = "Дараагийн элсэлтийн хугацаа албан ёсоор зарлагдаагүй байна.";
export const notPublished = "Албан ёсны мэдээлэл одоогоор нийтлэгдээгүй байна.";
