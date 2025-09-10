"use client";

import MenuItem from "@/components/Menu";
import SearchInput from "@/components/Search/SearchInput";
import { LatLngTuple } from "leaflet";
import { MainLayoutProps } from "@/shared/types";
import DynamicMap from "@/components/Map/";
import { useEffect, useState } from "react";
import { getDefaultPosition } from "@/shared/api";
import MountainInfoCard from "../MountainInfoCard/MountainInfoCard";
import ScrollToTopButton from "../ScrollToTopButton";

export default function MainLayout({
  initialMountain = null,
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
      {initialMountain && <MountainInfoCard data={initialMountain} />}
      <MenuItem />
      <ScrollToTopButton />
    </main>
  );
}
