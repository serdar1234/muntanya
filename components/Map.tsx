"use client";

import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";
// import type { Feature, Point } from "geojson";
import styles from "./Map.module.scss";

export default function Map() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let disposed = false;

    (async () => {
      try {
        const L = (await import("leaflet")).default;

        L.Icon.Default.mergeOptions({
          iconUrl: "/leaflet/marker-icon.png",
          shadowUrl: "/leaflet/marker-shadow.png",
          iconSize: [32, 32],
          shadowSize: [32, 32],
        });

        if (disposed || !containerRef.current) return;

        const map = L.map(containerRef.current, {
          center: [46.8523, -121.7603],
          zoom: 10,
          scrollWheelZoom: true,
        });
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
          attribution:
            "Map data: © OpenStreetMap contributors, tiles: © OpenTopoMap",
          maxZoom: 19,
        }).addTo(map);
        // L.tileLayer("https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png", {
        //   attribution:
        //     "Overlay: © Waymarked Trails | Data: © OSM contributors",
        //   maxZoom: 19,
        // }).addTo(map);

        L.marker([46.8523, -121.7603]).addTo(map).bindPopup("Mt. Rainier");

        map.whenReady(() => map.invalidateSize());
      } catch {
        console.error("Failed to load Leaflet or initialize the map.");
      }
    })();

    return () => {
      disposed = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className={styles["map-container"]} />;
}
