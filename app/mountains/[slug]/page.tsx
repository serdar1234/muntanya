import MainLayout from "@/components/MainLayout";
import { MountainData } from "@/shared/types";
import { notFound } from "next/navigation";

async function getMountainData(slug: string): Promise<MountainData | null> {
  const mountainDetails: Record<string, MountainData> = {
    everest: { name: "Mount Everest", coords: [27.9881, 86.925] },
    kilimanjaro: { name: "Mount Kilimanjaro", coords: [-3.0674, 37.3556] },
    rainier: { name: "Rainier", coords: [46.8523, -121.7605] },
  };
  return mountainDetails[slug.toLowerCase()] || null;
}

export default async function MountainPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const mountain = await getMountainData(slug);

  // Потом настроить логику 404
  if (!mountain) {
    notFound();
  }

  return <MainLayout initialMountain={mountain} />;
}
