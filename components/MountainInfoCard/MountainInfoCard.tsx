import { Box, CardContent, CardHeader, Typography, Grid } from "@mui/material";
import style from "./MountainInfoCard.module.scss";

import { MountainDataBig } from "@/shared/mountainDataTypes";

interface MountainInfoCardProps {
  data: MountainDataBig;
}

export default function MountainInfoCard({ data }: MountainInfoCardProps) {
  console.log(data);
  const { peak, weather } = data;

  return (
    <Box component={"section"} className={style["card-container"]}>
      {/* sx={{ maxWidth: 600, margin: "auto", mt: 4 }}> */}
      <CardHeader
        title={peak.name}
        subheader={`Elevation: ${peak.elevation} m`}
      />
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {peak.tags.description}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Weather now
              </Typography>
              <Typography>
                Temperature: {weather.current.temperature}°C
              </Typography>
              <Typography>
                Current condition: {weather.current.condition}
              </Typography>
              <Typography>Wind: {weather.current.wind_speed} km/h</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Box>
  );
}

// import {
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// <Grid size={{ xs: 12, sm: 6 }}>
//   <Box>
//     <Typography variant="h6" gutterBottom>
//       Nearby Peaks
//     </Typography>
//     <List dense>
//       {nearby_peaks.map((nearbyPeak, index) => (
//         <ListItem key={index}>
//           <ListItemText
//             primary={nearbyPeak.name}
//             secondary={`${nearbyPeak.distance_km.toFixed(2)} км`}
//           />
//         </ListItem>
//       ))}
//     </List>
//   </Box>
// </Grid>
