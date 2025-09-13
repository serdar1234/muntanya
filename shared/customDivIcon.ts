import { divIcon } from "leaflet";

export default function customDivIcon(name: string) {
  return divIcon({
    iconSize: [60, 60],
    html: `
  <div style="text-align: center;">
    <img src="/leaflet/marker-icon.png" style="width: 38px; height: 38px;" />
    <span style="display: block; font-weight: bold; background-color: white;">${name}</span>
  </div>
`,
    iconAnchor: [30, 60],
    className: "",
  });
}
