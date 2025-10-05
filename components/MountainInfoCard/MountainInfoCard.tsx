import { CardContent, CardHeader, Typography, Grid } from "@mui/material";
import { MountainDataBig } from "@/shared/mountainDataTypes";
import PeakDescription from "../PeakDescription";
import WeatherConverter from "../WeatherConverter";
import WeatherForecast from "../WeatherForecast";

interface MountainInfoCardProps {
  data: MountainDataBig;
}

export default function MountainInfoCard({ data }: MountainInfoCardProps) {
  const { peak, weather } = data;

  // returns header, description, weather, forecast
  return (
    <>
      <CardHeader
        title={peak.name}
        subheader={`Elevation: ${peak.elevation} m`}
        slotProps={{ title: { component: "h1", sx: { fontSize: "2rem" } } }}
      />
      <CardContent>
        {peak.tags.description && (
          <Typography component="div" variant="body1" sx={{ mb: 2 }}>
            {<PeakDescription text={peak.tags.description} />}
          </Typography>
        )}

        {/* <Grid size="grow">
          <WeatherConverter
            initialTempC={weather.current.temperature}
            initialWindKph={weather.current.wind_speed}
            currentCondition={weather.current.condition}
          />
        </Grid> */}
        <Grid size="grow" sx={{ mt: 2 }}>
          <WeatherForecast peakID={peak.id} />
        </Grid>
      </CardContent>
    </>
  );
}
