"use client"

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Shirt, Truck, CheckCircle2, Package, Search, Plus, Filter, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const DISTRICT_DATA = [
  { dist: 'North Delhi', books: '12,400', uniforms: '11,200', station: '10,500', last: '2 days ago', status: 'Fulfilled' },
  { dist: 'South Jaipur', books: '8,200', uniforms: '7,400', station: '6,100', last: '5 days ago', status: 'Partial' },
  { dist: 'Central Gurgaon', books: '15,000', uniforms: '14,800', station: '14,000', last: 'Yesterday', status: 'Fulfilled' },
  { dist: 'Rural Ajmer', books: '4,500', uniforms: '3,200', station: '2,800', last: 'Scheduled', status: 'In Transit' },
];

export default function AdminSupplies() {
  const { toast } = useToast();
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDispatching, setIsDispatching] = useState(false);

  const supplies = [
    { title: 'Uniform Sets', distributed: 112000, target: 125000, icon: Shirt, color: 'text-blue-500' },
    { title: 'Textbook Kits', distributed: 124500, target: 125000, icon: BookOpen, color: 'text-primary' },
    { title: 'Stationary Sets', distributed: 98000, target: 125000, icon: Package, color: 'text-orange-500' },
  ];

  const filteredDistricts = useMemo(() => {
    return DISTRICT_DATA.filter(d => 
      d.dist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleDispatchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDispatching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsDispatching(false);
      setIsDispatchOpen(false);
      toast({
        title: "Dispatch Initiated",
        description: "Logistics tracking ID has been sent to the district head.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Supplies & Distribution</h2>
            <p className="text-muted-foreground">Manage textbooks, uniforms, and stationary allocation.</p>
          </div>
          <Button className="bg-primary" onClick={() => setIsDispatchOpen(true)}>
            <Truck className="mr-2 h-4 w-4" /> Dispatch Logistics
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supplies.map((item, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-full bg-muted ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="font-bold">
                    {Math.round((item.distributed / item.target) * 100)}% Complete
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-muted-foreground">{item.title}</p>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-bold">{item.distributed.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Target: {item.target.toLocaleString()}</p>
                  </div>
                  <Progress value={(item.distributed / item.target) * 100} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">District-wise Fulfillment</CardTitle>
              <CardDescription>Status of logistics across major regions.</CardDescription>
            </div>
            <div className="flex gap-2">
               <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search district..." 
                    className="pl-8 h-9 rounded-md border text-sm w-48" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <Button variant="outline" size="sm">Filter</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>District</TableHead>
                  <TableHead>Books (Kits)</TableHead>
                  <TableHead>Uniforms (Pairs)</TableHead>
                  <TableHead>Stationary</TableHead>
                  <TableHead>Last Dispatch</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold">{row.dist}</TableCell>
                      <TableCell>{row.books}</TableCell>
                      <TableCell>{row.uniforms}</TableCell>
                      <TableCell>{row.station}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{row.last}</TableCell>
                      <TableCell>
                        <Badge variant={row.status === 'Fulfilled' ? 'default' : row.status === 'In Transit' ? 'secondary' : 'outline'}>
                          {row.status === 'Fulfilled' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No results found for "{searchQuery}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Dispatch Logistics Dialog */}
      <Dialog open={isDispatchOpen} onOpenChange={setIsDispatchOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleDispatchSubmit}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" /> Dispatch Supply Batch
              </DialogTitle>
              <DialogDescription>
                Allocate and dispatch educational materials to regional hubs.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="district">Target District</Label>
                <select 
                  id="district" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select District</option>
                  <option>North Delhi</option>
                  <option>South Jaipur</option>
                  <option>Central Gurgaon</option>
                  <option>Rural Ajmer</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Supply Category</Label>
                  <select 
                    id="type" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option>Uniform Sets</option>
                    <option>Textbook Kits</option>
                    <option>Stationary</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qty">Batch Quantity</Label>
                  <Input id="qty" type="number" placeholder="500" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Dispatch Notes</Label>
                <Input id="notes" placeholder="Optional delivery instructions..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsDispatchOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-primary px-8" disabled={isDispatching}>
                {isDispatching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  'Confirm Dispatch'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
