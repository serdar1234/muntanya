export interface MountainDataBig {
  peak: Peak;
  weather: Weather;
  nearby_peaks: Nearby_Peak[];
  recent_reviews: Recent_Review[];
  error: string;
}

export interface Recent_Review {
  id: number;
  rating: number;
  example: string;
  minimum: number;
  maximum: number;
  text: string;
  photo: string;
  user_name: string;
  peak_id: number;
  created_at: string;
  updated_at: string;
}

export interface Nearby_Peak {
  id: number;
  name: string;
  elevation: number;
  slug: string;
  lat: string;
  lng: string;
  prominence: number;
  distance_km: number;
  distance_miles: number;
}

export interface Peak {
  id: number;
  name: string;
  slug: string;
  elevation: number;
  prominence: number;
  coordinates: Coordinates;
  tags: Record<string, string>;
  is_volcano: boolean;
  wikipedia: string;
  regions: Region[];
  categories: Category[];
  peak_ranges: PeakRange[];
  parks: Park[];
}

export interface Coordinates {
  lat: string;
  lng: string;
  formatted: string;
}

export interface Region {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface PeakRange {
  id: number;
  name: string;
  slug: string;
}

export interface Park {
  id: number;
  name: string;
  slug: string;
}

export interface Weather {
  current: Current;
  forecast: Forecast[];
}

export interface Current {
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
}

export interface Forecast {
  date: string;
  high: number;
  low: number;
  condition: string;
}
