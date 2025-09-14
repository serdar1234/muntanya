import type { Metadata, Viewport } from "next";
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

export default function MoutainPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
