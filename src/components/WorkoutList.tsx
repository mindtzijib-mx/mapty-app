import type { WorkoutType, RunningData, CyclingData } from "../types/workout";

interface WorkoutListProps {
  workouts: WorkoutType[];
  onWorkoutClick: (workout: WorkoutType) => void;
}

const WorkoutList = ({ workouts, onWorkoutClick }: WorkoutListProps) => {
  const renderWorkout = (workout: WorkoutType) => {
    const isRunning = workout.type === "running";

    return (
      <li
        key={workout.id}
        className={`workout workout--${workout.type}`}
        data-id={workout.id}
        onClick={() => onWorkoutClick(workout)}
      >
        <h2 className="workout__title">{workout.description}</h2>

        <div className="workout__details">
          <span className="workout__icon">{isRunning ? "🏃‍♂️" : "🚴‍♀️"}</span>
          <span className="workout__value">{workout.distance}</span>
          <span className="workout__unit">km</span>
        </div>

        <div className="workout__details">
          <span className="workout__icon">⏱</span>
          <span className="workout__value">{workout.duration}</span>
          <span className="workout__unit">min</span>
        </div>

        {isRunning ? (
          <>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">
                {(workout as RunningData).pace.toFixed(1)}
              </span>
              <span className="workout__unit">min/km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">🦶🏼</span>
              <span className="workout__value">
                {(workout as RunningData).cadence}
              </span>
              <span className="workout__unit">spm</span>
            </div>
          </>
        ) : (
          <>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">
                {(workout as CyclingData).speed.toFixed(1)}
              </span>
              <span className="workout__unit">km/h</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⛰</span>
              <span className="workout__value">
                {(workout as CyclingData).elevationGain}
              </span>
              <span className="workout__unit">m</span>
            </div>
          </>
        )}
      </li>
    );
  };

  return <ul className="workouts-list">{workouts.map(renderWorkout)}</ul>;
};

export default WorkoutList;
