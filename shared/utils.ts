import { ProfilerOnRenderCallback } from "react";

const onRenderCallback: ProfilerOnRenderCallback = (
  id: string,
  phase: "mount" | "update" | "nested-update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.log(`Profiler [${id}] - Phase: ${phase}`);
  console.log(`Actual render duration: ${actualDuration} ms`);
  console.log(`Base duration: ${baseDuration} ms`);
  console.log(`Start time: ${startTime} ms`);
  console.log(`Commit time: ${commitTime} ms`);
};

const convertMetersToFeet = (value: number, isImperial = false): string => {
  if (isImperial) {
    return (value * 3.28).toFixed(0) + " ft";
  }
  return value + " m";
};

const convertC2F = (value: number, isImperial = false): string => {
  if (isImperial) {
    return ((value * 9) / 5 + 32).toFixed(0) + " °F";
  } else {
    return value + " °C";
  }
};

export { onRenderCallback, convertMetersToFeet, convertC2F };
