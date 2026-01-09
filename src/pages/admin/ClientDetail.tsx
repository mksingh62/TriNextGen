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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Copy, Download, FileText, Image as ImageIcon, Eye } from "lucide-react";
// Icons
import {
  IndianRupee,
  FolderKanban,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  ExternalLink,
  Phone,
  Mail,
  ArrowLeft,
  Loader2,
  Layers,
  Globe,
  Smartphone,
  Palette,
  Settings,
  Upload,
  X,
  Edit2,
  Trash2
} from "lucide-react";
// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */
type ProjectCategory = "Web App" | "Mobile App" | "UI/UX Design" | "SEO/Marketing" | "Maintenance";

interface Requirement {
  id: string;
  text: string;
  createdAt: string;
}

interface ProjectFile {
  name: string;
  data: string; // base64
  type: string;
}

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
  requirements?: Requirement[];
  projectFiles?: ProjectFile[];
}

interface Payment {
  _id: string;
  projectId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  notes?: string;
  screenshot?: string;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  company?: string;
}

const CATEGORY_MAP: Record<ProjectCategory, { icon: any; color: string }> = {
  "Web App": { icon: Globe, color: "#3b82f6" },
  "Mobile App": { icon: Smartphone, color: "#8b5cf6" },
  "UI/UX Design": { icon: Palette, color: "#ec4899" },
  "SEO/Marketing": { icon: TrendingUp, color: "#f59e0b" },
  "Maintenance": { icon: Settings, color: "#64748b" },
};

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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
  const [isScreenshotViewOpen, setIsScreenshotViewOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingScreenshot, setViewingScreenshot] = useState<string | null>(null);
  const [viewingFile, setViewingFile] = useState<ProjectFile | null>(null);

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
    requirements: [] as Requirement[],
    projectFiles: [] as ProjectFile[],
  });

  const [newRequirementText, setNewRequirementText] = useState("");

  const [paymentForm, setPaymentForm] = useState({
    projectId: "",
    amount: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "Bank Transfer",
    notes: "",
    screenshot: null as File | null,
  });
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

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
    const advanceTotal = projects.reduce((sum, p) => sum + (p.advancePaid || 0), 0);
    const paymentsTotal = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalPaid = advanceTotal + paymentsTotal;
    const totalRemaining = totalDealValue - totalPaid;
    return { totalDealValue, totalPaid, totalRemaining };
  }, [projects, payments]);

  const chartData = useMemo(() => {
    return projects.map(p => ({
      name: p.title.substring(0, 12) + (p.title.length > 12 ? '...' : ''),
      total: p.totalAmount,
      paid: p.advancePaid,
    }));
  }, [projects]);

  const analytics = useMemo(() => {
    const statusCounts = projects.reduce((acc: any, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});
    const donutData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
    const collectionRate = stats.totalDealValue > 0 ? Math.round((stats.totalPaid / stats.totalDealValue) * 100) : 0;
    const radialData = [{ name: 'Paid', value: collectionRate, fill: '#10b981' }];
    return { donutData, radialData, collectionRate };
  }, [projects, stats]);

  /* ---------- PAYMENT SCREENSHOT HANDLING ---------- */
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setPaymentForm({ ...paymentForm, screenshot: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setPaymentForm({ ...paymentForm, screenshot: null });
    setScreenshotPreview(null);
  };

  const viewScreenshot = (screenshot: string) => {
    setViewingScreenshot(screenshot);
    setIsScreenshotViewOpen(true);
  };

  const downloadScreenshot = (screenshot: string, paymentId: string) => {
    const link = document.createElement('a');
    link.href = screenshot;
    link.download = `payment-${paymentId}.png`;
    link.click();
  };

  /* ---------- REQUIREMENT HANDLERS ---------- */
  const addRequirement = () => {
    if (!newRequirementText.trim()) return;
    const newReq: Requirement = {
      id: Date.now().toString(),
      text: newRequirementText.trim(),
      createdAt: new Date().toISOString(),
    };
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        requirements: [...(editingProject.requirements || []), newReq],
      });
    } else {
      setProjectForm({
        ...projectForm,
        requirements: [...projectForm.requirements, newReq],
      });
    }
    setNewRequirementText("");
  };

  const removeRequirement = (reqId: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        requirements: editingProject.requirements?.filter(r => r.id !== reqId) || [],
      });
    } else {
      setProjectForm({
        ...projectForm,
        requirements: projectForm.requirements.filter(r => r.id !== reqId),
      });
    }
  };

  /* ---------- CLIENT-SIDE COMPRESSION FOR PROJECT FILES (PREVENTS 413 ERROR) ---------- */
  const compressAndAddFile = async (file: File): Promise<ProjectFile | null> => {
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            const MAX_WIDTH = 1200;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
              height = (height * MAX_WIDTH) / width;
              width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const compressed = canvas.toDataURL('image/jpeg', 0.7); // 70% quality

            resolve({
              name: file.name.replace(/\.[^/.]+$/, ".jpg"),
              data: compressed,
              type: 'image/jpeg'
            });
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    } else {
      // Non-images: limit to 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert(`"${file.name}" exceeds 5MB limit for documents.`);
        return null;
      }
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            name: file.name,
            data: e.target?.result as string,
            type: file.type || 'application/octet-stream'
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleProjectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const processedFile = await compressAndAddFile(file);
      if (processedFile) {
        if (editingProject) {
          setEditingProject(prev => ({
            ...prev!,
            projectFiles: [...(prev!.projectFiles || []), processedFile]
          }));
        } else {
          setProjectForm(prev => ({
            ...prev,
            projectFiles: [...prev.projectFiles, processedFile]
          }));
        }
      }
    }
  };

  const removeProjectFile = (index: number) => {
    if (editingProject) {
      setEditingProject(prev => ({
        ...prev!,
        projectFiles: prev!.projectFiles?.filter((_, i) => i !== index) || []
      }));
    } else {
      setProjectForm(prev => ({
        ...prev,
        projectFiles: prev.projectFiles.filter((_, i) => i !== index)
      }));
    }
  };

  /* ---------- PROJECT OPERATIONS ---------- */
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    const isEdit = !!editingProject;
    const url = isEdit
      ? `${import.meta.env.VITE_API_BASE}/api/clientProject/${editingProject?._id}`
      : `${import.meta.env.VITE_API_BASE}/api/clients/${id}/projects`;

    const currentReqs = isEdit ? editingProject!.requirements || [] : projectForm.requirements;
    const currentFiles = isEdit ? editingProject!.projectFiles || [] : projectForm.projectFiles;

    const payload = {
      title: isEdit ? editingProject!.title : projectForm.title,
      category: isEdit ? editingProject!.category || "Web App" : projectForm.category,
      totalAmount: Number(isEdit ? editingProject!.totalAmount : projectForm.totalAmount),
      advancePaid: Number(isEdit ? editingProject!.advancePaid : projectForm.advancePaid),
      status: isEdit ? editingProject!.status : projectForm.status,
      liveUrl: isEdit ? editingProject!.liveUrl || "" : projectForm.liveUrl,
      description: isEdit ? editingProject!.description || "" : projectForm.description,
      startDate: isEdit ? editingProject!.startDate || "" : projectForm.startDate,
      deadline: isEdit ? editingProject!.deadline || "" : projectForm.deadline,
      requirements: currentReqs.map(r => ({
        text: r.text,
        createdAt: r.createdAt,
      })),
      projectFiles: currentFiles,
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
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Error: ${errorData.message || "Failed to save project"}`);
      }
    } catch (error) {
      console.error("Project save error:", error);
      alert("Network error. Files may be too large.");
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
      let screenshotBase64 = null;
      if (paymentForm.screenshot) {
        screenshotBase64 = screenshotPreview;
      }
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...paymentForm,
          amount: Number(paymentForm.amount),
          screenshot: screenshotBase64,
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
      liveUrl: "", startDate: "", deadline: "", description: "", requirements: [], projectFiles: []
    });
    setNewRequirementText("");
  };

  const resetPaymentForm = () => {
    setPaymentForm({
      projectId: "", amount: "", paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: "Bank Transfer", notes: "", screenshot: null
    });
    setScreenshotPreview(null);
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "completed") return "bg-emerald-500 hover:bg-emerald-600";
    if (s === "active" || s === "in progress") return "bg-sky-500 hover:bg-sky-600";
    if (s === "on hold") return "bg-amber-500 hover:bg-amber-600";
    return "bg-slate-500 hover:bg-slate-600";
  };

  const getCategoryIcon = (cat: ProjectCategory) => {
    const Icon = CATEGORY_MAP[cat]?.icon || Layers;
    return <Icon className="w-4 h-4" />;
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      category: project.category || "Web App",
      totalAmount: project.totalAmount.toString(),
      advancePaid: project.advancePaid.toString(),
      status: project.status,
      liveUrl: project.liveUrl || "",
      startDate: project.startDate?.split('T')[0] || "",
      deadline: project.deadline?.split('T')[0] || "",
      description: project.description || "",
      requirements: project.requirements || [],
      projectFiles: project.projectFiles || [],
    });
    setIsProjectModalOpen(true);
  };

  const openRequirementsModal = (project: Project) => {
    if (!project) return;
    setViewingProject(project);
    setIsRequirementsModalOpen(true);
  };

  const downloadFile = (file: ProjectFile) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  const copyRequirement = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Requirement copied to clipboard!");
    });
  };

  const viewFile = (file: ProjectFile) => {
    if (file.type.startsWith('image/')) {
      setViewingFile(file);
    } else {
      downloadFile(file);
    }
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
      {/* BREADCRUMB / TOP NAV */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Client Dashboard</h2>
          <h1 className="text-4xl font-extrabold tracking-tight">{client.name}</h1>
        </div>
      </div>

      {/* TOP CARDS: QUICK STATS */}
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

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader><CardTitle>Project Status Distribution</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.donutData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {analytics.donutData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader><CardTitle>Collection Rate</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={analytics.radialData}>
                <RadialBar background dataKey="value" />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader><CardTitle>Financial Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div><p className="text-sm text-muted-foreground">Total Value</p><p className="text-2xl font-bold">₹{stats.totalDealValue.toLocaleString()}</p></div>
              <div><p className="text-sm text-muted-foreground">Collected</p><p className="text-2xl font-bold text-emerald-600">₹{stats.totalPaid.toLocaleString()}</p></div>
              <div><p className="text-sm text-muted-foreground">Remaining</p><p className="text-2xl font-bold text-orange-600">₹{stats.totalRemaining.toLocaleString()}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BAR CHART */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Financial Overview per Project
          </CardTitle>
          <CardDescription>Comparison between total contract value and amount collected</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Value" barSize={40} />
              <Bar dataKey="paid" fill="#10b981" radius={[4, 4, 0, 0]} name="Paid Amount" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT COLUMN: CLIENT PROFILE */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Client Info</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-muted rounded-full"><Mail className="w-4 h-4" /></div>
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-muted rounded-full"><Phone className="w-4 h-4" /></div>
                <span>{client.phone || "No phone linked"}</span>
              </div>
              <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
              <hr />
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Edit2 className="w-3 h-3 mr-2" /> Edit Profile
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
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

        {/* RIGHT COLUMN: MAIN CONTENT */}
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
                                  {getCategoryIcon(project.category)} {project.category}
                                </Badge>
                              )}
                              <Badge variant="secondary" className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                              {project.description || "No description provided."}
                            </p>
                            {project.requirements && project.requirements.length > 0 && (
                              <p className="text-xs text-muted-foreground mt-2">
                                {project.requirements.length} Requirement{project.requirements.length > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openRequirementsModal(project)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => openEditModal(project)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteProject(project._id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                          <div><p className="text-xs font-semibold text-muted-foreground uppercase">Value</p><p className="text-lg font-bold">₹{project.totalAmount?.toLocaleString()}</p></div>
                          <div><p className="text-xs font-semibold text-muted-foreground uppercase">Paid</p><p className="text-lg font-bold text-emerald-600">₹{project.advancePaid?.toLocaleString()}</p></div>
                          <div><p className="text-xs font-semibold text-muted-foreground uppercase">Balance</p><p className="text-lg font-bold text-orange-600">₹{project.remainingAmount?.toLocaleString()}</p></div>
                          <div><p className="text-xs font-semibold text-muted-foreground uppercase">Deadline</p><p className="text-sm font-medium">{project.deadline ? new Date(project.deadline).toLocaleDateString() : "No Date"}</p></div>
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
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 bg-muted/50 text-xs font-medium hover:bg-muted transition-colors border-t">
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
                <CardHeader>
                  <CardTitle>Transaction Ledger</CardTitle>
                  <CardDescription>Comprehensive record of all funds received.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Proof</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.length === 0 ? (
                        <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No transactions recorded yet.</TableCell></TableRow>
                      ) : (
                        payments.map((payment) => (
                          <TableRow key={payment._id}>
                            <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                            <TableCell className="font-medium">{projects.find(p => p._id === payment.projectId)?.title || "General"}</TableCell>
                            <TableCell><Badge variant="outline">{payment.paymentMethod}</Badge></TableCell>
                            <TableCell>
                              {payment.screenshot ? (
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => viewScreenshot(payment.screenshot!)}><Eye className="w-4 h-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => downloadScreenshot(payment.screenshot!, payment._id)}><Download className="w-4 h-4" /></Button>
                                </div>
                              ) : <span className="text-xs text-muted-foreground">No proof</span>}
                            </TableCell>
                            <TableCell className="text-right font-bold text-emerald-600">₹{payment.amount?.toLocaleString()}</TableCell>
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

      {/* PROJECT MODAL */}
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Update Project" : "Launch New Project"}</DialogTitle>
            <DialogDescription>Define the scope, financials, and timeline for this undertaking.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProjectSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-semibold">Project Title</label>
                <Input
                  placeholder="e.g. E-commerce Overhaul"
                  value={editingProject ? editingProject.title : projectForm.title}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject!, title: e.target.value })
                    : setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Project Category</label>
                <Select
                  value={editingProject ? editingProject.category || "Web App" : projectForm.category}
                  onValueChange={(val) => editingProject
                    ? setEditingProject({ ...editingProject!, category: val as ProjectCategory })
                    : setProjectForm({ ...projectForm, category: val as ProjectCategory })
                  }
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web App">Web App</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="SEO/Marketing">SEO/Marketing</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Contract Value (₹)</label>
                <Input
                  type="number"
                  value={editingProject ? editingProject.totalAmount : projectForm.totalAmount}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject!, totalAmount: Number(e.target.value) })
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
                    ? setEditingProject({ ...editingProject!, advancePaid: Number(e.target.value) })
                    : setProjectForm({ ...projectForm, advancePaid: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Status</label>
                <Select
                  value={editingProject ? editingProject.status : projectForm.status}
                  onValueChange={(val) => editingProject
                    ? setEditingProject({ ...editingProject!, status: val })
                    : setProjectForm({ ...projectForm, status: val })
                  }
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Deadline</label>
                <Input
                  type="date"
                  value={editingProject ? editingProject.deadline?.split('T')[0] || "" : projectForm.deadline}
                  onChange={(e) => editingProject
                    ? setEditingProject({ ...editingProject!, deadline: e.target.value })
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
                  ? setEditingProject({ ...editingProject!, description: e.target.value })
                  : setProjectForm({ ...projectForm, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold">Requirements</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new requirement..."
                    value={newRequirementText}
                    onChange={(e) => setNewRequirementText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {(editingProject ? editingProject.requirements : projectForm.requirements)?.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No requirements added yet.</p>
                  ) : (
                    (editingProject ? editingProject.requirements : projectForm.requirements)?.map((req, idx) => (
                      <Card key={req.id} className="p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">#{idx + 1}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(req.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p>{req.text}</p>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeRequirement(req.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold">Project Attachments (Any number of files)</label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <label className="cursor-pointer block">
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="w-10 h-10 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload files</p>
                      <p className="text-xs text-muted-foreground">Images auto-compressed • Docs max 5MB</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                      className="hidden"
                      onChange={handleProjectFileUpload}
                    />
                  </label>
                </div>
                {(editingProject ? editingProject.projectFiles : projectForm.projectFiles)?.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-xs font-medium text-muted-foreground">Uploaded Files:</p>
                    <div className="flex flex-wrap gap-2">
                      {(editingProject ? editingProject.projectFiles : projectForm.projectFiles)?.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs bg-muted px-3 py-2 rounded">
                          {file.type.startsWith('image/') ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          <span className="truncate max-w-40">{file.name}</span>
                          <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeProjectFile(idx)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

      {/* REQUIREMENTS & ATTACHMENTS VIEW MODAL */}
      <Dialog open={isRequirementsModalOpen} onOpenChange={setIsRequirementsModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingProject?.title || "Project"} - Requirements & Attachments</DialogTitle>
            <DialogDescription>View, copy requirements, and manage attachments.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <label className="text-sm font-semibold">Requirements</label>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {!viewingProject || !viewingProject.requirements || viewingProject.requirements.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No requirements.</p>
                ) : (
                  viewingProject.requirements.map((req, idx) => (
                    <Card key={req.id} className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">#{idx + 1}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(req.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p>{req.text}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => copyRequirement(req.text)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold">Attachments</label>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {!viewingProject || !viewingProject.projectFiles || viewingProject.projectFiles.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No attachments.</p>
                ) : (
                  viewingProject.projectFiles.map((file, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                          {file.type.startsWith('image/') ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          <span className="truncate max-w-md">{file.name}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => viewFile(file)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => downloadFile(file)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsRequirementsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* IMAGE VIEW MODAL */}
      <Dialog open={!!viewingFile} onOpenChange={() => setViewingFile(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{viewingFile?.name || "File"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {viewingFile && viewingFile.type.startsWith('image/') && (
              <img src={viewingFile.data} alt={viewingFile.name} className="w-full rounded-lg" />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => viewingFile && downloadFile(viewingFile)}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button onClick={() => setViewingFile(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PAYMENT MODAL */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log Payment</DialogTitle>
            <DialogDescription>Record a new payment with optional proof of transaction</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPayment} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Select Project</label>
              <Select
                value={paymentForm.projectId}
                onValueChange={(val) => setPaymentForm({ ...paymentForm, projectId: val })}
              >
                <SelectTrigger><SelectValue placeholder="Select a project..." /></SelectTrigger>
                <SelectContent>
                  {projects.map(p => (
                    <SelectItem key={p._id} value={p._id}>{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <div className="space-y-2">
              <label className="text-sm font-semibold">Payment Method</label>
              <Select
                value={paymentForm.paymentMethod}
                onValueChange={(val) => setPaymentForm({ ...paymentForm, paymentMethod: val })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Payment Proof (Screenshot)</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {screenshotPreview ? (
                  <div className="relative">
                    <img src={screenshotPreview} alt="Payment proof preview" className="max-h-48 mx-auto rounded-lg" />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeScreenshot}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="flex flex-col items-center gap-2 py-6">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload screenshot</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleScreenshotChange}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Notes (Optional)</label>
              <Textarea
                placeholder="Add any additional notes..."
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                rows={2}
              />
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

      {/* SCREENSHOT VIEW MODAL */}
      <Dialog open={isScreenshotViewOpen} onOpenChange={setIsScreenshotViewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <DialogDescription>Transaction screenshot</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {viewingScreenshot && (
              <img src={viewingScreenshot} alt="Payment proof" className="w-full rounded-lg" />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => viewingScreenshot && downloadScreenshot(viewingScreenshot, 'payment')}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button onClick={() => setIsScreenshotViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDetail;
