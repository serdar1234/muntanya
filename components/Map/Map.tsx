"use client";

import { useEffect, useContext, useState } from "react";
import { MapContext } from "@/app/providers/MapProvider";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  ScaleControl,
} from "react-leaflet";

import { LatLngTuple } from "leaflet";
import customDivIcon from "@/shared/customDivIcon";
import { MarkerData } from "@/shared/types";
import { getDefaultPosition } from "@/shared/api";

import PopupContent from "../PopupContent/";

import * as L from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";

import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import TooltipContent from "../Tooltip/Tooltip";
import HomeControl from "../MapControls/HomeControl";
import { CircularProgress } from "@mui/material";
import {
  SetViewOnClick,
  MapUpdater,
  MapBoundsListener,
  ChangeViewWithOffset,
} from "./utils";

const ZOOM = 13;
const OFFSET_PERCENTAGE = 17.5;

export default function Map({
  centralMapMarker,
  geoCoordinates,
  markers = [],
}: {
  centralMapMarker?: MarkerData;
  geoCoordinates?: LatLngTuple;
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
    if (!geoCoordinates) fetchDefaultPosition();
    L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
  }, [geoCoordinates]);

  useEffect(() => {
    setMarkersArray(markers);
  }, [markers]);

  // useEffect(() => {
  //   console.log("markersArray", markersArray);
  // }, [markersArray]);

  const centralPosition = geoCoordinates || defaultPosition;
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

  // console.log("centralMapMarker", centralMapMarker);
  return (
    <MapContainer
      center={centralPosition}
      zoom={ZOOM}
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
      <ScaleControl position="bottomleft" />
      <SetViewOnClick />
      <MapBoundsListener setMarkersArray={setMarkersArray} />
      <MapUpdater newPosition={centralPosition} />

      {centralMapMarker && (
        <Marker
          key={centralMapMarker?.slug}
          position={centralPosition}
          zIndexOffset={1000}
          icon={customDivIcon(centralMapMarker.name, true)}
        >
          <Popup offset={[0, -10]} className={styles["popup-content"]}>
            <PopupContent marker={centralMapMarker} />
          </Popup>
          <Tooltip sticky>
            <TooltipContent marker={centralMapMarker} />
          </Tooltip>
        </Marker>
      )}
      {markersArray.length > 0 &&
        markersArray.map((m) => {
          if (centralMapMarker?.slug === m.slug) return null;
          return (
            <Marker
              key={m.slug}
              position={m.coords}
              icon={customDivIcon(m.name)}
            >
              <Popup offset={[0, -10]} className={styles["popup-content"]}>
                <PopupContent marker={m} />
              </Popup>
              <Tooltip sticky>
                <TooltipContent marker={m} />
              </Tooltip>
            </Marker>
          );
        })}
      <ChangeViewWithOffset
        center={centralPosition}
        zoom={ZOOM}
        offsetPercentage={OFFSET_PERCENTAGE}
      />
    </MapContainer>
  );
}
