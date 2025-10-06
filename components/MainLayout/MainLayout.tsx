import { Suspense } from "react";
import { LatLngTuple } from "leaflet";
import MenuItem from "../Menu";
import SearchInput from "../Search";
import DynamicMap from "../Map";
import MountainInfoCard from "../MountainInfoCard";
import ScrollToTopButton from "../ScrollToTopButton";
import SearchResultList from "../SearchResultList";
import Box from "@mui/material/Box";
import { MainLayoutProps, MarkerData } from "@/shared/types";
import extractNearbyMarkers from "@/shared/extractNearbyMarkers";
import Logo from "../Logo";
import SelectMap from "../SelectMap";
import { DEFAULT_POSITION } from "@/shared/api";
import SpeedDial from "../SpeedDial";

export default async function MainLayout({
  initialMountain = null,
  searchResults = null,
}: MainLayoutProps) {
  let searchResultsFirstPosition = {
    lat: String(DEFAULT_POSITION[0]),
    lng: String(DEFAULT_POSITION[1]),
  };
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
    ? extractNearbyMarkers({ data: initialMountain })
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

  let centralMapMarker: MarkerData | undefined;
  if (initialMountain) {
    centralMapMarker = {
      coords: mapPosition,
      name: initialMountain.peak.name,
      slug: initialMountain.peak.slug,
      elevation: initialMountain.peak.elevation,
    };
  }

  return (
    <Box component="main" className="main-layout">
      <section className="map-section">
        <DynamicMap
          centralMapMarker={centralMapMarker}
          geoCoordinates={mapPosition}
          markers={markers}
        />
      </section>

      <Box component={"section"} className="info-section">
        {/* <SelectMap /> */}
        <SpeedDial />
        <Logo />
        {!searchResults && initialMountain && (
          <MountainInfoCard data={initialMountain} />
        )}
        {searchResults && searchResults.data.peaks.length > 0 && (
          <SearchResultList searchResults={searchResults} />
        )}
      </Box>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchInput />
      </Suspense>
      <MenuItem />
      <ScrollToTopButton />
    </Box>
  );
}
