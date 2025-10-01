import { TimeOfDay } from "@/shared/types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export default function ForecastTable({ f }: { f: TimeOfDay }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Temperature (°C)</TableCell>
          <TableCell>Rain (%)</TableCell>
          <TableCell>Wind Speed (m/sec)</TableCell>
          <TableCell>Wind Direction (°)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={f.id}>
          <TableCell>{f.temperature_2m}</TableCell>
          <TableCell>{f.rain * 100}</TableCell>
          <TableCell>{f.wind_speed_10m}</TableCell>
          <TableCell>{f.wind_direction_10m}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
