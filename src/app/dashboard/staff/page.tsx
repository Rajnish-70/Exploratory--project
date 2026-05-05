"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function StaffHome() {
  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Daily Operations Log</h2>
            <p className="text-muted-foreground">Use the staff tabs to manage stock, security, and cleeaniness updates.</p>
          </div>
          <Badge className="w-fit bg-accent px-3 py-1 text-sm">Shift: 07:00 AM - 04:00 PM</Badge>
        </div>

        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Staff Dashboard</CardTitle>
            <CardDescription>Choose a section from the sidebar to continue today&apos;s operations.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              `Stock Management` handles inventory and bill uploads, `Security` tracks access activity, and `Cleeaniness`
              contains sanitation progress and maintenance updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
