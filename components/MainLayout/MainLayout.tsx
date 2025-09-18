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
import Logo from "../Logo";
import SelectMap from "../SelectMap";

export default function MainLayout({
  initialMountain = null, // MountainDataBig
  searchResults = null,
}: MainLayoutProps) {
  let searchResultsFirstPosition = { lat: "0", lng: "0" };
  if (searchResults) {
    searchResultsFirstPosition = {
      lat: searchResults?.data.peaks[0]?.lat,
      lng: searchResults?.data.peaks[0]?.lng,
    };
  }
  const coords =
    initialMountain?.peak?.coordinates ||
    (searchResults && searchResultsFirstPosition);
  const markers = initialMountain
    ? getNearbyMarkers({ data: initialMountain })
    : [];

  if (!initialMountain && searchResults) {
    const { name, slug, elevation } = searchResults.data.peaks[0];
    markers.push({
      coords: Object.values(
        searchResultsFirstPosition,
      ) as unknown as LatLngTuple,
      name,
      slug,
      elevation,
    });
  }

  const mapPosition =
    ((coords && [coords?.lat, coords?.lng]) as unknown as LatLngTuple) ??
    undefined;
  return (
    <Box component="main" className="main-layout">
      <section className="map-section">
        <DynamicMap pos={mapPosition} markers={markers} />
      </section>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchInput />
      </Suspense>
      <Box component={"section"} className="info-section">
        <SelectMap />
        <Logo />
        {!searchResults && initialMountain && (
          <MountainInfoCard data={initialMountain} />
        )}
        {searchResults && searchResults.data.peaks.length > 0 && (
          <SearchResultList searchResults={searchResults} />
        )}
      </Box>
      <MenuItem />
      <ScrollToTopButton />
    </Box>
  );
}
