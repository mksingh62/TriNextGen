import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
// Icons
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
  Mail,
  ArrowLeft,
  MoreVertical,
  Loader2,
  Users,
  Briefcase,
  MessageSquare,
  LogOut,
  UserCheck,
  XCircle,
  Eye,
  Search,
  Upload,
  Code2,
  Phone,
  Palette,
  Megaphone,
  Wrench
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */
type ProjectCategory = "Web App" | "Mobile App" | "UI/UX Design" | "SEO/Marketing" | "Maintenance";
interface Project {
  _id: string;
  title: string;
  category?: ProjectCategory;
  totalAmount?: number;
  advancePaid?: number;
  remainingAmount?: number;
  status: string;
  liveUrl?: string;
  startDate?: string;
  deadline?: string;
  description?: string;
  features?: string[];
  techStack?: string[];
  icon?: string;
}
interface Service {
  _id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}
interface Career {
  _id: string;
  title: string;
  location: string;
  type: string;
  level: string;
  salary?: string;
  tags: string[];
  description: string;
}
interface Contact {
  _id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  date: string;
}
interface Application {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  coverLetter: string;
  jobId: string;
  jobTitle: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  appliedAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for services
  const [services, setServices] = useState<Service[]>([]);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    features: '',
    icon: '',
    color: ''
  });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // State for careers
  const [careers, setCareers] = useState<Career[]>([]);
  const [careerForm, setCareerForm] = useState({
    title: '',
    location: '',
    type: '',
    level: '',
    salary: '',
    tags: '',
    description: ''
  });
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);

  // State for contacts and applications
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // Projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    features: '',
    techStack: '',
    category: '',
    icon: null as File | null,
    liveUrl: '',
    status: 'Active'
  });

  // Search states
  const [serviceSearch, setServiceSearch] = useState('');
  const [careerSearch, setCareerSearch] = useState('');
  const [contactSearch, setContactSearch] = useState('');
  const [applicationSearch, setApplicationSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (!storedToken) {
      navigate('/admin/login');
      return;
    }
    setToken(storedToken);
    fetchDashboardData(storedToken);
  }, [navigate]);

 const fetchDashboardData = async (authToken: string) => {
  try {
    setLoading(true);
    setError(null); // Clear previous errors

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    };

    // Helper function to fetch and handle response
    const fetchWithErrorHandling = async (url: string) => {
      const res = await fetch(url, { headers });
      if (!res.ok) {
        const text = await res.text(); // Get raw response as text
        console.error(`Error fetching ${url}: Status ${res.status}, Response: ${text}`);
        throw new Error(`Failed to fetch ${url}: ${res.status} - ${text}`);
      }
      // Check if it's JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Expected JSON but got ${contentType}: ${text}`);
      }
      return res.json();
    };

    // Fetch all data
    const [servicesData, careersData, contactsData, applicationsData, projectData] = await Promise.all([
      fetchWithErrorHandling(`${import.meta.env.VITE_API_BASE}/api/services`),
      fetchWithErrorHandling(`${import.meta.env.VITE_API_BASE}/api/careers`),
      fetchWithErrorHandling(`${import.meta.env.VITE_API_BASE}/api/contacts`),
      fetchWithErrorHandling(`${import.meta.env.VITE_API_BASE}/api/applications`),
      fetchWithErrorHandling(`${import.meta.env.VITE_API_BASE}/api/projects`)
    ]);

    setServices(servicesData);
    setCareers(careersData);
    setContacts(contactsData);
    setApplications(applicationsData);
    setProjects(projectData);

  } catch (err: any) {
    setError(err.message);
    toast.error(err.message || 'Failed to load dashboard data. Check console for details.');
    console.error('Dashboard fetch error:', err);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Service CRUD
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingServiceId ? 'PUT' : 'POST';
      const endpoint = editingServiceId ? `/api/services/${editingServiceId}` : '/api/services';
      const body = {
        ...serviceForm,
        features: serviceForm.features.split(',').map(f => f.trim()).filter(Boolean)
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setServiceForm({ title: '', description: '', features: '', icon: '', color: '' });
        setEditingServiceId(null);
        fetchDashboardData(token!);
        toast.success(editingServiceId ? 'Service updated successfully' : 'Service created successfully');
      } else {
        throw new Error('Failed to save service');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save service.');
    }
  };

  const handleServiceEdit = (service: Service) => {
    setServiceForm({
      title: service.title,
      description: service.description,
      features: service.features.join(', '),
      icon: service.icon,
      color: service.color
    });
    setEditingServiceId(service._id);
  };

  const handleServiceDelete = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchDashboardData(token!);
        toast.success('Service deleted successfully');
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete service.');
    }
  };

  // Career CRUD
  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingCareerId ? 'PUT' : 'POST';
      const endpoint = editingCareerId ? `/api/careers/${editingCareerId}` : '/api/careers';
      const body = {
        ...careerForm,
        tags: careerForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setCareerForm({
          title: '',
          location: '',
          type: '',
          level: '',
          salary: '',
          tags: '',
          description: ''
        });
        setEditingCareerId(null);
        fetchDashboardData(token!);
        toast.success(editingCareerId ? 'Career updated successfully' : 'Career created successfully');
      } else {
        throw new Error('Failed to save career');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save career.');
    }
  };

  const handleCareerEdit = (career: Career) => {
    setCareerForm({
      title: career.title,
      location: career.location,
      type: career.type,
      level: career.level,
      salary: career.salary || '',
      tags: career.tags.join(', '),
      description: career.description
    });
    setEditingCareerId(career._id);
  };

  const handleCareerDelete = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/careers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchDashboardData(token!);
        toast.success('Career deleted successfully');
      } else {
        throw new Error('Failed to delete career');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete career.');
    }
  };

  // Application status update
  const updateApplicationStatus = async (applicationId: string, status: Application['status']) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setApplications(prev =>
          prev.map(app =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
        toast.success('Application status updated');
      } else {
        throw new Error('Failed to update application status');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update application status');
    }
  };

  // Project CRUD
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", projectForm.title);
    formData.append("description", projectForm.description);
    formData.append("features", projectForm.features);
    formData.append("techStack", projectForm.techStack);
    formData.append("category", projectForm.category);
    formData.append("liveUrl", projectForm.liveUrl);
    formData.append("status", projectForm.status);
    if (projectForm.icon) {
      formData.append("icon", projectForm.icon);
    }

    try {
      const method = editingProjectId ? 'PUT' : 'POST';
      const endpoint = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects';
      const response = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setProjectForm({
          title: '',
          description: '',
          features: '',
          techStack: '',
          category: '',
          icon: null,
          liveUrl: '',
          status: 'Active'
        });
        setEditingProjectId(null);
        fetchDashboardData(token!);
        toast.success(editingProjectId ? 'Project updated successfully' : 'Project created successfully');
      } else {
        throw new Error('Failed to save project');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save project');
    }
  };

  const handleProjectEdit = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description || '',
      features: project.features ? project.features.join(', ') : '',
      techStack: project.techStack ? project.techStack.join(', ') : '',
      category: project.category || '',
      icon: null,
      liveUrl: project.liveUrl || '',
      status: project.status
    });
    setEditingProjectId(project._id);
  };

  const handleProjectDelete = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchDashboardData(token!);
        toast.success('Project deleted successfully');
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete project');
    }
  };

  // Get status icon
  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'reviewed':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'interview':
        return <UserCheck className="w-4 h-4 text-purple-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'hired':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get status text
  const getStatusText = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'reviewed':
        return 'Reviewed';
      case 'interview':
        return 'Interview';
      case 'rejected':
        return 'Rejected';
      case 'hired':
        return 'Hired';
      default:
        return 'Unknown';
    }
  };

  // Filtered data
  const filteredServices = useMemo(() => {
    return services.filter(s => s.title.toLowerCase().includes(serviceSearch.toLowerCase()));
  }, [services, serviceSearch]);
  const filteredCareers = useMemo(() => {
    return careers.filter(c => c.title.toLowerCase().includes(careerSearch.toLowerCase()));
  }, [careers, careerSearch]);
  const filteredContacts = useMemo(() => {
    return contacts.filter(c => c.name.toLowerCase().includes(contactSearch.toLowerCase()) || c.email.toLowerCase().includes(contactSearch.toLowerCase()));
  }, [contacts, contactSearch]);
  const filteredApplications = useMemo(() => {
    return applications.filter(a => a.name.toLowerCase().includes(applicationSearch.toLowerCase()) || a.jobTitle.toLowerCase().includes(applicationSearch.toLowerCase()));
  }, [applications, applicationSearch]);
  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.title.toLowerCase().includes(projectSearch.toLowerCase()));
  }, [projects, projectSearch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            <span className="text-lg text-muted-foreground">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => fetchDashboardData(token!)}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <Toaster position="top-right" />
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <FileText className="w-4 h-4" /> Services
              </CardDescription>
              <CardTitle className="text-3xl">{services.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4" /> Careers
              </CardDescription>
              <CardTitle className="text-3xl">{careers.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" /> Messages
              </CardDescription>
              <CardTitle className="text-3xl">{contacts.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <UserCheck className="w-4 h-4" /> Applications
              </CardDescription>
              <CardTitle className="text-3xl">{applications.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <FolderKanban className="w-4 h-4" /> Projects
              </CardDescription>
              <CardTitle className="text-3xl">{projects.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        {/* Main Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10"
                  value={applicationSearch}
                  onChange={(e) => setApplicationSearch(e.target.value)}
                />
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app._id}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>{app.jobTitle}</TableCell>
                        <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            {getStatusIcon(app.status)}
                            {getStatusText(app.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                              <div className="space-y-1">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                  onClick={() => updateApplicationStatus(app._id, 'reviewed')}
                                  disabled={app.status !== 'pending'}
                                >
                                  Mark Reviewed
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                  onClick={() => updateApplicationStatus(app._id, 'interview')}
                                  disabled={app.status === 'rejected' || app.status === 'hired'}
                                >
                                  Schedule Interview
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                  onClick={() => updateApplicationStatus(app._id, 'hired')}
                                  disabled={app.status === 'rejected' || app.status === 'hired'}
                                >
                                  Hire
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start text-destructive"
                                  onClick={() => updateApplicationStatus(app._id, 'rejected')}
                                  disabled={app.status === 'rejected' || app.status === 'hired'}
                                >
                                  Reject
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredApplications.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">No applications found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-10"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                />
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact._id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>{new Date(contact.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`)}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredContacts.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">No contacts found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="pl-10"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                />
              </div>
              <Dialog open={editingServiceId !== null} onOpenChange={(open) => !open && setEditingServiceId(null)}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> New Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingServiceId ? 'Edit Service' : 'Create Service'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <Input
                      placeholder="Title"
                      value={serviceForm.title}
                      onChange={e => setServiceForm({...serviceForm, title: e.target.value})}
                      required
                    />
                    <Textarea
                      placeholder="Description"
                      value={serviceForm.description}
                      onChange={e => setServiceForm({...serviceForm, description: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Features (comma separated)"
                      value={serviceForm.features}
                      onChange={e => setServiceForm({...serviceForm, features: e.target.value})}
                    />
                    <Input
                      placeholder="Icon (e.g., lucide icon name)"
                      value={serviceForm.icon}
                      onChange={e => setServiceForm({...serviceForm, icon: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Color (e.g., #hex)"
                      value={serviceForm.color}
                      onChange={e => setServiceForm({...serviceForm, color: e.target.value})}
                    />
                    <DialogFooter>
                      <Button type="submit">{editingServiceId ? 'Update' : 'Create'}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((service) => (
                      <TableRow key={service._id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.description.substring(0, 50)}...</TableCell>
                        <TableCell>{service.features.join(', ')}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleServiceEdit(service)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this service? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button variant="destructive" onClick={() => handleServiceDelete(service._id)}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredServices.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">No services found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* Careers Tab */}
          <TabsContent value="careers" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search careers..."
                  className="pl-10"
                  value={careerSearch}
                  onChange={(e) => setCareerSearch(e.target.value)}
                />
              </div>
              <Dialog open={editingCareerId !== null} onOpenChange={(open) => !open && setEditingCareerId(null)}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> New Career
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCareerId ? 'Edit Career' : 'Create Career'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCareerSubmit} className="space-y-4">
                    <Input
                      placeholder="Title"
                      value={careerForm.title}
                      onChange={e => setCareerForm({...careerForm, title: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Location"
                      value={careerForm.location}
                      onChange={e => setCareerForm({...careerForm, location: e.target.value})}
                      required
                    />
                    <Select
                      value={careerForm.type}
                      onValueChange={(val) => setCareerForm({...careerForm, type: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={careerForm.level}
                      onValueChange={(val) => setCareerForm({...careerForm, level: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry">Entry</SelectItem>
                        <SelectItem value="Mid">Mid</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Salary"
                      value={careerForm.salary}
                      onChange={e => setCareerForm({...careerForm, salary: e.target.value})}
                    />
                    <Input
                      placeholder="Tags (comma separated)"
                      value={careerForm.tags}
                      onChange={e => setCareerForm({...careerForm, tags: e.target.value})}
                    />
                    <Textarea
                      placeholder="Description"
                      value={careerForm.description}
                      onChange={e => setCareerForm({...careerForm, description: e.target.value})}
                      required
                    />
                    <DialogFooter>
                      <Button type="submit">{editingCareerId ? 'Update' : 'Create'}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCareers.map((career) => (
                      <TableRow key={career._id}>
                        <TableCell className="font-medium">{career.title}</TableCell>
                        <TableCell>{career.location}</TableCell>
                        <TableCell>{career.type}</TableCell>
                        <TableCell>{career.level}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleCareerEdit(career)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this career?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button variant="destructive" onClick={() => handleCareerDelete(career._id)}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredCareers.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">No careers found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>
              <Dialog open={editingProjectId !== null} onOpenChange={(open) => !open && setEditingProjectId(null)}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> New Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingProjectId ? 'Edit Project' : 'Create Project'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <Input
                      placeholder="Title"
                      value={projectForm.title}
                      onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                      required
                    />
                    <Textarea
                      placeholder="Description"
                      value={projectForm.description}
                      onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Features (comma separated)"
                      value={projectForm.features}
                      onChange={e => setProjectForm({...projectForm, features: e.target.value})}
                    />
                    <Input
                      placeholder="Tech Stack (comma separated)"
                      value={projectForm.techStack}
                      onChange={e => setProjectForm({...projectForm, techStack: e.target.value})}
                    />
                    <Select
                      value={projectForm.category}
                      onValueChange={(val) => setProjectForm({...projectForm, category: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Web App">Web App</SelectItem>
                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                        <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                        <SelectItem value="SEO/Marketing">SEO/Marketing</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={e => setProjectForm({...projectForm, icon: e.target.files?.[0] || null})}
                        className="w-full cursor-pointer"
                      />
                      {projectForm.icon && <p className="text-sm text-muted-foreground mt-2">{projectForm.icon.name}</p>}
                    </div>
                    <Input
                      placeholder="Live URL"
                      value={projectForm.liveUrl}
                      onChange={e => setProjectForm({...projectForm, liveUrl: e.target.value})}
                    />
                    <Select
                      value={projectForm.status}
                      onValueChange={(val) => setProjectForm({...projectForm, status: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <DialogFooter>
                      <Button type="submit">{editingProjectId ? 'Update' : 'Create'}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project._id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.category}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{project.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleProjectEdit(project)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this project?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button variant="destructive" onClick={() => handleProjectDelete(project._id)}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredProjects.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">No projects found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
