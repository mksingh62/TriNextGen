import React from 'react';
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

const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
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
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-smooth"
                    onClick={scrollToContact}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
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
    </section>
  );
};

export default Services;