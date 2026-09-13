import type { TrackedIceberg } from "../types/iceberg";

export const icebergTrackerData: TrackedIceberg[] = [
  {
    id: "A23",
    name: "ICEBERG A23",
    risk: "HIGH",

    latitude: 60.42,
    longitude: 20.81,

    size: "1.8 × 0.7 km",
    mass: "~1.2 Gt",
    speed: "0.42 kn",
    direction: "NE",

    calvedFrom: "Ross Ice Shelf",
    detectedBy: "Sentinel-1 SAR",

    firstDetected: "02 SEP 2026",
    lastUpdated: "10 SEP 16:42 UTC",

    detectionConfidence: 96.4,

    collisionProbability: 72,
    collisionDistance: "18.4 km",

    trajectory: [
      {
        iceberg_id: "A23",
        prediction_time: "2026-09-10T22:42:00Z",
        horizon_hours: 6,
        predicted_latitude: 60.30,
        predicted_longitude: 21.02,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "A23",
        prediction_time: "2026-09-11T04:42:00Z",
        horizon_hours: 12,
        predicted_latitude: 60.18,
        predicted_longitude: 21.24,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "A23",
        prediction_time: "2026-09-11T16:42:00Z",
        horizon_hours: 24,
        predicted_latitude: 59.91,
        predicted_longitude: 21.68,
        uncertainty_km: 3.8,
        prediction_method: "XGBoost",
      },
      {
        iceberg_id: "A23",
        prediction_time: "2026-09-12T16:42:00Z",
        horizon_hours: 48,
        predicted_latitude: 59.42,
        predicted_longitude: 22.55,
        uncertainty_km: 7.4,
        prediction_method: "XGBoost",
      },
    ],
  },

  {
    id: "B15",
    name: "ICEBERG B15",
    risk: "MODERATE",

    latitude: 67.18,
    longitude: 31.42,

    size: "1.2 × 0.5 km",
    mass: "~0.8 Gt",
    speed: "0.31 kn",
    direction: "E",

    calvedFrom: "Ross Ice Shelf",
    detectedBy: "Sentinel-1 SAR",

    firstDetected: "01 SEP 2026",
    lastUpdated: "10 SEP 16:38 UTC",

    detectionConfidence: 91.7,

    collisionProbability: 34,
    collisionDistance: "42.7 km",

    trajectory: [
      {
        iceberg_id: "B15",
        prediction_time: "2026-09-10T22:38:00Z",
        horizon_hours: 6,
        predicted_latitude: 67.11,
        predicted_longitude: 31.72,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "B15",
        prediction_time: "2026-09-11T04:38:00Z",
        horizon_hours: 12,
        predicted_latitude: 67.04,
        predicted_longitude: 32.02,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "B15",
        prediction_time: "2026-09-11T16:38:00Z",
        horizon_hours: 24,
        predicted_latitude: 66.92,
        predicted_longitude: 32.73,
        uncertainty_km: 4.6,
        prediction_method: "XGBoost",
      },
      {
        iceberg_id: "B15",
        prediction_time: "2026-09-12T16:38:00Z",
        horizon_hours: 48,
        predicted_latitude: 66.71,
        predicted_longitude: 34.12,
        uncertainty_km: 8.1,
        prediction_method: "XGBoost",
      },
    ],
  },

  {
    id: "C07",
    name: "ICEBERG C07",
    risk: "LOW",

    latitude: 63.72,
    longitude: 12.84,

    size: "0.6 × 0.3 km",
    mass: "~0.2 Gt",
    speed: "0.18 kn",
    direction: "SE",

    calvedFrom: "Filchner-Ronne Shelf",
    detectedBy: "Sentinel-1 SAR",

    firstDetected: "03 SEP 2026",
    lastUpdated: "10 SEP 16:31 UTC",

    detectionConfidence: 88.2,

    collisionProbability: 8,
    collisionDistance: "76.2 km",

    trajectory: [
      {
        iceberg_id: "C07",
        prediction_time: "2026-09-10T22:31:00Z",
        horizon_hours: 6,
        predicted_latitude: 63.58,
        predicted_longitude: 12.93,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "C07",
        prediction_time: "2026-09-11T04:31:00Z",
        horizon_hours: 12,
        predicted_latitude: 63.44,
        predicted_longitude: 13.02,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "C07",
        prediction_time: "2026-09-11T16:31:00Z",
        horizon_hours: 24,
        predicted_latitude: 63.11,
        predicted_longitude: 13.21,
        uncertainty_km: 2.1,
        prediction_method: "XGBoost",
      },
      {
        iceberg_id: "C07",
        prediction_time: "2026-09-12T16:31:00Z",
        horizon_hours: 48,
        predicted_latitude: 62.67,
        predicted_longitude: 13.54,
        uncertainty_km: 4.3,
        prediction_method: "XGBoost",
      },
    ],
  },

  {
    id: "D12",
    name: "ICEBERG D12",
    risk: "MODERATE",

    latitude: 64.84,
    longitude: 6.31,

    size: "0.9 × 0.4 km",
    mass: "~0.5 Gt",
    speed: "0.27 kn",
    direction: "NE",

    calvedFrom: "Amery Ice Shelf",
    detectedBy: "Sentinel-1 SAR",

    firstDetected: "04 SEP 2026",
    lastUpdated: "10 SEP 16:36 UTC",

    detectionConfidence: 93.1,

    collisionProbability: 28,
    collisionDistance: "51.8 km",

    trajectory: [
      {
        iceberg_id: "D12",
        prediction_time: "2026-09-10T22:36:00Z",
        horizon_hours: 6,
        predicted_latitude: 64.74,
        predicted_longitude: 6.51,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "D12",
        prediction_time: "2026-09-11T04:36:00Z",
        horizon_hours: 12,
        predicted_latitude: 64.63,
        predicted_longitude: 6.71,
        uncertainty_km: null,
        prediction_method: "Dead Reckoning",
      },
      {
        iceberg_id: "D12",
        prediction_time: "2026-09-11T16:36:00Z",
        horizon_hours: 24,
        predicted_latitude: 64.42,
        predicted_longitude: 7.12,
        uncertainty_km: 3.2,
        prediction_method: "XGBoost",
      },
      {
        iceberg_id: "D12",
        prediction_time: "2026-09-12T16:36:00Z",
        horizon_hours: 48,
        predicted_latitude: 64.01,
        predicted_longitude: 7.92,
        uncertainty_km: 6.2,
        prediction_method: "XGBoost",
      },
    ],
  },
];