"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { LatLngTuple } from "leaflet";

import DynamicMap from "@/components/Map";
import MenuItem from "@/components/Menu";
import SearchInput from "@/components/Search/SearchInput";

// Типизация для данных о горе
interface MountainData {
  name: string;
  coords: LatLngTuple;
}

// Заглушка для получения данных. Замени её своим реальным вызовом API.
async function getMountainData(slug: string): Promise<MountainData | null> {
  // Имитация вызова API
  const data = await new Promise<MountainData | null>((resolve) =>
    setTimeout(() => {
      const mountainDetails: Record<string, MountainData> = {
        everest: { name: "Mount Everest", coords: [27.9881, 86.925] },
        kilimanjaro: { name: "Mount Kilimanjaro", coords: [-3.0674, 37.3556] },
        rainier: { name: "Mount Rainier", coords: [46.8523, -121.7605] },
        // Добавь здесь другие горы, которые ты ищешь
      };
      resolve(mountainDetails[slug.toLowerCase()] || null);
    }, 500),
  );
  return data;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const mountainSlug = searchParams.get("mountain");
  const [mountainData, setMountainData] = useState<MountainData | null>(null);

  useEffect(() => {
    if (mountainSlug) {
      getMountainData(mountainSlug).then((data) => {
        setMountainData(data);
      });
    } else {
      setMountainData(null);
    }
  }, [mountainSlug]);

  // Координаты по умолчанию для центрирования карты, если гора не выбрана
  const defaultPosition: LatLngTuple = [46.8523, -121.7605];
  const mapPosition = mountainData?.coords ?? defaultPosition;

  return (
    <main className="main-layout">
      <div className="map-column">
        {/* Передаем координаты в компонент карты */}
        <DynamicMap pos={mapPosition} />
      </div>
      <div className="wrapper">
        <SearchInput />
        {/* Показываем информацию о горе, если она есть */}
        {mountainData && (
          <div className="mountain-info-panel">
            <h3>{mountainData.name}</h3>
            <p>Координаты: {mountainData.coords.join(", ")}</p>
          </div>
        )}
        <MenuItem />
      </div>
    </main>
  );
}
