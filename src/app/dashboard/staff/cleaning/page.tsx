"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trash2, Droplets, Sparkles, CheckCircle2, Clock, Info, Plus } from 'lucide-react';

export default function StaffCleaning() {
  const areas = [
    { name: 'Grade 10 Classrooms', status: 'Completed', time: '07:45 AM', progress: 100 },
    { name: 'Primary Block Washrooms', status: 'In Progress', time: '09:30 AM', progress: 50 },
    { name: 'Staff Room & Office', status: 'Pending', time: '11:00 AM', progress: 0 },
    { name: 'Playground Perimeter', status: 'Scheduled', time: '02:00 PM', progress: 0 },
  ];

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Hygiene & Cleaning</h2>
            <p className="text-muted-foreground">Daily sanitation schedule and area checklists.</p>
          </div>
          <Button className="bg-accent">
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Water Tank</p>
                  <p className="text-2xl font-bold">Clean</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Compliance</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Waste Disp.</p>
                  <p className="text-2xl font-bold">Logged</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Verified</p>
                  <p className="text-2xl font-bold">8/12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Area Maintenance Progress</CardTitle>
            <CardDescription>Track the cleaning status of various school wings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {areas.map((area, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${area.status === 'Completed' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        {area.status === 'Completed' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{area.name}</p>
                        <p className="text-xs text-muted-foreground">Scheduled for {area.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={area.status === 'Completed' ? 'default' : 'secondary'} className={area.status === 'Completed' ? 'bg-accent' : ''}>
                        {area.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={area.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary bg-primary/5">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-primary">Sanitation Protocol Reminder</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ensure all high-touch surfaces in the Science Labs and Library are sanitized with the approved solutions before 04:00 PM. Weekly deep cleaning of the water drainage system is scheduled for this Friday.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
