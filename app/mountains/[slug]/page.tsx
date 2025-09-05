import Map from "@/components/Map";
import { LatLngTuple } from "leaflet";

interface Mountain {
  coords: LatLngTuple;
  name: string;
}

type MyMountains = "everest" | "kilimanjaro" | "rainier";

// Предполагаемая функция для получения данных о горе из твоего API
async function getMountainData(
  slug: MyMountains = "everest",
): Promise<Mountain> {
  // Замени этот код на реальный вызов твоего API.
  // Например, fetch(`https://api.твоего-сайта.com/mountains/${slug}`);
  const data = await new Promise<Mountain>((resolve) => {
    // Временные данные для примера. Замени их на реальный ответ от API.
    const mountainDetails: Record<string, Mountain> = {
      everest: { coords: [27.9881, 86.925], name: "Mount Everest" },
      kilimanjaro: { coords: [-3.0674, 37.3556], name: "Mount Kilimanjaro" },
      rainier: { coords: [46.8523, -121.7605], name: "Mount Rainier" },
      // ... другие горы
    };
    const key: MyMountains = slug;
    // const key: MyMountains = slug.toLowerCase();
    resolve(mountainDetails[key]);
  });
  return data;
}

// Компонент страницы, который принимает параметры маршрута
export default async function MountainPage({
  params,
}: {
  params: { slug: MyMountains };
}) {
  const { slug } = params; // Получаем slug горы из URL

  // Получаем данные о горе, используя slug
  const mountain = await getMountainData(slug);

  if (!mountain) {
    return <div>Гора не найдена.</div>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map pos={mountain.coords} />
    </div>
  );
}
