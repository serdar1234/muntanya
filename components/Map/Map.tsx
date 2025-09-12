"use client";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon, divIcon, Icon, LatLngTuple, point } from "leaflet";
import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import PopupContent from "../PopupContent/";
import { MarkerData } from "@/shared/types";

const position: LatLngTuple = [46.8523, -121.7605];

const myIcon = new Icon({
  iconSize: [38, 38],
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [38, 38],
});

export default function Map({
  pos = position,
  markers = [],
}: {
  pos?: LatLngTuple;
  markers?: MarkerData[];
}) {
  const makeIcon = (cluster: { getChildCount: () => number }): DivIcon => {
    return divIcon({
      html: `<div class=${styles["cluster-icon"]}>${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <MapContainer
      center={pos || position}
      zoom={13}
      scrollWheelZoom
      className={styles["map-container"]}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={makeIcon}>
        {markers.length > 0 &&
          markers.map((m) => {
            return (
              <Marker key={String(m.coords)} position={m.coords} icon={myIcon}>
                <Popup offset={[0, -10]}>
                  <PopupContent marker={m} />
                </Popup>
              </Marker>
            );
          })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
