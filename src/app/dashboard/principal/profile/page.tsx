
"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building, Calendar, Phone, MapPin, Save, GraduationCap } from 'lucide-react';

export default function PrincipalProfile() {
  return (
    <DashboardLayout role="principal">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-headline font-bold text-primary">Principal Profile</h2>
          <p className="text-muted-foreground">Manage your school leadership profile and contact details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6 text-center space-y-4">
              <Avatar className="h-32 w-32 mx-auto border-4 border-primary/10 shadow-lg">
                <AvatarImage src="https://picsum.photos/seed/principal/200/200" />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-primary">Dr. Mehta</h3>
                <Badge variant="secondary" className="mt-1 uppercase tracking-wider text-[10px] font-bold">
                  School Principal
                </Badge>
              </div>
              <div className="pt-4 space-y-2 text-sm text-left">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>Ph.D. in Education</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>GSSS Model Town, Delhi</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Tenure: 5 Years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Personal Details</CardTitle>
              <CardDescription>Official school leadership contact info.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="fullname" defaultValue="Dr. Mehta" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Institutional Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" defaultValue="principal@school.gov" className="pl-10" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" defaultValue="+91 91234 56789" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">Assigned Institution</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="school" defaultValue="GSSS Model Town" className="pl-10" disabled />
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
