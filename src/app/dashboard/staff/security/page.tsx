"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, AlertTriangle, UserCheck, Clock, MapPin, Camera } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function StaffSecurity() {
  const securityLogs = [
    { time: '08:00 AM', zone: 'Main Gate', status: 'Secure', agent: 'Laxmi Devi' },
    { time: '09:30 AM', zone: 'Staff Parking', status: 'Secure', agent: 'Laxmi Devi' },
    { time: '11:15 AM', zone: 'Kitchen Perimeter', status: 'Unusual Activity', agent: 'Laxmi Devi' },
  ];

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Security & Patrol</h2>
            <p className="text-muted-foreground">Monitor campus perimeter and report security incidents.</p>
          </div>
          <Button variant="destructive" className="font-bold">
            <AlertTriangle className="mr-2 h-4 w-4" /> SOS Alert
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">New Security Log</CardTitle>
              <CardDescription>Record a manual patrol check.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Zone / Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g. Science Lab Area" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Observation</Label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Describe what you see..."
                />
              </div>
              <div className="flex gap-2">
                <Button className="w-full font-bold">Log Patrol</Button>
                <Button variant="outline" size="icon"><Camera className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Patrol History - Today</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityLogs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" /> {log.time}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-sm">{log.zone}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === 'Secure' ? 'outline' : 'destructive'} className={log.status === 'Secure' ? 'text-accent border-accent' : ''}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Active Safety Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>Morning Gate Locking: 08:15 AM (Completed)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>Visitor Log Verification: Hourly</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span>Afternoon Gate Shift: 02:30 PM (Pending)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-orange-700">
                <UserCheck className="h-4 w-4" /> Guest Policy Reminder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-orange-800 leading-relaxed">
                All guests must present ID at the main gate. No unauthorized vehicles allowed beyond the staff parking area during school hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
