"use client";

import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";

export default function Map() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet only on the client
    (async () => {
      const L = (await import("leaflet")).default;

      // Optional: fix default marker icon paths (place images in public/leaflet/)
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });

      // Create the map
      const map = L.map(containerRef.current!, {
        center: [46.8523, -121.7603],
        zoom: 10,
        scrollWheelZoom: true,
      });
      mapRef.current = map;

      // Add tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // (Optional) add a sample marker to confirm icons work
      // L.marker([46.8523, -121.7603]).addTo(map).bindPopup('Mt. Rainier');

      // guard in case component unmounted during async import
      if (!isMounted && mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    })();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
