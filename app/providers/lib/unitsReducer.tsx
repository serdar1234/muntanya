import { Metric, MetricUnits, UnitsState } from "@/shared/types";
import SpeedIcon from "@mui/icons-material/Speed";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ThermostatIcon from "@mui/icons-material/Thermostat";

export type Action = {
  type: "TOGGLE_UNIT" | "SET_UNITS";
  payload: { name: Metric } | Record<MetricUnits, number>;
};

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
      const { name } = action.payload as { name: Metric };

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
    case "SET_UNITS":
      return {
        speedUnits: {
          ...state.speedUnits,
          currentValue:
            (action.payload as Record<MetricUnits, number>).speedUnits ?? 0,
        },
        heightUnits: {
          ...state.heightUnits,
          currentValue:
            (action.payload as Record<MetricUnits, number>).heightUnits ?? 0,
        },
        tempUnits: {
          ...state.tempUnits,
          currentValue:
            (action.payload as Record<MetricUnits, number>).tempUnits ?? 0,
        },
      };
    default:
      return state;
  }
}
