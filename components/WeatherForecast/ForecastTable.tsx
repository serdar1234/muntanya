import { TimeOfDay } from "@/shared/types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export default function ForecastTable({ forecast }: { forecast: TimeOfDay }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            <DeviceThermostatIcon
              titleAccess="Temperature"
              sx={{
                display: { xs: "inline-flex", sm: "none" },
                verticalAlign: "middle",
                mr: 0.5,
              }}
            />
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Temperature
            </Box>
            <Box component="span" sx={{ ml: 0.5 }}>
              (°C)
            </Box>
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
