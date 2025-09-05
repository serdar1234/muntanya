import { LatLngTuple } from "leaflet";

export interface MountainData {
  name: string;
  coords: LatLngTuple;
}

export interface MainLayoutProps {
  initialMountain?: MountainData | null;
}
