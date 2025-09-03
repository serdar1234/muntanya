import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "leaflet/dist/leaflet.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Muntanya",
  description: "Mountains & Trails",
  keywords: ["Mountains", "Trails", "Hiking", "Mountains & Trails", "Muntanya"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
