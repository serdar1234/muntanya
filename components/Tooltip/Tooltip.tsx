import { MarkerData } from "@/shared/types";

interface TooltipContentProps {
  marker: MarkerData;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ marker }) => {
  return (
    <div>
      <strong>{marker.name}</strong>
      <br />
      <strong>Elevation:</strong> {marker.elevation} m.
      <br />
      <span>
        <strong>Coordinates:</strong> {marker.coords[0]}, {marker.coords[1]}
      </span>
    </div>
  );
};

export default TooltipContent;
