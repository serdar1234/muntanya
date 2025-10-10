"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

interface MapContextType {
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [style, setStyle] = useState("1");
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedStyle = localStorage.getItem("mapStyle");
    if (savedStyle) {
      setStyle(savedStyle);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("mapStyle", style);
  }, [style]);

  return <MapContext value={{ style, setStyle }}>{children}</MapContext>;
};
