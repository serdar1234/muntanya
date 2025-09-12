"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { List, Pagination, Typography } from "@mui/material";
import SearchResultCard from "../SearchResultCard";
import { getSearchResults } from "@/shared/api";
import { SuccessResponse } from "@/shared/types";

export default function SearchResultList({
  searchResults,
}: {
  searchResults: SuccessResponse;
}) {
  const [currentPage, setCurrentPage] = useState(
    searchResults.data.pagination.current_page,
  );
  const [peaks, setPeaks] = useState(searchResults.data.peaks);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchResults.data.query;

  useEffect(() => {
    async function fetchPeaks() {
      setIsLoading(true);
      const data = await getSearchResults(query, currentPage);
      if (data) setPeaks(data.data.peaks);
      setIsLoading(false);
    }
    fetchPeaks();
  }, [currentPage, query]);

  const { total_pages } = searchResults.data.pagination;
  function handlePageChange(event: ChangeEvent<unknown>, page: number): void {
    setCurrentPage(page);
  }

  return (
    <List className="search-result-list">
      <Typography variant="h5" sx={{ m: 2 }}>
        Search results:
      </Typography>
      <Pagination
        count={total_pages}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        size="small"
        disabled={isLoading}
      />
      {peaks.map((peak) => (
        <li key={peak.slug}>
          <SearchResultCard peak={peak} />
        </li>
      ))}
    </List>
  );
}
