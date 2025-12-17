import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ExternalLink,
  Code,
  Globe,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projectApi } from "@/lib/api";

/* ----------------------------
   Project Interface
----------------------------- */
export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  category: "Web" | "Mobile" | "Cloud";
  liveUrl?: string;
}

/* ----------------------------
   Icon Mapper
----------------------------- */
const categoryIconMap = {
  Web: Globe,
  Mobile: Smartphone,
  Cloud: Code,
};

const OurProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ----------------------------
     Fetch Projects
  ----------------------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectApi.getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ----------------------------
     Loading State
  ----------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ----------------------------
     Error State
  ----------------------------- */
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md text-center">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-destructive mb-2">
                Error
              </h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  /* ----------------------------
     Main UI
  ----------------------------- */
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <section
          className="py-20 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/web_background.jpg')" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                Our Work
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Our Projects
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A showcase of real-world solutions we’ve built to help
                businesses scale, innovate, and succeed.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const Icon =
                  categoryIconMap[project.category] || Code;

                return (
                  <Card
                    key={project._id}
                      onClick={() => {
                        if (project.liveUrl) {
                          window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                        }
                      }}
                    className="group shadow-medium hover:shadow-strong transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                  <CardHeader>
                    {/* Project Image */}
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-muted">
                      <img
                        src={project.icon}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  
                    <CardTitle className="text-xl font-bold mb-2">
                      {project.title}
                    </CardTitle>
                  </CardHeader>


                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, i) => (
                          <Badge key={i} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          asChild
                          variant="ghost"
                          className="flex-1 hover:bg-primary hover:text-primary-foreground"
                        >
                          <Link to={`/projects/${project._id}`}>
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>

                        {project.liveUrl && (
                          <Button
                            asChild
                            variant="outline"
                            className="px-3"
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-20 text-center animate-slide-up">
              <Card className="bg-card/50 backdrop-blur-sm border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Have a Project in Mind?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Let’s collaborate and turn your idea into a
                    high-impact digital product.
                  </p>
                  <Button asChild size="lg">
                    <Link to="/contact">Start a Project</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default OurProjects;
