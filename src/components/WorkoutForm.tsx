import { useState, useRef, useEffect } from "react";

interface WorkoutFormProps {
  onSubmit: (
    type: "running" | "cycling",
    distance: number,
    duration: number,
    cadenceOrElevation: number
  ) => void;
  onCancel: () => void;
}

const WorkoutForm = ({ onSubmit, onCancel }: WorkoutFormProps) => {
  const [type, setType] = useState<"running" | "cycling">("running");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [cadence, setCadence] = useState("");
  const [elevation, setElevation] = useState("");

  const distanceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on distance input when form appears
    if (distanceInputRef.current) {
      distanceInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const distanceNum = +distance;
    const durationNum = +duration;
    const cadenceOrElevationNum = type === "running" ? +cadence : +elevation;

    // Validation
    const validInputs = (...inputs: number[]) =>
      inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs: number[]) => inputs.every((inp) => inp > 0);

    if (type === "running") {
      if (
        !validInputs(distanceNum, durationNum, cadenceOrElevationNum) ||
        !allPositive(distanceNum, durationNum, cadenceOrElevationNum)
      ) {
        alert("Inputs have to be positive numbers!");
        return;
      }
    } else {
      if (
        !validInputs(distanceNum, durationNum, cadenceOrElevationNum) ||
        !allPositive(distanceNum, durationNum)
      ) {
        alert("Inputs have to be positive numbers!");
        return;
      }
    }

    onSubmit(type, distanceNum, durationNum, cadenceOrElevationNum);

    // Reset form
    setDistance("");
    setDuration("");
    setCadence("");
    setElevation("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="form__label">Type</label>
        <select
          className="form__input form__input--type"
          value={type}
          onChange={(e) => setType(e.target.value as "running" | "cycling")}
        >
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>

      <div className="form__row">
        <label className="form__label">Distance</label>
        <input
          ref={distanceInputRef}
          className="form__input form__input--distance"
          placeholder="km"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>

      <div className="form__row">
        <label className="form__label">Duration</label>
        <input
          className="form__input form__input--duration"
          placeholder="min"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      {type === "running" ? (
        <div className="form__row">
          <label className="form__label">Cadence</label>
          <input
            className="form__input form__input--cadence"
            placeholder="step/min"
            value={cadence}
            onChange={(e) => setCadence(e.target.value)}
          />
        </div>
      ) : (
        <div className="form__row">
          <label className="form__label">Elev Gain</label>
          <input
            className="form__input form__input--elevation"
            placeholder="meters"
            value={elevation}
            onChange={(e) => setElevation(e.target.value)}
          />
        </div>
      )}

      <button type="submit" className="form__btn">
        OK
      </button>
    </form>
  );
};

export default WorkoutForm;
