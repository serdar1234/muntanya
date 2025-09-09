import { LatLngTuple } from "leaflet";
import {
  ApiPeak,
  ApiResponse,
  MountainData,
  AutocompleteResponse,
  Peak,
} from "./types";
import { MountainDataBig } from "./mountainDataTypes";

export async function getMountainData(
  query: string
): Promise<MountainData | null> {
  const url = `https://api.climepeak.com/api/v1/home/search?q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error in getMountainData: ${response.statusText}`);
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

export async function getPeakById(id: string): Promise<MountainDataBig | null> {
  const url = `https://api.climepeak.com/api/v1/peaks/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const url = `https://api.climepeak.com/api/v1/home/search?q=${id}`;
      const res = getMountainData(url);
      if (res === null) return null;
      return res as unknown as MountainDataBig;
    }

    const { data: mountain } = await response.json();

    if (!mountain) return null;

    // const mountainData: MountainData = {
    //   name: mountain.name,
    //   coords: [
    //     parseFloat(mountain.coordinates.lat),
    //     parseFloat(mountain.coordinates.lng),
    //   ],
    // };

    return mountain;
  } catch (error) {
    console.error("Could not find the mountain", error);
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

    const responseData = await response.json();

    if (
      responseData.data?.location?.location?.lat &&
      responseData.data?.location?.location?.lng
    ) {
      const { lat, lng } = responseData.data.location.location;
      return [lat, lng];
    } else {
      console.error("Incorrect data format:", responseData);
      return [46.8523, -121.7605];
    }
  } catch (error) {
    console.error("Could not find data about the mountain:", error);
    return [46.8523, -121.7605];
  }
}

export async function getAutocompleteSuggestions(
  query: string
): Promise<Peak[]> {
  const url = `https://api.climepeak.com/api/v1/home/autocomplete?q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Ошибка API: ${response.statusText}`);
      return [];
    }

    const data: AutocompleteResponse = await response.json();
    return data.data.peaks;
  } catch (error) {
    console.error("Не удалось получить данные для автокомплита:", error);
    return [];
  }
}
