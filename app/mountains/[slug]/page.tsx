import MainLayout from "@/components/MainLayout";
import { notFound } from "next/navigation";
import { getMountainData } from "@/shared/api";

export default async function MountainPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const mountain = await getMountainData(slug);

  if (!mountain) {
    notFound();
  }

  return <MainLayout initialMountain={mountain} />;
}
