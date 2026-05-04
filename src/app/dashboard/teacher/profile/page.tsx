
"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building, Calendar, Phone, Save, BookOpen, Star } from 'lucide-react';

export default function TeacherProfile() {
  return (
    <DashboardLayout role="teacher">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-headline font-bold text-primary">Teacher Profile</h2>
          <p className="text-muted-foreground">Personalize your academic profile and classroom preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6 text-center space-y-4">
              <Avatar className="h-32 w-32 mx-auto border-4 border-primary/10 shadow-lg">
                <AvatarImage src="https://picsum.photos/seed/teacher/200/200" />
                <AvatarFallback>TR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-primary">Mr. Rajesh</h3>
                <Badge variant="secondary" className="mt-1 uppercase tracking-wider text-[10px] font-bold">
                  Class Teacher - 10A
                </Badge>
              </div>
              <div className="pt-4 space-y-2 text-sm text-left">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Specialization: Mathematics</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>Senior Grade Instructor</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined July 2018</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Personal Details</CardTitle>
              <CardDescription>Academic contact and identity management.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="fullname" defaultValue="Mr. Rajesh Kumar" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" defaultValue="teacher@school.gov" className="pl-10" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" defaultValue="+91 88888 77777" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Primary Subject</Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="subject" defaultValue="Mathematics" className="pl-10" />
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
