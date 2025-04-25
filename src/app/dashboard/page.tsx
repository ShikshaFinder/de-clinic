"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Patient,
  Visit,
  PatternDetected,
  Disease,
  Symptom,
} from "@/lib/services/types";
import { patientService } from "@/lib/services/patientService";
import { medicalService } from "@/lib/services/medicalService";
import { patternService } from "@/lib/services/patternService";

interface VisitFrequencyData {
  month: string;
  visits: number;
}

interface DiseaseProgressionData {
  date: string;
  severity: string;
}

interface PatientHistory {
  visits: Visit[];
  diseases: Disease[];
  symptoms: Symptom[];
}

const chartConfig = {
  visits: {
    label: "Visits",
    color: "#2563eb",
  },
  severity: {
    label: "Severity",
    color: "#dc2626",
  },
  symptoms: {
    label: "Symptoms",
    color: "#047857",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientHistory, setPatientHistory] = useState<PatientHistory | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await patientService.getAllPatients();

        // Fetch additional data for each patient
        const patientsWithData = await Promise.all(
          patientsData.map(async (patient) => {
            const [visits, patterns] = await Promise.all([
              patientService.getPatientVisits(patient.id),
              patternService.getPatternsByPatientId(patient.id),
            ]);

            return {
              ...patient,
              visits: visits || [],
              patterns: patterns || [],
            };
          })
        );

        setPatients(patientsWithData);
        if (patientsWithData.length > 0) {
          setSelectedPatient(patientsWithData[0]);
          fetchPatientHistory(patientsWithData[0].id);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPatientHistory = async (patientId: number) => {
    try {
      const history = await patientService.getPatientMedicalHistory(patientId);
      setPatientHistory(history);
    } catch (err) {
      console.error("Error fetching patient history:", err);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient.condition || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  // Calculate visit frequency data
  const visitFrequencyData: VisitFrequencyData[] =
    selectedPatient?.visits?.reduce((acc: VisitFrequencyData[], visit) => {
      const month = new Date(visit.visit_date).toLocaleDateString("en-US", {
        month: "short",
      });
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.visits += 1;
      } else {
        acc.push({ month, visits: 1 });
      }
      return acc;
    }, []) || [];

  // Calculate disease progression data
  const diseaseProgressionData: DiseaseProgressionData[] =
    patientHistory?.visits?.map((visit) => ({
      date: new Date(visit.visit_date).toLocaleDateString("en-US", {
        month: "short",
      }),
      severity: visit.severity_level,
    })) || [];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Patient List */}
      <div className="w-1/4 p-4 border-r overflow-y-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className={`p-4 border rounded cursor-pointer ${
                selectedPatient?.id === patient.id ? "bg-blue-50" : ""
              }`}
              onClick={() => {
                setSelectedPatient(patient);
                fetchPatientHistory(patient.id);
              }}
            >
              <h3 className="font-semibold">{patient.name}</h3>
              <p className="text-sm text-gray-600">
                {patient.condition} - {patient.severity}
              </p>
              <p className="text-xs text-gray-500">
                Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedPatient && (
          <>
            {/* Patient Overview */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">Patient Overview</h1>
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{selectedPatient.name}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Age</div>
                    <div className="font-medium">
                      {new Date().getFullYear() -
                        new Date(selectedPatient.dob).getFullYear()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Condition</div>
                    <div className="font-medium">
                      {selectedPatient.condition}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Severity</div>
                    <div className="font-medium">
                      {selectedPatient.severity}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Medical History */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Medical History</h2>
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.visits.map((visit) => (
                        <div key={visit.id} className="border-b pb-2">
                          <div className="font-medium">
                            {new Date(visit.visit_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            Diagnosis: {visit.diagnosis}
                          </div>
                          <div className="text-sm text-gray-600">
                            Prescription: {visit.prescription}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Disease Progression</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={diseaseProgressionData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="severity"
                            stroke="var(--color-severity)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Risk Analysis</h2>
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pattern Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedPatient.patterns?.map((pattern) => (
                      <div key={pattern.id} className="mb-4">
                        <div className="font-medium">
                          {pattern.pattern_description}
                        </div>
                        <div className="text-sm text-gray-600">
                          Risk Level: {pattern.risk_level}
                        </div>
                        <div className="text-sm text-gray-600">
                          Recommendation: {pattern.recommendation}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Visit Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={visitFrequencyData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="visits" fill="var(--color-visits)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
