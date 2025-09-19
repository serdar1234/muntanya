"use client";

import { useEffect, useContext, useState } from "react";
import { MapContext } from "@/app/providers/MapProvider";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvent,
} from "react-leaflet";

import { LatLngTuple } from "leaflet";
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
import HomeControl from "../MapControls/HomeControl";
import { CircularProgress } from "@mui/material";

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
  markers: MarkerData[];
}) {
  const [markersArray, setMarkersArray] = useState<MarkerData[]>(markers);
  const [defaultPosition, setDefaultPosition] = useState<LatLngTuple>();
  const context = useContext(MapContext);
  if (!context) throw new Error("Map must be used within a MapProvider");

  const { style } = context;

  useEffect(() => {
    async function fetchDefaultPosition() {
      try {
        const position = await getDefaultPosition();
        console.log("position from API:", position, Date.now());
        if (
          position &&
          Array.isArray(position.latlng) &&
          position.latlng.length === 2
        ) {
          setDefaultPosition(position.latlng);
          setMarkersArray(position.markers);
        }
      } catch (error) {
        console.log("Could not find data about the mountain:", error);
      }
    }
    fetchDefaultPosition();
    L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
  }, []);

  const centralPosition = pos || defaultPosition;

  if (!centralPosition) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <MapContainer
      center={centralPosition}
      zoom={16}
      zoomControl={false}
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
      {/* <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://jura.snow-forecast.com/osm_tiles/{z}/{x}/{y}.png"
        /> PIZDING */}
      {style === "1" && (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      )}
      {style === "2" && (
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        />
      )}
      <HomeControl position="topleft" centralPosition={centralPosition} />
      <SetViewOnClick />
      <MapUpdater newPosition={centralPosition} />
      {markersArray.length > 0 &&
        markersArray.map((m, idx) => (
          <Marker
            key={String(m.coords)}
            position={m.coords}
            {...(idx === 0
              ? { zIndexOffset: 1000, icon: customDivIcon(m.name, true) }
              : { icon: customDivIcon(m.name) })}
          >
            <Popup offset={[0, -10]} className={styles["popup-content"]}>
              <PopupContent marker={m} />
            </Popup>
            <Tooltip sticky>
              <TooltipContent marker={m} />
            </Tooltip>
          </Marker>
        ))}
    </MapContainer>
  );
}
