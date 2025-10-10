"use client";

import { Marker, Popup, Tooltip } from "react-leaflet";
import { useState, useMemo } from "react";
import { MarkerData } from "@/shared/types";
import PopupContent from "../PopupContent";
import TooltipContent from "../Tooltip/Tooltip";
import customDivIcon from "@/shared/customDivIcon";

interface GeoMarkerProps {
  m: MarkerData;
  isCentral?: boolean;
}

const GeoMarker: React.FC<GeoMarkerProps> = ({ m, isCentral = false }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const eventHandlers = useMemo(
    () => ({
      popupopen: () => {
        setIsPopupOpen(true);
      },
      popupclose: () => {
        setIsPopupOpen(false);
      },
    }),
    [],
  );

  return (
    <Marker
      position={m.coords}
      zIndexOffset={isCentral ? 1000 : 0}
      icon={customDivIcon(m.name, isCentral)}
      eventHandlers={eventHandlers}
    >
      <Popup offset={[0, -10]}>
        <PopupContent marker={m} />
      </Popup>

      {!isPopupOpen && (
        <Tooltip>
          <TooltipContent marker={m} />
        </Tooltip>
      )}
    </Marker>
  );
};

export default GeoMarker;
