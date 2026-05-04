
"use client"

import { use } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Users, Utensils, GraduationCap, 
  MapPin, Calendar, ArrowLeft, ShieldCheck, 
  Phone, Mail, User, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useFirestore, useDoc, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function AdminSchoolProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const firestore = useFirestore();
  const { user, profile, isUserLoading } = useUser();

  // Guard the document reference until authenticated and role verified
  const schoolDocRef = useMemoFirebase(() => {
    if (isUserLoading || !user || profile?.role !== 'Administrator') return null;
    return doc(firestore, 'schools', resolvedParams.id);
  }, [firestore, resolvedParams.id, user, profile?.role, isUserLoading]);

  // Fetch school details in real-time
  const { data: school, isLoading } = useDoc(schoolDocRef);

  if (isLoading || isUserLoading || (user && !profile)) {
    return (
      <DashboardLayout role="administrator">
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Validating School Record...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!school) {
    return (
      <DashboardLayout role="administrator">
        <div className="space-y-6">
          <Link href="/dashboard/administrator/schools">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Directory
            </Button>
          </Link>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-primary">Institution Not Found</h2>
            <p className="text-muted-foreground max-w-sm mx-auto mt-2">The requested school record could not be retrieved. It may have been deactivated or you may have insufficient permissions.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/administrator/schools">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">{school.name}</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-3 w-3" /> {school.address}, {school.district}
            </p>
          </div>
          <Badge className="ml-auto bg-accent">Active Institution</Badge>
        </div>

        {/* Rest of the UI remains consistent... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: school.studentCount || 0, icon: Users, color: 'text-blue-500' },
            { label: 'Avg Attendance', value: 'N/A', icon: GraduationCap, color: 'text-primary' },
            { label: 'MDM Status', value: 'Operational', icon: Utensils, color: 'text-orange-500' },
            { label: 'Safety Rating', value: 'Pending', icon: ShieldCheck, color: 'text-accent' },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
