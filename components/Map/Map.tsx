"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvent,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DivIcon, divIcon, LatLngTuple, point } from "leaflet";
import customDivIcon from "@/shared/customDivIcon";
import { MarkerData } from "@/shared/types";
import { getDefaultPosition } from "@/shared/api";

import PopupContent from "../PopupContent/";
import MapUpdater from "./MapUpdater";

import * as L from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";

import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import TooltipContent from "../Tooltip/Tooltip";

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

export default function Map({
  pos,
  markers = [],
}: {
  pos?: LatLngTuple;
  markers?: MarkerData[];
}) {
  const [defaultPosition, setDefaultPosition] = useState<LatLngTuple>();

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
  L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

  function makeIcon(cluster: { getChildCount: () => number }): DivIcon {
    return divIcon({
      html: `<div class=${styles["cluster-icon"]}>${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  }

  const centerPosition = pos || defaultPosition;

  return (
    <MapContainer
      center={centerPosition || [46.8523, -121.7605]}
      zoom={16}
      gestureHandling={true}
      gestureHandlingOptions={{
        text: {
          touch: "Please use two fingers to move the map",
          scroll: "Please use ctrl + scroll to zoom the map",
          scrollMac: "Please use \u2318 + scroll to zoom the map",
        },
      }}
      className={styles["map-container"]}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnClick />
      <MapUpdater newPosition={centerPosition} />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={makeIcon}
        showCoverageOnHover={false}
        removeOutsideVisibleBounds={true}
      >
        {markers.length > 0 &&
          markers.map((m, idx) => (
            <Marker
              key={String(m.coords)}
              position={m.coords}
              icon={idx === 0 ? customDivIcon("You") : customDivIcon(m.name)}
            >
              <Popup offset={[0, -10]} className={styles["popup-content"]}>
                <PopupContent marker={m} />
              </Popup>
              <Tooltip sticky>
                <TooltipContent marker={m} />
              </Tooltip>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
