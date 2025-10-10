import {
  Forecast,
  Pressure,
  TimeOfDay,
  ChartData,
  transWeatherResult,
  AllUnits,
} from "@/shared/types";

function convertDate(dateStr: string) {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function convertForecastToArray(
  forecast: Forecast,
): Array<TimeOfDay & { id: "morning" | "day" | "evening" | "night" }> {
  return [
    { id: "morning", ...forecast.morning },
    { id: "day", ...forecast.day },
    { id: "evening", ...forecast.evening },
    { id: "night", ...forecast.night },
  ];
}

export function transformWeather(
  weather?: Record<string, Forecast>,
): transWeatherResult[] {
  const result: transWeatherResult[] = Object.entries(weather || {}).map(
    ([date, forecast]) => ({
      dayAndDate: convertDate(date),
      sunrise: forecast.sunrise,
      sunset: forecast.sunset,
      forecast: convertForecastToArray(forecast),
    }),
  );

  return result;
}

export function transformToChartData(
  data: Record<string, Pressure>,
  isFahrenheit = false,
  speedUnits: AllUnits,
): ChartData[] {
  const obj = Object.values(data);

  const convertSpeed = (speed: number, unit: AllUnits) => {
    switch (unit) {
      case "mph":
        return Math.round(speed * 2.23694);
      case "km/h":
        return Math.round(speed * 3.6);
      default:
        return speed;
    }
  };

  const chartData: ChartData[] = obj.map((item) => ({
    altitude: item.altitude_m,
    temperature: isFahrenheit
      ? Number((item.temperature * 1.8).toFixed(1)) + 32
      : item.temperature,
    windSpeed: convertSpeed(item.wind_speed, speedUnits),
    humidity: item.relative_humidity,
  }));

  return chartData.sort((a, b) => a.altitude - b.altitude);
}

export function transformToLocalDateTime(apiString: string) {
  const utcIsoString = `${apiString}:00Z`;
  const dateObject = new Date(utcIsoString);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return dateObject.toLocaleString(undefined, options);
}

export function transformWindDirection(degrees: number) {
  const directions = [
    "North",
    "North East",
    "East",
    "South East",
    "South",
    "South West",
    "West",
    "North West",
  ];
  const index = Math.round((degrees / 45) % 8);
  return directions[index];
}
