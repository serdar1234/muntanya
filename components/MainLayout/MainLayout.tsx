"use client";

import MenuItem from "@/components/Menu";
import SearchInput from "@/components/Search/SearchInput";
import { LatLngTuple } from "leaflet";
import { MainLayoutProps } from "@/shared/types";
import DynamicMap from "@/components/Map/";
import { useEffect, useState } from "react";
import { getDefaultPosition } from "@/shared/api";
import MountainInfoCard from "../MountainInfoCard";
import ScrollToTopButton from "../ScrollToTopButton";
import SearchResultCard from "../SearchResultCard";
import { Box } from "@mui/material";

export default function MainLayout({
  initialMountain = null,
  searchResults = [],
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
  // console.log("search: ", searchResults);
  return (
    <main className="main-layout">
      <div className="map-column">
        {mapPosition && <DynamicMap pos={mapPosition} />}
      </div>
      <SearchInput />
      <Box component={"section"} className="card-container">
        {initialMountain && <MountainInfoCard data={initialMountain} />}
        {searchResults &&
          searchResults.length > 0 &&
          searchResults.map((peak) => (
            <div key={peak.slug}>
              <SearchResultCard peak={peak} />
            </div>
          ))}
      </Box>
      <MenuItem />
      <ScrollToTopButton />
    </main>
  );
}
