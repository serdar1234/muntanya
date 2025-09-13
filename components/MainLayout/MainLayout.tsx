import { Suspense } from "react";
import { LatLngTuple } from "leaflet";
import MenuItem from "../Menu";
import SearchInput from "../Search";
import DynamicMap from "../Map";
import MountainInfoCard from "../MountainInfoCard";
import ScrollToTopButton from "../ScrollToTopButton";
import SearchResultList from "../SearchResultList";
import Box from "@mui/material/Box";
import { MainLayoutProps } from "@/shared/types";
import getNearbyMarkers from "@/shared/getNearbyMarkers";

export default function MainLayout({
  initialMountain = null,
  searchResults = null,
}: MainLayoutProps) {
  const coords = initialMountain?.peak?.coordinates;
  const markers = initialMountain
    ? getNearbyMarkers({ data: initialMountain })
    : [];

  const mapPosition =
    ((coords && [coords?.lat, coords?.lng]) as unknown as LatLngTuple) ??
    undefined;
  return (
    <main className="main-layout">
      <div className="map-column">
        <DynamicMap pos={mapPosition} markers={markers} />
      </div>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchInput />
      </Suspense>
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
