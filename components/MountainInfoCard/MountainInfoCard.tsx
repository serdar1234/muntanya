import { Box, CardContent, CardHeader, Typography, Grid } from "@mui/material";
import style from "./MountainInfoCard.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { MountainDataBig } from "@/shared/mountainDataTypes";
import PeakDescription from "../PeakDescription";

interface MountainInfoCardProps {
  data: MountainDataBig;
}

export default function MountainInfoCard({ data }: MountainInfoCardProps) {
  console.log(data);
  const { peak, weather } = data;

  return (
    <Box component={"section"} className={style["card-container"]}>
      <CardHeader
        title={peak.name}
        subheader={`Elevation: ${peak.elevation} m`}
      />
      <CardContent>
        {peak.tags.description && (
          <Typography component="div" variant="body1" sx={{ mb: 2 }}>
            {<PeakDescription text={peak.tags.description} />}
          </Typography>
        )}

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
