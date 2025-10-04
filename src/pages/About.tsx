import React, { useRef, useState } from 'react';
// Remove Navbar and Footer imports since they're now in App.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Chatbot from '@/components/Chatbot';
import {
  Code,
  Cloud,
  Smartphone,
  Database,
  Shield,
  Zap,
  Globe,
  Lightbulb,
  Rocket,
  Linkedin,
  Github,
  Mail,
} from 'lucide-react';

const About = () => {
          const tiltRef = useRef<HTMLDivElement>(null);
          const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

          const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
            const founders = [
              {
                name: 'Mohit Kumar Singh',
                role: 'Founder & CEO',
                bio: 'Visionary leader with 8+ years in software development and business strategy. Passionate about creating innovative solutions that drive digital transformation.',
                skills: ['Strategic Planning', 'Product Vision', 'Team Leadership', 'Business Development'],
                image: '/founder_pic.jpg'
              },
              {
                name: 'Nikhil Kashyap',
                role: 'Co-Founder & CTO',
                bio: 'Technical expert specializing in scalable architectures and emerging technologies. Committed to building robust, future-ready software solutions.',
                skills: ['System Architecture', 'Cloud Computing', 'DevOps', 'Technical Innovation'],
                image: '/Nikhil_Kshyap.jpeg'
              },
              {
                name: 'Ajay Sonkar',
                role: 'Co-Founder & CTO',
                bio: 'Technical expert specializing in scalable architectures and emerging technologies. Committed to building robust, future-ready software solutions.',
                skills: ['System Architecture', 'Cloud Computing', 'DevOps', 'Technical Innovation'],
                image: '/Co-Founder.jpg'
              }
            ];

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

          const founders = [
    {
      name: 'Mohit Kumar Singh',
      role: 'Founder & CEO',
      bio: 'Visionary leader with 8+ years in software development and business strategy. Passionate about creating innovative solutions that drive digital transformation.',
      skills: ['Strategic Planning', 'Product Vision', 'Team Leadership', 'Business Development'],
      image: '/founder_pic.jpg'
    },
    {
      name: 'Nikhil Kashyap',
      role: 'Co-Founder & CTO',
      bio: 'Technical expert specializing in scalable architectures and emerging technologies. Committed to building robust, future-ready software solutions.',
      skills: ['System Architecture', 'Cloud Computing', 'DevOps', 'Technical Innovation'],
      image: '/Nikhil_Kshyap.jpeg'
    },
    {
      name: 'Ajay Sonkar',
      role: 'Co-Founder & CTO',
      bio: 'Technical expert specializing in scalable architectures and emerging technologies. Committed to building robust, future-ready software solutions.',
      skills: ['System Architecture', 'Cloud Computing', 'DevOps', 'Technical Innovation'],
      image: '/Co-Founder.jpg'
    }
  ];

          return (
                    <div className="min-h-screen bg-background text-foreground">
                              {/* Remove Navbar since it's now in App.tsx */}
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

                                        {/* Meet Our Team Section */}
                                        <section id="team" className="py-16 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
                                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                            {/* Section Header */}
                                                            <div className="text-center mb-16 animate-fade-in">
                                                                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                                                                Meet Our Team
                                                                      </h2>
                                                                      <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                                                                Founded by passionate technologists, TriNextGen is dedicated to delivering exceptional software solutions
                                                                                that empower businesses to achieve their digital goals.
                                                                      </p>
                                                            </div>

                                                            {/* Founders Grid */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                                      {founders.map((founder, index) => (
                                                                                <Card
                                                                                          key={founder.name}
                                                                                          className={`shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional`}
                                                                                          style={{ animationDelay: `${index * 0.2}s` }}
                                                                                >
                                                                                          <CardContent className="p-8">
                                                                                                    <div className="flex flex-col items-center text-center">
                                                                                                              <img
                                                                                                                        src={founder.image}
                                                                                                                        alt={founder.name}
                                                                                                                        className="w-32 h-32 rounded-full mt-4 mb-6 object-cover object-top bg-secondary group-hover:scale-105 transition-transform"
                                                                                                              />

                                                                                                              <h3 className="text-2xl font-bold text-foreground mb-2">{founder.name}</h3>
                                                                                                              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
                                                                                                                        {founder.role}
                                                                                                              </Badge>

                                                                                                              <p className="text-muted-foreground mb-6 leading-relaxed">
                                                                                                                        {founder.bio}
                                                                                                              </p>

                                                                                                              <div className="mb-6">
                                                                                                                        <h4 className="text-sm font-semibold text-foreground mb-3">Expertise</h4>
                                                                                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                                                                                                  {founder.skills.map((skill, skillIndex) => (
                                                                                                                                            <Badge
                                                                                                                                                      key={skillIndex}
                                                                                                                                                      variant="secondary"
                                                                                                                                                      className="text-xs bg-secondary/80"
                                                                                                                                            >
                                                                                                                                                      {skill}
                                                                                                                                            </Badge>
                                                                                                                                  ))}
                                                                                                                        </div>
                                                                                                              </div>

                                                                                                              <div className="flex space-x-4">
                                                                                                                        <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                                                                                                                                  <Linkedin size={18} />
                                                                                                                        </button>
                                                                                                                        <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                                                                                                                                  <Github size={18} />
                                                                                                                        </button>
                                                                                                                        <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                                                                                                                                  <Mail size={18} />
                                                                                                                        </button>
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </CardContent>
                                                                      </Card>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        </section>
                              </main>
                              {/* Remove Footer since it's now in App.tsx */}
                              <Chatbot />
                    </div>
          );
};

export default About;