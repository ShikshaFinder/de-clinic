import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Profile</h1>
        <Button>Edit Profile</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value="John Doe" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" value="1990-01-01" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Input value="Male" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input value="+1 (555) 123-4567" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value="john.doe@example.com" readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Allergies</Label>
              <Textarea
                value="Penicillin, Peanuts"
                readOnly
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Chronic Conditions</Label>
              <Textarea
                value="Type 2 Diabetes, Hypertension"
                readOnly
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Metformin</TableCell>
                <TableCell>500mg</TableCell>
                <TableCell>Twice daily</TableCell>
                <TableCell>2024-01-01</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lisinopril</TableCell>
                <TableCell>10mg</TableCell>
                <TableCell>Once daily</TableCell>
                <TableCell>2024-01-01</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
