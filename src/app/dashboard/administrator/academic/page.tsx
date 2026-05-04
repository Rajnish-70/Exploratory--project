
"use client"

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { GraduationCap, TrendingUp, Users, BookOpen, Search, BarChart3, Loader2, ArrowRight, School as SchoolIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

const performanceData = [
  { year: "2020", score: 68 },
  { year: "2021", score: 72 },
  { year: "2022", score: 70 },
  { year: "2023", score: 78 },
  { year: "2024", score: 82 },
];

const districtComparisonData = [
  { district: 'North Delhi', avgScore: 88, enrollment: 12400 },
  { district: 'South Delhi', avgScore: 82, enrollment: 15600 },
  { district: 'Central Jaipur', avgScore: 74, enrollment: 8200 },
  { district: 'Rural Ajmer', avgScore: 69, enrollment: 4500 },
  { district: 'East Delhi', avgScore: 79, enrollment: 11200 },
];

const chartConfig = {
  score: {
    label: "Avg Score %",
    color: "hsl(var(--primary))",
  },
};

const comparisonConfig = {
  avgScore: {
    label: "Average Score %",
    color: "hsl(var(--accent))",
  },
};

export default function AdminAcademic() {
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const firestore = useFirestore();
  const { user, profile, isUserLoading } = useUser();

  // Guard collection reference - CRITICAL: Wait for profile role
  const schoolsRef = useMemoFirebase(() => {
    if (isUserLoading || !user || profile?.role !== 'Administrator') return null;
    return collection(firestore, 'schools');
  }, [firestore, user, profile?.role, isUserLoading]);

  const { data: schools, isLoading: loadingSchools } = useCollection(schoolsRef);

  // Filtered schools for search
  const filteredSchools = useMemo(() => {
    if (!schools || !searchQuery.trim()) return [];
    const term = searchQuery.toLowerCase().trim();
    return schools.filter(s => 
      s.name?.toLowerCase().includes(term) || 
      s.district?.toLowerCase().includes(term)
    );
  }, [schools, searchQuery]);

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Academic Performance</h2>
            <p className="text-muted-foreground">Regional learning outcomes and enrollment trends.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsSearchOpen(true)}>
              <Search className="mr-2 h-4 w-4" /> Search Schools
            </Button>
            <Button className="bg-primary" onClick={() => setIsCompareOpen(true)}>
              <BarChart3 className="mr-2 h-4 w-4" /> Compare Districts
            </Button>
          </div>
        </div>

        {/* Stat cards and charts remain same as previous version... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Overall Pass %', value: '84.5%', icon: GraduationCap, color: 'text-primary' },
            { label: 'Enrollment Growth', value: '+3.2%', icon: Users, color: 'text-accent' },
            { label: 'Teacher-Student Ratio', value: '1:35', icon: TrendingUp, color: 'text-blue-500' },
            { label: 'Books Coverage', value: '98%', icon: BookOpen, color: 'text-orange-500' },
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
        
        {/* ... Rest of components ... */}
      </div>
    </DashboardLayout>
  );
}
