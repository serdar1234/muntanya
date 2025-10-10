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
import Brightness7Icon from "@mui/icons-material/Brightness7";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
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
  const [isSunrise, setIsSunrise] = useState<boolean>(true);

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

  const handleChipClick = () => setIsSunrise((prev) => !prev);
  const transformedWeather = transformWeather(weather?.forecast);

  return (
    <>
      {weather &&
        transformedWeather.map((day: transWeatherResult) => (
          <Accordion
            key={day.dayAndDate}
            expanded={expanded === day.dayAndDate}
            onChange={handleChange(day.dayAndDate)}
            disableGutters
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{day.dayAndDate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={styles.chipbox}>
                <Chip
                  label={
                    isSunrise
                      ? `Sunrise ${transformToLocalDateTime(day.sunrise)}`
                      : transformToLocalDateTime(day.sunrise)
                  }
                  color={isSunrise ? "error" : "warning"}
                  onClick={handleChipClick}
                  icon={<Brightness7Icon />}
                  variant="outlined"
                />
                <Chip
                  label={
                    isSunrise
                      ? transformToLocalDateTime(day.sunset)
                      : `Sunset ${transformToLocalDateTime(day.sunset)}`
                  }
                  color={isSunrise ? "warning" : "error"}
                  onClick={handleChipClick}
                  icon={<WbTwilightIcon />}
                  variant="outlined"
                />
                <Typography variant="caption" component={"div"}>
                  All times are displayed in your device&apos;s local timezone
                </Typography>
              </Box>
              {day.forecast.map((forecast) => (
                <Accordion
                  disableGutters
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
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
}
