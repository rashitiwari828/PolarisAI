import type {
  RiskIndicator,
  VesselTelemetry,
} from "../types/dashboard";

export const vesselTelemetry: VesselTelemetry = {
  vesselName: "MV SAGAR KANYA",

  speed: 12.4,
  speedUnit: "kn",

  fuel: 68,

  heading: 74,
  headingDirection: "NE",

  temperature: -14,

  windSpeed: 24,
  windDirection: "NE",

  seaTemperature: -1.8,

  visibility: 8.4,

  latitude: -66.40,
  longitude: 76.18,

  destination: "BHARATI STATION",

  distanceRemaining: 1248,

  etaHours: 61.4,

  departed: "06 SEP 2026",
};

export const riskIndicators: RiskIndicator[] = [
  {
    label: "SEA ICE",
    value: 42,
    level: "MODERATE",
  },

  {
    label: "ICEBERG",
    value: 18,
    level: "LOW",
  },

  {
    label: "WEATHER",
    value: 21,
    level: "LOW",
  },
];