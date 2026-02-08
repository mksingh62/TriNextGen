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
import { services } from '@/data/servicesData';

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

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: 'mailto:trinextgen@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                TriNextGen
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Building the future of software with innovative solutions that transform businesses 
                and accelerate digital growth.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-smooth group"
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 transform inline-block text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Get In Touch</h4>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm mb-1">Email</p>
                <a 
                  href="mailto:trinextgen@gmail.com" 
                  className="text-sm sm:text-base text-primary hover:underline font-medium break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  trinextgen@gmail.com
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm mb-1">Phone</p>
                <a 
                  href="tel:+916263716688" 
                  className="text-sm sm:text-base text-primary hover:underline font-medium"
                >
                  +91 62637 16688
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm mb-1">Office</p>
                <p className="text-sm sm:text-base text-foreground font-medium">Raipur, CG</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />

        {/* Bottom Footer */}
        <div className="py-6 sm:py-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 text-center sm:text-left">
            <p className="text-muted-foreground text-xs sm:text-sm">
              © 2025 TriNextGen. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 md:gap-6">
              <button className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-smooth">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-smooth">
                Terms of Service
              </button>
              <button className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-smooth">
                Cookie Policy
              </button>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
          >
            <span className="text-xs sm:text-sm font-medium">Back to Top</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-smooth">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;