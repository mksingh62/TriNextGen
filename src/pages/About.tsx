import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
          return (
                    <div className="min-h-screen bg-background text-foreground">
                              <Navbar />
                              <main>
                                        {/* Hero */}
                                        <section className="relative pt-28 pb-16 hero-bg noise-overlay">
                                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                            <div className="max-w-3xl">
                                                                      <Badge className="mb-4 bg-white/10 dark:bg-white/10 text-white border-white/20">About Us</Badge>
                                                                      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                                                                                We build delightful, resilient cloud products
                                                                      </h1>
                                                                      <p className="text-white/80 text-lg max-w-2xl">
                                                                                CloudNova is a product-first studio focused on crafting elegant, performant, and scalable experiences across web and cloud platforms.
                                                                      </p>
                                                            </div>
                                                  </div>
                                        </section>

                                        {/* About content */}
                                        <section className="py-16 section-bg">
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
