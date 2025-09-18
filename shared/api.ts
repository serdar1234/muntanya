import { LatLngTuple } from "leaflet";
import {
  ApiResponse,
  AutocompletePeak,
  AutocompleteResponse,
  DefaultPosition,
  ErrorResponse,
  MarkerData,
  SuccessNearbyPeaksResponse,
  SuccessResponse,
} from "./types";
import { MountainDataBig } from "./mountainDataTypes";

const DEFAULT_POSITION: LatLngTuple = [46.8523, -121.7605];

export async function getSearchResults(
  query: string,
  page?: number | undefined
): Promise<SuccessResponse | null> {
  if (page) {
    query += `&page=${page}`;
  }
  const url = `https://api.climepeak.com/api/v1/home/search?q=${query}&sort_by=elevation_desc`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Error in getSearchResults: ${response}`);
      return null;
    }

    const apiData: ApiResponse = await response.json();

    if ("error" in apiData) {
      return null;
    }

    return apiData;
  } catch (error) {
    console.log("Could not find data about the mountain:", error);
    return null;
  }
}

export async function getDefaultPosition(): Promise<{
  latlng: LatLngTuple;
  markers: MarkerData[];
}> {
  try {
    const response = await fetch("https://api.climepeak.com/api/v1/home/");
    if (!response.ok) {
      console.log(`Error receiving data: ${response.statusText}`);
      return { latlng: DEFAULT_POSITION, markers: [] };
    }

    const responseData: { data: DefaultPosition } = await response.json();

    if (
      responseData.data?.user_location?.location?.lat &&
      responseData.data?.user_location?.location?.lng
    ) {
      const { lat, lng } = responseData.data.user_location.location;
      const { nearby_peaks } = responseData.data;
      const markers = nearby_peaks.map((peak) => ({
        coords: [peak.lat, peak.lng].map(Number) as unknown as LatLngTuple,
        name: peak.name,
        slug: peak.slug,
        elevation: peak.elevation,
      }));
      return { latlng: [lat, lng], markers };
    } else {
      console.log("Incorrect data format:", responseData);
      return { latlng: DEFAULT_POSITION, markers: [] };
    }
  } catch (error) {
    console.log("Could not find data about the mountain:", error);
    return { latlng: DEFAULT_POSITION, markers: [] };
  }
}

export async function getAutocompleteSuggestions(
  query: string
): Promise<AutocompletePeak[]> {
  const url = `https://api.climepeak.com/api/v1/home/autocomplete?q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Ошибка API: ${response.statusText}`);
      return [];
    }

    const data: AutocompleteResponse = await response.json();
    return data.data.peaks;
  } catch (error) {
    console.log("Не удалось получить данные для автокомплита:", error);
    return [];
  }
}

export async function getPeakById(id: string): Promise<MountainDataBig | null> {
  const url = `https://api.climepeak.com/api/v1/peaks/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const { data }: { data: MountainDataBig } = await response.json();

    if (!data) return null;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("getPeakById error: ", error.message);
    }
    return null;
  }
}

export async function getNearbyPeaks(
  id: string
): Promise<SuccessNearbyPeaksResponse | null> {
  const url = `https://api.climepeak.com/api/v1/peaks/${id}/nearby`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const apiData: SuccessNearbyPeaksResponse | ErrorResponse =
      await response.json();
    if ("error" in apiData) {
      return null;
    }
    return apiData;
  } catch (error) {
    if (error instanceof Error) {
      console.log("getNearbyPeaks error: ", error.message);
    }
    return null;
  }
}
