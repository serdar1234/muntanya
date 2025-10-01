import {
  Forecast,
  Pressure,
  TimeOfDay,
  ChartData,
  transWeatherResult,
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
): ChartData[] {
  const obj = Object.values(data);
  const chartData: ChartData[] = obj.map((item) => ({
    altitude: item.altitude_m,
    temperature: item.temperature,
    windSpeed: item.wind_speed,
    humidity: item.relative_humidity,
  }));

  return chartData.sort((a, b) => a.altitude - b.altitude);
}
