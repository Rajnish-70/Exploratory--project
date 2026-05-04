"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Bell, Lock, School, Settings as SettingsIcon, Save } from 'lucide-react';

export default function PrincipalSettings() {
  return (
    <DashboardLayout role="principal">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-headline font-bold text-primary">School Settings</h2>
          <p className="text-muted-foreground">Manage school-specific configurations and security.</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" /> Password & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 flex justify-end p-4">
              <Button size="sm">Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" /> Notifications
              </CardTitle>
              <CardDescription>Control alerts for your specific school campus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Daily MDM Report</p>
                  <p className="text-xs text-muted-foreground">Get a notification when the daily meal log is submitted.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Attendance Alerts</p>
                  <p className="text-xs text-muted-foreground">Notify when any class attendance falls below 80%.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <School className="h-5 w-5 text-primary" /> Institutional Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Official School Name</Label>
                  <Input defaultValue="GSSS Model Town" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Reporting Language</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 flex justify-end p-4">
              <Button className="bg-primary">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}