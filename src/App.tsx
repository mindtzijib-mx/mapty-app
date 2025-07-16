import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Running, Cycling } from "./types/workout";
import type { WorkoutType } from "./types/workout";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import "./App.css";

// Fix for default markers in Leaflet with Vite
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function App() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [mapEvent, setMapEvent] = useState<L.LeafletMouseEvent | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapZoomLevel = 13;

  useEffect(() => {
    // Get user's position and initialize map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          loadMap([latitude, longitude]);
        },
        () => {
          alert("Could not get your position");
        }
      );
    }

    // Load workouts from localStorage
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      const parsedWorkouts = JSON.parse(savedWorkouts);
      setWorkouts(parsedWorkouts);
    }
  }, []);

  useEffect(() => {
    // Save workouts to localStorage whenever workouts change
    if (workouts.length > 0) {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }
  }, [workouts]);

  useEffect(() => {
    // Add workout markers to map when workouts change
    if (mapRef.current && workouts.length > 0) {
      workouts.forEach((workout) => {
        renderWorkoutMarker(workout);
      });
    }
  }, [workouts]);

  const loadMap = (coords: [number, number]) => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(
      coords,
      mapZoomLevel
    );

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Handle clicks on map
    mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
      setMapEvent(e);
      setShowForm(true);
    });
  };

  const renderWorkoutMarker = (workout: WorkoutType) => {
    if (!mapRef.current) return;

    L.marker(workout.coords)
      .addTo(mapRef.current)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  };

  const handleNewWorkout = (
    type: "running" | "cycling",
    distance: number,
    duration: number,
    cadenceOrElevation: number
  ) => {
    if (!mapEvent) return;

    const { lat, lng } = mapEvent.latlng;
    let workout: WorkoutType;

    if (type === "running") {
      workout = new Running([lat, lng], distance, duration, cadenceOrElevation);
    } else {
      workout = new Cycling([lat, lng], distance, duration, cadenceOrElevation);
    }

    setWorkouts((prev) => [...prev, workout]);
    renderWorkoutMarker(workout);
    setShowForm(false);
    setMapEvent(null);
  };

  const handleWorkoutClick = (workout: WorkoutType) => {
    if (!mapRef.current) return;

    mapRef.current.setView(workout.coords, mapZoomLevel, {
      animate: true,
    });
  };

  return (
    <div className="app">
      <div className="sidebar">
        <img src="./logo.png" alt="Logo" className="logo" />

        <div className="workouts">
          {showForm && (
            <WorkoutForm
              onSubmit={handleNewWorkout}
              onCancel={() => setShowForm(false)}
            />
          )}

          <WorkoutList
            workouts={workouts}
            onWorkoutClick={handleWorkoutClick}
          />
        </div>

        <p className="copyright">
          &copy; Copyright by{" "}
          <a
            className="twitter-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/jonasschmedtman"
          >
            Jonas Schmedtmann
          </a>
          . Use for learning or your portfolio. Don't use to teach. Don't claim
          as your own.
        </p>
      </div>

      <div ref={mapContainerRef} id="map" />
    </div>
  );
}

export default App;
