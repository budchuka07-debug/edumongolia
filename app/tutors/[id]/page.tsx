import type { Metadata } from "next";
import { Suspense } from "react";
import { TutorProfile } from "@/components/pages/tutor-profile";
import { getTeacher, teachers } from "@/lib/content/directory";

export function generateStaticParams() {
  return teachers.map((teacher) => ({ id: teacher.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: getTeacher(id)?.name ?? "Багшийн мэдээлэл" };
}

function Profile({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <Resolved params={params} />
    </Suspense>
  );
}

async function Resolved({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TutorProfile id={id} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <Profile params={params} />;
}
