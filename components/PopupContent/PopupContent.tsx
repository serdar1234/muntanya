import { MarkerData } from "@/shared/types";
import Link from "next/link";

export default function PopupContent({ marker }: { marker: MarkerData }) {
  const { name, slug, elevation } = marker;
  return (
    <>
      <h3>
        <Link href={`/mountains/${slug}`}>{name || ""}</Link>
      </h3>
      <p>Elevation: {elevation} m</p>
    </>
  );
}
