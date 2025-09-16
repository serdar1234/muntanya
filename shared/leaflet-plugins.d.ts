import "leaflet-gesture-handling";

declare module "leaflet" {
  interface MapOptions {
    gestureHandling?: boolean;
    gestureHandlingOptions?: {
      text?: {
        touch?: string;
        scroll?: string;
        scrollMac?: string;
      };
      duration?: number;
    };
  }
}

declare module "react-leaflet" {
  interface MapContainerProps {
    gestureHandling?: boolean;
    gestureHandlingOptions?: {
      text?: {
        touch?: string;
        scroll?: string;
        scrollMac?: string;
      };
      duration?: number;
    };
  }
}
