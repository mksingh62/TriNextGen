import React, { useMemo, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Code,
  Cloud,
  Smartphone,
  Database,
  Shield,
  Zap,
  Globe,
  Lightbulb,
  Rocket
} from 'lucide-react';

type Service = {
          title: string;
          description: string;
          bullets: string[];
};

const Services = () => {
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

          const services: Service[] = [
                    {
                              title: 'Product Engineering',
                              description: 'End-to-end web app delivery with React, TypeScript, and robust foundations.',
                              bullets: [
                                        'Design systems + component libraries',
                                        'Accessibility and best UX practices',
                                        'Performance and quality budgets'
                              ]
                    },
                    {
                              title: 'Cloud & Platform',
                              description: 'Resilient, observable, and scalable cloud-native architectures.',
                              bullets: [
                                        'API design, security, and rate limiting',
                                        'Observability: logs, metrics, traces',
                                        'Infrastructure as Code and CI/CD'
                              ]
                    },
                    {
                              title: 'AI Integrations',
                              description: 'Pragmatic AI features with measurable business impact.',
                              bullets: [
                                        'RAG search and vector databases',
                                        'Agentic workflows and orchestration',
                                        'Evaluations, guardrails, and safety'
                              ]
                    }
          ];

          const [isContactOpen, setIsContactOpen] = useState(false);
          const [selectedService, setSelectedService] = useState<Service | null>(null);

          const contactPhone = useMemo(() => '+919876543210', []);
          const contactEmail = useMemo(() => 'hello@cloudnova.com', []);

          const openContactFor = (service: Service) => {
                    setSelectedService(service);
                    setIsContactOpen(true);
          };

          const onCall = () => {
                    window.location.href = `tel:${contactPhone}`;
          };

          const onWhatsApp = () => {
                    const text = encodeURIComponent(`Hi CloudNova, I'm interested in ${selectedService?.title}.`);
                    const phoneDigits = contactPhone.replace(/[^\d]/g, '');
                    window.open(`https://wa.me/${phoneDigits}?text=${text}`, '_blank');
          };

          const onEmail = () => {
                    const subject = encodeURIComponent(`Interested in ${selectedService?.title}`);
                    const body = encodeURIComponent('Hi CloudNova,%0D%0A%0D%0AI am interested in your services.');
                    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
          };

          return (
                    <div className="min-h-screen bg-background text-foreground">
                              <Navbar />
                              <main>
                                        {/* Hero */}
                                        <section className="relative pt-28 pb-16 section-bg">
                                          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                            <div className="animate-fade-in">
                                              <Badge variant="secondary" className="mb-4">Our Services</Badge>
                                              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 animate-slide-up">
                                                Practical engineering.
                                                <span className="block gradient-text-primary">Beautiful experiences.</span>
                                              </h1>
                                              <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
                                                We partner with teams to ship reliable products, accelerate roadmaps, and raise the quality bar.
                                              </p>
                                            </div>
                                          </div>
                                        </section>

                                        {/* Services Grid */}
                                        <section className="py-16 section-bg">
                                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                      {services.map((svc) => (
                                                                                <Card
                                                                                          key={svc.title}
                                                                                          className="card-professional hover-lift gradient-border cursor-pointer"
                                                                                          onClick={() => openContactFor(svc)}
                                                                                >
                                                                                          <CardContent className="p-6">
                                                                                                    <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
                                                                                                    <p className="text-sm text-muted-foreground mb-4">{svc.description}</p>
                                                                                                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                                                                                              {svc.bullets.map((b) => (
                                                                                                                        <li key={b}>{b}</li>
                                                                                                              ))}
                                                                                                    </ul>
                                                                                                    <div className="mt-6">
                                                                                                              <Button variant="outline">Learn more</Button>
                                                                                                    </div>
                                                                                          </CardContent>
                                                                                </Card>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        </section>

                                        {/* Contact Dialog */}
                                        <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                                                  <DialogContent className="w-full max-w-md sm:max-w-lg">
                                                            <DialogHeader>
                                                                      <DialogTitle>{selectedService?.title ?? 'Interested?'}</DialogTitle>
                                                                      <DialogDescription>
                                                                                {selectedService?.description ?? 'Tell us what you are looking for and we will reach out.'}
                                                                      </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                                      <Button onClick={onCall} className="bg-primary hover:bg-primary-dark">Call</Button>
                                                                      <Button variant="secondary" onClick={onWhatsApp}>WhatsApp</Button>
                                                                      <Button variant="outline" onClick={onEmail}>Email</Button>
                                                            </div>
                                                            <div className="mt-3 text-xs text-muted-foreground">
                                                                      Prefer another channel? Reply to {contactEmail}
                                                            </div>
                                                  </DialogContent>
                                        </Dialog>
                              </main>
                              <Footer />
                    </div>
          );
};

export default Services;
