import { MarkerData } from "@/shared/types";
import { Box, Typography, Stack } from "@mui/material";

interface TooltipContentProps {
  marker: MarkerData;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ marker }) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="h6" fontWeight="bold" mb={0.5}>
        {marker.name}
      </Typography>

      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Coordinates:
        </Box>{" "}
        {marker.coords[0]}, {marker.coords[1]}
      </Typography>
    </Stack>
  );
};

export default TooltipContent;
