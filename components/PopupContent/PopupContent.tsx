import { MarkerData } from "@/shared/types";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function PopupContent({ marker }: { marker: MarkerData }) {
  const { name, slug, elevation } = marker;
  const feet = Math.round(elevation * 3.28084).toLocaleString();
  const meters = elevation.toLocaleString();

  return (
    <Box sx={{ p: 0, minWidth: 200 }}>
      <Typography variant="h6" component="div" gutterBottom>
        <Link
          href={`/mountains/${slug}`}
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          {name || "Peak"}
        </Link>
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Elevation: {meters} m / {feet} ft
      </Typography>
    </Box>
  );
}
