import type { Metadata } from "next";
import "./globals.scss";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Muntanya",
  description: "Mountains & Trails",
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
