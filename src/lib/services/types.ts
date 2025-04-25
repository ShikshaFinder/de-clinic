export interface Patient {
  id: number;
  name: string;
  dob: string;
  gender: string;
  contact: string;
  email: string;
  address: string;
  lastVisit: string;
  severity: string;
  condition: string;
  allergies: string[];
  visits: Visit[];
  patterns?: PatternDetected[];
}

export interface Disease {
  id: number;
  name: string;
  severity_level: string;
  category: string;
}

export interface Symptom {
  id: number;
  name: string;
  description: string;
}

export interface Visit {
  id: number;
  patient_id: number;
  visit_date: string;
  diagnosis: string;
  prescription: string;
  fees: number;
  severity_level: string;
}

export interface MedicalHistory {
  id: number;
  visit_id: number;
  disease_id: number;
  symptom_id: number;
}

export interface PatternDetected {
  id: number;
  patient_id: number;
  pattern_description: string;
  detected_on: string;
  risk_level: string;
  recommendation: string;
}
