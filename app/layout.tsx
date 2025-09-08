import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/shared/theme";
import "./globals.scss";

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
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
