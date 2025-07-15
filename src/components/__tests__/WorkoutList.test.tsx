import { render, screen, fireEvent } from "@testing-library/react";
import WorkoutList from "../WorkoutList";
import { Running, Cycling } from "../../types/workout";
import type { WorkoutType } from "../../types/workout";

describe("WorkoutList", () => {
  const mockOnWorkoutClick = jest.fn();
  let mockDateNow: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDateNow = jest.spyOn(Date, "now");
  });

  afterEach(() => {
    mockDateNow.mockRestore();
  });

  it("renders empty list when no workouts provided", () => {
    render(<WorkoutList workouts={[]} onWorkoutClick={mockOnWorkoutClick} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list).toBeEmptyDOMElement();
  });

  it("renders running workout correctly", () => {
    const runningWorkout = new Running([40.7128, -74.006], 5, 25, 180);
    const workouts: WorkoutType[] = [runningWorkout];

    render(
      <WorkoutList workouts={workouts} onWorkoutClick={mockOnWorkoutClick} />
    );

    expect(screen.getByText(/running on/i)).toBeInTheDocument();
    expect(screen.getByText("🏃‍♂️")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument(); // distance
    expect(screen.getByText("25")).toBeInTheDocument(); // duration
    expect(screen.getByText("5.0")).toBeInTheDocument(); // pace
    expect(screen.getByText("180")).toBeInTheDocument(); // cadence
    expect(screen.getByText("km")).toBeInTheDocument();
    expect(screen.getByText("min")).toBeInTheDocument();
    expect(screen.getByText("min/km")).toBeInTheDocument();
    expect(screen.getByText("spm")).toBeInTheDocument();
  });

  it("renders cycling workout correctly", () => {
    const cyclingWorkout = new Cycling([40.7128, -74.006], 20, 60, 200);
    const workouts: WorkoutType[] = [cyclingWorkout];

    render(
      <WorkoutList workouts={workouts} onWorkoutClick={mockOnWorkoutClick} />
    );

    expect(screen.getByText(/cycling on/i)).toBeInTheDocument();
    expect(screen.getByText("🚴‍♀️")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument(); // distance
    expect(screen.getByText("60")).toBeInTheDocument(); // duration
    expect(screen.getByText("20.0")).toBeInTheDocument(); // speed
    expect(screen.getByText("200")).toBeInTheDocument(); // elevation
    expect(screen.getByText("km")).toBeInTheDocument();
    expect(screen.getByText("min")).toBeInTheDocument();
    expect(screen.getByText("km/h")).toBeInTheDocument();
    expect(screen.getByText("m")).toBeInTheDocument();
  });

  it("renders multiple workouts", () => {
    mockDateNow.mockReturnValueOnce(1000000000000);
    const runningWorkout = new Running([40.7128, -74.006], 5, 25, 180);
    mockDateNow.mockReturnValueOnce(1000000000001);
    const cyclingWorkout = new Cycling([40.7589, -73.9851], 20, 60, 200);
    const workouts: WorkoutType[] = [runningWorkout, cyclingWorkout];

    render(
      <WorkoutList workouts={workouts} onWorkoutClick={mockOnWorkoutClick} />
    );

    expect(screen.getByText(/running on/i)).toBeInTheDocument();
    expect(screen.getByText(/cycling on/i)).toBeInTheDocument();
    expect(screen.getByText("🏃‍♂️")).toBeInTheDocument();
    expect(screen.getByText("🚴‍♀️")).toBeInTheDocument();
  });

  it("calls onWorkoutClick when workout is clicked", () => {
    const runningWorkout = new Running([40.7128, -74.006], 5, 25, 180);
    const workouts: WorkoutType[] = [runningWorkout];

    render(
      <WorkoutList workouts={workouts} onWorkoutClick={mockOnWorkoutClick} />
    );

    const workoutElement = screen.getByText(/running on/i).closest("li");
    expect(workoutElement).toBeInTheDocument();

    fireEvent.click(workoutElement!);

    expect(mockOnWorkoutClick).toHaveBeenCalledWith(runningWorkout);
    expect(mockOnWorkoutClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct CSS classes for workout types", () => {
    mockDateNow.mockReturnValueOnce(1000000000002);
    const runningWorkout = new Running([40.7128, -74.006], 5, 25, 180);
    mockDateNow.mockReturnValueOnce(1000000000003);
    const cyclingWorkout = new Cycling([40.7589, -73.9851], 20, 60, 200);
    const workouts: WorkoutType[] = [runningWorkout, cyclingWorkout];

    render(
      <WorkoutList workouts={workouts} onWorkoutClick={mockOnWorkoutClick} />
    );

    const runningElement = screen.getByText(/running on/i).closest("li");
    const cyclingElement = screen.getByText(/cycling on/i).closest("li");

    expect(runningElement).toHaveClass("workout", "workout--running");
    expect(cyclingElement).toHaveClass("workout", "workout--cycling");
  });

  it("sets correct data-id attribute", () => {
    const runningWorkout = new Running([40.7128, -74.006], 5, 25, 180);
    const workouts: WorkoutType[] = [runningWorkout];

    render(
      <WorkoutList workouts={workouts} onWorkoutClick={mockOnWorkoutClick} />
    );

    const workoutElement = screen.getByText(/running on/i).closest("li");
    expect(workoutElement).toHaveAttribute("data-id", runningWorkout.id);
  });
});
