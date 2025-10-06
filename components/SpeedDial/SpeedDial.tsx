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
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface Actions {
  icon: React.JSX.Element;
  name: string;
  value: string[];
  currentValue: number;
}

export default function UnitsSpeedDial() {
  const [speedUnits, setSpeedUnits] = React.useState<Actions>({
    icon: <SpeedIcon />,
    name: "Speed",
    value: ["m/s", "mph", "km/h"],
    currentValue: 0,
  });
  const [heightUnits, setHeightUnits] = React.useState<Actions>({
    icon: <LandscapeIcon />,
    name: "Height",
    value: ["m", "ft"],
    currentValue: 0,
  });
  const [tempUnits, setTempUnits] = React.useState<Actions>({
    icon: <ThermostatIcon />,
    name: "Temperature",
    value: ["C", "F"],
    currentValue: 0,
  });

  const actions = [speedUnits, heightUnits, tempUnits];

  const handleActionChange = (actionName: string) => {
    if (actionName === "Speed") {
      setSpeedUnits({
        ...speedUnits,
        currentValue: (speedUnits.currentValue + 1) % 3,
      });
    } else if (actionName === "Height") {
      setHeightUnits({
        ...heightUnits,
        currentValue: (heightUnits.currentValue + 1) % 2,
      });
    } else if (actionName === "Temperature") {
      setTempUnits({
        ...tempUnits,
        currentValue: (tempUnits.currentValue + 1) % 2,
      });
    }
  };

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
            onClick={() => handleActionChange(action.name)}
            slotProps={{
              tooltip: {
                title: (
                  <>
                    <ToggleButtonGroup
                      size="small"
                      value={action.value[action.currentValue]}
                      exclusive
                      onChange={() => {}}
                      aria-label={action.name}
                    >
                      {action.value.map((value) => (
                        <ToggleButton
                          color="warning"
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            borderColor: "white",
                            cursor: "default",
                          }}
                          key={value}
                          value={value}
                        >
                          {value}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </>
                ),
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
