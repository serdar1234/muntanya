const leaf = "./leaflet/mount.jpg";

export default function PopupContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h3>{title || "Mt.Ayrybaba"}</h3>
      <img src={leaf} alt={title || "Ayrybaba"} style={{ float: "right" }} />
      <p>{description || ""}</p>
    </>
  );
}
