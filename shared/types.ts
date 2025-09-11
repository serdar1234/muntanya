import { LatLngTuple } from "leaflet";
import { MountainDataBig } from "./mountainDataTypes";

export interface MountainData {
  name: string;
  coords: LatLngTuple;
}

export interface MainLayoutProps {
  initialMountain?: MountainDataBig | null;
  searchResults?: ApiPeak[];
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
}

export interface ApiResponse {
  data: {
    peaks: ApiPeak[];
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

// export interface MountainDataBig {
//   peak: {
//     id: number;
//     name: string;
//     slug: string;
//     elevation: number;
//     prominence: number;
//     coordinates: {
//       lat: string;
//       lng: string;
//       formatted: string;
//     };
//     tags: Record<string, string>;
//     isVolcano: boolean;
//     wikipedia: string;
//     peak_ranges: { name: string }[];
//     parks: [];
//   };
//   weather: {
//     current: {
//       temperature: number;
//       condition: string;
//       wind_speed: number;
//     };
//   };
//   nearby_peaks: {
//     name: string;
//     distance_km: number;
//   }[];
//   error?: string;
// }
