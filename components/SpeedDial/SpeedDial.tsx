"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedIcon from "@mui/icons-material/Speed";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import style from "./SpeedDial.module.scss";
import Tooltip from "@mui/material/Tooltip";
const actions = [
  { icon: <SpeedIcon />, name: "Speed" },
  { icon: <LandscapeIcon />, name: "Height" },
  { icon: <ThermostatIcon />, name: "Temperature" },
];

export default function UnitsSpeedDial() {
  return (
    <Box sx={{ height: "4rem", transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Change Units SpeedDial"
        className={style["speed-dial__button"]}
        icon={
          <SpeedDialIcon
            icon={
              <Tooltip title="Change Units">
                <SettingsInputSvideoIcon />
              </Tooltip>
            }
          />
        }
        direction="right"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => console.log(action.name)}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
