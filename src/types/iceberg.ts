export type IcebergRisk = "LOW" | "MODERATE" | "HIGH";

export interface IcebergPosition {
  latitude: number;
  longitude: number;
  hours: number;
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

  trajectory: IcebergPosition[];

  collisionProbability: number;
  collisionDistance: string;
}