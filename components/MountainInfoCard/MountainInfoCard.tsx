import { CardContent, Typography, Grid } from "@mui/material";
import { MountainDataBig } from "@/shared/mountainDataTypes";
import PeakDescription from "../PeakDescription";
import WeatherForecast from "../WeatherForecast";
import MountainHeader from "./MountainHeader";
// import WeatherConverter from "../WeatherConverter";

interface MountainInfoCardProps {
  data: MountainDataBig;
}

export default function MountainInfoCard({ data }: MountainInfoCardProps) {
  const { peak } = data;
  // const { weather } = data;

  // returns header, description, weather, forecast
  return (
    <>
      <MountainHeader peakName={peak.name} elevation={peak.elevation} />
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
