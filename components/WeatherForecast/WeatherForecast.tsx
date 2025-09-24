"use client";

import { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import weatherData2 from "./data";
const weatherData = weatherData2;

export default function WeatherForecast({ data = weatherData }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : null);
    };

  return (
    <Box sx={{ padding: "1rem" }}>
      {data.map((day) => (
        <Accordion
          key={day.date}
          expanded={expanded === day.date}
          onChange={handleChange(day.date)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Day {day.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {day.times.map((timeSlot, timeIndex) => (
              <Accordion key={timeIndex} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{timeSlot.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Altitude table */}
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Altitude</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Wind Speed</TableCell>
                        <TableCell>Humidity</TableCell>
                        <TableCell>Cloud Cover</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timeSlot.altitudes.map((alt, altIndex) => (
                        <TableRow key={altIndex}>
                          <TableCell>{alt.height} m</TableCell>
                          <TableCell>{alt.temperature}°C</TableCell>
                          <TableCell>{alt.windSpeed} m/s</TableCell>
                          <TableCell>{alt.humidity}%</TableCell>
                          <TableCell>{alt.cloudCoverage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
