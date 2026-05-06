"use client"

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Utensils, Loader2, Send, Maximize2, Minimize2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function MealReviewPage() {
  const { toast } = useToast();
  const [mealReviews, setMealReviews] = useState([]);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [todayDate, setTodayDate] = useState('');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    setTodayDate(today);
    
    // Load reviews from localStorage
    const stored = localStorage.getItem(`mealReviews_${today}`);
    if (stored) {
      setMealReviews(JSON.parse(stored));
    }
  }, []);

  const handleAddReview = (rating) => {
    const newReview = {
      id: Date.now(),
      rating,
      studentName: `Student ${mealReviews.length + 1}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    const updated = [...mealReviews, newReview];
    setMealReviews(updated);
    
    const today = new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    localStorage.setItem(`mealReviews_${today}`, JSON.stringify(updated));
    
    toast({
      title: "Review Submitted",
      description: "Your meal review has been recorded successfully.",
    });
  };

  const handleSubmitReport = () => {
    if (mealReviews.length === 0) {
      toast({
        title: "No Reviews",
        description: "No meal reviews to submit for today.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReport(true);
    
    setTimeout(() => {
      const avgRating = mealReviews.reduce((sum, r) => sum + r.rating, 0) / mealReviews.length;
      const ratingText = avgRating >= 2.5 ? "Excellent" : avgRating >= 1.5 ? "Good" : "Needs Improvement";
      
      setIsSubmittingReport(false);
      toast({
        title: "Report Submitted",
        description: `MDM Review Report submitted to Administrator. Average Rating: ${ratingText} (${avgRating.toFixed(1)}/3)`,
      });
      
      // Reset reviews after submission
      const today = new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      localStorage.removeItem(`mealReviews_${today}`);
      setMealReviews([]);
    }, 1500);
  };

  const getAverageRating = () => {
    if (mealReviews.length === 0) return 0;
    return (mealReviews.reduce((sum, r) => sum + r.rating, 0) / mealReviews.length).toFixed(1);
  };

  const getRatingLabel = () => {
    const avg = getAverageRating();
    if (avg >= 2.5) return "Excellent 🌟";
    if (avg >= 1.5) return "Good ✅";
    return "Needs Improvement ⚠️";
  };

  return (
    <DashboardLayout role="principal">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-headline font-bold text-primary flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            Mid Day Meal Review
          </h2>
          <p className="text-muted-foreground">Daily student feedback on meal quality</p>
        </div>

        <Card className="border-t-4 border-t-orange-500">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline">Today's Meal Feedback</CardTitle>
                <CardDescription>{todayDate}</CardDescription>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600">{mealReviews.length} Reviews</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Review Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <p className="text-sm text-muted-foreground mb-2">Student Reviews</p>
                  <p className="text-3xl font-bold text-orange-600">{mealReviews.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">responses collected</p>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
                  <p className="text-3xl font-bold text-green-600">{getAverageRating()}/3.0</p>
                  <p className="text-xs text-muted-foreground mt-1">meal quality score</p>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <p className="text-lg font-bold text-blue-600">{getRatingLabel()}</p>
                  <p className="text-xs text-muted-foreground mt-1">overall feedback</p>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-sm font-semibold mb-4">Today's Feedback Distribution</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl mb-2">😞</p>
                    <p className="text-2xl font-bold text-red-600">{mealReviews.filter(r => r.rating === 1).length}</p>
                    <p className="text-xs text-muted-foreground">Need Improvement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl mb-2">😐</p>
                    <p className="text-2xl font-bold text-yellow-600">{mealReviews.filter(r => r.rating === 2).length}</p>
                    <p className="text-xs text-muted-foreground">Average</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl mb-2">😊</p>
                    <p className="text-2xl font-bold text-green-600">{mealReviews.filter(r => r.rating === 3).length}</p>
                    <p className="text-xs text-muted-foreground">Excellent</p>
                  </div>
                </div>
              </div>

              {/* Student Input Section - Start Review Button */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <p className="text-sm font-semibold mb-3">Students: Share Your Feedback</p>
                <Button 
                  onClick={() => setIsReviewDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 text-base"
                >
                  Start Review
                </Button>
              </div>

              {/* Recent Reviews */}
              {mealReviews.length > 0 && (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <p className="text-sm font-semibold mb-3">Feedback Responses ({mealReviews.length})</p>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {[...mealReviews].reverse().map((review, idx) => (
                      <div key={review.id} className="flex items-center justify-between text-sm p-3 bg-white rounded border border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{review.rating === 3 ? '😊' : review.rating === 2 ? '😐' : '😞'}</span>
                          <span className="text-xs font-medium text-muted-foreground">Response {mealReviews.length - idx}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Report Button */}
              <Button 
                onClick={handleSubmitReport}
                disabled={isSubmittingReport}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-base"
              >
                {isSubmittingReport ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Daily Report to Administrator
                  </>
                )}
              </Button>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm font-semibold text-amber-900 mb-2">📋 Important Information</p>
                <p className="text-xs text-amber-800">
                  Once submitted, this report will be forwarded to the school administrator with today's date and feedback summary. The counter will automatically reset for the next day. All student feedback is anonymous.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Dialog Modal */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className={isFullscreen ? "max-w-none w-screen h-screen" : "max-w-md"}>
          <DialogHeader>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <DialogTitle>Share Your Feedback</DialogTitle>
                <DialogDescription>
                  How did you feel about today's meal? Click on the emoji that best describes your experience.
                </DialogDescription>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="ml-2 p-2 hover:bg-gray-200 rounded-md transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5 text-gray-600" />
                ) : (
                  <Maximize2 className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </DialogHeader>
          
          <div className={`flex gap-4 justify-center ${isFullscreen ? "py-12" : "py-6"}`}>
            <button
              onClick={() => handleAddReview(1)}
              className={`flex flex-col items-center gap-2 p-6 rounded-lg bg-white hover:bg-red-100 border-2 border-gray-200 hover:border-red-400 transition-all duration-200 hover:scale-110 ${isFullscreen ? "p-10" : ""}`}
            >
              <span className={isFullscreen ? "text-9xl" : "text-5xl"}>😞</span>
              <span className={`font-medium ${isFullscreen ? "text-lg" : "text-xs"}`}>Poor</span>
            </button>
            
            <button
              onClick={() => handleAddReview(2)}
              className={`flex flex-col items-center gap-2 p-6 rounded-lg bg-white hover:bg-yellow-100 border-2 border-gray-200 hover:border-yellow-400 transition-all duration-200 hover:scale-110 ${isFullscreen ? "p-10" : ""}`}
            >
              <span className={isFullscreen ? "text-9xl" : "text-5xl"}>😐</span>
              <span className={`font-medium ${isFullscreen ? "text-lg" : "text-xs"}`}>Average</span>
            </button>
            
            <button
              onClick={() => handleAddReview(3)}
              className={`flex flex-col items-center gap-2 p-6 rounded-lg bg-white hover:bg-green-100 border-2 border-gray-200 hover:border-green-400 transition-all duration-200 hover:scale-110 ${isFullscreen ? "p-10" : ""}`}
            >
              <span className={isFullscreen ? "text-9xl" : "text-5xl"}>😊</span>
              <span className={`font-medium ${isFullscreen ? "text-lg" : "text-xs"}`}>Excellent</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
