import { Forecast } from "@/shared/types";

function convertDate(dateStr: string) {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function convertForecastToArray(forecast: Forecast) {
  return [
    { id: "morning", ...forecast.morning },
    { id: "day", ...forecast.day },
    { id: "evening", ...forecast.evening },
    { id: "night", ...forecast.night },
  ];
}

export function transformWeather(weather?: Record<string, Forecast>) {
  const result = Object.entries(weather || {}).map(([date, forecast]) => ({
    dayAndDate: convertDate(date),
    sunrise: forecast.sunrise,
    sunset: forecast.sunset,
    forecast: convertForecastToArray(forecast),
  }));

  console.log("weather data 123", result);
  return result;
}
