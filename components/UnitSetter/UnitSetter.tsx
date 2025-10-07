"use client";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import style from "./UnitSetter.module.scss";
import Tooltip from "@mui/material/Tooltip";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import { UnitsContext } from "@/app/providers/UnitsProvider";
import { Metric } from "@/shared/types";

export default function UnitsSpeedDial() {
  const { units, dispatch } = useContext(UnitsContext);

  const actions = [units.speedUnits, units.heightUnits, units.tempUnits];

  const handleActionChange = (actionName: Metric) => {
    dispatch({
      type: "TOGGLE_UNIT",
      payload: { name: actionName },
    });
  };

  return (
    <Box sx={{ height: "4rem", transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Change Units SpeedDial"
        className={style["unit-setter__button"]}
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
