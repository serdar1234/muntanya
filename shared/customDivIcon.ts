import { divIcon } from "leaflet";

export default function customDivIcon(name?: string) {
  return divIcon({
    iconSize: [60, 60],
    html: `
  <div style="text-align: center;">
    <img src="/leaflet/marker-icon.png" style="width: 38px; height: 38px;" alt="${name}" />
  </div>
`,
    iconAnchor: [30, 30],
    className: "",
  });
}
