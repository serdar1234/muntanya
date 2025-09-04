import Map from "@/components/Map/";
import MenuItem from "@/components/Menu";
import SearchInput from "@/components/Search/SearchInput";

export default function HomePage() {
  return (
    <main className="main-layout">
      <div className="map-column">
        <Map />
      </div>
      <div className="wrapper">
        <SearchInput />
        <MenuItem />
      </div>
    </main>
  );
}
