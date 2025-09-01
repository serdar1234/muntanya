import Map from "@/components/Map";

export default function HomePage() {
  return (
    <main className="main-layout">
      <div className="map-column">
        <Map />
      </div>

      <aside className="content-column">
        <h1>Mountains & Trails</h1>
        <p>Welcome — map on the left takes about half the page.</p>

        {/* Add more UI here: list of trails, filters, etc. */}
      </aside>
    </main>
  );
}
