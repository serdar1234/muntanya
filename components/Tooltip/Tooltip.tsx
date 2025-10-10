import { MarkerData } from "@/shared/types";
import { Box, Typography, Stack } from "@mui/material";

interface TooltipContentProps {
  marker: MarkerData;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ marker }) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="subtitle1" sx={{ textAlign: "center" }} mb={0.5}>
        {marker.name}
      </Typography>
      <Box component="span">
        Coordinates:
        <Stack spacing={0} mt={0.25}>
          <Typography variant="caption">{marker.coords[0]}</Typography>
          <Typography variant="caption">{marker.coords[1]}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default TooltipContent;
