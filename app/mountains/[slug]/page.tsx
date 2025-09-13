import MainLayout from "@/components/MainLayout";
import { notFound } from "next/navigation";
import { getPeakById, getSearchResults } from "@/shared/api";

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
