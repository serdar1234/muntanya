import { LatLngTuple } from "leaflet";
import {
  ApiResponse,
  AutocompletePeak,
  AutocompleteResponse,
  ErrorResponse,
  SuccessNearbyPeaksResponse,
  SuccessResponse,
} from "./types";
import { MountainDataBig } from "./mountainDataTypes";

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

export async function getDefaultPosition(): Promise<LatLngTuple> {
  try {
    const response = await fetch(
      "https://api.climepeak.com/api/v1/home/location"
    );
    if (!response.ok) {
      console.log(`Error receiving data: ${response.statusText}`);
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
      console.log("Incorrect data format:", responseData);
      return [46.8523, -121.7605];
    }
  } catch (error) {
    console.log("Could not find data about the mountain:", error);
    return [46.8523, -121.7605];
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

    const { data: mountain } = await response.json();

    if (!mountain) return null;

    return mountain;
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
