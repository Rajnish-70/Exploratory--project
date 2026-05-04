"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MOCK_STUDENTS } from '@/lib/db';
import { GraduationCap, Save, Plus, Search, Filter, TrendingUp } from 'lucide-react';

export default function TeacherMarks() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Academic Evaluation</h2>
            <p className="text-muted-foreground">Record and manage student performance for Grade 10-A.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> New Test</Button>
            <Button className="bg-accent"><Save className="mr-2 h-4 w-4" /> Save All</Button>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search student name..." className="pl-10" />
          </div>
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Subject: Math</Button>
        </div>

        <Card className="border-t-4 border-t-primary shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-lg">Unit Test Series - II</CardTitle>
                <CardDescription>Mathematics (Max Marks: 100)</CardDescription>
              </div>
              <Badge variant="secondary" className="font-bold">Pending: 5 Students</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Current Grade</TableHead>
                  <TableHead className="w-[150px]">Enter Marks</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_STUDENTS.map((student) => {
                  const mathScore = student.marks.find(m => m.subject === 'Math')?.score || 0;
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-mono text-xs">{student.id}</TableCell>
                      <TableCell className="font-bold text-sm">{student.name}</TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                           <span className="font-bold text-primary">{mathScore}%</span>
                           <TrendingUp className="h-3 w-3 text-accent" />
                         </div>
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={mathScore} className="h-8 w-24 font-bold" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={mathScore > 0 ? "default" : "outline"} className={mathScore > 0 ? "bg-accent" : ""}>
                          {mathScore > 0 ? "Evaluated" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" /> Class Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Class Average</span>
                <span className="font-bold text-primary text-lg">84.2%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Highest Score</span>
                <span className="font-bold text-accent text-lg">96%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Students above 90%</span>
                <span className="font-bold text-orange-500 text-lg">8</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <p className="text-xs text-muted-foreground leading-relaxed">
                 After saving these marks, you can trigger the AI Insights tool on the Home screen to identify students who might need extra attention before the final exams.
               </p>
               <Button variant="link" className="p-0 h-auto text-xs font-bold text-primary">Download Progress Report PDF</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}