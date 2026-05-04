import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { GraduationCap, ArrowLeft, Calendar, User } from 'lucide-react';

export default function NewsPage() {
  const newsItems = [
    {
      title: "New MDM Guidelines Released for Academic Year 2024",
      date: "May 10, 2024",
      author: "Education Ministry",
      category: "Policy",
      excerpt: "The Ministry has updated the nutritional requirements and hygiene protocols for all government school kitchens...",
      image: "https://picsum.photos/seed/news1/600/400"
    },
    {
      title: "State-wide Guest Teacher Program Opens for Registration",
      date: "May 08, 2024",
      author: "Human Resources Dept",
      category: "Volunteering",
      excerpt: "Professionals from various fields are invited to volunteer as guest teachers to bring practical industry knowledge...",
      image: "https://picsum.photos/seed/news2/600/400"
    },
    {
      title: "Digital Infrastructure Expansion Reaches Rural Schools",
      date: "May 05, 2024",
      author: "Technology Wing",
      category: "Infrastructure",
      excerpt: "Over 500 remote schools have now been equipped with satellite internet and interactive smart boards...",
      image: "https://picsum.photos/seed/news3/600/400"
    }
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-headline text-primary mb-4">Latest Updates & News</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">Stay informed about the latest developments in government school monitoring and educational policies.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((news, i) => (
            <Card key={i} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-none">
              <div className="relative h-48 overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">{news.category}</span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {news.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {news.author}</span>
                </div>
                <CardTitle className="font-headline text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                  {news.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm line-clamp-3">{news.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="p-0 text-primary font-bold">Read Full Article</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}