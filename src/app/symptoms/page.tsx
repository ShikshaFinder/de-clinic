import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const emojiOptions = [
  { value: "😊", label: "Very Good" },
  { value: "🙂", label: "Good" },
  { value: "😐", label: "Neutral" },
  { value: "😕", label: "Bad" },
  { value: "😫", label: "Very Bad" },
];

const symptoms = [
  { name: "Headache", severity: "😕", time: "2h ago" },
  { name: "Fatigue", severity: "😐", time: "4h ago" },
  { name: "Fever", severity: "🙂", time: "6h ago" },
];

export default function SymptomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Symptom Tracker</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Symptom</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Symptom</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Symptom</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select symptom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="headache">Headache</SelectItem>
                    <SelectItem value="fever">Fever</SelectItem>
                    <SelectItem value="fatigue">Fatigue</SelectItem>
                    <SelectItem value="nausea">Nausea</SelectItem>
                    <SelectItem value="pain">Pain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <div className="flex space-x-2">
                  {emojiOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="icon"
                      className="text-2xl"
                    >
                      {option.value}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Input placeholder="Add any additional notes" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symptom</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {symptoms.map((symptom) => (
                  <TableRow key={symptom.name}>
                    <TableCell>{symptom.name}</TableCell>
                    <TableCell className="text-2xl">
                      {symptom.severity}
                    </TableCell>
                    <TableCell>{symptom.time}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Symptom Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">Morning</div>
                <div className="flex space-x-2">
                  <span className="text-2xl">😐</span>
                  <span className="text-2xl">😕</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Afternoon</div>
                <div className="flex space-x-2">
                  <span className="text-2xl">🙂</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Evening</div>
                <div className="flex space-x-2">
                  <span className="text-2xl">😊</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
