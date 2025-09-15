"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DivIcon, divIcon, LatLngTuple, point } from "leaflet";
import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import PopupContent from "../PopupContent/";
import { MarkerData } from "@/shared/types";
import customDivIcon from "@/shared/customDivIcon";
import { getDefaultPosition } from "@/shared/api";
import MapUpdater from "./MapUpdater";

export default function Map({
  pos,
  markers = [],
}: {
  pos?: LatLngTuple;
  markers?: MarkerData[];
}) {
  const [defaultPosition, setDefaultPosition] = useState<
    LatLngTuple | undefined
  >();

  useEffect(() => {
    async function fetchDefaultPosition() {
      try {
        const position = await getDefaultPosition();
        if (position && Array.isArray(position) && position.length === 2) {
          setDefaultPosition(position);
        }
      } catch (error) {
        console.log("Could not find data about the mountain:", error);
      }
    }
    fetchDefaultPosition();
  }, []);

  const makeIcon = (cluster: { getChildCount: () => number }): DivIcon => {
    return divIcon({
      html: `<div class=${styles["cluster-icon"]}>${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const centerPosition = pos || defaultPosition;

  return (
    <MapContainer
      center={centerPosition || [46.8523, -121.7605]}
      zoom={16}
      scrollWheelZoom={false}
      className={styles["map-container"]}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater newPosition={centerPosition} />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={makeIcon}>
        {markers.length > 0 &&
          markers.map((m) => (
            <Marker
              key={String(m.coords)}
              position={m.coords}
              icon={customDivIcon(m.name)}
            >
              <Popup offset={[0, -10]}>
                <PopupContent marker={m} />
              </Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
