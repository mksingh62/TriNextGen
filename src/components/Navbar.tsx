import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Building, Users, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { services } from '@/data/servicesData';

const HoverDropdown = ({
  label,
  children,
  href,
}: {
  label: string;
  children: React.ReactNode;
  href: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        <DropdownMenuTrigger asChild>
          <Link to={href} className="text-foreground hover:text-primary transition-smooth px-3 py-2 text-sm font-medium relative group flex items-center">
            {label}
            <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
          </Link>
        </DropdownMenuTrigger>
        {children}
      </div>
    </DropdownMenu>
  );
};

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

  // Function to handle "Talk to us" button click
  const handleTalkToUs = () => {
    // If we're on the home page, scroll to contact section
    if (isHome) {
      scrollToSection('contact');
    } else {
      // If we're on another page, navigate to home and then scroll to contact
      window.location.href = '/#contact';
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero', href: '/' },
  ];

  const resolveHref = (label: string, href: string, id: string) => {
    if (label === 'About') return '/about';
    if (label === 'Services') return '/services';
    return `${href}#${id}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth border-b border-gray-400 ${isScrolled
        ? 'bg-background/50 backdrop-blur-md shadow-medium'
        : 'bg-transparent'
        }`}
        
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-primary hover:scale-105 transition-smooth"
            >
              <img src="/logo9.png" alt="TriNextGen Logo" className="h-14 w-auto" />
              {/* <span>TriNextGen</span> */}
            </Link>
          </div>

          {/* Right side of Navbar */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="flex items-baseline space-x-4">
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
              {/* About Dropdown */}
              <HoverDropdown label="About" href="/about">
                <DropdownMenuContent align="start" className="bg-background/80 backdrop-blur-md border-border w-48 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                  <DropdownMenuItem asChild>
                    <Link to="/about" className="flex items-center cursor-pointer">
                      <Building className="w-4 h-4 mr-2" />
                      Our Company
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => isHome ? scrollToSection('about') : window.location.href = '/#about'}
                      className="w-full flex items-center cursor-pointer"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Meet The Team
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/about" className="font-semibold cursor-pointer">
                      Learn More
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </HoverDropdown>

              {/* Services Dropdown */}
              <HoverDropdown label="Services" href="/services">
                <DropdownMenuContent align="start" className="bg-background/80 backdrop-blur-md border-border w-56 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                  {services.map((service) => (
                    <DropdownMenuItem key={service.title} asChild>
                      <Link to={service.path} className="flex items-center cursor-pointer">
                        <service.icon className="w-4 h-4 mr-2" />
                        {service.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/services" className="font-semibold cursor-pointer">
                      View All Services
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </HoverDropdown>

              {/* Careers Dropdown */}
              <HoverDropdown label="Careers" href="/careers">
                <DropdownMenuContent align="start" className="bg-background/80 backdrop-blur-md border-border w-48 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                  <DropdownMenuItem asChild>
                    <Link to="/careers" className="flex items-center cursor-pointer">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Open Positions
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </HoverDropdown>

              {/* Contact Dropdown */}
              <HoverDropdown label="Contact" href="/#contact">
                <DropdownMenuContent align="start" className="bg-background/80 backdrop-blur-md border-border w-48 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                  <DropdownMenuItem asChild>
                    <a href="mailto:trinextgen@gmail.com" className="flex items-center cursor-pointer" target="_blank" rel="noopener noreferrer">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="tel:+916263716688" className="flex items-center cursor-pointer">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </HoverDropdown>
            </div>

            {/* Theme Toggle and CTA Button */}
            <Button onClick={handleTalkToUs}>
              Talk to us
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
          <div className="md:hidden absolute top-16 left-20 right-4 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-medium max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="px-3 pt-3 pb-3 space-y-1">
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
              {/* Mobile Menu Links for other items */}
              <Link to="/about" className="block px-3 py-1.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left rounded" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/services" className="block px-3 py-1.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left rounded" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              {/* Mobile Services Links */}
              {/* <div className="px-3 py-1.5 text-sm font-medium text-foreground">Services</div>
              <div className="pl-4 space-y-0.5">
                {services.map((service) => (
                  <Link key={service.path} to={service.path} className="block px-3 py-1 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left rounded" onClick={() => setIsMobileMenuOpen(false)}>
                    {service.title}
                  </Link>
                ))}
              </div> */}
              <Link
                to="/careers"
                className="block px-3 py-1.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} className="block px-3 py-1.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-smooth w-full text-left rounded">Contact</button>
              <div className="mt-2 pt-2 border-t border-border space-y-1.5">
                {/* <div className="px-3">
                  <ThemeToggle />
                </div> */}
                <div className="px-3">
                  <Button
                    onClick={() => (isHome ? scrollToSection('contact') : setIsMobileMenuOpen(false))}
                    className="w-full bg-primary hover:bg-primary-dark text-sm py-2"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;