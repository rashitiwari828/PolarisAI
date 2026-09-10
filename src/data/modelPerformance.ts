export const modelGroups = [
  {
    title: "SEA-ICE FORECAST",
    model: "POLARIS-IceSeg v2.4",
    tone: "cyan",
    metrics: [
      {
        label: "MAE",
        value: "6.8%",
        description: "Mean Absolute Error",
      },
      {
        label: "RMSE",
        value: "9.2%",
        description: "Root Mean Squared Error",
      },
      {
        label: "24H Accuracy",
        value: "91.4%",
        description: "Forecast accuracy",
      },
      {
        label: "72H Accuracy",
        value: "84.7%",
        description: "Forecast accuracy",
      },
      {
        label: "Bias",
        value: "+0.4%",
        description: "Mean systematic error",
      },
      {
        label: "R²",
        value: "0.943",
        description: "Coefficient of determination",
      },
    ],
  },
  {
    title: "ICEBERG TRAJECTORY",
    model: "POLARIS-IceTraj v1.8",
    tone: "purple",
    metrics: [
      {
        label: "72H Position Acc.",
        value: "87.6%",
        description: "Trajectory prediction",
      },
      {
        label: "Mean Traj. Error",
        value: "8.4 km",
        description: "At 72 hours",
      },
      {
        label: "Detection Rate",
        value: "96.2%",
        description: "vs SAR ground truth",
      },
      {
        label: "False Positive",
        value: "3.8%",
        description: "Incorrect detections",
      },
    ],
  },
  {
    title: "ROUTE OPTIMIZATION",
    model: "POLARIS-PathOpt v3.1",
    tone: "green",
    metrics: [
      {
        label: "Avg Fuel Reduction",
        value: "11.8%",
        description: "vs unoptimized baseline",
      },
      {
        label: "Avg Risk Reduction",
        value: "34.2%",
        description: "vs shortest path",
      },
      {
        label: "Route Approval Rate",
        value: "94.1%",
        description: "Accepted by crew",
      },
      {
        label: "Planning Time",
        value: "< 8 sec",
        description: "Route computation",
      },
    ],
  },
];

export const actualPredictedData = [
  { actual: 56, predicted: 57 },
  { actual: 58, predicted: 59 },
  { actual: 59, predicted: 60 },
  { actual: 60, predicted: 61 },
  { actual: 61, predicted: 62 },
  { actual: 62, predicted: 63 },
  { actual: 63, predicted: 64 },
  { actual: 64, predicted: 65 },
  { actual: 65, predicted: 66 },
  { actual: 66, predicted: 67 },
  { actual: 67, predicted: 68 },
  { actual: 68, predicted: 69 },
  { actual: 70, predicted: 71 },
  { actual: 71, predicted: 72 },
  { actual: 72, predicted: 73 },
  { actual: 74, predicted: 75 },
  { actual: 75, predicted: 76 },
  { actual: 76, predicted: 77 },
  { actual: 78, predicted: 79 },
  { actual: 80, predicted: 81 },
];

export const modelImprovementData = [
  {
    month: "Mar",
    iceMae: 9.2,
    icebergAccuracy: 82.0,
  },
  {
    month: "Apr",
    iceMae: 8.8,
    icebergAccuracy: 84.0,
  },
  {
    month: "May",
    iceMae: 8.1,
    icebergAccuracy: 85.5,
  },
  {
    month: "Jun",
    iceMae: 7.6,
    icebergAccuracy: 86.2,
  },
  {
    month: "Jul",
    iceMae: 7.2,
    icebergAccuracy: 86.8,
  },
  {
    month: "Aug",
    iceMae: 6.9,
    icebergAccuracy: 87.5,
  },
  {
    month: "Sep",
    iceMae: 6.8,
    icebergAccuracy: 87.6,
  },
];

export const technicalArchitecture = [
  {
    title: "Sea-Ice Segmentation",
    model: "U-Net + Transformer",
    input: "Sentinel-1 SAR, MODIS",
    output: "Ice mask + concentration",
  },
  {
    title: "Iceberg Detection",
    model: "YOLOv8 + SAR preproc.",
    input: "Sentinel-1 dual-pol",
    output: "Bounding boxes + size",
  },
  {
    title: "Trajectory Prediction",
    model: "LSTM + Physics hybrid",
    input: "Ocean currents, wind, SSH",
    output: "Position forecast ±CI",
  },
  {
    title: "Route Optimization",
    model: "A* + Multi-objective",
    input: "Ice, iceberg, weather grids",
    output: "Optimal waypoints",
  },
];