export const analyticsMetrics = [
  {
    value: "11.8%",
    label: "Fuel Saved",
    subLabel: "vs baseline route",
    icon: "⚡",
    tone: "cyan",
  },
  {
    value: "34.2%",
    label: "Risk Reduction",
    subLabel: "vs unoptimized path",
    icon: "♡",
    tone: "green",
  },
  {
    value: "87.6%",
    label: "Iceberg Prediction",
    subLabel: "72h accuracy",
    icon: "◆",
    tone: "purple",
  },
  {
    value: "91.4%",
    label: "Sea-Ice Forecast",
    subLabel: "24h accuracy",
    icon: "❄",
    tone: "cyan",
  },
] as const;

export const seaIceTrendData = [
  { day: "01 Sep", observed: 58, predicted: 59 },
  { day: "02 Sep", observed: 60, predicted: 61 },
  { day: "03 Sep", observed: 61, predicted: 62 },
  { day: "04 Sep", observed: 62, predicted: 63 },
  { day: "05 Sep", observed: 63, predicted: 64 },
  { day: "06 Sep", observed: 63, predicted: 64 },
  { day: "07 Sep", observed: 64, predicted: 65 },
  { day: "08 Sep", observed: 64, predicted: 71 },
];

export const routeRiskData = [
  { day: "01 Sep", risk: 28 },
  { day: "02 Sep", risk: 24 },
  { day: "03 Sep", risk: 31 },
  { day: "04 Sep", risk: 22 },
  { day: "05 Sep", risk: 18 },
  { day: "06 Sep", risk: 21 },
  { day: "07 Sep", risk: 19 },
  { day: "08 Sep", risk: 11 },
];

export const fuelConsumptionData = [
  { day: "01", polaris: 2100, baseline: 2380 },
  { day: "02", polaris: 2050, baseline: 2380 },
  { day: "03", polaris: 2150, baseline: 2380 },
  { day: "04", polaris: 2000, baseline: 2380 },
  { day: "05", polaris: 2080, baseline: 2380 },
  { day: "06", polaris: 2020, baseline: 2380 },
  { day: "07", polaris: 1980, baseline: 2380 },
  { day: "08", polaris: 2100, baseline: 2380 },
];

export const icebergDetectionData = [
  { day: "01 Sep", detected: 4, confirmed: 4 },
  { day: "02 Sep", detected: 5, confirmed: 4 },
  { day: "03 Sep", detected: 5, confirmed: 5 },
  { day: "04 Sep", detected: 6, confirmed: 5 },
  { day: "05 Sep", detected: 5, confirmed: 5 },
  { day: "06 Sep", detected: 6, confirmed: 6 },
  { day: "07 Sep", detected: 5, confirmed: 5 },
  { day: "08 Sep", detected: 5, confirmed: 5 },
];

export const missionEfficiency = [
  { label: "Total distance", value: "1,925 km" },
  { label: "Voyage duration", value: "83h 30m" },
  { label: "Fuel consumed", value: "12,650 L" },
  { label: "Fuel saved", value: "1,750 L" },
  { label: "Risk events avoided", value: "3" },
  { label: "AI route updates", value: "4" },
];