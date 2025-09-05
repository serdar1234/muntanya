"use client";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon, divIcon, Icon, LatLngTuple, point } from "leaflet";
import styles from "./Map.module.scss";
import PopupContent from "../PopupContent/";

const position: LatLngTuple = [46.8523, -121.7605];

const myIcon = new Icon({
  iconSize: [38, 38],
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [38, 38],
});

export default function Map({ pos = position }: { pos?: LatLngTuple }) {
  const makeIcon = (cluster: { getChildCount: () => number }): DivIcon => {
    return divIcon({
      html: `<div class=${styles["cluster-icon"]}>${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const markers: { coords: LatLngTuple; text: string }[] = [
    {
      coords: pos,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident neque modi aut nostrum voluptatibus, quos illum aperiam reiciendis est nam pariatur?",
    },
    {
      coords: [pos[0], pos[1] + 0.01],
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident neque modi aut nostrum voluptatibus, quos illum aperiam reiciendis est nam pariatur?",
    },
    {
      coords: [pos[0] + 0.005, pos[1] - 0.01],
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident neque modi aut nostrum voluptatibus, quos illum aperiam reiciendis est nam pariatur?",
    },
  ];

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
        {markers.map((m) => {
          return (
            <Marker key={String(m.coords)} position={m.coords} icon={myIcon}>
              <Popup offset={[0, -10]}>
                <PopupContent title="" description={m.text} />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
