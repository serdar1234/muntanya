import { LatLngLiteral, LatLngTuple } from "leaflet";
import { MountainDataBig, Nearby_Peak, Park } from "./mountainDataTypes";

export interface BasePeak {
  name: string;
  slug: string;
  elevation: number;
}

export interface MountainData {
  name: string;
  coords: LatLngTuple;
}

export interface MainLayoutProps {
  initialMountain?: MountainDataBig | null;
  searchResults?: SuccessResponse | null;
}

export interface ApiPeak extends BasePeak {
  id: string;
  lat: string;
  lng: string;
  prominence: number;
  is_volcano: boolean;
  country: string;
  region: string;
  type: string; // type: "peak";
}

export type ApiResponse = SuccessResponse | ErrorResponse;
export interface SuccessResponse {
  data: {
    peaks: ApiPeak[];
    pagination: IPagination;
    query: string;
    filters: Filters;
    sort_by: string;
    aggregations: object;
  };
}

export interface SuccessPeaksInBoundsResponse {
  data: {
    peaks: ApiPeak[];
    pagination: IPagination;
    bounds: Bounds;
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

export interface WeatherResponse {
  status: "success" | "error";
  message?: string;
  data: Weather;
}

export interface Weather {
  location: WeatherLocation;
  timezone: "GMT" | string;
  updated_at: string;
  forecast: Record<string, Forecast>;
}

// export type ForecastKeys =
//   | "sunrise"
//   | "sunset"
// | "morning"
// | "day"
// | "evening"
// | "night";

export interface transWeatherResult {
  dayAndDate: string;
  sunrise: string;
  sunset: string;
  forecast: TimeOfDay[];
}

export interface Forecast {
  sunrise: string;
  sunset: string;
  morning: TimeOfDay;
  day: TimeOfDay;
  evening: TimeOfDay;
  night: TimeOfDay;
}

export interface TimeOfDay {
  id?: "morning" | "day" | "evening" | "night";
  time: string;
  temperature_2m: number;
  rain: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  atmospheric: Record<string, Pressure>;
}

export interface ChartData {
  altitude: number;
  temperature: number;
  windSpeed: number;
  humidity: number;
  [key: string]: number | string | Date | null | undefined;
}

export interface Pressure {
  temperature: number;
  relative_humidity: number;
  cloud_cover: number;
  wind_speed: number;
  wind_direction: number;
  altitude_m: number;
  altitude_display: string;
}

export interface Filters {
  min_elevation: string;
  max_elevation: string;
  region: string;
  park: string;
  category: string;
  is_volcano: string;
  type: string;
  peak_range: string;
}

export interface AutocompletePeak extends BasePeak {
  country: string;
  region: string;
}

export interface AutocompleteResponse {
  data: {
    peaks: AutocompletePeak[];
  };
}

export interface IPagination {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export interface MarkerData extends BasePeak {
  coords: LatLngTuple;
}

export interface DefaultPosition {
  nearby_peaks: Omit<
    Nearby_Peak,
    "distance_km" | "distance_miles" | "prominence"
  >[];
  top_peaks: Omit<
    Nearby_Peak,
    "distance_km" | "distance_miles" | "prominence"
  >[];
  recent_reviews: string[];
  parks: Park[];
  user_location: UserLocation;
}

export interface UserLocation {
  country: Country;
  region: Region;
  city: City;
  location: Location;
  timezone: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface Region {
  name: string;
  iso_code: string;
}

export interface City {
  name: string;
  postal_code: string;
}

export interface Location {
  lat: number;
  lng: number;
  accuracy_radius: number;
}

export interface WeatherLocation {
  latitude: number;
  longitude: number;
}

export type Bounds = Record<string, LatLngLiteral>;
