import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FolderKanban,
  Users,
  Mail,
  Briefcase,
  BarChart3,
  FileText,
  MessageSquare,
  LogOut,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { adminApi, serviceApi, careerApi } from '@/lib/api';
import { toast, Toaster } from 'sonner';

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
interface Project {
  _id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  category: string;
  icon: string;
  liveUrl?: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [services, setServices] = useState<Service[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    features: '',
    icon: '',
    color: '',
  });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [careerForm, setCareerForm] = useState({
    title: '',
    location: '',
    type: '',
    level: '',
    salary: '',
    tags: '',
    description: '',
  });
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    features: '',
    techStack: '',
    category: '',
    icon: null as File | null,
    liveUrl: '',
    status: 'Active',
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

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
      setError(null);

      const [servicesData, careersData, contactsData, applicationsData, projectRes] = await Promise.all([
        serviceApi.getAllServices(),
        careerApi.getAllCareers(),
        adminApi.getAllContacts(authToken),
        careerApi.getAllApplications(authToken),
        fetch(`${import.meta.env.VITE_API_BASE}/api/projects`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }).then((res) => (res.ok ? res.json() : [])),
      ]);

      setServices(servicesData);
      setCareers(careersData);
      setContacts(contactsData);
      setApplications(applicationsData);
      setProjects(projectRes);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data.');
      toast.error('Failed to load data');
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
        features: serviceForm.features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean),
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(editingServiceId ? 'Service updated' : 'Service created');
        setServiceForm({ title: '', description: '', features: '', icon: '', color: '' });
        setEditingServiceId(null);
        fetchDashboardData(token!);
      } else throw new Error('Failed');
    } catch {
      toast.error('Failed to save service');
    }
  };

  const handleServiceEdit = (service: Service) => {
    setServiceForm({
      title: service.title,
      description: service.description,
      features: service.features.join(', '),
      icon: service.icon,
      color: service.color,
    });
    setEditingServiceId(service._id);
  };

  const handleServiceDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success('Service deleted');
        fetchDashboardData(token!);
      } else throw new Error();
    } catch {
      toast.error('Failed to delete service');
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
        tags: careerForm.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(editingCareerId ? 'Career updated' : 'Career created');
        setCareerForm({
          title: '',
          location: '',
          type: '',
          level: '',
          salary: '',
          tags: '',
          description: '',
        });
        setEditingCareerId(null);
        fetchDashboardData(token!);
      } else throw new Error();
    } catch {
      toast.error('Failed to save career');
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
      description: career.description,
    });
    setEditingCareerId(career._id);
  };

  const handleCareerDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/careers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success('Career deleted');
        fetchDashboardData(token!);
      } else throw new Error();
    } catch {
      toast.error('Failed to delete career');
    }
  };

  // Application status update
  const updateApplicationStatus = async (applicationId: string, status: Application['status']) => {
    try {
      await careerApi.updateApplicationStatus(token!, applicationId, status);
      setApplications((prev) =>
        prev.map((app) => (app._id === applicationId ? { ...app, status } : app))
      );
      toast.success('Application status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  // Project CRUD
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', projectForm.title);
    formData.append('description', projectForm.description);
    formData.append(
      'features',
      JSON.stringify(projectForm.features.split(',').map((f) => f.trim()).filter(Boolean))
    );
    formData.append(
      'techStack',
      JSON.stringify(projectForm.techStack.split(',').map((t) => t.trim()).filter(Boolean))
    );
    formData.append('category', projectForm.category);
    formData.append('liveUrl', projectForm.liveUrl);
    formData.append('status', projectForm.status);
    if (projectForm.icon) formData.append('icon', projectForm.icon);

    try {
      const method = editingProjectId ? 'PUT' : 'POST';
      const endpoint = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects';
      const res = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        toast.success(editingProjectId ? 'Project updated' : 'Project created');
        setProjectForm({
          title: '',
          description: '',
          features: '',
          techStack: '',
          category: '',
          icon: null,
          liveUrl: '',
          status: 'Active',
        });
        setEditingProjectId(null);
        fetchDashboardData(token!);
      } else throw new Error();
    } catch {
      toast.error('Failed to save project');
    }
  };

  const handleProjectEdit = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      features: project.features?.join(', ') || '',
      techStack: project.techStack?.join(', ') || '',
      category: project.category,
      icon: null,
      liveUrl: project.liveUrl || '',
      status: project.status,
    });
    setEditingProjectId(project._id);
  };

  const handleProjectDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success('Project deleted');
        fetchDashboardData(token!);
      } else throw new Error();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const getStatusConfig = (status: Application['status']) => {
    const configs: Record<
      Application['status'],
      { icon: React.ReactNode; badge: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }
    > = {
      pending: { icon: <Clock className="w-4 h-4" />, badge: 'secondary', label: 'Pending' },
      reviewed: { icon: <Eye className="w-4 h-4" />, badge: 'outline', label: 'Reviewed' },
      interview: { icon: <UserCheck className="w-4 h-4" />, badge: 'default', label: 'Interview' },
      rejected: { icon: <XCircle className="w-4 h-4" />, badge: 'destructive', label: 'Rejected' },
      hired: { icon: <CheckCircle2 className="w-4 h-4" />, badge: 'default', label: 'Hired' },
    };
    return configs[status] || configs.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full shadow-2xl border-destructive/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-lg text-muted-foreground">{error}</p>
            <Button size="lg" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-right" richColors closeButton />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your platform with full control</p>
              </div>
            </div>
            <Button variant="outline" size="lg" onClick={handleLogout} className="gap-3">
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 space-y-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl hover:scale-105 transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Services</p>
                  <p className="text-4xl font-bold mt-2">{services.length}</p>
                </div>
                <FileText className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 shadow-xl hover:scale-105 transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Careers</p>
                  <p className="text-4xl font-bold mt-2">{careers.length}</p>
                </div>
                <Briefcase className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 shadow-xl hover:scale-105 transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Messages</p>
                  <p className="text-4xl font-bold mt-2">{contacts.length}</p>
                </div>
                <MessageSquare className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white border-0 shadow-xl hover:scale-105 transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Applications</p>
                  <p className="text-4xl font-bold mt-2">{applications.length}</p>
                </div>
                <BarChart3 className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-xl hover:scale-105 transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Projects</p>
                  <p className="text-4xl font-bold mt-2">{projects.length}</p>
                </div>
                <FolderKanban className="w-12 h-12 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => navigate('/admin/clients')}
            className="bg-gradient-to-br from-pink-600 to-pink-700 text-white border-0 shadow-xl cursor-pointer hover:scale-105 transition"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Clients</p>
                  <p className="text-2xl font-bold mt-2">Manage</p>
                </div>
                <Users className="w-12 h-12 text-pink-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-primary" />
              Recent Job Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-center py-16 text-muted-foreground text-lg">No applications received yet</p>
            ) : (
              <div className="grid gap-6">
                {applications.slice(0, 6).map((app) => {
                  const statusConfig = getStatusConfig(app.status);
                  return (
                    <div
                      key={app._id}
                      className="border rounded-2xl p-6 bg-white hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-14 h-14 border-2 border-primary/20">
                            <AvatarFallback className="text-lg font-semibold">
                              {app.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold">{app.name}</h3>
                            <p className="text-muted-foreground">{app.email}</p>
                            {app.phone && <p className="text-sm text-muted-foreground mt-1">{app.phone}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={statusConfig.badge} className="px-4 py-2 text-sm flex items-center gap-2">
                            {statusConfig.icon}
                            {statusConfig.label}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center justify-end gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-medium">Applied for: <span className="text-primary">{app.jobTitle}</span></p>
                      </div>

                      <p className="text-muted-foreground line-clamp-3 mb-6">{app.coverLetter}</p>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateApplicationStatus(app._id, 'reviewed')}
                          disabled={['reviewed', 'interview', 'hired', 'rejected'].includes(app.status)}
                        >
                          Mark Reviewed
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateApplicationStatus(app._id, 'interview')}
                          disabled={['interview', 'hired', 'rejected'].includes(app.status)}
                        >
                          Schedule Interview
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => updateApplicationStatus(app._id, 'hired')}
                          disabled={['hired', 'rejected'].includes(app.status)}
                        >
                          Hire
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateApplicationStatus(app._id, 'rejected')}
                          disabled={['rejected', 'hired'].includes(app.status)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Management Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Services */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <FileText className="w-7 h-7 text-primary" />
                Manage Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handleServiceSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm((p) => ({ ...p, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Icon Name (Lucide)</Label>
                    <Input
                      value={serviceForm.icon}
                      onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Features (comma separated)</Label>
                  <Input
                    value={serviceForm.features}
                    onChange={(e) => setServiceForm((p) => ({ ...p, features: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Color (hex)</Label>
                  <Input
                    value={serviceForm.color}
                    onChange={(e) => setServiceForm((p) => ({ ...p, color: e.target.value }))}
                    placeholder="#3b82f6"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  {editingServiceId ? 'Update Service' : 'Create Service'}
                </Button>
              </form>

              <Separator />

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="border rounded-xl p-5 bg-muted/30 hover:bg-muted/60 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{service.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {service.features.map((f, i) => (
                            <Badge key={i} variant="secondary">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="ghost" onClick={() => handleServiceEdit(service)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => handleServiceDelete(service._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Careers */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Briefcase className="w-7 h-7 text-primary" />
                Manage Careers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handleCareerSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={careerForm.title}
                      onChange={(e) => setCareerForm((p) => ({ ...p, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={careerForm.location}
                      onChange={(e) => setCareerForm((p) => ({ ...p, location: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Input
                      value={careerForm.type}
                      onChange={(e) => setCareerForm((p) => ({ ...p, type: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Input
                      value={careerForm.level}
                      onChange={(e) => setCareerForm((p) => ({ ...p, level: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Salary</Label>
                    <Input
                      value={careerForm.salary}
                      onChange={(e) => setCareerForm((p) => ({ ...p, salary: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Tags (comma separated)</Label>
                  <Input
                    value={careerForm.tags}
                    onChange={(e) => setCareerForm((p) => ({ ...p, tags: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={4}
                    value={careerForm.description}
                    onChange={(e) => setCareerForm((p) => ({ ...p, description: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  {editingCareerId ? 'Update Career' : 'Create Career'}
                </Button>
              </form>

              <Separator />

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {careers.map((career) => (
                  <div
                    key={career._id}
                    className="border rounded-xl p-5 bg-muted/30 hover:bg-muted/60 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{career.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {career.location} • {career.type} • {career.level}
                          {career.salary && ` • ${career.salary}`}
                        </p>
                        <p className="text-sm mt-2">{career.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {career.tags.map((t, i) => (
                            <Badge key={i} variant="outline">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="ghost" onClick={() => handleCareerEdit(career)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => handleCareerDelete(career._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <FolderKanban className="w-7 h-7 text-primary" />
                Manage Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handleProjectSubmit} className="space-y-5">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={projectForm.title}
                    onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Features (comma separated)</Label>
                    <Input
                      value={projectForm.features}
                      onChange={(e) => setProjectForm((p) => ({ ...p, features: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Tech Stack (comma separated)</Label>
                    <Input
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm((p) => ({ ...p, techStack: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={projectForm.category}
                    onValueChange={(val) => setProjectForm((p) => ({ ...p, category: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web App">Web App</SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="SEO/Marketing">SEO/Marketing</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Project Image</Label>
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center hover:border-primary/50 transition">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          icon: e.target.files ? e.target.files[0] : null,
                        }))
                      }
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {projectForm.icon && (
                      <p className="text-sm text-muted-foreground mt-3">{projectForm.icon.name}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Live URL</Label>
                  <Input
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm((p) => ({ ...p, liveUrl: e.target.value }))}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  {editingProjectId ? 'Update Project' : 'Create Project'}
                </Button>
              </form>

              <Separator />

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="border rounded-xl p-5 bg-muted/30 hover:bg-muted/60 transition flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold text-lg">{project.title}</h4>
                      <Badge variant="outline" className="mt-2">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" variant="ghost" onClick={() => handleProjectEdit(project)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleProjectDelete(project._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Messages */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Mail className="w-8 h-8 text-primary" />
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <p className="text-center py-16 text-muted-foreground text-lg">No messages received yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="border rounded-2xl p-6 bg-white hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-14 h-14 border-2 border-primary/20">
                          <AvatarFallback className="text-lg">
                            {contact.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-xl">{contact.name}</h4>
                          <p className="text-muted-foreground">{contact.email}</p>
                          {contact.company && (
                            <p className="text-sm text-muted-foreground mt-1">Company: {contact.company}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="px-3 py-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(contact.date).toLocaleDateString()}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-lg">Subject: {contact.subject}</p>
                      <p className="text-muted-foreground leading-relaxed">{contact.message}</p>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={() =>
                          window.open(
                            `mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`,
                            '_blank'
                          )
                        }
                      >
                        Reply via Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
