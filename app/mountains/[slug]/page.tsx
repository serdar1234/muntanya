import MainLayout from "@/components/MainLayout";
import { notFound } from "next/navigation";
import { getPeakById, getSearchResults } from "@/shared/api";

export default async function MountainPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  // console.log(`Начинаем загрузку данных для горы: ${slug}`);
  // const startTime = performance.now();

  const mountain = await getPeakById(slug);

  if (mountain === null) {
    const searchResults = await getSearchResults(slug);
    if (searchResults) {
      return <MainLayout searchResults={searchResults} />;
    } else {
      notFound();
    }
  }
  // const endTime = performance.now();
  // const duration = endTime - startTime;
  // console.log(`Время выполнения getPeakById: ${duration.toFixed(2)} мс`);

  return <MainLayout initialMountain={mountain} />;
}
