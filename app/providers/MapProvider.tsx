"use client";

import React, { createContext, useState, ReactNode } from "react";

interface MapContextType {
  style: number;
  setStyle: (style: number) => void;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [style, setStyle] = useState(1);

  return <MapContext value={{ style, setStyle }}>{children}</MapContext>;
};
