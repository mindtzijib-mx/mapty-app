import { Running, Cycling, Workout } from "../workout";

describe("Workout Classes", () => {
  describe("Workout base class", () => {
    it("should create a workout with correct properties", () => {
      const coords: [number, number] = [40.7128, -74.006];
      const workout = new Workout(coords, 5, 30);

      expect(workout.coords).toEqual(coords);
      expect(workout.distance).toBe(5);
      expect(workout.duration).toBe(30);
      expect(workout.clicks).toBe(0);
      expect(workout.id).toBeDefined();
      expect(workout.date).toBeInstanceOf(Date);
    });

    it("should increment clicks when click method is called", () => {
      const workout = new Workout([0, 0], 1, 1);

      expect(workout.clicks).toBe(0);
      workout.click();
      expect(workout.clicks).toBe(1);
      workout.click();
      expect(workout.clicks).toBe(2);
    });
  });

  describe("Running class", () => {
    it("should create a running workout with correct properties", () => {
      const coords: [number, number] = [40.7128, -74.006];
      const running = new Running(coords, 5, 25, 180);

      expect(running.type).toBe("running");
      expect(running.coords).toEqual(coords);
      expect(running.distance).toBe(5);
      expect(running.duration).toBe(25);
      expect(running.cadence).toBe(180);
      expect(running.pace).toBe(5); // 25 / 5 = 5 min/km
      expect(running.description).toContain("Running on");
    });

    it("should calculate pace correctly", () => {
      const running = new Running([0, 0], 10, 50, 170);
      expect(running.pace).toBe(5); // 50 / 10 = 5 min/km
    });
  });

  describe("Cycling class", () => {
    it("should create a cycling workout with correct properties", () => {
      const coords: [number, number] = [40.7128, -74.006];
      const cycling = new Cycling(coords, 20, 60, 200);

      expect(cycling.type).toBe("cycling");
      expect(cycling.coords).toEqual(coords);
      expect(cycling.distance).toBe(20);
      expect(cycling.duration).toBe(60);
      expect(cycling.elevationGain).toBe(200);
      expect(cycling.speed).toBe(20); // 20 / (60/60) = 20 km/h
      expect(cycling.description).toContain("Cycling on");
    });

    it("should calculate speed correctly", () => {
      const cycling = new Cycling([0, 0], 30, 90, 150);
      expect(cycling.speed).toBe(20); // 30 / (90/60) = 20 km/h
    });
  });
});
