import React, { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

type Job = {
          id: string;
          title: string;
          location: string;
          type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
          level: 'Junior' | 'Mid' | 'Senior' | 'Lead';
          salary?: string;
          tags: string[];
          description: string;
};

const jobs: Job[] = [
          {
                    id: 'fe-001',
                    title: 'Senior Frontend Engineer (React + TypeScript)',
                    location: 'Remote',
                    type: 'Full-time',
                    level: 'Senior',
                    salary: '$120k – $160k',
                    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
                    description: 'Lead UI development, build high-quality components, and collaborate with design to craft exceptional experiences.'
          },
          {
                    id: 'be-002',
                    title: 'Backend Engineer (Node/TS)',
                    location: 'Bengaluru, IN',
                    type: 'Full-time',
                    level: 'Mid',
                    salary: '$90k – $130k',
                    tags: ['Node.js', 'PostgreSQL', 'REST', 'Cloud'],
                    description: 'Build scalable APIs and services with robust testing and monitoring.'
          },
          {
                    id: 'ds-003',
                    title: 'AI/ML Engineer',
                    location: 'Hybrid - Pune, IN',
                    type: 'Full-time',
                    level: 'Mid',
                    salary: '₹25L – ₹45L',
                    tags: ['Python', 'LLMs', 'Vector DBs', 'RAG'],
                    description: 'Prototype and productionize AI features with measurable business impact.'
          }
];

const Careers = () => {
          const tiltRef = useRef<HTMLDivElement>(null);
          const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

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

          const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
          const [isDialogOpen, setIsDialogOpen] = React.useState(false);
          const openMail = (job: Job) => {
                    const subject = encodeURIComponent(`Application: ${job.title} (${job.id})`);
                    const body = encodeURIComponent(`Hi TriNextGen Team,%0D%0A%0D%0AI'd like to apply for ${job.title}.%0D%0A%0D%0ALinks/Portfolio:%0D%0A%0D%0AThanks!`);
                    window.location.href = `mailto:hello@trinextgen.com?subject=${subject}&body=${body}`;
          };
          const openDetails = (job: Job) => {
                    setSelectedJob(job);
                    setIsDialogOpen(true);
          };

          return (
                    <div className="min-h-screen bg-background text-foreground">
                              <Navbar />
                              <main>
                                        {/* Hero */}
                                        <section className="relative pt-28 pb-16 section-bg">
                                          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                            <div className="animate-fade-in">
                                              <Badge variant="secondary" className="mb-4">We are hiring</Badge>
                                              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 animate-slide-up">
                                                Build the future
                                                <span className="block gradient-text-primary">with TriNextGen</span>
                                              </h1>
                                              <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
                                                Join a world-class team creating delightful products and impactful platforms.
                                              </p>
                                            </div>
                                          </div>
                                        </section>

                                        {/* Job listings */}
                                        <section className="py-16 section-bg">
                                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                            <div className="flex items-center justify-between mb-8">
                                                                      <h2 className="text-2xl md:text-3xl font-bold">Open Roles</h2>
                                                                      <p className="text-muted-foreground text-sm">{jobs.length} positions</p>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                      {jobs.map((job) => (
                                                                                <Card key={job.id} className="card-professional hover-lift gradient-border">
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
                                                                                                              <Button onClick={() => openMail(job)} className="bg-primary hover:bg-primary-dark">Apply Now</Button>
                                                                                                              <Button variant="outline" onClick={() => openDetails(job)}>View Details</Button>
                                                                                                    </div>
                                                                                          </CardContent>
                                                                                </Card>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        </section>
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
                                                                                          <Button className="bg-primary hover:bg-primary-dark" onClick={() => selectedJob && openMail(selectedJob)}>Apply Now</Button>
                                                                                </DialogFooter>
                                                                      </div>
                                                            )}
                                                  </DialogContent>
                                        </Dialog>
                              </main>
                              <Footer />
                    </div>
          );
};

export default Careers;
