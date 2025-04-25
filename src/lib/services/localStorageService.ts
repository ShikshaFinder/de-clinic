import { Patient, Visit, RiskPrediction, Symptom } from "@/lib/types";

const STORAGE_KEYS = {
  PATIENTS: "patients",
  VISITS: "visits",
  RISK_PREDICTIONS: "risk_predictions",
  SYMPTOMS: "symptoms",
};

export const localStorageService = {
  // Patients
  getPatients: (): Patient[] => {
    const patients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return patients ? JSON.parse(patients) : [];
  },

  savePatient: (patient: Patient) => {
    const patients = localStorageService.getPatients();
    const existingIndex = patients.findIndex((p) => p.id === patient.id);

    if (existingIndex >= 0) {
      patients[existingIndex] = patient;
    } else {
      patients.push(patient);
    }

    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  },

  deletePatient: (patientId: number) => {
    const patients = localStorageService.getPatients();
    const filteredPatients = patients.filter((p) => p.id !== patientId);
    localStorage.setItem(
      STORAGE_KEYS.PATIENTS,
      JSON.stringify(filteredPatients)
    );
  },

  // Visits
  getVisits: (): Visit[] => {
    const visits = localStorage.getItem(STORAGE_KEYS.VISITS);
    return visits ? JSON.parse(visits) : [];
  },

  saveVisit: (visit: Visit) => {
    const visits = localStorageService.getVisits();
    visits.push(visit);
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(visits));
  },

  // Risk Predictions
  getRiskPredictions: (): RiskPrediction[] => {
    const predictions = localStorage.getItem(STORAGE_KEYS.RISK_PREDICTIONS);
    return predictions ? JSON.parse(predictions) : [];
  },

  saveRiskPrediction: (prediction: RiskPrediction) => {
    const predictions = localStorageService.getRiskPredictions();
    const existingIndex = predictions.findIndex(
      (p) => p.patientId === prediction.patientId
    );

    if (existingIndex >= 0) {
      predictions[existingIndex] = prediction;
    } else {
      predictions.push(prediction);
    }

    localStorage.setItem(
      STORAGE_KEYS.RISK_PREDICTIONS,
      JSON.stringify(predictions)
    );
  },

  // Symptoms
  getSymptoms: (): Symptom[] => {
    const symptoms = localStorage.getItem(STORAGE_KEYS.SYMPTOMS);
    return symptoms ? JSON.parse(symptoms) : [];
  },

  saveSymptom: (symptom: Symptom) => {
    const symptoms = localStorageService.getSymptoms();
    const existingIndex = symptoms.findIndex(
      (s) => s.symptom === symptom.symptom
    );

    if (existingIndex >= 0) {
      symptoms[existingIndex] = symptom;
    } else {
      symptoms.push(symptom);
    }

    localStorage.setItem(STORAGE_KEYS.SYMPTOMS, JSON.stringify(symptoms));
  },

  // Initialize with default data if storage is empty
  initializeDefaultData: () => {
    if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VISITS)) {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RISK_PREDICTIONS)) {
      localStorage.setItem(STORAGE_KEYS.RISK_PREDICTIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SYMPTOMS)) {
      localStorage.setItem(STORAGE_KEYS.SYMPTOMS, JSON.stringify([]));
    }
  },
};
