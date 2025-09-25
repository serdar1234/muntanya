"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WindPowerIcon from "@mui/icons-material/WindPower";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

type Props = {
  initialTempC: number;
  initialWindKph: number;
  currentCondition: string;
};

type TempUnit = "metric" | "imperial";

const WeatherConverter = ({
  initialTempC,
  initialWindKph,
  currentCondition,
}: Props) => {
  const [unit, setUnit] = useState<TempUnit>("metric");
  const [temp, setTemp] = useState<number>(initialTempC);
  const [wind, setWind] = useState<number>(initialWindKph);

  const handleConvert = () => {
    if (unit === "metric") {
      const convertedTemp = (temp * 9) / 5 + 32;
      const convertedWind = wind / 1.609;

      setTemp(convertedTemp);
      setWind(convertedWind);
      setUnit("imperial");
    } else {
      const convertedTemp = ((temp - 32) * 5) / 9;
      const convertedWind = wind * 1.609;

      setTemp(convertedTemp);
      setWind(convertedWind);
      setUnit("metric");
    }
  };

  return (
    <Box
      className="weather-card"
      sx={{
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Weather now
      </Typography>

      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">
            Temperature: {temp.toFixed(1)}° {unit === "metric" ? "C" : "F"}
          </Typography>
          <IconButton onClick={handleConvert} aria-label="convert temperature">
            <ThermostatIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Current condition: {currentCondition}</Typography>
          <IconButton onClick={handleConvert} aria-label="current condition">
            <WbSunnyOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">
            Wind: {wind.toFixed(1)} {unit === "metric" ? "km/h" : "mi/h"}
          </Typography>
          <IconButton onClick={handleConvert} aria-label="convert wind speed">
            <WindPowerIcon />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default WeatherConverter;
