"use client";

import { LinePlot, ChartsXAxis, ChartsTooltip, LineChart } from "@mui/x-charts";
import style from "./WeatherForecast.module.scss";

import { ChartData, Pressure } from "@/shared/types";
import { transformToChartData } from "./transformWeather";
import { useContext } from "react";
import { UnitsContext } from "@/app/providers/UnitsProvider";
import { convertMetersToFeet } from "@/shared/utils";

const valueLabels = {
  temperature: "Temperature (°C)",
  humidity: "Humidity (%)",
  windSpeed: "Wind speed (m/s)",
  altitude: "Altitude",
};

const series = [
  {
    dataKey: "temperature",
    label: valueLabels.temperature,
    area: true,
    stack: "total",
    showMark: false,
    color: "#FF6384",
  },
  {
    dataKey: "windSpeed",
    label: valueLabels.windSpeed,
    area: true,
    stack: "none",
    showMark: false,
    color: "#FFCE56",
  },
  {
    dataKey: "humidity",
    label: valueLabels.humidity,
    area: true,
    stack: "total",
    showMark: false,
    color: "#36A2EB",
  },
] as const;

export default function ForecastChart({
  atmospheric,
}: {
  atmospheric: Record<string, Pressure>;
}) {
  const { units } = useContext(UnitsContext);
  const chartData: ChartData[] = transformToChartData(atmospheric);
  return (
    <LineChart
      series={series}
      dataset={chartData}
      xAxis={[
        {
          scaleType: "point",
          dataKey: "altitude",
          label: `Altitude in ${units.heightUnits.currentValue === 0 ? "meters" : "feet"}`,
          valueFormatter: (value) => {
            if (units.heightUnits.currentValue === 1) {
              const roundValue = Math.floor((value * 3.28) / 100) * 100;
              return roundValue.toString();
            } else {
              return value.toString();
            }
          },
        },
      ]}
      height={350}
      className={style["forecast-line-chart"]}
    >
      <LinePlot />

      <ChartsXAxis />

      <ChartsTooltip trigger="axis" />
    </LineChart>
  );
}
