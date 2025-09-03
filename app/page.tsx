import Map from "@/components/Map";
import { VStack, Heading, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <main className="main-layout">
      <div className="map-column">
        <Map />
      </div>

      <aside className="content-column">
        <VStack>
          <Heading size="2xl">Mountains & Trails</Heading>
          <Text>Welcome — map on the left takes about half the page.</Text>
        </VStack>

        {/* Add more UI here: list of trails, filters, etc. */}
      </aside>
    </main>
  );
}
