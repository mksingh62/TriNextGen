import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { label: 'Home', id: 'hero', href: '/' },
    { label: 'About', id: 'about', href: '/' },
    { label: 'Services', id: 'services', href: '/' },
    { label: 'Contact', id: 'contact', href: '/' },
  ];

  const resolveHref = (label: string, href: string, id: string) => {
    if (label === 'About') return '/about';
    if (label === 'Services') return '/services';
    return `${href}#${id}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled
        ? 'bg-background/95 backdrop-blur-md shadow-medium'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => (isHome ? scrollToSection('hero') : null)}
              className="text-2xl font-bold text-primary hover:scale-105 transition-smooth"
            >
              <Link to="/">CloudNova</Link>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isSectionOnly = item.label === 'Home' || item.label === 'Contact';
                if (isHome && isSectionOnly) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-foreground hover:text-primary transition-smooth px-3 py-2 text-sm font-medium relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.id}
                    to={resolveHref(item.label, item.href, item.id)}
                    className="text-foreground hover:text-primary transition-smooth px-3 py-2 text-sm font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                );
              })}
              <Link
                to="/careers"
                className="text-foreground hover:text-primary transition-smooth px-3 py-2 text-sm font-medium relative group"
              >
                Careers
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </div>
          </div>

          {/* Theme Toggle and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => (isHome ? scrollToSection('contact') : undefined)}
              className="bg-primary hover:bg-primary-dark hover:shadow-medium transition-smooth"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-medium">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const isSectionOnly = item.label === 'Home' || item.label === 'Contact';
                if (isHome && isSectionOnly) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left"
                    >
                      {item.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.id}
                    to={resolveHref(item.label, item.href, item.id)}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/careers"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <div className="mt-4 space-y-2">
                <ThemeToggle />
                <Button
                  onClick={() => (isHome ? scrollToSection('contact') : setIsMobileMenuOpen(false))}
                  className="w-full bg-primary hover:bg-primary-dark"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;