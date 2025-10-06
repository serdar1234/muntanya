import { UnitsState } from "@/shared/types";
import SpeedIcon from "@mui/icons-material/Speed";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ThermostatIcon from "@mui/icons-material/Thermostat";

type Action = { type: "TOGGLE_UNIT"; payload: { name: string } };

export const initialState: UnitsState = {
  speedUnits: {
    icon: <SpeedIcon />,
    name: "Speed",
    value: ["m/s", "mph", "km/h"],
    currentValue: 0,
  },
  heightUnits: {
    icon: <LandscapeIcon />,
    name: "Height",
    value: ["m", "ft"],
    currentValue: 0,
  },
  tempUnits: {
    icon: <ThermostatIcon />,
    name: "Temperature",
    value: ["C", "F"],
    currentValue: 0,
  },
};

export function unitsReducer(state: UnitsState, action: Action): UnitsState {
  switch (action.type) {
    case "TOGGLE_UNIT": {
      const { name } = action.payload;

      if (name === "Speed") {
        const current = state.speedUnits.currentValue;
        const total = state.speedUnits.value.length;
        return {
          ...state,
          speedUnits: {
            ...state.speedUnits,
            currentValue: (current + 1) % total,
          },
        };
      } else if (name === "Height") {
        const current = state.heightUnits.currentValue;
        const total = state.heightUnits.value.length;
        return {
          ...state,
          heightUnits: {
            ...state.heightUnits,
            currentValue: (current + 1) % total,
          },
        };
      } else if (name === "Temperature") {
        const current = state.tempUnits.currentValue;
        const total = state.tempUnits.value.length;
        return {
          ...state,
          tempUnits: {
            ...state.tempUnits,
            currentValue: (current + 1) % total,
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
}
