"use client";

import React, {
  ActionDispatch,
  createContext,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { Action, initialState, unitsReducer } from "./lib/unitsReducer";
import { MetricUnits, UnitsState } from "@/shared/types";

interface UnitsContextType {
  units: UnitsState;
  dispatch: ActionDispatch<[action: Action]>;
}

export const UnitsContext = createContext<UnitsContextType>({
  units: initialState,
  dispatch: () => {},
});

export const UnitsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [units, dispatch] = useReducer(unitsReducer, initialState);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedStyle = localStorage.getItem("units");
    if (savedStyle) {
      const unitsParsed: Record<MetricUnits, number> = JSON.parse(savedStyle);
      dispatch({
        type: "SET_UNITS",
        payload: unitsParsed,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const data = {
      speedUnits: units.speedUnits.currentValue,
      heightUnits: units.heightUnits.currentValue,
      tempUnits: units.tempUnits.currentValue,
    };
    const dataString = JSON.stringify(data);
    localStorage.setItem("units", dataString);
  }, [units]);

  return <UnitsContext value={{ units, dispatch }}>{children}</UnitsContext>;
};
