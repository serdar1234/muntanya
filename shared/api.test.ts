import { ApiPeak, ApiResponse, MountainData } from "@/shared/types";
import {
  getAutocompleteSuggestions,
  getDefaultPosition,
  getMountainData,
} from "./api";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("getAutocompleteSuggestions", () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  // Тест 1: Успешное получение данных
  test("should return an array of peaks on a successful fetch", async () => {
    const mockData = {
      data: {
        peaks: [
          { name: "Mount Everest", slug: "mount-everest" },
          { name: "Everest Peak", slug: "everest-peak" },
        ],
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
    });

    const result = await getAutocompleteSuggestions("everest");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.climepeak.com/api/v1/home/autocomplete?q=everest"
    );
    expect(result).toEqual(mockData.data.peaks);
  });

  // Тест 2: Ошибка сервера (response.ok = false)
  test("should return an empty array if the response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
      status: 404,
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getAutocompleteSuggestions("invalid-query");

    expect(consoleErrorSpy).toHaveBeenCalledWith("Ошибка API: Not Found");
    expect(result).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  // Тест 3: Ошибка сети (rejected promise)
  test("should return an empty array if fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getAutocompleteSuggestions("test-query");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Не удалось получить данные для автокомплита:",
      new Error("Network error")
    );
    expect(result).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  // Тест 4: Пустой результат
  test("should return an empty array if no peaks are found", async () => {
    const mockData = {
      data: {
        peaks: [],
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
    });

    const result = await getAutocompleteSuggestions("no-results");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.climepeak.com/api/v1/home/autocomplete?q=no-results"
    );
    expect(result).toEqual([]);
  });
});

describe("getDefaultPosition", () => {
  // Сбрасываем моки после каждого теста
  afterEach(() => {
    mockFetch.mockReset();
  });

  // Тест 1: Успешное получение данных
  test("should return coordinates on a successful fetch", async () => {
    const mockData = {
      data: {
        location: {
          location: {
            lat: 40.7128,
            lng: -74.006,
          },
        },
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
    });

    const result = await getDefaultPosition();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.climepeak.com/api/v1/home/location"
    );
    expect(result).toEqual([40.7128, -74.006]);
  });

  // Тест 2: Ответ сервера не ok
  test("should return default coordinates if the response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Service Unavailable",
      status: 503,
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getDefaultPosition();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error receiving data: Service Unavailable"
    );
    expect(result).toEqual([46.8523, -121.7605]);

    consoleErrorSpy.mockRestore();
  });

  // Тест 3: Ошибка сети
  test("should return default coordinates if fetch fails with a network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getDefaultPosition();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Could not find data about the mountain:",
      new Error("Failed to fetch")
    );
    expect(result).toEqual([46.8523, -121.7605]);

    consoleErrorSpy.mockRestore();
  });

  // Тест 4: Неправильный формат данных в ответе
  test("should return default coordinates if data format is incorrect", async () => {
    const mockData = {
      data: {
        location: {
          location: {
            // Отсутствуют lat и lng
            badKey: 123,
          },
        },
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
    });

    // Изменяем шпиона, чтобы он ожидал новый текст
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getDefaultPosition();

    // Обновляем проверку на точный текст ошибки
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Incorrect data format:",
      mockData
    );
    expect(result).toEqual([46.8523, -121.7605]);

    consoleErrorSpy.mockRestore();
  });
});

describe("getMountainData", () => {
  afterEach(() => {
    mockFetch.mockReset();
    jest.restoreAllMocks();
  });

  // Тест 1: Успешное получение данных и нахождение горы
  test("should return mountain data on a successful fetch with a matching mountain", async () => {
    const mockPeaks: ApiPeak[] = [
      {
        id: 1,
        name: "Mountain Everest",
        elevation: 8848,
        slug: "mountain-everest",
        lat: "27.9881",
        lng: "86.925",
        prominence: 8000,
        is_volcano: false,
      },
      {
        id: 2,
        name: "Mount Kilimanjaro",
        elevation: 5895,
        slug: "mount-kilimanjaro",
        lat: "-3.0674",
        lng: "37.3556",
        prominence: 5000,
        is_volcano: true,
      },
    ];
    const mockApiResponse: ApiResponse = { data: { peaks: mockPeaks } };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await getMountainData("everest");

    const expectedData: MountainData = {
      name: "Mountain Everest",
      coords: [27.9881, 86.925],
    };

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.climepeak.com/api/v1/home/search?q=everest"
    );
    expect(result).toEqual(expectedData);
  });

  // Тест 2: Правильная сортировка и нахождение горы с большей prominance
  test("should find the mountain with the highest prominence among multiple matches", async () => {
    const mockPeaks: ApiPeak[] = [
      {
        id: 1,
        name: "medium Everest",
        elevation: 1500,
        slug: "everest-medium",
        lat: "127.9",
        lng: "-86.9",
        prominence: 1400,
        is_volcano: true,
      },
      {
        id: 2,
        name: "Mount Everest",
        elevation: 8848,
        slug: "everest-high",
        lat: "27.9881",
        lng: "86.925",
        prominence: 8000,
        is_volcano: false,
      },
      {
        id: 3,
        name: "Lesser Everest",
        elevation: 500,
        slug: "everest-low",
        lat: "27.9",
        lng: "86.9",
        prominence: 400,
        is_volcano: false,
      },
    ];
    const mockApiResponse: ApiResponse = { data: { peaks: mockPeaks } };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await getMountainData("everest");

    const expectedData: MountainData = {
      name: "Mount Everest",
      coords: [27.9881, 86.925],
    };

    expect(result).toEqual(expectedData);
  });

  // Тест 3: Если гора не найдена в списке
  test("should return null if no matching mountain is found", async () => {
    const mockPeaks: ApiPeak[] = [
      {
        id: 1,
        name: "Mount Kilimanjaro",
        elevation: 5895,
        slug: "mount-kilimanjaro",
        lat: "-3.0674",
        lng: "37.3556",
        prominence: 5000,
        is_volcano: true,
      },
    ];
    const mockApiResponse: ApiResponse = { data: { peaks: mockPeaks } };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await getMountainData("nonexistent-mountain");

    expect(result).toBeNull();
  });

  // Тест 4: Если ответ API не "ok"
  test("should return null if the API response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getMountainData("everest");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error in getMountainData: Not Found"
    );
    expect(result).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  // Тест 5: Ошибка сети или некорректный JSON
  test("should return null if a network error occurs or JSON is invalid", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getMountainData("everest");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Could not find data about the mountain:",
      expect.any(Error)
    );
    expect(result).toBeNull();

    consoleErrorSpy.mockRestore();
  });
});
