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
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Award, number: '50+', label: 'Awards Won' },
    { icon: TrendingUp, number: '99%', label: 'Success Rate' },
    { icon: Globe, number: '25+', label: 'Countries Served' }
  ];

  const testimonials = [
    { text: "CloudNova transformed our business with their innovative solutions", author: "Sarah Johnson", company: "TechCorp" },
    { text: "Outstanding service and cutting-edge technology", author: "Mike Chen", company: "StartupXYZ" },
    { text: "The best software development partner we've worked with", author: "Emily Davis", company: "Enterprise Inc" }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg noise-overlay pt-20">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--primary-light)) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 30%)`
        }}></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float hover-glow"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/10 rounded-full animate-float hover-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-white/15 rounded-full animate-float hover-glow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-primary/15 rounded-full animate-float hover-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/8 rounded-full animate-float hover-glow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary/8 rounded-full animate-float hover-glow" style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold mb-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                <Sparkles className="w-4 h-4 mr-2" />
                Innovative Software Solutions
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-slide-up drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Building the
                <span className="block gradient-text-primary animate-pulse-glow drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                  Future of Software
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-semibold" style={{ animationDelay: '0.5s' }}>
                CloudNova delivers cutting-edge software solutions that transform businesses and accelerate digital innovation.
                Experience the power of modern technology with our expert team.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Button
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50 hover:shadow-strong transition-all duration-300 px-8 py-4 text-lg font-semibold group hover-lift hover-glow"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  size="lg"
                  className="border-white/30  hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold hover-lift hover-glow"
                >
                  Our Services
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '1s' }}>
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={index} className="text-center hover-scale transition-all duration-300">
                      <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl md:text-3xl font-extrabold text-white mb-1 animate-bounce-in drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                        {achievement.number}
                      </div>
                      <div className="text-white/80 text-xs font-semibold">{achievement.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Animated Showcase */}
          <div className="animate-slide-in-right mt-8 lg:mt-0" style={{ animationDelay: '0.5s' }}>
            <div
              ref={tiltRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-lg mx-auto aspect-square will-change-transform"
              style={{ transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
            >
              {/* Sweep light layer */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.0), rgba(255,255,255,0.15), rgba(255,255,255,0.0) 25%)',
                    animation: 'sweepCone 12s linear infinite'
                  }}
                />
              </div>
              {/* Rotating ring - darker */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30" />
              <div className="absolute inset-0 rounded-full border border-white/40 blur-sm" />

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

              {/* Pulse rings - darker */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="absolute w-2/3 h-2/3 rounded-full border border-white/40" style={{ animation: 'pulseRing 3.6s ease-out infinite' }}></span>
                <span className="absolute w-3/4 h-3/4 rounded-full border border-white/30" style={{ animation: 'pulseRing 4.2s ease-out infinite 0.8s' }}></span>
                <span className="absolute w-full h-full rounded-full border border-white/20" style={{ animation: 'pulseRing 5s ease-out infinite 1.6s' }}></span>
              </div>

              {/* Floating blobs (morph + hue drift) */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/30 blur-xl animate-[blobMorph_14s_ease-in-out_infinite]" style={{ animation: 'blobMorph 14s ease-in-out infinite, hueDrift 16s linear infinite' }} />
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/20 blur-xl" style={{ animation: 'blobMorph 16s ease-in-out infinite 1.5s, hueDrift 18s linear infinite' }} />
              <div className="absolute top-1/3 -right-6 w-16 h-16 bg-primary-light/30 blur-md" style={{ animation: 'blobMorph 12s ease-in-out infinite 0.7s, hueDrift 14s linear infinite' }} />

              {/* Spark particles */}
              <div className="pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1 h-1 bg-white/80 rounded-full"
                    style={{
                      top: `${10 + (i * 7) % 80}%`,
                      left: `${5 + (i * 11) % 90}%`,
                      animation: `sparkle ${2 + (i % 5) * 0.3}s ease-in-out ${i * 0.15}s infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;