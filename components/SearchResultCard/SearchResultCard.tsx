"use client";

import { ApiPeak } from "@/shared/types";
import Link from "next/link";
import {
  Collapse,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { UnitsContext } from "@/app/providers/UnitsProvider";
import { convertMetersToFeet } from "@/shared/utils";

export default function SearchResultCard({ peak }: { peak: ApiPeak }) {
  const [open, setOpen] = useState(false);
  const { units } = useContext(UnitsContext);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton
        dense
        divider
        sx={{ textDecoration: "none", cursor: "pointer" }}
        onClick={handleClick}
      >
        <ListItemText primary={peak.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ p: "4px 32px" }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ textDecoration: "none" }}
              >
                <Button
                  component={Link}
                  href={`/mountains/${peak.slug}`}
                  variant="contained"
                >
                  {peak.name}
                </Button>
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Elevation:{" "}
                {convertMetersToFeet(
                  peak.elevation,
                  units.heightUnits.currentValue === 1,
                )}
              </Typography>
              <Typography color="text.secondary">
                Prominence:{" "}
                {convertMetersToFeet(
                  peak.prominence,
                  units.heightUnits.currentValue === 1,
                )}
              </Typography>
              <Typography color="text.secondary">
                Latitude: {peak.lat}
              </Typography>
              <Typography color="text.secondary">
                Longitude: {peak.lng}
              </Typography>
              <Typography color="text.secondary">
                This peak {peak.is_volcano ? "is" : "is not"} a volcano
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Collapse>
    </>
  );
}
