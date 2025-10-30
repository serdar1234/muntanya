"use client";

import { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error in Search:", error);
  }, [error]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      <Typography variant="h5" color="error" gutterBottom>
        Error
      </Typography>
      <Typography variant="body1" gutterBottom>
        {error.message || "Something went wrong"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reset()}
        sx={{ mt: 3 }}
      >
        Try again
      </Button>
    </Box>
  );
}
