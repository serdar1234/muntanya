import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { MapProvider } from "./providers/MapProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import theme from "@/shared/theme";
import "./globals.scss";
import { Suspense } from "react";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <MapProvider>
            <ThemeProvider theme={theme}>
              <>
                <Suspense>
                  <SnackbarProvider />
                </Suspense>
                {children}
              </>
            </ThemeProvider>
          </MapProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
