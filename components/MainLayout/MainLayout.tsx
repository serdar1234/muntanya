"use client";

import MenuItem from "@/components/Menu";
import SearchInput from "@/components/Search/SearchInput";
import { LatLngTuple } from "leaflet";
import { MainLayoutProps } from "@/shared/types";
import DynamicMap from "@/components/Map/";
import { useEffect, useState } from "react";
import { getDefaultPosition } from "@/shared/api";

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

  const mapPosition = initialMountain?.coords ?? defaultPosition;

  return (
    <main className="main-layout">
      <div className="map-column">
        {mapPosition && <DynamicMap pos={mapPosition} />}
      </div>
      <SearchInput />
      {initialMountain && (
        <div className="mountain-info-panel">
          <h3>{initialMountain.name}</h3>
          <p>Координаты: {initialMountain.coords.join(", ")}</p>
        </div>
      )}
      <MenuItem />
    </main>
  );
}
