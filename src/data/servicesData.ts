import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Zap,
  Server,
  Palette,
  Shield,
  BarChart3
} from 'lucide-react';

export interface ServiceData {
  title: string;
  icon: React.ComponentType<any>;
  path: string;
}

export const services: ServiceData[] = [
  {
    title: 'Web Development',
    icon: Globe,
    path: '/services/web-development'
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    path: '/services/mobile-development'
  },
  {
    title: 'Cloud Solutions',
    icon: Cloud,
    path: '/services/cloud-solutions'
  },
  {
    title: 'UI/UX Design',
    icon: Palette,
    path: '/services/ui-ux-design'
  },
  {
    title: 'Data Analytics',
    icon: BarChart3,
    path: '/services/data-analytics'
  },
  {
    title: 'Cyber Security',
    icon: Shield,
    path: '/services/cyber-security'
  },
  {
    title: 'Backend Development',
    icon: Server,
    path: '/services/backend-development'
  },
  {
    title: 'Automation',
    icon: Zap,
    path: '/services/automation'
  }
];