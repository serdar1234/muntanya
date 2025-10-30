import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      <Typography variant="h5" gutterBottom>
        Nothing found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Try searching for something else
      </Typography>
      <Button
        component={Link}
        href="/"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Home
      </Button>
    </Box>
  );
}
