"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, ShieldAlert, Utensils, GraduationCap, Building2, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminAlerts() {
  const alerts = [
    { id: 1, type: 'MDM', school: 'Model Primary A', title: 'Quality Report Failed', time: '10 mins ago', priority: 'High', desc: 'Hygiene standards not met during morning inspection.', icon: Utensils, color: 'text-red-500' },
    { id: 2, type: 'Security', school: 'GSSS Town-1', title: 'Unauthorized Entry Reported', time: '1 hour ago', priority: 'Critical', desc: 'Main gate perimeter breach detected by staff.', icon: ShieldAlert, color: 'text-red-700' },
    { id: 3, type: 'Academic', school: 'Secondary School B', title: 'High Absenteeism Rate', time: '3 hours ago', priority: 'Medium', desc: 'Attendance dropped below 60% for Grade 10-A.', icon: GraduationCap, color: 'text-orange-500' },
    { id: 4, type: 'Infrastructure', school: 'Jaipur Rural P.S.', title: 'RO System Failure', time: '5 hours ago', priority: 'High', desc: 'Drinking water system reported non-functional.', icon: Building2, color: 'text-red-500' },
  ];

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">System Alerts</h2>
            <p className="text-muted-foreground">Centralized critical incident monitoring and response.</p>
          </div>
          <Button variant="outline">Clear All Resolved</Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="active" className="font-bold">Active Alerts (12)</TabsTrigger>
            <TabsTrigger value="resolved" className="font-bold">Resolved History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-red-500 overflow-hidden hover:bg-secondary/10 transition-colors">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 p-6">
                      <div className={`p-3 rounded-xl bg-muted ${alert.color}`}>
                        <alert.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="destructive" className="text-[10px] uppercase font-bold tracking-wider">{alert.priority}</Badge>
                              <span className="text-xs font-bold text-muted-foreground">{alert.type} Alert</span>
                            </div>
                            <h3 className="text-lg font-bold text-primary">{alert.title}</h3>
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">{alert.time}</span>
                        </div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-tight">{alert.school}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{alert.desc}</p>
                        
                        <div className="flex gap-2 pt-4">
                          <Button size="sm" className="bg-primary">Initiate Response</Button>
                          <Button size="sm" variant="outline">Delegate to District Head</Button>
                          <Button size="sm" variant="ghost" className="text-accent hover:text-accent font-bold">
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Resolved
                          </Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                   <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-primary">No Recently Resolved Alerts</p>
                  <p className="text-sm text-muted-foreground">Historical alerts from the last 30 days will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
