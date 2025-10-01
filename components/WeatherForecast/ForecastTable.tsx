import { TimeOfDay } from "@/shared/types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { transformToChartData } from "./transformWeather";

export default function ForecastTable({ forecast }: { forecast: TimeOfDay }) {
  const qwe = transformToChartData(forecast.atmospheric);
  console.log("forecast qwe", qwe);
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ wordBreak: "break-word" }}>
            Temperature (°C)
          </TableCell>
          <TableCell>Rain (%)</TableCell>
          <TableCell>Wind Speed (m/sec)</TableCell>
          <TableCell sx={{ wordBreak: "break-word" }}>
            Wind Direction (°)
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
