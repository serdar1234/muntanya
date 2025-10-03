"use client";

import { getPeaksInBounds } from "@/shared/api";
import { useDebouncedCallback } from "@/shared/hooks";
import { Bounds, MarkerData } from "@/shared/types";
import { LatLngLiteral, LatLngTuple } from "leaflet";
import { useEffect, useCallback } from "react";
import { useMap, useMapEvent } from "react-leaflet";

const DEBOUNCE_DELAY_MS = 500;

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
  const debouncedFetch = useDebouncedCallback((b: Bounds) => {
    const northWest = b.northWest as LatLngLiteral;
    const southEast = b.southEast as LatLngLiteral;

    getPeaksInBounds(northWest, southEast, 1, 50).then((markers) => {
      if (markers) {
        setMarkersArray(markers);
      }
    });
  }, DEBOUNCE_DELAY_MS);

  const map = useMapEvent("moveend", () => {
    const currentBounds = map.getBounds();
    const northWest = currentBounds.getNorthWest();
    let southEast = currentBounds.getSouthEast() as unknown as LatLngLiteral;

    if (window.innerWidth > 800) {
      const newLng = northWest.lng + (southEast.lng - northWest.lng) * 0.65;
      southEast = { lat: southEast.lat, lng: newLng };
    }

    const newBounds = { northWest, southEast };
    debouncedFetch(newBounds);
  });

  return null;
}

export function ChangeViewWithOffset({
  center,
  zoom,
  offsetPercentage,
}: {
  center?: LatLngTuple;
  zoom?: number;
  offsetPercentage: number;
}) {
  const map = useMap();

  const applyView = useCallback(() => {
    if (!center || !zoom) {
      return;
    }

    const mapSize = map.getSize();
    let targetCenter = center;

    if (mapSize.x > 800) {
      const offsetX = mapSize.x * (offsetPercentage / 100);
      const offsetY = 0;

      const point = map.project(center, zoom);
      const newPoint = point.add([offsetX, offsetY]);

      targetCenter = map.unproject(newPoint, zoom) as unknown as LatLngTuple;
    }

    map.setView(targetCenter, zoom, { animate: false });
  }, [center, map, offsetPercentage, zoom]);

  useEffect(() => {
    applyView();
  }, [applyView, center, zoom]);

  return null;
}
