import MainLayout from "@/components/MainLayout";
import { notFound } from "next/navigation";
import { getPeakById, getSearchResults } from "@/shared/api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const mountain = await getPeakById(slug);

  if (!mountain) {
    return {};
  }
  const peakName = mountain.peak.name;
  const keywords = Object.values(mountain.peak.tags);
  return {
    title: peakName,
    description: peakName + "'s nearby mountains & trails",
    keywords: [
      ...keywords,
      "Mountains",
      "Trails",
      "Hiking",
      "Mountains & Trails",
      "Muntanya",
    ],
  };
}
export default async function MountainPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const mountain = await getPeakById(slug);

  if (mountain === null) {
    const searchResults = await getSearchResults(slug);
    if (searchResults) {
      return <MainLayout searchResults={searchResults} />;
    } else {
      notFound();
    }
  }

  return <MainLayout initialMountain={mountain} />;
}
