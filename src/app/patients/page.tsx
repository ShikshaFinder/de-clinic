"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Patient } from "@/lib/services/types";
import { patientService } from "@/lib/services/patientService";

interface Medication {
  name: string;
  dosage: string;
}

interface ExtendedPatient extends Patient {
  age?: number;
  bmi?: string;
  bloodPressure?: string;
  medications: Medication[];
  allergies: string[];
  severity: "Mild" | "Moderate" | "Severe";
}

type SeverityLevel = "Mild" | "Moderate" | "Severe";

const severityOrder: Record<SeverityLevel, number> = {
  Severe: 0,
  Moderate: 1,
  Mild: 2,
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<ExtendedPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("lastVisit");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getAllPatients();
        const extendedData = data.map((patient) => ({
          ...patient,
          age: calculateAge(patient.dob),
          medications: [],
          allergies: patient.allergies || [],
          severity: patient.severity as SeverityLevel,
        }));
        setPatients(extendedData);
      } catch (err) {
        setError("Failed to fetch patients");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const filteredPatients = patients
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.condition || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      if (selectedFilter === "all") return matchesSearch;
      return matchesSearch && patient.severity === selectedFilter;
    })
    .sort((a, b) => {
      if (sortBy === "lastVisit") {
        return (
          new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
        );
      }
      if (sortBy === "severity") {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return 0;
    });

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

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Care Management</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search by name or condition..."
            className="w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Patients</option>
            <option value="Mild">Mild Cases</option>
            <option value="Moderate">Moderate Cases</option>
            <option value="Severe">Severe Cases</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="lastVisit">Sort by Last Visit</option>
            <option value="severity">Sort by Severity</option>
          </select>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Add New Patient
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{patient.name}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    patient.severity === "Mild"
                      ? "bg-green-100 text-green-800"
                      : patient.severity === "Moderate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {patient.severity}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Age</div>
                    <div className="font-medium">{patient.age}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Gender</div>
                    <div className="font-medium">{patient.gender}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Condition</div>
                  <div className="font-medium">{patient.condition}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Last Visit</div>
                  <div className="font-medium">
                    {patient.lastVisit
                      ? new Date(patient.lastVisit).toLocaleDateString()
                      : "No visits"}
                  </div>
                </div>

                {patient.allergies && patient.allergies.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-500">Allergies</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {patient.medications && patient.medications.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-500">
                      Current Medications
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.medications.map((medication, index) => (
                        <span
                          key={`${medication.name}-${index}`}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded"
                        >
                          {medication.name} ({medication.dosage})
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    View Full Analysis
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
