"use client";

import MenuItem from "@/components/Menu";
import SearchInput from "@/components/Search/SearchInput";
import { LatLngTuple } from "leaflet";
import { MainLayoutProps } from "@/shared/types";
import DynamicMap from "@/components/Map/";
// import styles from "./MainLayout.module.scss";

export default function MainLayout({
  initialMountain = null,
}: MainLayoutProps) {
  const defaultPosition: LatLngTuple = [46.8523, -121.7605];
  // Используем пропс напрямую, без useState
  const mapPosition = initialMountain?.coords ?? defaultPosition;

  return (
    <main className="main-layout">
      <div className="map-column">
        {/* Передаем координаты в компонент карты */}
        <DynamicMap pos={mapPosition} />
      </div>
      <div className="wrapper">
        <SearchInput />
        {initialMountain && (
          <div className="mountain-info-panel">
            <h3>{initialMountain.name}</h3>
            <p>Координаты: {initialMountain.coords.join(", ")}</p>
          </div>
        )}
        <MenuItem />
      </div>
    </main>
  );
}
