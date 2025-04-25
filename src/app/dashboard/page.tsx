"use client";

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
  patients,
  symptomsData,
  visitHistoryData,
  diseaseProgressionData,
  visitFrequencyData,
  riskPredictions,
  activeCases,
  recentVisits,
} from "@/lib/data";
import { SeverityLevel } from "@/lib/types";

const chartConfig = {
  visits: {
    label: "Visits",
    color: "#2563eb",
  },
  severity: {
    label: "Severity",
    color: "#dc2626",
  },
} satisfies ChartConfig;

const severityMap: Record<SeverityLevel, number> = {
  Mild: 1,
  Moderate: 2,
  Severe: 3,
};

export default function DashboardPage() {
  const totalPatients = patients.length;
  const activeCasesCount = activeCases.length;
  const averageSeverity = Math.round(
    ((patients.reduce((acc, patient) => {
      return acc + severityMap[patient.severity];
    }, 0) /
      patients.length) *
      100) /
      3
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Digital Patient Record & Analysis
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Add New Patient
          </button>
          <button className="px-4 py-2 border rounded-md">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(totalPatients * 0.12)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCasesCount}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(activeCasesCount * 0.25)} new cases today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Severity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSeverity}%</div>
            <Progress value={averageSeverity} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Risk Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {Math.round(
                riskPredictions.reduce((acc, pred) => acc + pred.risk, 0) /
                  riskPredictions.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Average risk across patients
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Visit History</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={visitHistoryData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
                  <Bar
                    dataKey="severity"
                    fill="var(--color-severity)"
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Symptoms Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {symptomsData.map((symptom) => (
                <div
                  key={symptom.symptom}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    <span>{symptom.symptom}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Frequency: {symptom.frequency}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Severity: {symptom.severity}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visit Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={visitFrequencyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVisits.map((visit) => (
                <div
                  key={`${visit.patientId}-${visit.date}`}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{visit.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {visit.reason}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(visit.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskPredictions.map((prediction) => (
                <div
                  key={prediction.patientId}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {
                        patients.find((p) => p.id === prediction.patientId)
                          ?.name
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {prediction.condition}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">
                      {prediction.risk}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {prediction.factors.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
