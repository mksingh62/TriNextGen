import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Chatbot from '@/components/Chatbot';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  MapPin, Briefcase, DollarSign, Clock, Code,
  Cloud,
  Smartphone,
  Database,
  Shield,
  Zap,
  Globe,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { careerApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Define the Job type to match the backend model
type Job = {
  _id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  salary?: string;
  tags: string[];
  description: string;
};

// Define the Application type
type Application = {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume?: string;
  jobId: string;
  jobTitle: string;
};

const Careers = () => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [applicationData, setApplicationData] = useState<Application>({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    jobId: '',
    jobTitle: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await careerApi.getAllCareers();
        setJobs(jobsData);
      } catch (err) {
        setError('Failed to load career opportunities. Please try again later.');
        console.error('Error fetching careers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 8; // degrees
    const ry = ((x - centerX) / centerX) * maxTilt; // rotateY
    const rx = -((y - centerY) / centerY) * maxTilt; // rotateX
    setTilt({ rx, ry });
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const openMail = (job: Job) => {
    const subject = encodeURIComponent(`Application: ${job.title} (${job._id})`);
    const body = encodeURIComponent(`Hi TriNextGen Team,%0D%0A%0D%0AI'd like to apply for ${job.title}.%0D%0A%0D%0ALinks/Portfolio:%0D%0A%0D%0AThanks!`);
    window.open(`mailto:trinextgen@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const openDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const openApplicationForm = (job: Job) => {
    setSelectedJob(job);
    setApplicationData({
      name: '',
      email: '',
      phone: '',
      coverLetter: '',
      jobId: job._id,
      jobTitle: job.title,
    });
    setIsApplicationDialogOpen(true);
  };

  const handleApplicationChange = (field: keyof Application, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await careerApi.applyForPosition(applicationData);
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully. We'll review it and get back to you soon.",
      });
      
      setIsApplicationDialogOpen(false);
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        jobId: '',
        jobTitle: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading career opportunities...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Careers</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-16 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              {/* <Badge variant="secondary" className="mb-4">We are hiring</Badge> */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 animate-slide-up">
                Build the future
                <span className="block gradient-text-primary">with TriNextGen</span>
              </h1>
              <p className="text-foreground text-lg max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
                Join a world-class team creating delightful products and impactful platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Job listings */}
        <section className="py-16 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Open Roles</h2>
              <p className="text-muted-foreground text-sm">{jobs.length} positions</p>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No open positions at the moment. Check back later!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <Card key={job._id} className="card-professional hover-lift gradient-border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold mb-1">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="inline-flex items-center"><MapPin className="w-4 h-4 mr-1" />{job.location}</span>
                            <span className="inline-flex items-center"><Briefcase className="w-4 h-4 mr-1" />{job.type} • {job.level}</span>
                            {job.salary && (
                              <span className="inline-flex items-center"><DollarSign className="w-4 h-4 mr-1" />{job.salary}</span>
                            )}
                          </div>
                        </div>
                        <Badge variant="secondary" className="flex items-center"><Clock className="w-3 h-3 mr-1" />Open</Badge>
                      </div>

                      <p className="mt-4 text-sm text-muted-foreground">
                        {job.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <Button onClick={() => openApplicationForm(job)} className="bg-primary hover:bg-primary-dark">Apply Now</Button>
                        <Button variant="outline" onClick={() => openDetails(job)}>View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Job Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            {selectedJob && (
              <div>
                <DialogHeader>
                  <DialogTitle>{selectedJob.title}</DialogTitle>
                  <DialogDescription>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center"><MapPin className="w-4 h-4 mr-1" />{selectedJob.location}</span>
                      <span className="inline-flex items-center"><Briefcase className="w-4 h-4 mr-1" />{selectedJob.type} • {selectedJob.level}</span>
                      {selectedJob.salary && (
                        <span className="inline-flex items-center"><DollarSign className="w-4 h-4 mr-1" />{selectedJob.salary}</span>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-3 text-sm">
                  <p className="text-foreground">{selectedJob.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                  <Button className="bg-primary hover:bg-primary-dark" onClick={() => { setIsDialogOpen(false); openApplicationForm(selectedJob); }}>Apply Now</Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Application Form Dialog */}
        <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
          <DialogContent className="max-w-2xl">
            {selectedJob && (
              <form onSubmit={handleApplicationSubmit}>
                <DialogHeader>
                  <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to apply for this position. We'll review your application and get back to you soon.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={applicationData.name}
                        onChange={(e) => handleApplicationChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => handleApplicationChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={applicationData.phone}
                      onChange={(e) => handleApplicationChange('phone', e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={(e) => handleApplicationChange('coverLetter', e.target.value)}
                      placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>Note: You can submit your resume/CV in the cover letter or mention that you'll send it separately.</p>
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsApplicationDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary-dark">
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Careers;