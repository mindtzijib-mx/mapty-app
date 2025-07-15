export interface WorkoutData {
  id: string;
  date: Date;
  coords: [number, number];
  distance: number;
  duration: number;
  type: "running" | "cycling";
  description: string;
  clicks: number;
}

export interface RunningData extends WorkoutData {
  type: "running";
  cadence: number;
  pace: number;
}

export interface CyclingData extends WorkoutData {
  type: "cycling";
  elevationGain: number;
  speed: number;
}

export type WorkoutType = RunningData | CyclingData;

export class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  clicks = 0;
  description = "";

  constructor(
    public coords: [number, number],
    public distance: number,
    public duration: number
  ) {}

  protected setDescription(type: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.description = `${type[0].toUpperCase()}${type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

export class Running extends Workout {
  type = "running" as const;
  pace: number;

  constructor(
    coords: [number, number],
    distance: number,
    duration: number,
    public cadence: number
  ) {
    super(coords, distance, duration);
    this.pace = this.calcPace();
    this.setDescription(this.type);
  }

  private calcPace() {
    return this.duration / this.distance;
  }
}

export class Cycling extends Workout {
  type = "cycling" as const;
  speed: number;

  constructor(
    coords: [number, number],
    distance: number,
    duration: number,
    public elevationGain: number
  ) {
    super(coords, distance, duration);
    this.speed = this.calcSpeed();
    this.setDescription(this.type);
  }

  private calcSpeed() {
    return this.distance / (this.duration / 60);
  }
}
