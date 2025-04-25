import {
  Patient,
  Visit,
  RiskPrediction,
  Symptom,
  VisitHistoryData,
  DiseaseProgressionData,
  VisitFrequencyData,
} from "./types";

export const patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "+1234567890",
    email: "john@example.com",
    lastVisit: "2024-03-15",
    condition: "Hypertension",
    severity: "Moderate",
    bmi: "25.5",
    bloodPressure: "140/90",
    allergies: ["Penicillin"],
    medications: [
      { name: "Lisinopril", dosage: "10mg" },
      { name: "Metoprolol", dosage: "50mg" },
    ],
  },
  // Add more patients as needed
];

export const recentVisits: Visit[] = [
  {
    patientId: 1,
    patientName: "John Doe",
    date: "2024-03-15",
    reason: "Routine Checkup",
  },
  // Add more visits as needed
];

export const riskPredictions: RiskPrediction[] = [
  {
    patientId: 1,
    condition: "Hypertension",
    risk: 65,
    factors: ["High BMI", "Family History", "Sedentary Lifestyle"],
  },
  // Add more predictions as needed
];

export const symptomsData: Symptom[] = [
  {
    symptom: "Headache",
    frequency: 3,
    severity: 4,
  },
  // Add more symptoms as needed
];

export const visitHistoryData: VisitHistoryData[] = [
  {
    date: "2024-03",
    visits: 5,
    severity: 2,
  },
  // Add more history data as needed
];

export const diseaseProgressionData: DiseaseProgressionData[] = [
  {
    date: "2024-03",
    severity: 2,
  },
  // Add more progression data as needed
];

export const visitFrequencyData: VisitFrequencyData[] = [
  {
    month: "Mar",
    visits: 5,
  },
  // Add more frequency data as needed
];

export const activeCases = patients.filter(
  (patient) => patient.severity === "Moderate" || patient.severity === "Severe"
);
