import { divIcon } from "leaflet";

export default function customDivIcon(name?: string, selected?: boolean) {
  return divIcon({
    iconSize: [60, 60],
    html: `
  <div style="text-align: center;">
  <img src="/peak${selected ? "" : "s"}.svg" style="position: relative; width: 38px; height: 38px; z-index: ${selected ? "2;" : "1"}" alt="${name}" />
  </div>
  `,
    iconAnchor: [30, 30],
    className: "",
  });
}
