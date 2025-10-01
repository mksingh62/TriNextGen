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
  ,BrainCircuit,
  HeartHandshake,
  Flame
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
    <>
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

      <section className="py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg py-12 text-card-foreground shadow-sm shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <div className="text-center max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                From Vision to Velocity — Together
              </h2>
              <div className="text-left space-y-12">
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    You've done the hard part. You've got the idea, the clarity, the drive. You've researched the market, stayed up late planning, and you're ready to build.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    But here's the truth most founders quietly face:
                  </p>
                  <div className="bg-gradient-to-r from-yellow-400/10 via-red-400/10 to-primary/10 p-6 rounded-xl border border-foreground/10 shadow-lg backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Lightbulb className="w-6 h-6 text-yellow-400" />
                      </div>
                      <p className="text-lg font-medium text-foreground/90">
                        <span className="font-bold text-yellow-300">87% of startups struggle</span> — not because their ideas are weak, but because <span className="font-bold text-foreground">execution takes too long.</span>
                      </p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: 'rgb(94, 250, 84)' }}>
                    💚 That's Where We Come In.
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We're not just developers. We're your <span className="font-bold text-[#1125A1]">AI-powered product partners</span> — building alongside you like co-founders do.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    In just <span className="font-bold text-[#1125A1]">6 weeks</span>, we bring your idea to life with a <span className="font-bold text-[#1125A1]">user-ready MVP</span> — that's fast, functional, and founder-approved.
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                    🤝 What Makes Us Different?
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We don't wait months to "kick things off." We believe in building fast, iterating smart, and delivering real value early.
                  </p>
                  <div className="my-12">
                    <div className="relative">
                      {/* Connecting line */}
                      <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

                      <div className="space-y-10">
                        {/* Step 1 */}
                        <div className="bg-gradient-to-r from-blue-500/10 to-primary/10 p-6 rounded-xl border border-foreground/10 shadow-lg backdrop-blur-sm">
                          <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-blue-400 shadow-md">
                              <BrainCircuit className="w-8 h-8" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-foreground mb-1">Backed by AI</h4>
                              <p className="text-muted-foreground">We leverage artificial intelligence to accelerate development and deliver smarter, more efficient solutions from day one.</p>
                            </div>
                          </div>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-gradient-to-r from-green-500/10 to-primary/10 p-6 rounded-xl border border-foreground/10 shadow-lg backdrop-blur-sm">
                          <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-green-400 shadow-md">
                              <HeartHandshake className="w-8 h-8" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-foreground mb-1">Run by Humans Who Care</h4>
                              <p className="text-muted-foreground">Our experienced team acts as your dedicated partner, ensuring your vision is understood and executed with passion.</p>
                            </div>
                          </div>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-gradient-to-r from-orange-500/10 to-primary/10 p-6 rounded-xl border border-foreground/10 shadow-lg backdrop-blur-sm">
                          <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-orange-400 shadow-md">
                              <Flame className="w-8 h-8" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-foreground mb-1">Designed for Momentum</h4>
                              <p className="text-muted-foreground">We focus on rapid iteration and early delivery, turning your ideas into a functional product in weeks, not months.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                    📦 Reality for Most Founders
                  </h3>
                  <div className="mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 relative">
                      {/* Vertical line for desktop */}
                      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-border -translate-x-1/2"></div>

                      {/* The Usual Path */}
                      <div className="space-y-12 md:pr-8 md:text-right">
                        <h4 className="text-xl font-bold text-red-500 mb-6 text-center md:text-right">❌ The Usual Path</h4>
                        <div className="relative">
                          <div className="hidden md:block absolute top-1/2 -right-12 w-4 h-4 bg-red-500 rounded-full border-4 border-background -translate-y-1/2"></div>
                          <p className="text-muted-foreground">Hiring takes 3–6 months and costs $200K+.</p>
                        </div>
                        <div className="relative">
                          <div className="hidden md:block absolute top-1/2 -right-12 w-4 h-4 bg-red-500 rounded-full border-4 border-background -translate-y-1/2"></div>
                          <p className="text-muted-foreground">Building an MVP takes 6–12 months.</p>
                        </div>
                        <div className="relative">
                          <div className="hidden md:block absolute top-1/2 -right-12 w-4 h-4 bg-red-500 rounded-full border-4 border-background -translate-y-1/2"></div>
                          <p className="text-muted-foreground">90% of tech hires don't work out.</p>
                        </div>
                      </div>

                      {/* With TriNextGen */}
                      <div className="space-y-12 md:pl-8">
                        <h4 className="text-xl font-bold text-green-500 mb-6 text-center md:text-left">✅ With TriNextGen</h4>
                        <div className="relative"><div className="hidden md:block absolute top-1/2 -left-12 w-4 h-4 bg-green-500 rounded-full border-4 border-background -translate-y-1/2"></div><p className="text-muted-foreground">No hiring delays — your team is ready from Day 1.</p></div>
                        <div className="relative"><div className="hidden md:block absolute top-1/2 -left-12 w-4 h-4 bg-green-500 rounded-full border-4 border-background -translate-y-1/2"></div><p className="text-muted-foreground">MVP in just <span className="font-bold text-primary">6 weeks</span>.</p></div>
                        <div className="relative"><div className="hidden md:block absolute top-1/2 -left-12 w-4 h-4 bg-green-500 rounded-full border-4 border-background -translate-y-1/2"></div><p className="text-muted-foreground">Get a battle-tested, AI-augmented team.</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      🌱 Let's Build Something Real
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      No jargon. No fluff. Just a team that cares as much as you do — and knows how to build what users love.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            {/* <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              Why Choose Us?
            </Badge> */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Founders Choose TriNextGen
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're more than just a development shop. We're your strategic partner in building successful digital products.
            </p>
          </div>

          {/* Grid of advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Rapid MVP Delivery */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Rapid MVP Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Launch your user-ready MVP in just 6 weeks. We turn your vision into a functional product at startup speed, giving you a crucial head start.
                </p>
              </CardContent>
            </Card>

            {/* Card 2: AI-Augmented Team */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">AI-Augmented Team</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our team is enhanced by AI, not replaced by it. This blend of human expertise and machine intelligence ensures faster, smarter, and more reliable development.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: True Partnership */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">True Partnership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We integrate with your team like co-founders. Your goals are our goals. We're invested in your success with transparent communication and dedicated support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            {/* <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              Why Choose Us?
            </Badge> */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The TriNextGen Advantage
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're more than just a development shop. We're your strategic partner in building successful digital products.
            </p>
          </div>

          {/* Grid of advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Rapid MVP Delivery */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Rapid MVP Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Launch your user-ready MVP in just 6 weeks. We turn your vision into a functional product at startup speed, giving you a crucial head start.
                </p>
              </CardContent>
            </Card>

            {/* Card 2: AI-Augmented Team */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">AI-Augmented Team</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our team is enhanced by AI, not replaced by it. This blend of human expertise and machine intelligence ensures faster, smarter, and more reliable development.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: True Partnership */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">True Partnership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We integrate with your team like co-founders. Your goals are our goals. We're invested in your success with transparent communication and dedicated support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;