export type IcebergRisk = "LOW" | "MODERATE" | "HIGH";

export interface TrajectoryPrediction {
  iceberg_id: string;
  prediction_time: string;
  horizon_hours: 6 | 12 | 24 | 48;
  predicted_latitude: number;
  predicted_longitude: number;
  uncertainty_km: number | null;
  prediction_method:
    | "Dead Reckoning"
    | "XGBoost"
    | "Unavailable";
}

export interface TrackedIceberg {
  id: string;
  name: string;
  risk: IcebergRisk;

  latitude: number;
  longitude: number;

  size: string;
  mass: string;
  speed: string;
  direction: string;

  calvedFrom: string;
  detectedBy: string;

  firstDetected: string;
  lastUpdated: string;

  detectionConfidence: number;

  trajectory: TrajectoryPrediction[];

  collisionProbability: number;
  collisionDistance: string;
}