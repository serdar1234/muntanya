import MainLayout from "@/components/MainLayout";
import { notFound } from "next/navigation";
import { getPeakById } from "@/shared/api";

export default async function MountainPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  // console.log(`Начинаем загрузку данных для горы: ${slug}`);
  // const startTime = performance.now();

  const mountain = await getPeakById(slug);

  // const endTime = performance.now();
  // const duration = endTime - startTime;
  // console.log(`Время выполнения getPeakById: ${duration.toFixed(2)} мс`);
  console.log("mountain: ", mountain);
  if (!mountain || mountain.error) {
    notFound();
  }

  return <MainLayout initialMountain={mountain} />;
}
