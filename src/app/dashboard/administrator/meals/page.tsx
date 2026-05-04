"use client"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Utensils, Scale, Download, Filter, TrendingUp, AlertCircle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { day: "Mon", served: 115000 },
  { day: "Tue", served: 118400 },
  { day: "Wed", served: 112000 },
  { day: "Thu", served: 121000 },
  { day: "Fri", served: 119000 },
];

const chartConfig = {
  served: {
    label: "Students Served",
    color: "hsl(var(--primary))",
  },
};

export default function AdminMeals() {
  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Mid-Day Meal Monitoring</h2>
            <p className="text-muted-foreground">District-wide nutrition and distribution analytics.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter Districts</Button>
            <Button className="bg-accent"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Quality Score</p>
                  <h3 className="text-2xl font-bold">4.7 / 5.0</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Schools Reported</p>
                  <h3 className="text-2xl font-bold">442 / 450</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Utensils className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stock Alerts</p>
                  <h3 className="text-2xl font-bold text-red-500">8 Schools</h3>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Daily Distribution Trend</CardTitle>
              <CardDescription>Total student coverage across all districts this week.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tickLine={false} 
                    tickMargin={10} 
                    axisLine={false} 
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="served" fill="var(--color-served)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Stock Utilization</CardTitle>
              <CardDescription>Estimated grain usage rate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Rice', value: 85, color: 'bg-primary' },
                { label: 'Wheat', value: 72, color: 'bg-accent' },
                { label: 'Pulses', value: 64, color: 'bg-orange-500' },
                { label: 'Oil', value: 91, color: 'bg-blue-500' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Critical Stock Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Shortage Item</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: 'GSSS Model Town', dist: 'North', item: 'Rice & Oil', status: 'Immediate' },
                  { name: 'Primary School B', dist: 'Jaipur', item: 'Lentils', status: '2 Days Left' },
                ].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.dist}</TableCell>
                    <TableCell>{row.item}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{row.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Replenish</Button>
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
