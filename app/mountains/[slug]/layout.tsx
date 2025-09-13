import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/shared/theme";
import "../../globals.scss";
import { getPeakById } from "@/shared/api";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const mountain = await getPeakById(slug);

  if (!mountain) {
    return {};
  }
  const peakName = mountain.peak.name;
  const keywords = Object.values(mountain.peak.tags);
  return {
    title: peakName,
    description: peakName + "'s nearby mountains & trails",
    keywords: [
      ...keywords,
      "Mountains",
      "Trails",
      "Hiking",
      "Mountains & Trails",
      "Muntanya",
    ],
  };
}

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
