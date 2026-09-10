export type DashboardSection =
  | "mission"
  | "sea-ice"
  | "icebergs"
  | "route"
  | "satellite"
  | "weather"
  | "alerts"
  | "simulation"
  | "analytics"
  | "model";

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface VesselTelemetry {
  vesselName: string;

  speed: number;
  speedUnit: string;

  fuel: number;

  heading: number;
  headingDirection: string;

  temperature: number;

  windSpeed: number;
  windDirection: string;

  seaTemperature: number;

  visibility: number;

  latitude: number;
  longitude: number;

  destination: string;

  distanceRemaining: number;
  etaHours: number;

  departed: string;
}

export interface RiskIndicator {
  label: string;
  value: number;
  level: RiskLevel;
}

export interface Iceberg {
  id: string;

  latitude: number;
  longitude: number;

  size: number;

  risk: RiskLevel;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
}