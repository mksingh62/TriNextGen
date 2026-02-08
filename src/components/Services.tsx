import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { serviceApi } from '@/lib/api';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Zap,
  Server,
  Palette,
  Shield,
  BarChart3
} from 'lucide-react';

const serviceIcons = {
  web: Globe,
  mobile: Smartphone,
  backend: Server,
  database: Database,
  cloud: Cloud,
  design: Palette,
  security: Shield,
  analytics: BarChart3,
  automation: Zap,
  development: Code
};

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: keyof typeof serviceIcons;
  features: string[];
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // For now, we'll use mock data since we don't have the backend services endpoint implemented
        // When the backend is ready, we can uncomment the next line and remove the mock data
        // const data = await serviceApi.getAllServices();
        
        // Mock data for demonstration
        const mockData: Service[] = [
          {
            _id: '1',
            title: 'Web Development',
            description: 'Custom web applications built with modern technologies for optimal performance and user experience.',
            icon: 'web',
            features: [
              'Responsive Design',
              'Progressive Web Apps',
              'SEO Optimization',
              'Performance Optimization'
            ]
          },
          {
            _id: '2',
            title: 'Mobile Development',
            description: 'Native and cross-platform mobile applications for iOS and Android devices.',
            icon: 'mobile',
            features: [
              'iOS & Android',
              'Cross-platform',
              'App Store Deployment',
              'Push Notifications'
            ]
          },
          {
            _id: '3',
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and services to power your business applications.',
            icon: 'cloud',
            features: [
              'AWS Integration',
              'Serverless Architecture',
              'Auto Scaling',
              'Disaster Recovery'
            ]
          },
          {
            _id: '4',
            title: 'UI/UX Design',
            description: 'Beautiful and intuitive user interfaces designed to enhance user engagement.',
            icon: 'design',
            features: [
              'User Research',
              'Wireframing',
              'Prototyping',
              'Usability Testing'
            ]
          },
          {
            _id: '5',
            title: 'Data Analytics',
            description: 'Transform your data into actionable insights with our analytics solutions.',
            icon: 'analytics',
            features: [
              'Data Visualization',
              'Business Intelligence',
              'Predictive Analytics',
              'Real-time Dashboards'
            ]
          },
          {
            _id: '6',
            title: 'Cyber Security',
            description: 'Protect your digital assets with our comprehensive security solutions.',
            icon: 'security',
            features: [
              'Penetration Testing',
              'Vulnerability Assessment',
              'Security Audits',
              'Compliance Management'
            ]
          }
        ];
        
        setServices(mockData);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-lg text-muted-foreground">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-destructive mb-2">Error Loading Services</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left lg:text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
            Our Services
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed break-words hyphens-auto px-2 sm:px-0">
            We offer a full range of digital services to help your business thrive in the modern landscape.
            From concept to deployment, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[service.icon] || Code;
            return (
              <Card 
                key={service._id}
                className="shadow-medium border-0 bg-card/80 backdrop-blur-sm hover:shadow-strong transition-all duration-300 hover-lift hover-glow card-professional overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-4 sm:p-5 md:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-foreground break-words">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 md:p-6 md:pt-0">
                  <p className="text-sm sm:text-base md:text-muted-foreground md:text-base leading-snug md:leading-relaxed mb-3 sm:mb-4 break-words hyphens-auto">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-foreground break-words hyphens-auto">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4 sm:mt-6 group text-sm sm:text-base">
                    Learn More
                    <Zap className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;