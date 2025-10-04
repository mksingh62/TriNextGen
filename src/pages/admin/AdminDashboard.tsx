import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '@/lib/api';
import { 
  Users, 
  Mail, 
  Briefcase, 
  Calendar,
  BarChart3,
  FileText,
  MessageSquare,
  LogOut,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

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

  useEffect(() => {
    // Check if user is authenticated
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
      
      // Fetch services from backend
      const servicesResponse = await fetch('http://localhost:5000/api/services');
      const servicesData = await servicesResponse.json();
      setServices(servicesData);
      
      // Fetch careers from backend
      const careersResponse = await fetch('http://localhost:5000/api/careers');
      const careersData = await careersResponse.json();
      setCareers(careersData);
      
      // Fetch contacts from backend (you'll need to implement this endpoint)
      // For now, we'll use mock data
      const mockContacts: Contact[] = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Tech Corp',
          subject: 'Project Inquiry',
          message: 'I would like to discuss a potential project with your team.',
          date: '2023-06-15T10:30:00Z'
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          subject: 'Partnership Opportunity',
          message: 'Interested in exploring partnership opportunities for our upcoming product launch.',
          date: '2023-06-14T14:45:00Z'
        }
      ];
      setContacts(mockContacts);
      
      // Fetch applications from backend
      const applicationsResponse = await fetch('http://localhost:5000/api/careers/applications');
      const applicationsData = await applicationsResponse.json();
      setApplications(applicationsData);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching dashboard data:', err);
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
      const url = editingServiceId 
        ? `http://localhost:5000/api/services/${editingServiceId}` 
        : 'http://localhost:5000/api/services';
      
      const body = { 
        ...serviceForm, 
        features: serviceForm.features.split(',').map(f => f.trim()) 
      };
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        setServiceForm({ 
          title: '', 
          description: '', 
          features: '', 
          icon: '', 
          color: '' 
        });
        setEditingServiceId(null);
        fetchDashboardData(token!);
      } else {
        throw new Error('Failed to save service');
      }
    } catch (err) {
      setError('Failed to save service. Please try again.');
      console.error('Error saving service:', err);
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
      const response = await fetch(`http://localhost:5000/api/services/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchDashboardData(token!);
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (err) {
      setError('Failed to delete service. Please try again.');
      console.error('Error deleting service:', err);
    }
  };

  // Career CRUD
  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const method = editingCareerId ? 'PUT' : 'POST';
      const url = editingCareerId 
        ? `http://localhost:5000/api/careers/${editingCareerId}` 
        : 'http://localhost:5000/api/careers';
      
      const body = { 
        ...careerForm, 
        tags: careerForm.tags.split(',').map(t => t.trim()) 
      };
      
      const response = await fetch(url, {
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
      } else {
        throw new Error('Failed to save career');
      }
    } catch (err) {
      setError('Failed to save career. Please try again.');
      console.error('Error saving career:', err);
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
      const response = await fetch(`http://localhost:5000/api/careers/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchDashboardData(token!);
      } else {
        throw new Error('Failed to delete career');
      }
    } catch (err) {
      setError('Failed to delete career. Please try again.');
      console.error('Error deleting career:', err);
    }
  };

  // Application status update
  const updateApplicationStatus = async (applicationId: string, status: Application['status']) => {
    try {
      const response = await fetch(`http://localhost:5000/api/careers/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        // Update local state
        setApplications(prev => 
          prev.map(app => 
            app._id === applicationId ? { ...app, status } : app
          )
        );
      } else {
        throw new Error('Failed to update application status');
      }
    } catch (err) {
      setError('Failed to update application status. Please try again.');
      console.error('Error updating application status:', err);
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
        return <CheckCircle className="w-4 h-4 text-green-500" />;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-lg text-muted-foreground">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Dashboard</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" className="flex items-center">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Services</p>
                  <p className="text-2xl font-bold">{services.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Careers</p>
                  <p className="text-2xl font-bold">{careers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                Recent Job Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No applications found</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{application.name}</h3>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                          {application.phone && (
                            <p className="text-sm text-muted-foreground">{application.phone}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span className="text-sm font-medium">{getStatusText(application.status)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm font-medium">Applied for: {application.jobTitle}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm line-clamp-2">{application.coverLetter}</p>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => updateApplicationStatus(application._id, 'reviewed')}
                          disabled={application.status === 'reviewed' || application.status === 'interview' || application.status === 'hired' || application.status === 'rejected'}
                        >
                          Mark as Reviewed
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => updateApplicationStatus(application._id, 'interview')}
                          disabled={application.status === 'interview' || application.status === 'hired' || application.status === 'rejected'}
                        >
                          Schedule Interview
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => updateApplicationStatus(application._id, 'rejected')}
                          disabled={application.status === 'rejected' || application.status === 'hired'}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Services Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Manage Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleServiceSubmit} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder="Title" 
                      value={serviceForm.title} 
                      onChange={e => setServiceForm(f => ({ ...f, title: e.target.value }))} 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Icon" 
                      value={serviceForm.icon} 
                      onChange={e => setServiceForm(f => ({ ...f, icon: e.target.value }))} 
                      required 
                    />
                  </div>
                </div>
                
                <Input 
                  placeholder="Description" 
                  value={serviceForm.description} 
                  onChange={e => setServiceForm(f => ({ ...f, description: e.target.value }))} 
                  required 
                />
                
                <Input 
                  placeholder="Features (comma separated)" 
                  value={serviceForm.features} 
                  onChange={e => setServiceForm(f => ({ ...f, features: e.target.value }))} 
                />
                
                <Input 
                  placeholder="Color" 
                  value={serviceForm.color} 
                  onChange={e => setServiceForm(f => ({ ...f, color: e.target.value }))} 
                />
                
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-primary hover:bg-primary-dark">
                    {editingServiceId ? 'Update' : 'Create'} Service
                  </Button>
                  {editingServiceId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => { 
                        setServiceForm({ 
                          title: '', 
                          description: '', 
                          features: '', 
                          icon: '', 
                          color: '' 
                        }); 
                        setEditingServiceId(null); 
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {services.map(service => (
                  <div key={service._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {service.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-secondary px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleServiceEdit(service)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleServiceDelete(service._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Careers Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Manage Careers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCareerSubmit} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder="Title" 
                      value={careerForm.title} 
                      onChange={e => setCareerForm(f => ({ ...f, title: e.target.value }))} 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Location" 
                      value={careerForm.location} 
                      onChange={e => setCareerForm(f => ({ ...f, location: e.target.value }))} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input 
                      placeholder="Type" 
                      value={careerForm.type} 
                      onChange={e => setCareerForm(f => ({ ...f, type: e.target.value }))} 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Level" 
                      value={careerForm.level} 
                      onChange={e => setCareerForm(f => ({ ...f, level: e.target.value }))} 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Salary" 
                      value={careerForm.salary} 
                      onChange={e => setCareerForm(f => ({ ...f, salary: e.target.value }))} 
                    />
                  </div>
                </div>
                
                <Input 
                  placeholder="Tags (comma separated)" 
                  value={careerForm.tags} 
                  onChange={e => setCareerForm(f => ({ ...f, tags: e.target.value }))} 
                />
                
                <textarea
                  placeholder="Description"
                  value={careerForm.description}
                  onChange={e => setCareerForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full min-h-[100px] p-3 border rounded-md bg-background text-foreground"
                  required
                />
                
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-primary hover:bg-primary-dark">
                    {editingCareerId ? 'Update' : 'Create'} Career
                  </Button>
                  {editingCareerId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => { 
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
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {careers.map(career => (
                  <div key={career._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{career.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{career.location}</span>
                          <span>•</span>
                          <span>{career.type}</span>
                          <span>•</span>
                          <span>{career.level}</span>
                          {career.salary && (
                            <>
                              <span>•</span>
                              <span>{career.salary}</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm mt-2">{career.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {career.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-secondary px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleCareerEdit(career)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleCareerDelete(career._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;