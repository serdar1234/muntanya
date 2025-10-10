"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, ScaleControl } from "react-leaflet";

import { LatLngTuple } from "leaflet";
import { MarkerData } from "@/shared/types";
import { getDefaultPosition } from "@/shared/api";

import * as L from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";

import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import HomeControl from "../MapControls/HomeControl";
import { CircularProgress } from "@mui/material";
import {
  SetViewOnClick,
  MapUpdater,
  MapBoundsListener,
  ChangeViewWithOffset,
} from "./utils";
import GeoMarker from "../GeoMarker";

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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <HomeControl position="topleft" centralPosition={centralPosition} />
      <ScaleControl position="bottomleft" />
      <SetViewOnClick />
      <MapBoundsListener setMarkersArray={setMarkersArray} />
      <MapUpdater newPosition={centralPosition} />

      {centralMapMarker && (
        <GeoMarker key={centralMapMarker.slug} m={centralMapMarker} isCentral />
      )}
      {markersArray.length > 0 &&
        markersArray.map((m) => {
          if (centralMapMarker?.slug === m.slug) return null;
          return <GeoMarker key={m.slug} m={m} />;
        })}
      <ChangeViewWithOffset
        center={centralPosition}
        zoom={ZOOM}
        offsetPercentage={OFFSET_PERCENTAGE}
      />
    </MapContainer>
  );
}
