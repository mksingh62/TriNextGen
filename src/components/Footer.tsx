import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Mail,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'Cloud Solutions',
    'Data Analytics',
    'Cybersecurity',
    'Digital Transformation'
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@trinextgen.com', label: 'Email' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary mb-4">
                TriNextGen
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Building the future of software with innovative solutions that transform businesses 
                and accelerate digital growth.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-smooth group"
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 transform inline-block"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <a 
                  href="mailto:hello@trinextgen.com" 
                  className="text-primary hover:underline font-medium"
                >
                  hello@trinextgen.com
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Phone</p>
                <a 
                  href="tel:+15551234567" 
                  className="text-primary hover:underline font-medium"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Office</p>
                <p className="text-foreground font-medium">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <p className="text-muted-foreground text-sm">
              © 2025 TriNextGen. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button className="text-muted-foreground hover:text-primary text-sm transition-smooth">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-primary text-sm transition-smooth">
                Terms of Service
              </button>
              <button className="text-muted-foreground hover:text-primary text-sm transition-smooth">
                Cookie Policy
              </button>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-smooth">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;