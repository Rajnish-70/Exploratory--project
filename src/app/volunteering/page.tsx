import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, ArrowLeft, Heart, Users, BookOpen, Lightbulb } from 'lucide-react';

export default function VolunteeringPage() {
  const opportunities = [
    { title: "Guest Teacher", icon: GraduationCap, desc: "Teach specialized subjects for a few hours a week." },
    { title: "Infrastructure Support", icon: Lightbulb, desc: "Contribute to building repairs or facility upgrades." },
    { title: "MDM Quality Monitoring", icon: Heart, desc: "Assist in local meal quality audits and feedback." },
    { title: "Library Management", icon: BookOpen, desc: "Help organize and manage school libraries." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline font-bold text-primary">ShikshaPoshan</span>
        </Link>
        <Link href="/" className="ml-auto">
          <Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" /> Back Home</Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold font-headline text-primary mb-4">Empower the Future</h1>
              <p className="text-muted-foreground text-lg">
                Your time and expertise can make a world of difference. Choose an area where you want to contribute
                and help us build a better educational foundation for our children.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {opportunities.map((opp, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <opp.icon className="h-8 w-8 text-accent mb-2" />
                    <CardTitle className="text-base font-headline">{opp.title}</CardTitle>
                    <CardDescription className="text-xs">{opp.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <h3 className="font-bold text-primary mb-2 flex items-center gap-2"><Users className="h-5 w-5" /> Already 1,200+ Volunteers</h3>
              <p className="text-sm text-muted-foreground">Join our thriving community of change-makers today!</p>
            </div>
          </div>

          <Card className="shadow-xl border-t-4 border-t-accent">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Volunteer Registration</CardTitle>
              <CardDescription>Tell us how you'd like to contribute.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Preferred Volunteering Area</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option>Guest Teacher</option>
                    <option>Infrastructure Support</option>
                    <option>MDM Quality Monitoring</option>
                    <option>Library Management</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Briefly describe your experience (optional)</Label>
                  <Textarea id="message" placeholder="I have 5 years of experience in..." className="min-h-[100px]" />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 font-bold py-6 text-lg">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}