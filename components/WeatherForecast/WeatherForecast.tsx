"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@mui/material";
import SunnySnowingIcon from "@mui/icons-material/SunnySnowing";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getWeather } from "@/shared/api";
import { transWeatherResult, Weather } from "@/shared/types";
import { transformWeather } from "./transformWeather";
import styles from "./WeatherForecast.module.scss";
import ForecastTable from "./ForecastTable";
import ForecastChart from "./ForecastChart";

export default function WeatherForecast({ peakID = 497159 }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : null);
    };

  useEffect(() => {
    async function fetchData() {
      const data: Weather | null = await getWeather(peakID);
      if (data) {
        setWeather(data);
      }
    }

    fetchData();
  }, [peakID]);

  const transformedWeather = transformWeather(weather?.forecast);

  return (
    <Box sx={{ padding: "1rem" }}>
      {weather &&
        transformedWeather.map((day: transWeatherResult) => (
          <Accordion
            key={day.dayAndDate}
            expanded={expanded === day.dayAndDate}
            onChange={handleChange(day.dayAndDate)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{day.dayAndDate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* times of day start */}
              <Box className={styles.chipbox}>
                <Chip
                  label={"Sunrise: " + day.sunrise}
                  color="error"
                  icon={<SunnySnowingIcon />}
                  variant="outlined"
                />
                <Chip
                  label={"Sunset: " + day.sunset}
                  color="warning"
                  icon={<SunnySnowingIcon />}
                  variant="outlined"
                />
              </Box>
              {day.forecast.map((forecast) => (
                <Accordion key={forecast.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{forecast.id}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ForecastTable forecast={forecast} />
                  </AccordionDetails>
                </Accordion>
              ))}
              <ForecastChart />
              {/* times of day end */}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
