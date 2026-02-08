import React, { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
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
import { Link } from 'react-router-dom';
import { serviceApi } from '@/lib/api';

// Define the Service interface
export interface Service {
  _id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  path: string;
}

// Map icon names to actual Lucide icons
const iconMap: Record<string, LucideIcon> = {
  Code,
  Smartphone,
  Cloud,
  Database,
  Shield,
  Zap,
  Lightbulb,
  PenTool,
  Rocket,
};

// Process steps data
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const contactPhone = useMemo(() => '+916263716688', []);
  const contactEmail = useMemo(() => 'trinextgen@gmail.com', []);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await serviceApi.getAllServices();
        
        // Transform the data to match our Service interface
        const transformedServices = servicesData.map((service: any) => ({
          ...service,
          path: `/services/${service._id}`,
          icon: service.icon // Keep the icon name as string for mapping
        }));
        
        setServices(transformedServices);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const openContactFor = (service: Service) => {
    setSelectedService(service);
    setIsContactOpen(true);
  };

  const onCall = () => {
    window.location.href = `tel:${contactPhone}`;
  };

  const onWhatsApp = () => {
    const text = encodeURIComponent(`Hi TriNextGen, I'm interested in ${selectedService?.title}.`);
    const phoneDigits = contactPhone.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${phoneDigits}?text=${text}`, '_blank');
  };

  const onEmail = () => {
    const subject = encodeURIComponent(`Interested in ${selectedService?.title}`);
    const body = encodeURIComponent('Hi TriNextGen,%0D%0A%0D%0AI am interested in your services.');
    window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading services...</p>
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
              <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Services</h2>
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
        <section
          id="services"
          className="py-20 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/web_background.jpg')" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-left lg:text-center mb-16 animate-fade-in">
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
                // Get the icon component from the icon name
                const IconComponent = iconMap[service.icon] || Code;
                return (
                  <Card
                    key={service._id}
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
            <div className="text-left lg:text-center my-20 animate-fade-in">
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
                    className="text-left lg:text-center p-6 shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift"
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
                <CardContent className="p-8 text-left lg:text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Ready to Transform Your Business?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Let's discuss your project requirements and create a custom solution that drives your business forward.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary-dark px-8 py-4">
                      <Link to="/contact">
                        Contact Us
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="px-8 py-4">
                      <Link to="/contact">
                        Schedule Consultation
                      </Link>
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
      <Chatbot />
    </div>
  );
};

export default Services;