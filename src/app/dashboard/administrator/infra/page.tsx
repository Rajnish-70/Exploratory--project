"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, ShieldCheck, Trash2, AlertTriangle, Hammer, Plus } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";

const infraStatusData = [
  { name: 'Good', value: 320, color: 'hsl(var(--accent))' },
  { name: 'Needs Repair', value: 110, color: 'hsl(var(--primary))' },
  { name: 'Critical', value: 20, color: 'hsl(var(--destructive))' },
];

export default function AdminInfra() {
  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Infrastructure & Safety</h2>
            <p className="text-muted-foreground">Monitor school facilities, hygiene, and security protocols.</p>
          </div>
          <Button className="bg-accent"><Plus className="mr-2 h-4 w-4" /> New Project</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Total Institutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">450</p>
              <p className="text-xs text-muted-foreground mt-1">Managed across 12 districts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Hammer className="h-4 w-4" /> Active Repairs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">42</p>
              <p className="text-xs text-accent mt-1 font-bold">+5 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" /> Critical Failures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">12</p>
              <p className="text-xs text-muted-foreground mt-1">Requiring immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Overall Health Distribution</CardTitle>
              <CardDescription>Facility status summary across the entire school network.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={infraStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {infraStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Maintenance Priorities</CardTitle>
              <CardDescription>Category-wise repair volume.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
               {[
                 { category: 'Structural (Roof/Walls)', count: 18, color: 'bg-red-500' },
                 { category: 'Sanitation (Washrooms)', count: 24, color: 'bg-primary' },
                 { category: 'Drinking Water (RO/Tanks)', count: 9, color: 'bg-blue-400' },
                 { category: 'Electrical/Fans', count: 12, color: 'bg-accent' },
               ].map((item) => (
                 <div key={item.category} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{item.category}</span>
                      <span>{item.count} Requests</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full`} style={{ width: `${(item.count/30)*100}%` }} />
                    </div>
                 </div>
               ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Maintenance Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Reported</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Issue Description</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { date: 'May 14', school: 'Model Primary A', issue: 'Washroom Pipe Leakage', priority: 'High', status: 'Dispatched' },
                  { date: 'May 12', school: 'GSSS Town-1', issue: 'Library Ceiling Fan Repair', priority: 'Low', status: 'Pending' },
                  { date: 'May 11', school: 'Secondary School B', issue: 'Compound Wall Crack', priority: 'Medium', status: 'Under Review' },
                ].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{row.date}</TableCell>
                    <TableCell className="font-bold">{row.school}</TableCell>
                    <TableCell className="text-sm">{row.issue}</TableCell>
                    <TableCell>
                      <Badge variant={row.priority === 'High' ? 'destructive' : 'secondary'}>{row.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-primary border-primary">{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
