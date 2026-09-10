export type SimulationPhase =
  | "idle"
  | "running"
  | "obstruction"
  | "analyzing"
  | "rerouting"
  | "accepted";

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface SimulationTelemetry {
  speed: number;
  heading: number;
  fuel: number;
  windSpeed: number;
  waveHeight: number;
  visibility: number;
  distanceRemaining: number;
  etaHours: number;
}

export const INITIAL_POSITION: Coordinate = {
  lat: -69.40,
  lon: 76.18,
};

export const DESTINATION: Coordinate = {
  lat: -68.05,
  lon: 77.85,
};

/*
 * Normal route.
 */
export const NORMAL_ROUTE: Coordinate[] = [
  { lat: -69.40, lon: 76.18 },
  { lat: -69.30, lon: 76.38 },
  { lat: -69.12, lon: 76.58 },
  { lat: -68.90, lon: 76.78 },
  { lat: -68.62, lon: 77.05 },
  { lat: -68.35, lon: 77.40 },
  { lat: -68.05, lon: 77.85 },
];

/*
 * Alternative route generated after obstruction detection.
 */
export const ALTERNATIVE_ROUTE: Coordinate[] = [
  { lat: -69.40, lon: 76.18 },
  { lat: -69.32, lon: 76.28 },
  { lat: -69.18, lon: 76.38 },
  { lat: -68.95, lon: 76.42 },
  { lat: -68.68, lon: 76.55 },
  { lat: -68.38, lon: 77.05 },
  { lat: -68.12, lon: 77.42 },
  { lat: -68.05, lon: 77.85 },
];

/*
 * Simulated iceberg / obstruction.
 * This is simulation data, not a live satellite observation.
 */
export const OBSTRUCTION: Coordinate = {
  lat: -68.92,
  lon: 76.82,
};

export const INITIAL_TELEMETRY: SimulationTelemetry = {
  speed: 12.4,
  heading: 74,
  fuel: 78.6,
  windSpeed: 18,
  waveHeight: 2.1,
  visibility: 14.8,
  distanceRemaining: 248,
  etaHours: 61,
};

export function interpolateRoute(
  route: Coordinate[],
  progress: number,
): Coordinate {
  if (route.length === 0) {
    return INITIAL_POSITION;
  }

  const clamped = Math.max(0, Math.min(1, progress));

  const scaled = clamped * (route.length - 1);
  const index = Math.min(
    Math.floor(scaled),
    route.length - 2,
  );

  const localProgress = scaled - index;

  const start = route[index];
  const end = route[index + 1];

  if (!start || !end) {
    return route[route.length - 1];
  }

  return {
    lat:
      start.lat +
      (end.lat - start.lat) * localProgress,

    lon:
      start.lon +
      (end.lon - start.lon) * localProgress,
  };
}