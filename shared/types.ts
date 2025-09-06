import { LatLngTuple } from "leaflet";

export interface MountainData {
  name: string;
  coords: LatLngTuple;
}

export interface MainLayoutProps {
  initialMountain?: MountainData | null;
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
