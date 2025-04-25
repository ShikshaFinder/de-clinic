export const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    lastVisit: "2024-04-20",
    condition: "Hypertension",
    severity: "Moderate",
    bmi: 24.5,
    bloodPressure: "130/85",
    allergies: ["Penicillin", "Peanuts"],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    ],
    visits: [
      {
        date: "2024-04-20",
        reason: "Routine Checkup",
        notes: "Blood pressure slightly elevated",
      },
      {
        date: "2024-03-15",
        reason: "Follow-up",
        notes: "Medication adjustment needed",
      },
      { date: "2024-02-10", reason: "Emergency", notes: "Severe headache" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    contact: "+1 (555) 987-6543",
    email: "jane.smith@example.com",
    lastVisit: "2024-04-18",
    condition: "Diabetes",
    severity: "Mild",
    bmi: 22.8,
    bloodPressure: "120/80",
    allergies: ["None"],
    medications: [
      { name: "Insulin", dosage: "10 units", frequency: "Before meals" },
    ],
    visits: [
      {
        date: "2024-04-18",
        reason: "Blood sugar check",
        notes: "Levels stable",
      },
      { date: "2024-03-20", reason: "Routine Checkup", notes: "All good" },
    ],
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    contact: "+1 (555) 456-7890",
    email: "robert.j@example.com",
    lastVisit: "2024-04-15",
    condition: "Asthma",
    severity: "Severe",
    bmi: 26.2,
    bloodPressure: "135/90",
    allergies: ["Dust", "Pollen"],
    medications: [
      { name: "Albuterol", dosage: "2 puffs", frequency: "As needed" },
      { name: "Fluticasone", dosage: "1 puff", frequency: "Twice daily" },
    ],
    visits: [
      {
        date: "2024-04-15",
        reason: "Asthma attack",
        notes: "Required nebulizer treatment",
      },
      { date: "2024-03-25", reason: "Follow-up", notes: "Symptoms improving" },
    ],
  },
];

export const symptomsData = [
  { symptom: "Headache", frequency: 12, severity: 3, patients: [1, 3] },
  { symptom: "Fever", frequency: 8, severity: 4, patients: [2, 3] },
  { symptom: "Fatigue", frequency: 15, severity: 2, patients: [1, 2, 3] },
  { symptom: "Cough", frequency: 10, severity: 3, patients: [3] },
  { symptom: "Pain", frequency: 6, severity: 4, patients: [1] },
];

export const visitHistoryData = [
  { date: "Jan", visits: 2, severity: 3 },
  { date: "Feb", visits: 1, severity: 2 },
  { date: "Mar", visits: 3, severity: 4 },
  { date: "Apr", visits: 2, severity: 3 },
  { date: "May", visits: 4, severity: 5 },
  { date: "Jun", visits: 1, severity: 2 },
];

export const diseaseProgressionData = [
  { date: "Jan", severity: 2 },
  { date: "Feb", severity: 3 },
  { date: "Mar", severity: 4 },
  { date: "Apr", severity: 3 },
  { date: "May", severity: 5 },
  { date: "Jun", severity: 4 },
];

export const visitFrequencyData = [
  { month: "Jan", visits: 2 },
  { month: "Feb", visits: 1 },
  { month: "Mar", visits: 3 },
  { month: "Apr", visits: 2 },
  { month: "May", visits: 4 },
  { month: "Jun", visits: 1 },
];

export const riskPredictions = [
  {
    patientId: 1,
    risk: 70,
    condition: "Respiratory Disease",
    factors: ["Smoking history", "Family history", "Age"],
  },
  {
    patientId: 2,
    risk: 45,
    condition: "Cardiovascular Disease",
    factors: ["High cholesterol", "Sedentary lifestyle"],
  },
  {
    patientId: 3,
    risk: 85,
    condition: "Severe Asthma Attack",
    factors: ["Recent hospitalization", "Pollen season", "Stress levels"],
  },
];

export const activeCases = patients.filter((patient) =>
  patient.visits.some(
    (visit) =>
      new Date(visit.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  )
);

export const recentVisits = patients
  .flatMap((patient) =>
    patient.visits.map((visit) => ({
      ...visit,
      patientName: patient.name,
      patientId: patient.id,
    }))
  )
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);
