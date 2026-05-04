"use client"

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, Building2, Flame, Droplets, 
  Hammer, Plus, AlertTriangle, Loader2,
  MessageSquare, MapPin
} from 'lucide-react';
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

export default function PrincipalSafety() {
  const { toast } = useToast();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safetyChecks = [
    { title: 'Fire Safety', status: 'Valid', lastDate: 'Jan 2024', icon: Flame, color: 'text-orange-500' },
    { title: 'Water Quality', status: 'Certified', lastDate: 'May 2024', icon: Droplets, color: 'text-blue-500' },
    { title: 'Perimeter Wall', status: 'Intact', lastDate: 'Apr 2024', icon: Building2, color: 'text-primary' },
    { title: 'Electrical Safety', status: 'Verified', lastDate: 'Feb 2024', icon: Hammer, color: 'text-accent' },
  ];

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsReportOpen(false);
      toast({
        title: "Issue Reported",
        description: "Your infrastructure report has been submitted to the district administrative office.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout role="principal">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Infrastructure & Safety</h2>
            <p className="text-muted-foreground">Monitor campus facilities and safety certifications.</p>
          </div>
          <Button 
            className="bg-destructive hover:bg-destructive/90"
            onClick={() => setIsReportOpen(true)}
          >
            <AlertTriangle className="mr-2 h-4 w-4" /> Report Issue
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyChecks.map((check, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg bg-muted ${check.color}`}>
                    <check.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-accent border-accent">{check.status}</Badge>
                </div>
                <h3 className="font-bold text-sm">{check.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Last Inspection: {check.lastDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Active Repair Requests</CardTitle>
            <CardDescription>Track the progress of infrastructure maintenance within the school.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: 'Library Roof', issue: 'Seepage during rains', date: 'May 10', status: 'Work Order Issued', priority: 'High' },
                { area: 'Computer Lab', issue: 'AC servicing required', date: 'May 12', status: 'Pending Approval', priority: 'Medium' },
                { area: 'Washroom Block', issue: 'Tap replacement', date: 'May 14', status: 'Assigned', priority: 'Low' },
              ].map((req, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Hammer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{req.area}</h4>
                      <p className="text-xs text-muted-foreground">{req.issue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="mb-1" variant={req.priority === 'High' ? 'destructive' : 'secondary'}>{req.priority}</Badge>
                    <p className="text-[10px] font-bold text-muted-foreground">{req.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Issue Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleReportSubmit}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-headline text-xl text-destructive">
                <AlertTriangle className="h-5 w-5" /> Report Safety or Infra Issue
              </DialogTitle>
              <DialogDescription>
                Submit a new maintenance request or report a safety hazard on campus.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="area">Location / Area</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="area" placeholder="e.g. Science Wing, Boys Washroom" required className="pl-10" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Urgency Level</Label>
                  <select id="priority" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="Low">Low - Routine</option>
                    <option value="Medium">Medium - Required</option>
                    <option value="High">High - Urgent</option>
                    <option value="Critical">Critical - Immediate Action</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>Structural</option>
                    <option>Electrical</option>
                    <option>Sanitation</option>
                    <option>Safety/Fire</option>
                    <option>Furniture</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea 
                    id="description" 
                    placeholder="Describe the issue or hazard..." 
                    className="pl-10 min-h-[100px]"
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsReportOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-destructive hover:bg-destructive/90 px-8" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
