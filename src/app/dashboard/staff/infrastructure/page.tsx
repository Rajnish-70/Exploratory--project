"use client"

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera, AlertTriangle, Plus } from 'lucide-react';

type Condition = 'Good' | 'Medium' | 'Bad';

type InfraRow = {
  id: string;
  label: string;
  condition: Condition;
  issue: string;
  photoName: string;
  isReporting: boolean;
};

const initialRows: InfraRow[] = [
  { id: 'kitchen', label: 'Kitchen Condition', condition: 'Good', issue: '', photoName: '', isReporting: false },
  { id: 'prep-1a', label: 'Classroom PREP 1A', condition: 'Good', issue: '', photoName: '', isReporting: false },
  { id: 'prep-1b', label: 'Classroom PREP 1B', condition: 'Good', issue: '', photoName: '', isReporting: false },
  { id: 'prep-2a', label: 'Classroom PREP 2A', condition: 'Good', issue: '', photoName: '', isReporting: false },
  { id: 'prep-2b', label: 'Classroom PREP 2B', condition: 'Good', issue: '', photoName: '', isReporting: false },
  { id: 'washroom-gf', label: 'Washroom Ground Floor', condition: 'Good', issue: '', photoName: '', isReporting: false },
  { id: 'assembly-area', label: 'Assembly Area', condition: 'Good', issue: '', photoName: '', isReporting: false },
  { id: 'playground', label: 'Playground', condition: 'Good', issue: '', photoName: '', isReporting: false },
];

const conditionColor = (condition: Condition) => {
  switch (condition) {
    case 'Good':
      return 'text-emerald-700 bg-emerald-100 border-emerald-200';
    case 'Medium':
      return 'text-amber-700 bg-amber-100 border-amber-200';
    case 'Bad':
      return 'text-rose-700 bg-rose-100 border-rose-200';
    default:
      return 'text-muted-foreground';
  }
};

export default function StaffInfrastructure() {
  const [rows, setRows] = useState<InfraRow[]>(initialRows);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newRowLabel, setNewRowLabel] = useState('');

  const updateCondition = (id: string, value: Condition) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, condition: value } : row)));
  };

  const toggleReporting = (id: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, isReporting: !row.isReporting } : row)));
  };

  const updateIssue = (id: string, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, issue: value } : row)));
  };

  const handlePhotoChange = (id: string, fileName: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, photoName: fileName } : row)));
  };

  const handleSubmitIssue = (id: string) => {
    const row = rows.find((row) => row.id === id);
    if (!row) return;

    alert(`Issue submitted for ${row.label}.`);
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, isReporting: false } : row)));
  };

  const handleAddRow = () => {
    const trimmed = newRowLabel.trim();
    if (!trimmed) {
      return;
    }

    setRows((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        label: trimmed,
        condition: 'Good',
        issue: '',
        photoName: '',
        isReporting: false,
      },
    ]);

    setNewRowLabel('');
    setIsAddingRow(false);
  };

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg font-headline font-bold">Infrastructure Management</CardTitle>
                <CardDescription>Track areas, submit condition updates, and report issues with photos.</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsAddingRow(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Area
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {isAddingRow ? (
              <Card className="border border-primary/10 bg-primary/5 p-4 shadow-sm">
                <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <Label htmlFor="new-infra-area" className="text-sm font-semibold text-muted-foreground">
                      New area to supervise
                    </Label>
                    <Input
                      id="new-infra-area"
                      value={newRowLabel}
                      onChange={(event) => setNewRowLabel(event.target.value)}
                      placeholder="Enter area name"
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="w-full" onClick={handleAddRow}>
                      Add
                    </Button>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => setIsAddingRow(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ) : null}
            <div className="space-y-4">
              {rows.map((row) => (
                <div key={row.id} className="rounded-3xl border border-border bg-background p-4 shadow-sm">
                  <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr_auto] lg:items-center">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{row.label}</p>
                      <p className="text-xs text-muted-foreground">Select current condition and report any issue for this area.</p>
                    </div>

                    <div>
                      <Label htmlFor={`condition-${row.id}`} className="text-xs font-semibold text-muted-foreground">
                        Condition
                      </Label>
                      <select
                        id={`condition-${row.id}`}
                        value={row.condition}
                        onChange={(event) => updateCondition(row.id, event.target.value as Condition)}
                        className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="Good">Good</option>
                        <option value="Medium">Medium</option>
                        <option value="Bad">Bad</option>
                      </select>
                      <div className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${conditionColor(row.condition)}`}>
                        {row.condition}
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center sm:justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleReporting(row.id)}
                        className="w-full sm:w-auto"
                      >
                        {row.isReporting ? 'Close report' : 'Report Issue'}
                      </Button>
                      {row.photoName ? (
                        <Badge className="rounded-full bg-primary/5 text-primary">{row.photoName}</Badge>
                      ) : null}
                    </div>
                  </div>

                  {row.isReporting ? (
                    <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-4">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`issue-${row.id}`} className="text-sm font-semibold">
                            Describe the issue
                          </Label>
                          <Textarea
                            id={`issue-${row.id}`}
                            value={row.issue}
                            onChange={(event) => updateIssue(row.id, event.target.value)}
                            placeholder="Enter issue details here"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4 text-primary" />
                            <p className="text-sm font-semibold">Upload a photo</p>
                          </div>
                          <input
                            id={`photo-${row.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) handlePhotoChange(row.id, file.name);
                            }}
                          />
                          <label
                            htmlFor={`photo-${row.id}`}
                            className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/10"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Choose photo
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Add one photo showing the issue for faster follow-up.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => handleSubmitIssue(row.id)}>
                          Submit Issue
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
