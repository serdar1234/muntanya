import { getSearchSuggestions } from "@/shared/api";
import { ApiPeak } from "@/shared/types";
import { notFound } from "next/navigation";
import MainLayout from "@/components/MainLayout";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;

  if (!query) {
    notFound();
  }
  const data = await getSearchSuggestions(query);
  const results: ApiPeak[] = data.peaks;

  if (results.length === 0) {
    notFound();
  }

  return <MainLayout searchResults={results} />;
}
