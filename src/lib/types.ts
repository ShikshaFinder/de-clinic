export type SeverityLevel = "Mild" | "Moderate" | "Severe";

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  lastVisit: string;
  condition: string;
  severity: SeverityLevel;
  bmi?: string;
  bloodPressure?: string;
  allergies: string[];
  medications: Medication[];
}

export interface Medication {
  name: string;
  dosage: string;
}

export interface Visit {
  patientId: number;
  patientName: string;
  date: string;
  reason: string;
}

export interface RiskPrediction {
  patientId: number;
  condition: string;
  risk: number;
  factors: string[];
}

export interface Symptom {
  symptom: string;
  frequency: number;
  severity: number;
}

export interface VisitHistoryData {
  date: string;
  visits: number;
  severity: number;
}

export interface DiseaseProgressionData {
  date: string;
  severity: number;
}

export interface VisitFrequencyData {
  month: string;
  visits: number;
}
