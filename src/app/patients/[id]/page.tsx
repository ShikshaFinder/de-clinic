"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Patient } from "@/lib/types";
import { localStorageService } from "@/lib/services/localStorageService";

export default function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const patientId = parseInt(params.id);
    const storedPatients = localStorageService.getPatients();
    const foundPatient = storedPatients.find((p) => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      router.push("/patients");
    }
  }, [params.id, router]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      localStorageService.deletePatient(patient!.id);
      router.push("/patients");
    }
  };

  const handleEdit = () => {
    router.push(`/patients/${patient!.id}/edit`);
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Details</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push("/patients")}>
            Back to Patients
          </Button>
          <Button onClick={handleEdit}>Edit Patient</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Patient
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{patient.age}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{patient.contact}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{patient.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Visit</p>
                <p className="font-medium">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Condition</p>
                <p className="font-medium">{patient.condition}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Severity</p>
                <p
                  className={`font-medium ${
                    patient.severity === "Mild"
                      ? "text-green-600"
                      : patient.severity === "Moderate"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {patient.severity}
                </p>
              </div>
              {patient.bmi && (
                <div>
                  <p className="text-sm text-muted-foreground">BMI</p>
                  <p className="font-medium">{patient.bmi}</p>
                </div>
              )}
              {patient.bloodPressure && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Blood Pressure
                  </p>
                  <p className="font-medium">{patient.bloodPressure}</p>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Allergies</p>
              <div className="flex flex-wrap gap-2">
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

            <div>
              <p className="text-sm text-muted-foreground mb-2">Medications</p>
              <div className="flex flex-wrap gap-2">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
