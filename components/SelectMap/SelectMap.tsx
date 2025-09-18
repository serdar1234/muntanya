"use client";

import { useContext } from "react";
import { MapContext } from "@/app/providers/MapProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectMap() {
  const context = useContext(MapContext);
  if (!context) throw new Error("SelectMap must be used within a MapProvider");

  const { style, setStyle } = context;

  const handleChange = (event: SelectChangeEvent<string>) => {
    const mapValue = event.target.value;
    setStyle(mapValue);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="map-select-label">Select map</InputLabel>
      <Select
        labelId="map-select-label"
        id="map-select"
        value={style}
        label="Select map"
        onChange={handleChange}
      >
        <MenuItem value={"1"}>OpenStreetMap</MenuItem>
        <MenuItem value={"2"}>OpenTopoMap</MenuItem>
      </Select>
    </FormControl>
  );
}
