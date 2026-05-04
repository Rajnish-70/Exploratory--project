"use client"

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Utensils, Scale, TrendingUp, AlertCircle, CheckCircle2, Star, MessageSquare, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function PrincipalMeals() {
  const { toast } = useToast();
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLogOpen(false);
      toast({
        title: "Quality Check Logged",
        description: "Today's meal inspection has been recorded and synced with the district office.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout role="principal">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Mid-Day Meal Tracking</h2>
            <p className="text-muted-foreground">Daily nutrition and stock levels for GSSS Higher Secondary School A.</p>
          </div>
          <Button className="bg-primary" onClick={() => setIsLogOpen(true)}>
            <Utensils className="mr-2 h-4 w-4" /> Log Quality Check
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Attendance</p>
                  <h3 className="text-2xl font-bold">412 / 450</h3>
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
                  <p className="text-sm text-muted-foreground">Avg Rating (30 Days)</p>
                  <h3 className="text-2xl font-bold text-accent">4.8 / 5.0</h3>
                </div>
                <div className="p-2 bg-accent/10 rounded-full">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stock Health</p>
                  <h3 className="text-2xl font-bold text-green-600">Optimal</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Inventory Status</CardTitle>
              <CardDescription>Current raw materials in school storage.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Current Qty</TableHead>
                    <TableHead>Expected Days</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { item: 'Rice', qty: '450 kg', days: 12, status: 'Healthy' },
                    { item: 'Pulses', qty: '120 kg', days: 15, status: 'Healthy' },
                    { item: 'Fortified Oil', qty: '15 Ltr', days: 4, status: 'Order Soon' },
                    { item: 'Salt & Spices', qty: '8 kg', days: 20, status: 'Healthy' },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold">{row.item}</TableCell>
                      <TableCell>{row.qty}</TableCell>
                      <TableCell>{row.days} Days</TableCell>
                      <TableCell>
                        <Badge variant={row.status === 'Healthy' ? 'default' : 'secondary'}>{row.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">Weekly Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {[
                { day: 'Mon', menu: 'Dal, Rice & Seasonal Veg' },
                { day: 'Tue', menu: 'Puri, Sabzi & Halwa' },
                { day: 'Wed', menu: 'Khichdi & Fruit' },
                { day: 'Thu', menu: 'Rice & Soya Chunk Curry' },
                { day: 'Fri', menu: 'Sambhar Rice & Salad' },
              ].map((m) => (
                <div key={m.day} className="flex gap-4 border-l-2 border-primary pl-4 pb-2 last:pb-0">
                  <span className="font-bold text-xs w-8 uppercase text-muted-foreground">{m.day}</span>
                  <span className="text-sm font-medium">{m.menu}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Log Quality Check Dialog */}
      <Dialog open={isLogOpen} onOpenChange={setIsLogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleLogSubmit}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-headline text-xl">
                <CheckCircle2 className="h-5 w-5 text-accent" /> Daily Quality Inspection
              </DialogTitle>
              <DialogDescription>
                Perform a hygiene and nutritional audit of today's mid-day meal.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="students">Students Served</Label>
                  <Input id="students" type="number" placeholder="412" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Quality Rating (1-5)</Label>
                  <div className="relative">
                    <Star className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select id="rating" className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Satisfactory</option>
                      <option value="2">2 - Needs Improvement</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Hygiene Checklist</Label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-muted/30 rounded-lg border">
                  {['Kitchen Cleaned', 'Cooks Sanitized', 'Fresh Veggies', 'Sealed Oil'].map((check) => (
                    <div key={check} className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <span className="text-xs font-medium">{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Principal's Observations</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea 
                    id="observations" 
                    placeholder="Taste, texture, or quantity notes..." 
                    className="pl-10 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsLogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-primary px-8" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Syncing...
                  </>
                ) : (
                  'Submit Inspection'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
