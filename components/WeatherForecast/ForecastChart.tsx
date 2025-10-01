import * as React from "react";
import {
  ChartContainer,
  BarPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
} from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

import { ChartData } from "@/shared/types";

const chartData: ChartData[] = [
  { altitude: 500, temperature: 15, windSpeed: 5, humidity: 75 },
  { altitude: 1800, temperature: 8, windSpeed: 12, humidity: 60 },
  { altitude: 3000, temperature: 2, windSpeed: 18, humidity: 45 },
  { altitude: 4200, temperature: -4, windSpeed: 25, humidity: 30 },
  { altitude: 5600, temperature: -12, windSpeed: 30, humidity: 20 },
  { altitude: 7200, temperature: -20, windSpeed: 35, humidity: 10 },
];

const valueLabels = {
  temperature: "Temperature (°C)",
  humidity: "Humidity (%)",
  windSpeed: "Wind (m/s)",
  altitude: "Altitude (m)",
};

const series = [
  {
    type: "bar",
    dataKey: "temperature",
    label: valueLabels.temperature,
    yAxisKey: "temperatureAxis",
    color: "#FF6384",
  },
  {
    type: "bar",
    dataKey: "humidity",
    label: valueLabels.humidity,
    yAxisKey: "temperatureAxis",
    color: "#36A2EB",
  },
  {
    type: "bar",
    dataKey: "windSpeed",
    label: valueLabels.windSpeed,
    yAxisKey: "windAxis",
    color: "#FFCE56",
  },
] as const;

export default function AltitudeWeatherChart() {
  return (
    <ChartContainer
      series={series}
      dataset={chartData}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "altitude",
          label: valueLabels.altitude,
          valueFormatter: (value) => `${value} м`,
        },
      ]}
      yAxis={[
        {
          id: "temperatureAxis",
          scaleType: "linear",
          label: "Температура (°C) / Влажность (%)",
        },

        {
          id: "windAxis",
          scaleType: "linear",
          label: valueLabels.windSpeed,
          position: "right",
        },
      ]}
      height={350}
      sx={{
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translateX(-20px)",
        },
        [`.${axisClasses.right} .${axisClasses.label}`]: {
          transform: "translateX(20px)",
        },
      }}
    >
      {/* Компоненты для визуализации */}
      <BarPlot />
      <LinePlot />

      {/* Компоненты для подписей и интерактивности */}
      <ChartsXAxis />
      {/* Y-оси привязываем по ID */}
      <ChartsYAxis axisId="temperatureAxis" />
      <ChartsYAxis axisId="windAxis" />

      <ChartsTooltip trigger="axis" />
    </ChartContainer>
  );
}
