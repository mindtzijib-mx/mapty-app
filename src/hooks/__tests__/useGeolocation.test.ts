import { renderHook, waitFor } from "@testing-library/react";
import { useGeolocation } from "../useGeolocation";

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

Object.defineProperty(global.navigator, "geolocation", {
  value: mockGeolocation,
  writable: true,
});

describe("useGeolocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.loading).toBe(true);
    expect(result.current.coords).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should return coordinates on successful geolocation", async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => {
      success(mockPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.coords).toEqual([40.7128, -74.006]);
      expect(result.current.error).toBe(null);
    });
  });

  it("should return error on geolocation failure", async () => {
    const mockError = {
      message: "User denied geolocation",
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_success, error) => {
        error(mockError);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.coords).toBe(null);
      expect(result.current.error).toBe("User denied geolocation");
    });
  });

  // Note: Testing unsupported geolocation is complex in Jest environment
  // This would be better tested in an integration test
});
