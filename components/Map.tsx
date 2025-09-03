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
          center: [46.8523, -121.7605],
          zoom: 10,
          scrollWheelZoom: true,
        });
        map.zoomControl.setPosition("topright");
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
          attribution:
            "Map data: © OpenStreetMap contributors, tiles: © OpenTopoMap",
          maxZoom: 19,
        }).addTo(map);
        // L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}{r}.png?apikey={apikey}', {
        //   attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        //   apikey: '<your apikey>',
        //   maxZoom: 22
        // }).addTo(map);
        // L.tileLayer("https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png", {
        //   attribution:
        //     "Overlay: © Waymarked Trails | Data: © OSM contributors",
        //   maxZoom: 19,
        // }).addTo(map);

        // L.tileLayer(
        //   "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png",
        //   {
        //     minZoom: 0,
        //     maxZoom: 18,
        //     attribution:
        //       '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        //   }
        // ).addTo(map); // commercial license

        L.marker([46.8523, -121.7603]).addTo(map).bindPopup("Mt. Rainier");
        L.control
          .scale({
            metric: true,
            imperial: true,
            position: "bottomright",
          })
          .addTo(map);

        const Watermark = L.Control.extend({
          onAdd: function (
            this: Leaflet.Control & {
              options: Leaflet.ControlOptions & { copyright: string };
            },
          ) {
            const container = L.DomUtil.create(
              "div",
              "leaflet-control-watermark",
            );
            container.innerHTML = this.options.copyright;
            return container;
          },
          options: {
            copyright: "MUNTANYA",
            position: "bottomright",
          } as Leaflet.ControlOptions & { copyright: string },
        }) as unknown as new (
          options?: Leaflet.ControlOptions & { copyright: string },
        ) => Leaflet.Control;
        new Watermark().addTo(map);

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

  return (
    <>
      <div ref={containerRef} className={styles["map-container"]} />
    </>
  );
}
