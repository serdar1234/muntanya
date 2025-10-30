import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      <CircularProgress />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Loading ...
      </Typography>
    </Box>
  );
}
