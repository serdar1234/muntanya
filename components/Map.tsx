"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Optional: fix for default marker icons when using bundlers.
    // Copy the marker images into your public folder (e.g. /public/leaflet/...)
    // and update the paths below if you want markers to display correctly.
    // If you don't need markers yet you can remove this block.
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });

    // Initialize the map
    const map = L.map(mapContainerRef.current, {
      center: [46.8523, -121.7603], // example coordinates (Mt. Rainier)
      zoom: 10,
      scrollWheelZoom: true,
    });
    leafletMapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    return () => {
      // cleanup on unmount
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}
