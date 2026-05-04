
"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Utensils, Scale, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StaffMeals() {
  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-headline font-bold text-primary">Meal Management</h2>
          <Badge className="bg-accent">Today: Rice & Sambhar</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Daily Meal Entry
              </CardTitle>
              <CardDescription>Log the quantity and menu for today's mid-day meal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Number of Students Served</Label>
                <div className="relative">
                  <Scale className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="number" placeholder="e.g. 412" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preparation Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="time" className="pl-10" />
                </div>
              </div>
              <Button className="w-full font-bold">Submit Daily Log</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Scale className="h-5 w-5 text-accent" />
                Inventory Depletion
              </CardTitle>
              <CardDescription>Update stock usage for today's meal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Rice (kg)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Pulses (kg)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Vegetables (kg)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Oil (Ltr)</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <Button variant="outline" className="w-full">Update Inventory</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: 'May 12, 2024', menu: 'Puri & Sabzi', count: '405', status: 'Verified' },
                { date: 'May 11, 2024', menu: 'Dal Rice', count: '398', status: 'Verified' },
                { date: 'May 10, 2024', menu: 'Khichdi', count: '410', status: 'Pending Verification' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-secondary/20">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold">{log.date}</p>
                    <p className="font-medium">{log.menu}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{log.count} Students</p>
                    <Badge variant={log.status === 'Verified' ? 'default' : 'secondary'} className="text-[10px]">
                      {log.status === 'Verified' && <CheckCircle2 className="h-3 w-3 mr-1" />} {log.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
