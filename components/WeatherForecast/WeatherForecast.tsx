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
import { transformToLocalDateTime, transformWeather } from "./transformWeather";
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
  console.log(transformedWeather);

  return (
    <>
      {weather &&
        transformedWeather.map((day: transWeatherResult) => (
          <Accordion
            key={day.dayAndDate}
            expanded={expanded === day.dayAndDate}
            onChange={handleChange(day.dayAndDate)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{day.dayAndDate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* times of day start */}
              <Box className={styles.chipbox}>
                <Chip
                  label={"Sunrise at " + transformToLocalDateTime(day.sunrise)}
                  color="error"
                  icon={<SunnySnowingIcon />}
                  variant="outlined"
                />
                <Chip
                  label={"Sunset at " + transformToLocalDateTime(day.sunset)}
                  color="warning"
                  icon={<SunnySnowingIcon />}
                  variant="outlined"
                />
                <Typography variant="caption">
                  All times are displayed in your device&apos;s local timezone
                </Typography>
              </Box>
              {day.forecast.map((forecast) => (
                <Accordion
                  key={forecast.id}
                  slotProps={{ transition: { unmountOnExit: true } }} // for unmounting accrodion's content
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="overline" color="text.secondary">
                      {forecast.id + " forecast"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ForecastTable forecast={forecast} />
                    <ForecastChart atmospheric={forecast.atmospheric} />
                  </AccordionDetails>
                </Accordion>
              ))}
              {/* times of day end */}
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
}
