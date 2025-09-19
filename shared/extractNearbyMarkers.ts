import { LatLngTuple } from "leaflet";
import { MountainDataBig } from "./mountainDataTypes";
import { MarkerData } from "./types";

export default function extractNearbyMarkers({
  data,
}: {
  data: MountainDataBig;
}): MarkerData[] {
  const { nearby_peaks, peak } = data;
  const markers: MarkerData[] = [
    {
      coords: [peak.coordinates.lat, peak.coordinates.lng].map(
        Number
      ) as unknown as LatLngTuple,
      name: peak.name,
      slug: peak.slug,
      elevation: peak.elevation,
    },
  ];

  for (const peak of nearby_peaks) {
    const pos = [peak.lat, peak.lng].map(Number) as unknown as LatLngTuple;
    const name = peak.name;
    const slug = peak.slug;
    const elevation = peak.elevation;

    markers.push({ coords: pos, name, slug, elevation });
  }

  return markers;
}
