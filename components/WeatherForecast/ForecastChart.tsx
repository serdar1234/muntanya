"use client";

import { LinePlot, ChartsXAxis, ChartsTooltip, LineChart } from "@mui/x-charts";
import style from "./WeatherForecast.module.scss";

import { ChartData, Pressure } from "@/shared/types";
import { transformToChartData } from "./transformWeather";
import { useContext } from "react";
import { UnitsContext } from "@/app/providers/UnitsProvider";

const valueLabels = {
  temperature: "Temperature",
  humidity: "Humidity (%)",
  windSpeed: "Wind speed",
  altitude: "Altitude",
};

export default function ForecastChart({
  atmospheric,
}: {
  atmospheric: Record<string, Pressure>;
}) {
  const { units } = useContext(UnitsContext);

  const series = [
    {
      dataKey: "temperature",
      label:
        valueLabels.temperature +
        " (°" +
        units.tempUnits.value[units.tempUnits.currentValue] +
        ")",
      area: true,
      stack: "total",
      showMark: false,
      color: "#FF6384",
    },
    {
      dataKey: "windSpeed",
      label:
        valueLabels.windSpeed +
        " (" +
        units.speedUnits.value[units.speedUnits.currentValue] +
        ")",
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

  const chartData: ChartData[] = transformToChartData(
    atmospheric,
    units.tempUnits.currentValue === 1,
    units.speedUnits.value[units.speedUnits.currentValue],
  );
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
      height={300}
      className={style["forecast-line-chart"]}
    >
      <LinePlot />

      <ChartsXAxis />

      <ChartsTooltip trigger="axis" />
    </LineChart>
  );
}
