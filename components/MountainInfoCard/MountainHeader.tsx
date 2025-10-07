"use client";

import { UnitsContext } from "@/app/providers/UnitsProvider";
import { convertMetersToFeet } from "@/shared/utils";
import { CardHeader } from "@mui/material";
import { useContext } from "react";

interface Props {
  peakName: string;
  elevation: number;
}

export default function MountainHeader({ peakName, elevation }: Props) {
  const { units } = useContext(UnitsContext);

  return (
    <CardHeader
      title={peakName}
      subheader={`Elevation: ${convertMetersToFeet(elevation, units.heightUnits.currentValue === 1)}`}
      slotProps={{ title: { component: "h1", sx: { fontSize: "2rem" } } }}
    />
  );
}
