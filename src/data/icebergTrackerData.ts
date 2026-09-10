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
    lastUpdated: "08 SEP 18:42 UTC",

    detectionConfidence: 96.4,

    collisionProbability: 72,
    collisionDistance: "18.4 km",

    trajectory: [
      {
        latitude: 60.42,
        longitude: 20.81,
        hours: 0,
      },
      {
        latitude: 60.18,
        longitude: 21.24,
        hours: 12,
      },
      {
        latitude: 59.91,
        longitude: 21.68,
        hours: 24,
      },
      {
        latitude: 59.42,
        longitude: 22.55,
        hours: 48,
      },
      {
        latitude: 58.94,
        longitude: 23.41,
        hours: 72,
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
    lastUpdated: "08 SEP 18:38 UTC",

    detectionConfidence: 91.7,

    collisionProbability: 34,
    collisionDistance: "42.7 km",

    trajectory: [
      {
        latitude: 67.18,
        longitude: 31.42,
        hours: 0,
      },
      {
        latitude: 67.04,
        longitude: 32.02,
        hours: 12,
      },
      {
        latitude: 66.92,
        longitude: 32.73,
        hours: 24,
      },
      {
        latitude: 66.71,
        longitude: 34.12,
        hours: 48,
      },
      {
        latitude: 66.51,
        longitude: 35.64,
        hours: 72,
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
    lastUpdated: "08 SEP 18:31 UTC",

    detectionConfidence: 88.2,

    collisionProbability: 8,
    collisionDistance: "76.2 km",

    trajectory: [
      {
        latitude: 63.72,
        longitude: 12.84,
        hours: 0,
      },
      {
        latitude: 63.44,
        longitude: 13.02,
        hours: 12,
      },
      {
        latitude: 63.11,
        longitude: 13.21,
        hours: 24,
      },
      {
        latitude: 62.67,
        longitude: 13.54,
        hours: 48,
      },
      {
        latitude: 62.24,
        longitude: 13.91,
        hours: 72,
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
    lastUpdated: "08 SEP 18:36 UTC",

    detectionConfidence: 93.1,

    collisionProbability: 28,
    collisionDistance: "51.8 km",

    trajectory: [
      {
        latitude: 64.84,
        longitude: 6.31,
        hours: 0,
      },
      {
        latitude: 64.63,
        longitude: 6.71,
        hours: 12,
      },
      {
        latitude: 64.42,
        longitude: 7.12,
        hours: 24,
      },
      {
        latitude: 64.01,
        longitude: 7.92,
        hours: 48,
      },
      {
        latitude: 63.62,
        longitude: 8.73,
        hours: 72,
      },
    ],
  },
];