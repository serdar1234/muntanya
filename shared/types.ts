import { LatLngTuple } from "leaflet";
import { MountainDataBig, Nearby_Peak } from "./mountainDataTypes";

export interface MountainData {
  name: string;
  coords: LatLngTuple;
}

export interface MainLayoutProps {
  initialMountain?: MountainDataBig | null;
  searchResults?: SuccessResponse | null;
}

export interface ApiPeak {
  id: number;
  name: string;
  elevation: number;
  slug: string;
  lat: string;
  lng: string;
  prominence: number;
  is_volcano: boolean;
  type: string; // type: "peak";
}

export type ApiResponse = SuccessResponse | ErrorResponse;
export interface SuccessResponse {
  data: {
    peaks: ApiPeak[];
    pagination: IPagination;
    query: string;
  };
}

export interface ErrorResponse {
  error: string;
}

export interface SuccessNearbyPeaksResponse {
  data: {
    center_peak: {
      id: number;
      name: string;
      slug: string;
      lat: string;
      lng: string;
    };
    radius_km: number;
    nearby_peaks: Nearby_Peak[];
    pagination: IPagination;
  };
}

export interface Peak {
  name: string;
  elevation: number;
  slug: string;
  country: string;
  region: string;
}

export interface AutocompleteResponse {
  data: {
    peaks: Peak[];
  };
}

export interface IPagination {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export type MarkerData = {
  coords: LatLngTuple;
  text: string;
};
