"use client"

import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

const TEACHERS_LIST = [
  { id: '1', name: 'Ms. Sharma', subject: 'Mathematics' },
  { id: '2', name: 'Mr. Kapoor', subject: 'Science' },
  { id: '3', name: 'Ms. Rao', subject: 'English' },
  { id: '4', name: 'Mr. Verma', subject: 'Social Studies' },
  { id: '5', name: 'Ms. Patel', subject: 'Hindi' },
  { id: '6', name: 'Mr. Singh', subject: 'Physical Education' },
];

export default function TeachersAttendance() {
  const { toast } = useToast();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<typeof TEACHERS_LIST[0] | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Stop camera when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { 
          facingMode: 'user', 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }
        },
        audio: false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Ensure video plays
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(err => {
            console.error("Error playing video:", err);
            toast({
              title: "Playback Error",
              description: "Could not start video playback.",
              variant: "destructive",
            });
          });
        };
        
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      toast({
        title: "Camera Error",
        description: err.message || "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;
        
        if (width && height) {
          canvasRef.current.width = width;
          canvasRef.current.height = height;
          
          // Mirror the image (flip horizontally)
          context.scale(-1, 1);
          context.drawImage(videoRef.current, -width, 0, width, height);
          
          const photoData = canvasRef.current.toDataURL('image/jpeg', 0.95);
          setCapturedPhoto(photoData);
          stopCamera();
        } else {
          toast({
            title: "Capture Error",
            description: "Video dimensions not available. Please wait a moment.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Capture Error",
          description: "Video not ready. Please wait a moment.",
          variant: "destructive",
        });
      }
    }
  };

  const startAttendanceCamera = async (teacher: typeof TEACHERS_LIST[0]) => {
    setSelectedTeacher(teacher);
    setCapturedPhoto(null);
    setIsCameraOpen(true);
    
    // Start camera after dialog opens
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  const saveAttendance = () => {
    if (selectedTeacher && capturedPhoto) {
      toast({
        title: "Attendance Recorded",
        description: `${selectedTeacher.name} attendance marked with photo at ${new Date().toLocaleTimeString()}`,
      });
      closeDialog();
    }
  };

  const closeDialog = () => {
    stopCamera();
    setIsCameraOpen(false);
    setCapturedPhoto(null);
    setSelectedTeacher(null);
  };

  return (
    <DashboardLayout role="principal">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Teachers Attendance</h2>
            <p className="text-muted-foreground">Mark attendance for teaching staff with live photo capture.</p>
          </div>
        </div>

        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Mark Attendance</CardTitle>
            <CardDescription>Click Start button on any teacher to capture attendance photo using your camera.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEACHERS_LIST.map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between gap-4 rounded-lg border border-muted/50 bg-muted/5 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-primary truncate">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startAttendanceCamera(teacher)}
                    className="flex-shrink-0"
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={isCameraOpen} onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Capture Attendance Photo - {selectedTeacher?.name}</DialogTitle>
              <DialogDescription>
                Use your camera to capture attendance photo.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {capturedPhoto ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-muted/50 overflow-hidden bg-muted/10 aspect-video flex items-center justify-center">
                    <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setCapturedPhoto(null);
                        setTimeout(() => {
                          startCamera();
                        }, 100);
                      }}
                    >
                      Retake Photo
                    </Button>
                    <Button
                      className="flex-1 bg-primary"
                      onClick={saveAttendance}
                    >
                      Save Attendance
                    </Button>
                  </div>
                </div>
              ) : isCameraActive ? (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-lg border border-muted/50 bg-muted/10 aspect-video object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <Button
                    onClick={capturePhoto}
                    className="w-full bg-primary"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Capture Photo
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-muted/50 p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Initializing Camera</p>
                    <p className="text-xs text-muted-foreground mt-1">Starting live camera capture...</p>
                  </div>
                  <Button
                    onClick={() => startCamera()}
                    className="bg-primary w-full"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Enable Camera
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

