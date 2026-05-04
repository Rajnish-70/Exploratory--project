"use client"

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MOCK_STUDENTS } from '@/lib/db';
import { Calendar as CalendarIcon, Save, History } from 'lucide-react';
import { format } from 'date-fns';

export default function TeacherAttendance() {
  const [mounted, setMounted] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAttendance(Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, true])));
  }, []);

  const toggleAttendance = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const saveAttendance = () => {
    // TODO: Implement saving to database
    console.log('Saving attendance:', attendance);
    alert('Attendance saved successfully!');
  };

  const showHistory = () => {
    setIsHistoryOpen(true);
  };

  // Safe date rendering for hydration
  const todayLabel = mounted ? format(new Date(), 'MMMM d, yyyy') : 'Loading date...';

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Class Attendance</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> {todayLabel}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={showHistory}>
              <History className="mr-2 h-4 w-4" /> History
            </Button>
            <Button className="bg-accent" onClick={saveAttendance}>
              <Save className="mr-2 h-4 w-4" /> Save Record
            </Button>
          </div>
        </div>

        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-headline">Daily Log - Grade 10A</CardTitle>
                <CardDescription>Mark present or absent for each student today.</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">
                  Present: {mounted ? Object.values(attendance).filter(Boolean).length : '--'} / {MOCK_STUDENTS.length}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_STUDENTS.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-xs">{student.id}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center gap-4">
                        {!mounted ? (
                          <span className="text-muted-foreground text-xs">...</span>
                        ) : (
                          <>
                            <span className={attendance[student.id] ? "text-accent font-bold text-xs" : "text-muted-foreground text-xs"}>
                              {attendance[student.id] ? "PRESENT" : "ABSENT"}
                            </span>
                            <Checkbox 
                              checked={attendance[student.id] || false} 
                              onCheckedChange={() => toggleAttendance(student.id)}
                              className="h-5 w-5 border-2 border-primary data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                            />
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Attendance History</DialogTitle>
              <DialogDescription>
                View attendance records for the past week.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Recent attendance records:</p>
                <ul className="mt-2 space-y-1">
                  <li>• May 1, 2026: 42/45 present</li>
                  <li>• April 30, 2026: 44/45 present</li>
                  <li>• April 29, 2026: 43/45 present</li>
                  <li>• April 28, 2026: 41/45 present</li>
                  <li>• April 27, 2026: 45/45 present</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
