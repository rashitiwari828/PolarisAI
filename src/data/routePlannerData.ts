export interface RouteOption {
  id: "fastest" | "safest" | "optimal";
  name: string;
  distance: string;
  eta: string;
  fuel: string;
  iceExposure: "LOW" | "MODERATE" | "HIGH";
  riskScore: number;
  description: string;
}

export const routeOptions: RouteOption[] = [
  {
    id: "fastest",
    name: "FASTEST",
    distance: "1,842 km",
    eta: "78h 12m",
    fuel: "12,400 L",
    iceExposure: "HIGH",
    riskScore: 32,
    description:
      "Shortest transit time with increased ice exposure.",
  },

  {
    id: "safest",
    name: "SAFEST",
    distance: "2,031 km",
    eta: "91h 04m",
    fuel: "13,100 L",
    iceExposure: "LOW",
    riskScore: 7,
    description:
      "Lowest overall navigation risk with additional transit time.",
  },

  {
    id: "optimal",
    name: "POLARIS OPTIMAL",
    distance: "1,925 km",
    eta: "83h 30m",
    fuel: "12,650 L",
    iceExposure: "LOW",
    riskScore: 11,
    description:
      "AI-optimized balance between safety, fuel efficiency and travel time.",
  },
];

/* =========================================================
   MISSION PLAN
   ========================================================= */

export const missionPlan = {
  feasibility: "FEASIBLE",
  confidence: 94,

  scientificObjectives: {
    completed: 3,
    total: 3,
  },

  mandatoryObjectives: {
    completed: 2,
    total: 2,
  },

  optionalObjectives: {
    completed: 1,
    total: 1,
  },

  arrivalWindow: "COMPLIANT",

  safetyMargin: "HIGH",

  missionPriority: "BALANCED",

  sequence: [
    "START",
    "WP-01",
    "WP-02",
    "WP-03",
    "DEST",
  ],
};

/* =========================================================
   MISSION OBJECTIVES
   ========================================================= */

export const missionObjectives = [
  {
    waypoint: "WP-01",
    name: "Ice Core Survey",
    status: "MANDATORY" as const,
    state: "PLANNED" as const,
  },

  {
    waypoint: "WP-02",
    name: "Oceanographic Sampling",
    status: "MANDATORY" as const,
    state: "PLANNED" as const,
  },

  {
    waypoint: "WP-03",
    name: "Marine Ecosystem Survey",
    status: "OPTIONAL" as const,
    state: "PLANNED" as const,
  },
];

/* =========================================================
   DECISION FACTORS
   ========================================================= */

export const decisionFactors = [
  {
    title:
      "Avoids 3 high-density ice regions (>75% concentration)",
    detail: "14% lower ice exposure",
  },

  {
    title:
      "Avoids predicted iceberg A23 trajectory with 5 nm buffer",
    detail: "72h collision risk eliminated",
  },

  {
    title:
      "Routes through northern passage at lower latitude",
    detail: "~180 km longer than fastest",
  },

  {
    title:
      "Avoids strong NE headwind corridor (28–34 kn forecast)",
    detail: "~6% fuel saving from wind",
  },

  {
    title:
      "8 hours faster than the safest alternative route",
    detail: "vs 91h Safest Route",
  },
];

/* =========================================================
   OPTIMIZATION WEIGHTS
   ========================================================= */

export const optimizationWeights = [
  {
    name: "Sea-Ice Concentration",
    weight: 35,
    score: 88,
  },

  {
    name: "Iceberg Risk",
    weight: 25,
    score: 94,
  },

  {
    name: "Weather Conditions",
    weight: 20,
    score: 82,
  },

  {
    name: "Fuel Efficiency",
    weight: 12,
    score: 88,
  },

  {
    name: "Travel Time",
    weight: 8,
    score: 84,
  },
];

/* =========================================================
   ROUTE SCORES
   ========================================================= */

export const routeScores = {
  safety: 92,
  fuelEfficiency: 88,
  timeEfficiency: 84,
  overall: 91,
};

/* =========================================================
   AI CONFIDENCE
   ========================================================= */

export const aiConfidence = {
  overall: 89,
  iceModel: 91.4,
  icebergTrajectory: 87.6,
  weather: 82.3,
  routeOptimization: 94.1,
};