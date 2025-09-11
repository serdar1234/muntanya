"use client";

import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import MenuItem from "../Menu";
import SearchInput from "../Search";
import DynamicMap from "../Map";
import MountainInfoCard from "../MountainInfoCard";
import ScrollToTopButton from "../ScrollToTopButton";
import SearchResultList from "../SearchResultList";
import Box from "@mui/material/Box";
import { MainLayoutProps } from "@/shared/types";
import { getDefaultPosition } from "@/shared/api";

export default function MainLayout({
  initialMountain = null,
  searchResults = null,
}: MainLayoutProps) {
  const [defaultPosition, setDefaultPosition] = useState<LatLngTuple | null>(
    null,
  );
  useEffect(() => {
    async function fetchDefaultPosition() {
      try {
        const position = await getDefaultPosition();
        setDefaultPosition(position);
      } catch (error) {
        console.error("Could not find data about the mountain:", error);
      }
    }

    fetchDefaultPosition();
  }, []);

  const coords = initialMountain?.peak?.coordinates;
  const mapPosition =
    ((coords && [coords?.lat, coords?.lng]) as unknown as LatLngTuple) ??
    defaultPosition;
  return (
    <main className="main-layout">
      <div className="map-column">
        {mapPosition && <DynamicMap pos={mapPosition} />}
      </div>
      <SearchInput />
      <Box component={"section"} className="card-container">
        {initialMountain && <MountainInfoCard data={initialMountain} />}
        {searchResults && searchResults.data.peaks.length > 0 && (
          <SearchResultList searchResults={searchResults} />
        )}
      </Box>
      <MenuItem />
      <ScrollToTopButton />
    </main>
  );
}
