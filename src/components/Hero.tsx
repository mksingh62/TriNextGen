import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Sparkles,
  Code,
  Cloud,
  Smartphone,
  Database,
  Shield,
  Zap,
  Users,
  Award,
  TrendingUp,
  Globe,
  CheckCircle,
  Star,
  Rocket,
  Target,
  Lightbulb
} from 'lucide-react';

const Hero = () => {
  const tiltRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: Code, text: 'Web Development', color: 'from-blue-500 to-cyan-500' },
    { icon: Smartphone, text: 'Mobile Apps', color: 'from-purple-500 to-pink-500' },
    { icon: Cloud, text: 'Cloud Solutions', color: 'from-green-500 to-emerald-500' },
    { icon: Database, text: 'Data Analytics', color: 'from-orange-500 to-red-500' },
    { icon: Shield, text: 'Cybersecurity', color: 'from-red-500 to-rose-500' },
    { icon: Zap, text: 'AI Integration', color: 'from-yellow-500 to-orange-500' }
  ];

  const achievements = [
    { emoji: '👥', number: '500+', label: 'Happy Clients' },
    { emoji: '🏆', number: '50+', label: 'Awards Won' },
    { emoji: '📈', number: '99%', label: 'Success Rate' },
    { emoji: '🌍', number: '25+', label: 'Countries Served' }
  ];

  const testimonials = [
    { text: "TriNextGen transformed our business with their innovative solutions", author: "Sarah Johnson", company: "TechCorp" },
    { text: "Outstanding service and cutting-edge technology", author: "Mike Chen", company: "StartupXYZ" },
    { text: "The best software development partner we've worked with", author: "Emily Davis", company: "Enterprise Inc" }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-foreground">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 text-primary text-sm font-semibold mb-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                <Sparkles className="w-4 h-4 mr-2" />
                Innovative Software Solutions
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight animate-slide-up">
                <span className="inline-block animate-float bg-gradient-to-r from-[#1125A1] to-[#5EFA54] bg-clip-text text-transparent">
                  Building the
                </span>
                <span className="block gradient-text-primary">
                  Future of Software
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl leading-relaxed animate-fade-in font-semibold" style={{ animationDelay: '0.5s' }}>
                TriNextGen delivers cutting-edge software solutions that transform businesses and accelerate digital innovation.
                Experience the power of modern technology with our expert team.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Button
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary-dark transition-all duration-300 px-8 py-4 text-lg font-semibold group hover-lift hover-glow"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold hover-lift hover-glow"
                >
                  Our Services
                </Button>
              </div>

            </div>
          </div>

          {/* Right Column - Animated Showcase */}
          <div className="relative min-h-[300px] lg:min-h-full animate-slide-in-right mt-8 lg:mt-0" style={{ animationDelay: '0.5s' }}>
            {/* Enhanced Stats - Now relative on mobile */}
            <div className="grid grid-cols-2 gap-4 mb-12 lg:absolute lg:top-0 lg:right-0 lg:w-full lg:max-w-md lg:mb-8">
              {achievements.map((item, index) => {
                return(
                <div 
                  key={index}
                  className="bg-card/60 dark:bg-card/30 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <div className="text-3xl mb-2">
                    {item.emoji}
                  </div>
                  <div className="text-xl font-bold text-foreground mb-1">
                    <span>{item.number}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.label}
                  </div>
                </div>
                );
              })}
            </div>

            {/* Animation - Now relative on mobile */}
            <div
              ref={tiltRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mx-auto lg:absolute lg:bottom-0 lg:-right-8 w-72 h-72 lg:w-80 lg:h-80 will-change-transform"
              style={{ transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(0.8)` }}
            >
              {/* Rotating ring - darker */}
              <div className="absolute inset-0 rounded-full border-2 border-black/10 dark:border-white/30" />
              <div className="absolute inset-0 rounded-full border border-black/10 dark:border-white/40 blur-sm" />

              {/* Orbit container */}
              <div className="absolute inset-0 animate-[orbitWobble_20s_ease-in-out_infinite]">
                {/* Top */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_3s_ease-in-out_infinite]">
                  <Code className="w-6 h-6 text-white" />
                </div>
                {/* Right */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_3.4s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}>
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                {/* Bottom */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_2.8s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}>
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                {/* Left */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_3.2s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }}>
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Inner orbit (counter-rotate) */}
              <div className="absolute inset-8 animate-[orbitWobble_14s_ease-in-out_infinite_reverse]">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_2.6s_ease-in-out_infinite]">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-red-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_3s_ease-in-out_infinite]" style={{ animationDelay: '0.15s' }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_2.4s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }}>
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center shadow-strong hover-scale hover-glow animate-[floatY_2.2s_ease-in-out_infinite]" style={{ animationDelay: '0.45s' }}>
                  <Globe className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Center logo/mark - cooler icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-primary-light shadow-strong hover-lift hover-glow" style={{ animation: 'glowPulse 3s ease-in-out infinite' }}>
                  <div className="absolute inset-0 rounded-2xl bg-white/10" />
                  <div className="absolute -inset-1 rounded-3xl blur-2xl bg-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Rocket className="w-12 h-12 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] animate-[floatY_3s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;