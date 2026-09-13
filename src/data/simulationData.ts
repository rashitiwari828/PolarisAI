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

/*
 * =========================================================
 * MISSION GEOGRAPHY
 * =========================================================
 */

export const INITIAL_POSITION: Coordinate = {
  lat: -69.40,
  lon: 76.18,
};

export const DESTINATION: Coordinate = {
  lat: -68.05,
  lon: 77.85,
};

/*
 * =========================================================
 * NORMAL MISSION ROUTE
 *
 * Route followed before the new Sentinel-1 observation
 * changes the mission risk landscape.
 * =========================================================
 */

export const NORMAL_ROUTE: Coordinate[] = [
  {
    lat: -69.40,
    lon: 76.18,
  },
  {
    lat: -69.30,
    lon: 76.38,
  },
  {
    lat: -69.12,
    lon: 76.58,
  },
  {
    lat: -68.90,
    lon: 76.78,
  },
  {
    lat: -68.62,
    lon: 77.05,
  },
  {
    lat: -68.35,
    lon: 77.40,
  },
  {
    lat: -68.05,
    lon: 77.85,
  },
];

/*
 * =========================================================
 * ADAPTIVE MISSION ROUTE
 *
 * New feasible route generated after mission feasibility
 * is re-evaluated against the updated ice-risk landscape.
 *
 * The route preserves the mandatory mission objectives
 * while avoiding the newly hazardous area.
 * =========================================================
 */

export const ALTERNATIVE_ROUTE: Coordinate[] = [
  {
    lat: -69.40,
    lon: 76.18,
  },
  {
    lat: -69.32,
    lon: 76.28,
  },
  {
    lat: -69.18,
    lon: 76.38,
  },
  {
    lat: -68.95,
    lon: 76.42,
  },
  {
    lat: -68.68,
    lon: 76.55,
  },
  {
    lat: -68.38,
    lon: 77.05,
  },
  {
    lat: -68.12,
    lon: 77.42,
  },
  {
    lat: -68.05,
    lon: 77.85,
  },
];

/*
 * =========================================================
 * SENTINEL-1 OBSERVATION LOCATION
 *
 * Simulated hazard location used by the live demonstration.
 *
 * This is NOT a live satellite coordinate.
 * =========================================================
 */

export const OBSTRUCTION: Coordinate = {
  lat: -68.92,
  lon: 76.82,
};

/*
 * =========================================================
 * INITIAL VESSEL TELEMETRY
 * =========================================================
 */

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

/*
 * =========================================================
 * ROUTE INTERPOLATION
 *
 * Used only to animate the simulated vessel along an
 * already-defined route.
 *
 * No trajectory prediction or navigation intelligence is
 * calculated here.
 * =========================================================
 */

export function interpolateRoute(
  route: Coordinate[],
  progress: number,
): Coordinate {
  /*
   * Empty route fallback.
   */

  if (route.length === 0) {
    return INITIAL_POSITION;
  }

  /*
   * Single-point route.
   */

  if (route.length === 1) {
    return route[0] ?? INITIAL_POSITION;
  }

  /*
   * Keep progress between 0 and 1.
   */

  const clamped = Math.max(
    0,
    Math.min(1, progress),
  );

  /*
   * Convert normalized progress into a position
   * between route waypoints.
   */

  const scaled =
    clamped * (route.length - 1);

  const index = Math.min(
    Math.floor(scaled),
    route.length - 2,
  );

  const localProgress =
    scaled - index;

  const start = route[index];
  const end = route[index + 1];

  /*
   * Defensive fallback.
   */

  if (!start || !end) {
    return (
      route[route.length - 1] ??
      INITIAL_POSITION
    );
  }

  return {
    lat:
      start.lat +
      (end.lat - start.lat) *
        localProgress,

    lon:
      start.lon +
      (end.lon - start.lon) *
        localProgress,
  };
}