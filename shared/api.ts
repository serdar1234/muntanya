import { LatLngTuple } from "leaflet";
import {
  ApiPeak,
  ApiResponse,
  MountainData,
  AutocompleteResponse,
  Peak,
  SuccessResponse,
} from "./types";
import { MountainDataBig } from "./mountainDataTypes";

export async function getSearchSuggestions(
  query: string
): Promise<SuccessResponse | null> {
  const url = `https://api.climepeak.com/api/v1/home/search?q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error in getSearchSuggestions: ${response.statusText}`);
      return null;
    }

    const apiData: ApiResponse = await response.json();

    if ("error" in apiData) {
      return null;
    }
    return apiData;
  } catch (error) {
    console.error("Could not find data about the mountain:", error);
    return null;
  }
}

export async function getSearchResults(
  query: string,
  page?: number | undefined
): Promise<SuccessResponse | null> {
  if (page) {
    query += `&page=${page}`;
  }
  const url = `https://api.climepeak.com/api/v1/home/search?q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error in getSearchResults: ${response.statusText}`);
      return null;
    }

    const apiData: ApiResponse = await response.json();

    if ("error" in apiData) {
      return null;
    }

    return apiData;
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
      const res = getSearchResults(url);
      if (res === null) return null;
      return res as unknown as MountainDataBig;
    }

    const { data: mountain } = await response.json();

    if (!mountain) return null;

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
