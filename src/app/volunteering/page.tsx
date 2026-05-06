'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, ArrowLeft, Heart, Users, BookOpen, Lightbulb } from 'lucide-react';
import { useState } from 'react';

const locationData = {"Andhra Pradesh":{"Visakhapatnam":["Vizag","Pendurthi","Gajuwaka"],"Krishna":["Vijayawada","Machilipatnam"],"Guntur":["Guntur","Tenali"],"West Godavari":["Eluru","Jangareddygudem"],"East Godavari":["Rajamahendravaram","Kakinada"],"Chittoor":["Chittoor","Tirupati"],"Nellore":["Nellore","Sulurpeta"],"Prakasam":["Ongole","Kanigiri"],"Medak":["Medak","Tandur"],"Nalgonda":["Nalgonda","Miryalaguda"],"Kurnool":["Kurnool","Adoni"],"Kadapa":["Kadapa","Rajampet"],"Rangareddy":["Hyderabad","Tandur"]},"Maharashtra":{"Mumbai":["Mumbai","Andheri","Bandra","Dadar"],"Pune":["Pune","Aundh","Baner"],"Nagpur":["Nagpur","Dharampeth"],"Nashik":["Nashik","Panchavati"],"Aurangabad":["Aurangabad","Waluj"]},"Karnataka":{"Bangalore":["Bangalore","Whitefield"],"Mysore":["Mysore","Nanjangud"],"Hubli":["Hubli","Dharwad"],"Belgaum":["Belgaum","Londa"],"Mangalore":["Mangalore","Puttur"]},"Tamil Nadu":{"Chennai":["Chennai","T. Nagar"],"Coimbatore":["Coimbatore","Gandhipuram"],"Madurai":["Madurai","K. Pudur"],"Salem":["Salem","Attur"]},"Telangana":{"Hyderabad":["Hyderabad","Banjara Hills"],"Secunderabad":["Secunderabad","Begumpet"],"Warangal":["Warangal","Hanamkonda"]},"Delhi":{"Central Delhi":["New Delhi","Karol Bagh"],"North Delhi":["Rohini","Narela"],"South Delhi":["Greater Kailash","Dwarka"]},"Uttar Pradesh":{"Lucknow":["Lucknow","Kanpur"],"Varanasi":["Varanasi","Sarnath"],"Agra":["Agra","Firozabad"]},"Kerala":{"Kochi":["Kochi","Aluva"],"Thiruvananthapuram":["Thiruvananthapuram","Neyyattinkara"],"Kozhikode":["Kozhikode","Kannur"]},"Rajasthan":{"Jaipur":["Jaipur","Dudu"],"Jodhpur":["Jodhpur","Osian"],"Udaipur":["Udaipur","Khimnagar"]},"Gujarat":{"Ahmedabad":["Ahmedabad","Gandhinagar"],"Surat":["Surat","Vesu"],"Vadodara":["Vadodara","Halol"]},"Bihar":{"Patna":["Patna","Kankarbagh"],"Gaya":["Gaya","Bodhgaya"],"Muzaffarpur":["Muzaffarpur","Sakra"]},"Haryana":{"Gurgaon":["Gurgaon","Sector 1"],"Faridabad":["Faridabad","Sector 1"],"Hisar":["Hisar","Hansi"]},"Punjab":{"Amritsar":["Amritsar","Tarn Taran"],"Ludhiana":["Ludhiana","Dakha"],"Chandigarh":["Chandigarh","Sector 1"]},"Madhya Pradesh":{"Indore":["Indore","Rau"],"Bhopal":["Bhopal","Huzur"],"Jabalpur":["Jabalpur","Panagar"]},"Odisha":{"Bhubaneswar":["Bhubaneswar","Mancheswar"],"Cuttack":["Cuttack","Balasore"],"Rourkela":["Rourkela","Joda"]},"Himachal Pradesh":{"Shimla":["Shimla","Junga"],"Kangra":["Dharamshala","Kangra"],"Solan":["Solan","Arki"]},"Jharkhand":{"Ranchi":["Ranchi","Kanke"],"Dhanbad":["Dhanbad","Jharia"],"Giridih":["Giridih","Jaridih"]},"Uttarakhand":{"Dehradun":["Dehradun","Mussoorie"],"Nainital":["Nainital","Almora"],"Garhwal":["Srinagar","Pauri"]},"Assam":{"Kamrup":["Guwahati","Kamrup City"],"Nagaon":["Nagaon","Lakshimpur"],"Barpeta":["Barpeta","Mankachar"]},"Chhattisgarh":{"Raipur":["Raipur","Amanaka"],"Bilaspur":["Bilaspur","Durg"],"Durg":["Durg","Bhilai"]},"West Bengal":{"Kolkata":["Kolkata","Howrah"],"Darjeeling":["Darjeeling","Kalimpong"],"Asansol":["Asansol","Durgapur"]},"Goa":{"North Goa":["Panaji","Mapusa"],"South Goa":["Margao","Quepem"]},"Manipur":{"Imphal":["Imphal","Bishnupur"],"Ukhrul":["Ukhrul","Nungba"]},"Meghalaya":{"Shillong":["Shillong","Sohra"],"Tura":["Tura","Williamnagar"]},"Mizoram":{"Aizawl":["Aizawl","Lunglei"],"Lunglei":["Lunglei","Saiha"]},"Nagaland":{"Dimapur":["Dimapur","Medziphema"],"Kohima":["Kohima","Jotsoma"]},"Sikkim":{"Gangtok":["Gangtok","Ranipool"],"West Sikkim":["Geyzing","Pelling"]},"Tripura":{"Agartala":["Agartala","Udaipur"],"Dharmanagar":["Dharmanagar","Kailashahar"]},"Arunachal Pradesh":{"Papum Pare":["Itanagar","Naharlagun"],"Lohit":["Tezu","Namsai"],"Upper Subansiri":["Daporijo","Potin"]},"Andaman and Nicobar Islands":{"Port Blair":["Port Blair","South Andaman"],"Car Nicobar":["Car Nicobar","Great Nicobar"]},"Chandigarh":{"Chandigarh":["Chandigarh","Sector 1"]},"Puducherry":{"Puducherry":["Puducherry","Karaikal"],"Karaikal":["Karaikal","Yanam"]},"Lakshadweep":{"Kavaratti":["Kavaratti","Minicoy"],"Minicoy":["Minicoy Island","Kavaratti"]},"Dadra and Nagar Haveli":{"Silvassa":["Silvassa","Dadra"]},"Daman and Diu":{"Daman":["Daman","Gogola"],"Diu":["Diu","Fudam"]}};

