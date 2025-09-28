import React, { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const About = () => {
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

          return (
                    <div className="min-h-screen bg-background text-foreground">
                              <Navbar />
                              <main>
                                        {/* Hero */}
                                        
                                       <section className="py-16 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
                                          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                            <div className="animate-fade-in">
                                              {/* <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">About Us</div> */}
                                              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 animate-slide-up">
                                                We build delightful,
                                                <span className="block gradient-text-primary">resilient cloud products</span>
                                              </h1>
                                              <p className="text-foreground text-lg max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
                                                TriNextGen is a product-first studio focused on crafting elegant, performant, and scalable experiences across web and cloud platforms.
                                              </p>
                                            </div>
                                          </div>
                                        </section>

                                        {/* About content */}
                                        <section className="py-16 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
                                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                      <Card className="card-professional gradient-border">
                                                                                <CardContent className="p-6">
                                                                                          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                                                                                          <p className="text-sm text-muted-foreground">
                                                                                                    Empower teams to ship faster with robust foundations, beautiful UI, and pragmatic engineering.
                                                                                          </p>
                                                                                </CardContent>
                                                                      </Card>
                                                                      <Card className="card-professional gradient-border">
                                                                                <CardContent className="p-6">
                                                                                          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                                                                                          <p className="text-sm text-muted-foreground">
                                                                                                    Craftsmanship, empathy, and reliability. We obsess over DX, UX, and long-term maintainability.
                                                                                          </p>
                                                                                </CardContent>
                                                                      </Card>
                                                                      <Card className="card-professional gradient-border">
                                                                                <CardContent className="p-6">
                                                                                          <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
                                                                                          <p className="text-sm text-muted-foreground">
                                                                                                    From startups to enterprises, we power critical user journeys with measurable outcomes.
                                                                                          </p>
                                                                                </CardContent>
                                                                      </Card>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                      <Card className="card-professional">
                                                                                <CardContent className="p-6">
                                                                                          <h3 className="text-xl font-semibold mb-2">What we do</h3>
                                                                                          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                                                                                    <li>Design systems and component libraries</li>
                                                                                                    <li>Cloud-native architectures and observability</li>
                                                                                                    <li>AI-assisted workflows and RAG search</li>
                                                                                                    <li>DX tooling, CI/CD, and performance budgets</li>
                                                                                          </ul>
                                                                                </CardContent>
                                                                      </Card>
                                                                      <Card className="card-professional">
                                                                                <CardContent className="p-6">
                                                                                          <h3 className="text-xl font-semibold mb-2">How we work</h3>
                                                                                          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                                                                                    <li>Small, senior teams with high ownership</li>
                                                                                                    <li>Transparent roadmaps and async-first collaboration</li>
                                                                                                    <li>Quality gates with automated checks</li>
                                                                                                    <li>Continuous discovery and frequent shipping</li>
                                                                                          </ul>
                                                                                </CardContent>
                                                                      </Card>
                                                            </div>
                                                  </div>
                                        </section>
                              </main>
                              <Footer />
                    </div>
          );
};

export default About;
