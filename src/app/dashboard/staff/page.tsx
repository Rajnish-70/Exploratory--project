import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Utensils, ShieldCheck, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function StaffHome() {
  const tasks = [
    { title: 'Morning Cleaning', time: '07:30 AM', status: 'Completed', icon: Trash2 },
    { title: 'Kitchen Inspection', time: '09:00 AM', status: 'Completed', icon: Utensils },
    { title: 'Meal Preparation Start', time: '10:00 AM', status: 'In Progress', icon: Utensils },
    { title: 'Gate Security Check', time: '11:00 AM', status: 'Upcoming', icon: ShieldCheck },
  ];

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-headline font-bold text-primary">Daily Operations Log</h2>
          <Badge className="bg-accent px-3 py-1 text-sm">Shift: 07:00 AM - 04:00 PM</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-accent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-headline font-bold">MDM Inventory</CardTitle>
              <Utensils className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rice Stock</span>
                  <span className="font-bold">45 kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dal Stock</span>
                  <span className="font-bold">12 kg</span>
                </div>
                <Button size="sm" className="w-full mt-2 bg-primary">Log Daily Usage</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-headline font-bold">Cleaning Checklist</CardTitle>
              <Trash2 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Classrooms</span>
                  <Badge variant="outline">12/20</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Washrooms</span>
                  <Badge variant="outline">4/4</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">Update Progress</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-headline font-bold">Safety Status</CardTitle>
              <ShieldCheck className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground italic">"All perimeters secure as of 08:30 AM inspection."</p>
                <Button variant="destructive" size="sm" className="w-full mt-2">Report Incident</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline font-bold">Task Timeline</CardTitle>
            <CardDescription>Scheduled operational duties for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-8">
              {tasks.map((task, idx) => (
                <div key={idx} className="relative">
                  <div className={cn(
                    "absolute -left-[41px] p-2 rounded-full border-2 border-white shadow-sm",
                    task.status === 'Completed' ? "bg-accent text-white" : "bg-primary text-white"
                  )}>
                    {task.status === 'Completed' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <task.icon className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-bold text-primary">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.time}</p>
                      </div>
                    </div>
                    <Badge variant={task.status === 'Completed' ? 'default' : 'secondary'}>{task.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
