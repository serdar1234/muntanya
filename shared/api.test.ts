import { getPeakById, getSearchResults } from "./api";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("getPeakById", () => {
  afterEach(() => {
    mockFetch.mockReset();
    jest.restoreAllMocks();
  });

  test("should return a mountain object on a successful fetch", async () => {
    const mockResponse = { data: { name: "Mount Everest" } };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
      status: 200,
    });

    const result = await getPeakById("everest");

    expect(result).toEqual(
      expect.objectContaining({
        name: "Mount Everest",
      })
    );

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.climepeak.com/api/v1/peaks/everest"
    );
  });

  test("should return null if the peak is not found", async () => {
    const mockResponse = { data: null };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
      status: 200,
    });

    const result = await getPeakById("nonexistent-peak");

    expect(result).toBeNull();
  });

  test("should return null if the API response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const result = await getPeakById("some-id");

    expect(result).toBeNull();
  });

  test("should return null if a network error occurs", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await getPeakById("some-id");

    expect(result).toBeNull();

    expect(consoleSpy).toHaveBeenCalledWith(
      "getPeakById error: ",
      "Network error"
    );

    consoleSpy.mockRestore();
  });
});

describe("getSearchResults", () => {
  afterEach(() => {
    mockFetch.mockReset();
    jest.restoreAllMocks();
  });

  test("should return a SuccessResponse object on a successful fetch without a page", async () => {
    const mockData = {
      data: {},
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
    });

    const result = await getSearchResults("everest");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.climepeak.com/api/v1/home/search?q=everest"
    );
    expect(result).toEqual(mockData);
  });

  test("should return a SuccessResponse object on a successful fetch with a page", async () => {
    const mockData = {
      data: {},
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
    });

    const result = await getSearchResults("kilimanjaro", 2);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.climepeak.com/api/v1/home/search?q=kilimanjaro&page=2"
    );
    expect(result).toEqual(mockData);
  });

  test("should return null if the response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Service Unavailable",
      status: 503,
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await getSearchResults("error-query");

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error in getSearchResults: [object Object]"
    );
    consoleSpy.mockRestore();
  });

  test("should return null if the API returns an error object", async () => {
    const mockErrorResponse = {
      error: { message: "Invalid query", code: 400 },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockErrorResponse),
      status: 200,
    });

    const result = await getSearchResults("invalid");

    expect(result).toBeNull();
  });

  test("should return null if fetch fails with a network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await getSearchResults("network-error");

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Could not find data about the mountain:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
