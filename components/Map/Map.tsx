"use client";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon, divIcon, Icon, LatLngExpression, point } from "leaflet";
import styles from "./Map.module.scss";

const position: LatLngExpression = [46.8523, -121.7605];
const leaf = "./leaflet/mount.jpg";

const markers: { coords: LatLngExpression; text: string }[] = [
  {
    coords: position,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident neque modi aut nostrum voluptatibus, quos illum aperiam reiciendis est nam pariatur?",
  },
  {
    coords: [position[0], position[1] + 0.01],
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident neque modi aut nostrum voluptatibus, quos illum aperiam reiciendis est nam pariatur?",
  },
  {
    coords: [position[0] + 0.005, position[1] - 0.01],
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident neque modi aut nostrum voluptatibus, quos illum aperiam reiciendis est nam pariatur?",
  },
];

const myIcon = new Icon({
  iconSize: [38, 38],
  iconUrl: "./leaflet/marker-icon.png",
  shadowUrl: "./leaflet/marker-shadow.png",
  shadowSize: [38, 38],
});

function Map() {
  const makeIcon = (cluster: { getChildCount: () => number }): DivIcon => {
    return divIcon({
      html: `<div class=${styles["cluster-icon"]}>${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };
  return (
    <MapContainer
      center={position}
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
                <h3>Mt.Rainier</h3>
                <img src={leaf} alt="" style={{ float: "right" }} />
                <p>{m.text}</p>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
