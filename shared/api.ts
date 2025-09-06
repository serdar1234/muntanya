import { LatLngTuple } from "leaflet";
import { ApiPeak, ApiResponse, MountainData } from "./types";

export async function getMountainData(
  query: string
): Promise<MountainData | null> {
  const url = `https://api.climepeak.com/api/v1/home/search?q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error receiving data: ${response.statusText}`);
      return null;
    }

    const apiData: ApiResponse = await response.json();
    const data: ApiPeak[] = apiData.data.peaks.sort(
      (a, b) => b.prominence - a.prominence
    );
    const mountain = data.find(
      (peak) =>
        peak.name.toLowerCase().includes(query.toLowerCase()) ||
        peak.slug.toLowerCase().includes(query.toLowerCase())
    );

    if (!mountain) {
      return null;
    }

    const mountainData: MountainData = {
      name: mountain.name,
      coords: [parseFloat(mountain.lat), parseFloat(mountain.lng)],
    };

    return mountainData;
  } catch (error) {
    console.error("Could not find data about the mountain:", error);
    return null;
  }
}

export async function getDefaultPosition(): Promise<LatLngTuple> {
  try {
    const response = await fetch(
      "https://api.climepeak.com/api/v1/home/location"
    );
    if (!response.ok) {
      console.error(`Error receiving data: ${response.statusText}`);
      return [46.8523, -121.7605];
    }

    const data = await response.json();
    const { lat, lng } = data.data.location.location as Record<string, number>;
    return [lat, lng];
  } catch (error) {
    console.error("Could not find data about the mountain:", error);
    return [46.8523, -121.7605];
  }
}
