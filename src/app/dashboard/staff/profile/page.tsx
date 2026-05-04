
"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building, Calendar, Phone, Save, ShieldCheck, Clock } from 'lucide-react';

export default function StaffProfile() {
  return (
    <DashboardLayout role="staff">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-headline font-bold text-primary">Staff Profile</h2>
          <p className="text-muted-foreground">Manage your operational details and shift preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6 text-center space-y-4">
              <Avatar className="h-32 w-32 mx-auto border-4 border-primary/10 shadow-lg">
                <AvatarImage src="https://picsum.photos/seed/staff/200/200" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-primary">Mrs. Laxmi</h3>
                <Badge variant="secondary" className="mt-1 uppercase tracking-wider text-[10px] font-bold">
                  Operational Staff
                </Badge>
              </div>
              <div className="pt-4 space-y-2 text-sm text-left">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Security & Logistics</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Shift: Morning (7 AM - 4 PM)</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Employee Since 2020</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Personal Details</CardTitle>
              <CardDescription>Official operational contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="fullname" defaultValue="Mrs. Laxmi Devi" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Official Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" defaultValue="staff@school.gov" className="pl-10" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" defaultValue="+91 77777 66666" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept">Department</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="dept" defaultValue="Facilities Management" className="pl-10" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 bg-muted/20">
              <Button className="ml-auto bg-primary">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