export default function VolunteeringPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const states = Object.keys(locationData);
  const districts = selectedState ? Object.keys(locationData[selectedState]) : [];
  const locations = selectedState && selectedDistrict ? locationData[selectedState][selectedDistrict] : [];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('');
    setSelectedLocation('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedLocation('');
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

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
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
              <h1 className="text-5xl font-bold font-headline text-primary mb-4 relative z-10">
                Make a <span className="text-accent">Real Impact</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed relative z-10">
                Volunteering isn't just about giving time—it's about <span className="font-semibold text-foreground">sharing your passion</span> and 
                watching it transform lives. Every hour you contribute becomes a story of change in a child's educational journey.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Share Your Expertise</h3>
                    <p className="text-sm text-muted-foreground">Whether you're a teacher, professional, or enthusiast, your knowledge matters.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/10 hover:border-accent/20 transition-colors">
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Build Communities</h3>
                    <p className="text-sm text-muted-foreground">Connect with like-minded individuals creating meaningful change together.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/5 to-primary/5 border border-green-500/10 hover:border-green-500/20 transition-colors">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Create Tomorrow</h3>
                    <p className="text-sm text-muted-foreground">Shape the future by investing in education and infrastructure today.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-primary">1,200+</p>
                  <p className="text-sm text-muted-foreground">Volunteers making a difference</p>
                </div>
                <Users className="h-12 w-12 text-accent opacity-50" />
              </div>
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
                  <Label htmlFor="state">State</Label>
                  <select 
                    id="state"
                    value={selectedState} 
                    onChange={handleStateChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <select 
                    id="district"
                    value={selectedDistrict} 
                    onChange={handleDistrictChange}
                    disabled={!selectedState}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Local Location</Label>
                  <select 
                    id="location"
                    value={selectedLocation} 
                    onChange={handleLocationChange}
                    disabled={!selectedDistrict}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Local Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
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