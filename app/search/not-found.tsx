"use client";

import MainLayout from "@/components/MainLayout";
import { Snackbar } from "@mui/material";
import { useState } from "react";

export default function NotFound() {
  const [open, setOpen] = useState(true);
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
      <MainLayout />
    </>
  );
}
