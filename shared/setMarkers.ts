import { LatLngTuple } from "leaflet";
import { MountainDataBig } from "./mountainDataTypes";
import { MarkerData } from "./types";

export default function setMarkers({
  data,
}: {
  data: MountainDataBig;
}): MarkerData[] {
  const { nearby_peaks } = data;
  const markers: MarkerData[] = [];

  for (const peak of nearby_peaks) {
    const pos = [peak.lat, peak.lng].map(Number) as unknown as LatLngTuple;
    const text = peak.name;

    markers.push({ coords: pos, text });
  }

  return markers;
}
