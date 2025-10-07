import { TimeOfDay } from "@/shared/types";
import style from "./WeatherForecast.module.scss";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WindPowerIcon from "@mui/icons-material/WindPower";
import NavigationIcon from "@mui/icons-material/Navigation";
import { transformWindDirection } from "./transformWeather";

export default function ForecastTable({ forecast }: { forecast: TimeOfDay }) {
  return (
    <Table size="small" className={style["forecast-table"]}>
      <TableHead>
        <TableRow>
          <TableCell>
            <DeviceThermostatIcon
              titleAccess="Temperature"
              sx={{
                verticalAlign: "middle",
              }}
            />
            <Box component="span">(°C)</Box>
          </TableCell>
          <TableCell>
            <WaterDropIcon
              titleAccess="Probability of Rain"
              sx={{
                verticalAlign: "middle",
              }}
            />
            <Box component="span">(%)</Box>
          </TableCell>
          <TableCell>
            <WindPowerIcon
              titleAccess="Wind speed in m/sec"
              sx={{
                verticalAlign: "middle",
              }}
            />
            <Box component="span">(m/s)</Box>
          </TableCell>
          <TableCell>
            <NavigationIcon
              titleAccess={`Wind direction is from the ${transformWindDirection(
                forecast.wind_direction_10m,
              )}, ${forecast.wind_direction_10m}°`}
              sx={{
                verticalAlign: "middle",
                transform: `rotate(${forecast.wind_direction_10m + 180}deg)`,
              }}
            />
            <Box component="span">(°)</Box>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={forecast.id}>
          <TableCell>{forecast.temperature_2m}</TableCell>
          <TableCell>{forecast.rain * 100}</TableCell>
          <TableCell>{forecast.wind_speed_10m}</TableCell>
          <TableCell>{forecast.wind_direction_10m}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
