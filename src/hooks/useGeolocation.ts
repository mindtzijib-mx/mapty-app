import { useState, useEffect } from "react";

interface GeolocationState {
  coords: [number, number] | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        coords: null,
        error: "Geolocation is not supported by this browser.",
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setState({
          coords: [latitude, longitude],
          error: null,
          loading: false,
        });
      },
      (error) => {
        setState({
          coords: null,
          error: error.message,
          loading: false,
        });
      }
    );
  }, []);

  return state;
};
