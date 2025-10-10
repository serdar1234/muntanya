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

// {style === "2" && (
//   <TileLayer
//     url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
//     attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   />
// )}
