"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { patients } from "@/lib/data";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Records</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search patients..."
            className="w-[300px]"
          />
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Add New Patient
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <Card key={patient.id}>
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
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Age</span>
                  <span>{patient.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Gender</span>
                  <span>{patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Contact</span>
                  <span>{patient.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span>{patient.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Visit
                  </span>
                  <span>
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Condition
                  </span>
                  <span>{patient.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">BMI</span>
                  <span>{patient.bmi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Blood Pressure
                  </span>
                  <span>{patient.bloodPressure}</span>
                </div>
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Allergies</h4>
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
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Medications</h4>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
