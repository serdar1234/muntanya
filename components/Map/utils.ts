"use client";

import { getPeaksInBounds } from "@/shared/api";
import { Bounds, MarkerData } from "@/shared/types";
import { LatLngLiteral, LatLngTuple } from "leaflet";
import { useState, useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";

export function MapUpdater({ newPosition }: { newPosition?: LatLngTuple }) {
  const map = useMap();

  useEffect(() => {
    if (newPosition && Array.isArray(newPosition) && newPosition.length === 2) {
      map.setView(newPosition);
    }
  }, [newPosition, map]);

  return null;
}

export function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

export function MapBoundsListener({
  setMarkersArray,
}: {
  setMarkersArray: (markers: MarkerData[]) => void;
}) {
  const [bounds, setBounds] = useState<Bounds | null>(null);

  const map = useMapEvent("moveend", () => {
    const currentBounds = map.getBounds();
    setBounds({
      northWest: currentBounds.getNorthWest(),
      southEast: currentBounds.getSouthEast(),
    });
  });

  useEffect(() => {
    if (bounds) {
      const northWest = bounds.northWest as LatLngLiteral;
      const southEast = bounds.southEast as LatLngLiteral;
      getPeaksInBounds(northWest, southEast, 1, 20).then((markers) => {
        if (markers) {
          setMarkersArray(markers);
        }
      });
    }
  }, [bounds, setMarkersArray]);
  // console.log("bounds", bounds);
  // if (bounds)
  //   console.log(
  //     "Distance in meters diagonally on screen: ",
  //     Math.round(
  //       map.distance(bounds?.northWest as LatLng, bounds?.southEast as LatLng)
  //     )
  //   );
  return null;
}
