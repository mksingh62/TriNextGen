import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
// import Services from '@/components/Services'; // This is the correct component
import Contact from '@/components/Contact';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Cloud } from 'lucide-react';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Quick Links Section */}
      {/* <section className="py-12 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services">
              <Button variant="outline" className="group">
                Our Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/careers">
              <Button variant="outline" className="group">
                Career Opportunities
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="group">
                About Us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/backend-test">
              <Button variant="outline" className="group">
                Test Backend
                <Zap className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* <Services /> */}
      <Contact />

      {/* CTA Section */}
      <Chatbot />
      {/* <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our solutions can help you achieve your goals and drive innovation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Index;