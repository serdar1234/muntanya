import { getSearchResults } from "@/shared/api";
import { ApiPeak, SuccessResponse } from "@/shared/types";
import { redirect } from "next/navigation";
import MainLayout from "@/components/MainLayout";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    redirect("/");
  }

  let data: SuccessResponse | null;
  let results: ApiPeak[] = [];

  try {
    data = await getSearchResults(query);
    if (data) {
      results = data.data.peaks;
    }
  } catch {
    redirect(`/?error=not-found`);
  }

  if (!results || results.length === 0) {
    redirect(`/?error=not-found&q=${query}`);
  }

  return <MainLayout searchResults={data} />;
}
