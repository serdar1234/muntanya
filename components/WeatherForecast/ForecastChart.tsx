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

import { ChartData, Pressure } from "@/shared/types";
import { transformToChartData } from "./transformWeather";

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

export default function ForecastChart({
  atmospheric,
}: {
  atmospheric: Record<string, Pressure>;
}) {
  const chartData: ChartData[] = transformToChartData(atmospheric);
  return (
    <ChartContainer
      series={series}
      dataset={chartData}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "altitude",
          label: valueLabels.altitude,
          valueFormatter: (value) => `${value} m`,
        },
      ]}
      // yAxis={[
      //   {
      //     id: "temperatureAxis",
      //     scaleType: "linear",
      //     label: "Температура (°C) / Влажность (%)",
      //   },

      //   {
      //     id: "windAxis",
      //     scaleType: "linear",
      //     label: valueLabels.windSpeed,
      //     position: "right",
      //   },
      // ]}
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
