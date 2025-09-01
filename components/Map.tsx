"use client";

import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";

export default function Map() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;

    (async () => {
      const L = (await import("leaflet")).default;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [40, 40],
        shadowSize: [40, 40],
        iconAnchor: [0, 38],
        // shadowAnchor: [4, 62],
        popupAnchor: [19, -38],
      });

      const map = L.map(containerRef.current!, {
        center: [46.8523, -121.7603],
        zoom: 10,
        scrollWheelZoom: true,
      });
      mapRef.current = map;

      // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);
      L.tileLayer("https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      L.marker([46.8522, -121.7575]).addTo(map).bindPopup("Mt. Rainier");

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
