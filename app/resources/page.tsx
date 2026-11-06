import type { Metadata } from "next";
import { ResourcesPage } from "@/components/pages/resources-page";

export const metadata: Metadata = { title: "Нөөц" };

export default function Page() {
  return <ResourcesPage />;
}
