import React, { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  Code,
  Cloud,
  Smartphone,
  Database,
  Shield,
  Zap,
  LucideIcon,
  Lightbulb,
  PenTool,
  Rocket,
} from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
  path: string;
}

export const services: Service[] = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Custom web applications built with modern frameworks and technologies for optimal performance and scalability.',
    features: ['React/Next.js', 'Node.js Backend', 'Responsive Design', 'API Integration'],
    color: 'from-blue-500 to-purple-600',
    path: '/services/web-development',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile apps that deliver exceptional user experiences across all devices.',
    features: ['React Native', 'iOS/Android', 'App Store Deploy', 'Push Notifications'],
    color: 'from-purple-500 to-pink-600',
    path: '/services/mobile-development',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure and migration services to optimize your business operations and reduce costs.',
    features: ['AWS/Azure/GCP', 'DevOps Setup', 'Auto Scaling', 'Security First'],
    color: 'from-green-500 to-blue-600',
    path: '/services/cloud-solutions',
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description:
      'Transform your data into actionable insights with advanced analytics and business intelligence solutions.',
    features: ['Data Visualization', 'ML Models', 'Real-time Analytics', 'Custom Dashboards'],
    color: 'from-orange-500 to-red-600',
    path: '/services/data-analytics',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description:
      'Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance', '24/7 Monitoring'],
    color: 'from-red-500 to-purple-600',
    path: '/services/cybersecurity',
  },
  {
    icon: Zap,
    title: 'Digital Transformation',
    description:
      'End-to-end digital transformation services to modernize your business processes and technology stack.',
    features: ['Process Automation', 'Legacy Migration', 'Training & Support', 'Change Management'],
    color: 'from-yellow-500 to-orange-600',
    path: '/services/digital-transformation',
  },
];

const processSteps = [
  {
    icon: Lightbulb,
    title: '1. Discovery & Planning',
    description:
      'We start by understanding your vision, goals, and technical requirements to create a detailed project roadmap.',
  },
  {
    icon: PenTool,
    title: '2. Design & Prototyping',
    description:
      'Our team designs intuitive user interfaces and creates interactive prototypes to visualize the end product.',
  },
  {
    icon: Code,
    title: '3. Development & Testing',
    description:
      'We follow agile methodologies to build your application, with continuous testing to ensure quality and reliability.',
  },
  {
    icon: Rocket,
    title: '4. Deployment & Support',
    description: 'After successful testing, we deploy your application and provide ongoing support to ensure smooth operation.',
  },
];

const Services = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const contactPhone = useMemo(() => '+919876543210', []);
  const contactEmail = useMemo(() => 'hello@cloudnova.com', []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <section
          id="services"
          className="py-20 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/web_background.jpg')" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in">
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-2 text-sm font-medium"
              >
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Comprehensive Software Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From concept to deployment, we offer end-to-end software development services
                that drive innovation and deliver measurable results for your business.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={service.title}
                    className={`shadow-medium hover:shadow-strong transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-xl bg-primary p-4 mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground mb-2">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-smooth"
                        onClick={() => openContactFor(service)}
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Process Section (How We Work) */}
            <div className="text-center my-20 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How We Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our process is designed for transparency, efficiency, and delivering high-quality results on time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card
                    key={step.title}
                    className="text-center p-6 shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="animate-slide-up">
              <Card className="rounded-lg text-card-foreground shadow-sm shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Ready to Transform Your Business?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Let's discuss your project requirements and create a custom solution that drives your business forward.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={scrollToContact}
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-50 transition-smooth px-8 py-4"
                    >
                      Start Your Project
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-50 transition-smooth px-8 py-4"
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Dialog */}
          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
            <DialogContent className="w-full max-w-md sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedService?.title ?? 'Interested?'}</DialogTitle>
                <DialogDescription>
                  {selectedService?.description ??
                    'Tell us what you are looking for and we will reach out.'}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button onClick={onCall} className="bg-primary hover:bg-primary-dark">
                  Call
                </Button>
                <Button variant="secondary" onClick={onWhatsApp}>
                  WhatsApp
                </Button>
                <Button variant="outline" onClick={onEmail}>
                  Email
                </Button>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Prefer another channel? Reply to {contactEmail}
              </div>
            </DialogContent>
          </Dialog>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
