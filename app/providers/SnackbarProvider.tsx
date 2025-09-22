"use client";

import { Snackbar } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SnackbarProvider() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("error") === "not-found") {
      setOpen(true);
    }
  }, [searchParams]);
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "4rem" }}
        message="Could not find this mountain"
      />
    </>
  );
}
