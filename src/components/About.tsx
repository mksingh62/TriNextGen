import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Github, Mail } from 'lucide-react';

const About = () => {
  const founders = [
    {
      name: 'Mohit Kumar Singh',
      role: 'Founder & CEO',
      bio: 'Visionary leader with 8+ years in software development and business strategy. Passionate about creating innovative solutions that drive digital transformation.',
      skills: ['Strategic Planning', 'Product Vision', 'Team Leadership', 'Business Development'],
      image: '/founder_pic.jpg'
    },
    {
      name: 'Nikhil Kashyap',
      role: 'Co-Founder & CTO',
      bio: 'Technical expert specializing in scalable architectures and emerging technologies. Committed to building robust, future-ready software solutions.',
      skills: ['System Architecture', 'Cloud Computing', 'DevOps', 'Technical Innovation'],
      image: '/Nikhil_Kshyap.jpeg'
    },
    {
      name: 'Ajay Sonkar',
      role: 'Co-Founder & CTO',
      bio: 'Technical expert specializing in scalable architectures and emerging technologies. Committed to building robust, future-ready software solutions.',
      skills: ['System Architecture', 'Cloud Computing', 'DevOps', 'Technical Innovation'],
      image: '/Co-Founder.jpg'
    }
  ];

  return (
    <section id="about" className="py-20 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/web_background.jpg')" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            About TriNextGen
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed break-words hyphens-auto">
            Founded by passionate technologists, TriNextGen is dedicated to delivering exceptional software solutions
            that empower businesses to achieve their digital goals and stay ahead in the competitive landscape.
          </p>
        </div>

        {/* Company Story */}
        <div className="mb-16 animate-slide-up">
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Our Story</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-snug md:leading-relaxed break-words hyphens-auto">
                TriNextGen was born from a vision to bridge the gap between innovative technology and practical business solutions.
                Our founders, with their complementary expertise in business strategy and technical excellence,
                recognized the need for a software company that truly understands both the technical challenges
                and business objectives of modern enterprises.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-snug md:leading-relaxed mt-4 break-words hyphens-auto">
                Today, we're proud to be a trusted partner for businesses looking to leverage cutting-edge technology
                to drive growth, efficiency, and innovation in their operations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {founders.map((founder, index) => (
            <Card
              key={founder.name}
              className={`shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm group hover:-translate-y-2 animate-scale-in hover-lift hover-glow card-professional`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 md:p-8 break-words">
                <div className="flex flex-col items-center text-center">
                  {/* Profile Image Placeholder */}
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-32 h-32 rounded-full mt-4 mb-6 object-cover object-top bg-secondary group-hover:scale-105 transition-transform"
                  />

                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 break-words">{founder.name}</h3>
                  <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
                    {founder.role}
                  </Badge>

                  <p className="text-muted-foreground mb-6 leading-snug md:leading-relaxed break-words hyphens-auto">
                    {founder.bio}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {founder.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs bg-secondary/80"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                      <Linkedin size={18} />
                    </button>
                    <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                      <Github size={18} />
                    </button>
                    <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth">
                      <Mail size={18} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Values */}
        <div className="animate-fade-in">
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">I</span>
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">Innovation</h4>
                  <p className="text-muted-foreground text-sm break-words hyphens-auto">Constantly pushing boundaries to deliver cutting-edge solutions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Q</span>
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">Quality</h4>
                  <p className="text-muted-foreground text-sm break-words hyphens-auto">Committed to excellence in every project we undertake</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">Partnership</h4>
                  <p className="text-muted-foreground text-sm break-words hyphens-auto">Building lasting relationships through trust and collaboration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;