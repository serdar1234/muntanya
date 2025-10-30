import { getSearchResults } from "@/shared/api";
import { notFound, redirect } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import { ApiPeak } from "@/shared/types";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;

  if (!query) {
    redirect("/");
  }

  const data = await getSearchResults(query).catch(() => null);
  const results: ApiPeak[] = data?.data?.peaks || [];

  if (!results.length) {
    notFound();
  }

  return <MainLayout searchResults={data} />;
}
