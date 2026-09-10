export type AlertType = "CRITICAL" | "WARNING" | "INFO";

export interface AlertData {
  id: string;
  type: AlertType;
  title: string;
  timestamp: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  actionLabel?: string;
  actionTarget?: "route" | "icebergs" | "sea-ice" | "weather" | "satellite";
}

export const alertSummary = {
  critical: 1,
  warning: 2,
  info: 2,
  total: 5,
};

export const alerts: AlertData[] = [
  {
    id: "AL-001",
    type: "CRITICAL",
    title: "ICEBERG INTERSECTION",
    timestamp: "08 SEP • 18:42 UTC • Just now",
    description:
      "Iceberg A23 (1.8 × 0.7 km, HIGH risk) predicted to intersect current planned route in approximately 31 hours. Collision probability: 72%. Immediate rerouting recommended.",
    metrics: [
      {
        label: "Iceberg",
        value: "A23",
      },
      {
        label: "Intersection in",
        value: "~31 hours",
      },
      {
        label: "Collision prob.",
        value: "72%",
      },
      {
        label: "Distance",
        value: "18.4 km from route",
      },
    ],
    actionLabel: "TRACK ICEBERG →",
    actionTarget: "icebergs",
  },

  {
    id: "AL-002",
    type: "WARNING",
    title: "SEA-ICE CONCENTRATION INCREASE",
    timestamp: "08 SEP • 16:30 UTC • 2h 12m ago",
    description:
      "Sea-ice concentration along the eastern corridor is expected to exceed 75% within the next 48 hours, based on POLARIS-AI v2.4 forecast. Northern passage recommended as alternative.",
    metrics: [
      {
        label: "Region",
        value: "Eastern Corridor",
      },
      {
        label: "Expected onset",
        value: "T+48h",
      },
      {
        label: "Forecast conc.",
        value: "71% → 76%",
      },
      {
        label: "Affected range",
        value: "~320 km",
      },
    ],
    actionLabel: "VIEW SEA-ICE FORECAST →",
    actionTarget: "sea-ice",
  },

  {
    id: "AL-003",
    type: "WARNING",
    title: "WEATHER DETERIORATION",
    timestamp: "08 SEP • 14:00 UTC • 4h 42m ago",
    description:
      "Low pressure system approaching from NW. Wind speed forecast to exceed 30 kn between T+10h and T+28h. Wave height up to 4.1 m. Vessel speed may need to be reduced.",
    metrics: [
      {
        label: "Max wind",
        value: "34 kn",
      },
      {
        label: "Max wave",
        value: "4.1 m",
      },
      {
        label: "Duration",
        value: "~18 hours",
      },
      {
        label: "Impact",
        value: "Moderate",
      },
    ],
    actionLabel: "VIEW WEATHER DETAILS →",
    actionTarget: "weather",
  },

  {
    id: "AL-004",
    type: "INFO",
    title: "SATELLITE UPDATE PROCESSED",
    timestamp: "08 SEP • 18:42 UTC • Just now",
    description:
      "New Sentinel-1 SAR observation over the planned route corridor has been processed. Ice segmentation complete with 94.2% confidence. All chart overlays updated.",
    metrics: [
      {
        label: "Satellite",
        value: "Sentinel-1 SAR",
      },
      {
        label: "Coverage",
        value: "1,250 × 1,250 km",
      },
      {
        label: "Confidence",
        value: "94.2%",
      },
      {
        label: "Status",
        value: "✓ Complete",
      },
    ],
    actionLabel: "VIEW SATELLITE DATA →",
    actionTarget: "satellite",
  },

  {
    id: "AL-005",
    type: "INFO",
    title: "ROUTE OPTIMIZATION COMPLETE",
    timestamp: "08 SEP • 06:12 UTC • 12h 30m ago",
    description:
      "POLARIS AI completed daily route optimization. Current trajectory assessed as optimal for next 18 hours. Fuel efficiency score: 88/100. Safety score: 92/100.",
    metrics: [
      {
        label: "Status",
        value: "Optimal",
      },
      {
        label: "Valid for",
        value: "Next 18 hours",
      },
      {
        label: "Safety score",
        value: "92/100",
      },
      {
        label: "Fuel score",
        value: "88/100",
      },
    ],
    actionLabel: "VIEW ROUTE DETAILS →",
    actionTarget: "route",
  },
];