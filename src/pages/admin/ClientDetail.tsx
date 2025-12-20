import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
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
  DialogDescription
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
import { Progress } from "@/components/ui/progress";
// Icons
import {
  IndianRupee,
  FolderKanban,
  Plus,
  TrendingUp,
  Wallet,
  Calendar,
  Edit2,
  Trash2,
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  ArrowLeft,
  MoreVertical,
  Loader2
} from "lucide-react";
// Recharts for visualization
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */
type ProjectCategory = "Web App" | "Mobile App" | "UI/UX Design" | "SEO/Marketing" | "Maintenance";

interface Project {
  _id: string;
  title: string;
  category?: ProjectCategory;
  totalAmount: number;
  advancePaid: number;
  remainingAmount: number;
  status: string;
  liveUrl?: string;
  startDate?: string;
  deadline?: string;
  description?: string;
}

interface Payment {
  _id: string;
  projectId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  notes?: string;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  company?: string;
}

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  /* ---------- STATE ---------- */
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  /* ---------- MODAL STATES ---------- */
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  /* ---------- FORMS ---------- */
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "Web App" as ProjectCategory,
    totalAmount: "",
    advancePaid: "",
    status: "Active",
    liveUrl: "",
    startDate: "",
    deadline: "",
    description: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    projectId: "",
    amount: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "Bank Transfer",
    notes: "",
  });

  /* ---------- DATA FETCHING ---------- */
  const fetchData = useCallback(async () => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [clientRes, projectRes, paymentRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}/projects`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}/payments`, { headers })
      ]);
      if (!clientRes.ok) throw new Error("Failed to load client");
      const clientData = await clientRes.json();
      const projectData = await projectRes.json();
      const paymentData = await paymentRes.json();
      setClient(clientData);
      setProjects(Array.isArray(projectData) ? projectData : []);
      setPayments(Array.isArray(paymentData) ? paymentData : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ---------- COMPUTED VALUES ---------- */
  const stats = useMemo(() => {
    const totalDealValue = projects.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
    const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalRemaining = totalDealValue - totalPaid;
    return { totalDealValue, totalPaid, totalRemaining };
  }, [projects, payments]);

  // NEW: Chart data for financial overview
  const chartData = useMemo(() => {
    return projects.map(p => ({
      name: p.title.substring(0, 12) + (p.title.length > 12 ? '...' : ''),
      total: p.totalAmount,
      paid: p.advancePaid,
    }));
  }, [projects]);

  /* ---------- PROJECT OPERATIONS ---------- */
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    const isEdit = !!editingProject;
    const url = isEdit
      ? `${import.meta.env.VITE_API_BASE}/api/clientProject/${editingProject?._id}`
      : `${import.meta.env.VITE_API_BASE}/api/clients/${id}/projects`;

    const payload = isEdit
      ? {
          title: editingProject!.title,
          category: editingProject!.category,
          totalAmount: Number(editingProject!.totalAmount),
          advancePaid: Number(editingProject!.advancePaid),
          status: editingProject!.status,
          liveUrl: editingProject!.liveUrl,
          description: editingProject!.description,
          startDate: editingProject!.startDate,
          deadline: editingProject!.deadline,
        }
      : {
          ...projectForm,
          totalAmount: Number(projectForm.totalAmount),
          advancePaid: Number(projectForm.advancePaid),
          category: projectForm.category,
        };

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsProjectModalOpen(false);
        setEditingProject(null);
        resetProjectForm();
        fetchData();
      }
    } catch (error) {
      console.error("Project save error:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project? This will also delete all associated payments.")) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/clientProject/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
        fetchData();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || "Failed to delete"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  /* ---------- PAYMENT OPERATIONS ---------- */
  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...paymentForm,
          amount: Number(paymentForm.amount),
        }),
      });
      if (res.ok) {
        setIsPaymentModalOpen(false);
        resetPaymentForm();
        fetchData();
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  /* ---------- HELPERS ---------- */
  const resetProjectForm = () => {
    setProjectForm({
      title: "", category: "Web App", totalAmount: "", advancePaid: "", status: "Active",
      liveUrl: "", startDate: "", deadline: "", description: ""
    });
  };

  const resetPaymentForm = () => {
    setPaymentForm({
      projectId: "", amount: "", paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: "Bank Transfer", notes: ""
    });
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "completed") return "bg-emerald-500 hover:bg-emerald-600";
    if (s === "active" || s === "in progress") return "bg-sky-500 hover:bg-sky-600";
    if (s === "on hold") return "bg-amber-500 hover:bg-amber-600";
    return "bg-slate-500 hover:bg-slate-600";
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Syncing client workspace...</p>
      </div>
    );
  }

  if (!client) return <div>Client not found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* ---------- BREADCRUMB / TOP NAV ---------- */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Client Dashboard</h2>
          <h1 className="text-4xl font-extrabold tracking-tight">{client.name}</h1>
        </div>
      </div>

      {/* ---------- TOP CARDS: QUICK STATS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <FolderKanban className="w-4 h-4" /> Total Projects
            </CardDescription>
            <CardTitle className="text-3xl">{projects.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Revenue Collected
            </CardDescription>
            <CardTitle className="text-3xl text-emerald-600">₹{stats.totalPaid.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Outstanding Balance
            </CardDescription>
            <CardTitle className="text-3xl text-orange-600">₹{stats.totalRemaining.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* ---------- ADDED: FINANCIAL OVERVIEW CHART ---------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Financial Overview per Project
          </CardTitle>
          <CardDescription>Comparison between total contract value and amount collected</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Value" barSize={40} />
              <Bar dataKey="paid" fill="#10b981" radius={[4, 4, 0, 0]} name="Paid Amount" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ---------- LEFT COLUMN: CLIENT PROFILE ---------- */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-muted rounded-full"><Mail className="w-4 h-4" /></div>
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-muted rounded-full"><Phone className="w-4 h-4" /></div>
                <span>{client.phone || "No phone linked"}</span>
              </div>
              <Badge className={getStatusColor(client.status)}>
                {client.status}
              </Badge>
              <hr />
              <div className="pt-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Edit2 className="w-3 h-3 mr-2" /> Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button onClick={() => { resetProjectForm(); setIsProjectModalOpen(true); }} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> New Project
              </Button>
              <Button onClick={() => setIsPaymentModalOpen(true)} variant="secondary" className="w-full">
                <IndianRupee className="w-4 h-4 mr-2" /> Log Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ---------- RIGHT COLUMN: MAIN CONTENT ---------- */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="projects">Active Projects</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              {projects.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-xl">
                  <FolderKanban className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                  <h3 className="text-lg font-medium">No projects found</h3>
                  <p className="text-muted-foreground mb-4">Start by creating the first project for this client.</p>
                  <Button onClick={() => setIsProjectModalOpen(true)} variant="outline">Create Project</Button>
                </div>
              ) : (
                projects.map((project) => (
                  <Card key={project._id} className="group overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold">{project.title}</h3>
                              {project.category && (
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                  {project.category}
                                </Badge>
                              )}
                              <Badge variant="secondary" className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                              {project.description || "No description provided."}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => { setEditingProject(project); setIsProjectModalOpen(true); }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteProject(project._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Value</p>
                            <p className="text-lg font-bold">₹{project.totalAmount?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Paid</p>
                            <p className="text-lg font-bold text-emerald-600">₹{project.advancePaid?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Balance</p>
                            <p className="text-lg font-bold text-orange-600">₹{project.remainingAmount?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Deadline</p>
                            <p className="text-sm font-medium">
                              {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No Date"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-medium uppercase text-muted-foreground">
                            <span>Project Health</span>
                            <span>{Math.round((project.advancePaid / project.totalAmount) * 100)}% Paid</span>
                          </div>
                          <Progress value={(project.advancePaid / project.totalAmount) * 100} className="h-2" />
                        </div>
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 py-2 bg-muted/50 text-xs font-medium hover:bg-muted transition-colors border-t"
                        >
                          <ExternalLink className="w-3 h-3" /> Visit Live Site
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Transaction Ledger</CardTitle>
                    <CardDescription>Comprehensive record of all funds received.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                            No transactions recorded yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        payments.map((payment) => (
                          <TableRow key={payment._id}>
                            <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                            <TableCell className="font-medium">
                              {projects.find(p => p._id === payment.projectId)?.title || "General"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{payment.paymentMethod}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-bold text-emerald-600">
                              ₹{payment.amount?.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ---------- MODAL: ADD/EDIT PROJECT ---------- */}
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Update Project" : "Launch New Project"}</DialogTitle>
            <DialogDescription>
              Define the scope, financials, and timeline for this undertaking.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProjectSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-semibold">Project Title</label>
                <Input
                  placeholder="e.g. E-commerce Overhaul"
                  value={editingProject ? editingProject.title : projectForm.title}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject, title: e.target.value })
                    : setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Project Category</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={editingProject ? editingProject.category || "Web App" : projectForm.category}
                  onChange={(e) => {
                    const val = e.target.value as ProjectCategory;
                    editingProject
                      ? setEditingProject({ ...editingProject, category: val })
                      : setProjectForm({ ...projectForm, category: val });
                  }}
                >
                  <option value="Web App">Web App</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="SEO/Marketing">SEO/Marketing</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Contract Value (₹)</label>
                <Input
                  type="number"
                  value={editingProject ? editingProject.totalAmount : projectForm.totalAmount}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject, totalAmount: Number(e.target.value) })
                    : setProjectForm({ ...projectForm, totalAmount: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Advance Received (₹)</label>
                <Input
                  type="number"
                  value={editingProject ? editingProject.advancePaid : projectForm.advancePaid}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject, advancePaid: Number(e.target.value) })
                    : setProjectForm({ ...projectForm, advancePaid: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Status</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={editingProject ? editingProject.status : projectForm.status}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject, status: e.target.value })
                    : setProjectForm({ ...projectForm, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Deadline</label>
                <Input
                  type="date"
                  value={editingProject ? editingProject.deadline?.split('T')[0] || "" : projectForm.deadline}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject, deadline: e.target.value })
                    : setProjectForm({ ...projectForm, deadline: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Description</label>
              <Textarea
                placeholder="Briefly describe project goals..."
                value={editingProject ? editingProject.description || "" : projectForm.description}
                onChange={(e) => editingProject
                  ? setEditingProject({ ...editingProject, description: e.target.value })
                  : setProjectForm({ ...projectForm, description: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isActionLoading}>
                {isActionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ---------- MODAL: LOG PAYMENT ---------- */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Payment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPayment} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Select Project</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={paymentForm.projectId}
                onChange={(e) => setPaymentForm({ ...paymentForm, projectId: e.target.value })}
                required
              >
                <option value="">Select a project...</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Amount (₹)</label>
                <Input
                  type="number"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Date</label>
                <Input
                  type="date"
                  value={paymentForm.paymentDate}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isActionLoading}>
                {isActionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log Payment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDetail;
