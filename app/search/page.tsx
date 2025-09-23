import { getSearchResults } from "@/shared/api";
import { ApiPeak } from "@/shared/types";
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

  try {
    if (query) {
      const data = await getSearchResults(query);
      let results: ApiPeak[] = [];
      if (data) {
        results = data.data.peaks;
      }

      if (results.length === 0) {
        redirect(`/?error=not-found&q=${query}`);
      }

      return <MainLayout searchResults={data} />;
    }
  } catch {
    redirect(`/?error=not-found`);
  }
}
