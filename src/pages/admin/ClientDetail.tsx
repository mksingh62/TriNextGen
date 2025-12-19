import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  AlertCircle
} from "lucide-react";

const ClientDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("adminToken");

  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  /* ---------- ADD PROJECT FORM ---------- */
  const [projectForm, setProjectForm] = useState({
    title: "",
    totalAmount: "",
    advancePaid: "",
    remainingAmount: "",
    status: "Active",
    liveUrl: "",
    startDate: "",
    deadline: "",
    description: "",
  });
  /* ---------- EDIT PROJECT ---------- */
  const [editingProject, setEditingProject] = useState<any>(null);
  /* ---------- ADD PAYMENT FORM ---------- */
  const [paymentForm, setPaymentForm] = useState({
    projectId: "",
    amount: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "Bank Transfer",
    notes: "",
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  /* ---------- FETCH DATA ---------- */
  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const clientRes = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/clients/${id}`,
        { headers }
      );
      const clientData = await clientRes.json();
      setClient(clientData);

      const projectRes = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/clients/${id}/projects`,
        { headers }
      );
      const projectData = await projectRes.json();
      setProjects(Array.isArray(projectData) ? projectData : []);

      // Fetch payment history
      const paymentRes = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/clients/${id}/payments`,
        { headers }
      );
      const paymentData = await paymentRes.json();
      setPayments(Array.isArray(paymentData) ? paymentData : []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  /* ---------- CALCULATE TOTALS ---------- */
  const calculateTotals = () => {
    const totalDealValue = projects.reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0);
    const totalAdvance = projects.reduce((sum, p) => sum + (Number(p.advancePaid) || 0), 0);
    const totalRemaining = projects.reduce((sum, p) => sum + (Number(p.remainingAmount) || 0), 0);
    const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    return { totalDealValue, totalAdvance, totalRemaining, totalPaid };
  };

  const totals = calculateTotals();

    /* ---------- UPDATE PROJECT ---------- */
  const handleUpdateProject = async (e: any) => {
    e.preventDefault();

    const totalAmount = Number(editingProject.totalAmount);
    const advancePaid = Number(editingProject.advancePaid);

    await fetch(
      `${import.meta.env.VITE_API_BASE}/api/projects/${editingProject._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editingProject,
          totalAmount,
          advancePaid,
          remainingAmount: totalAmount - advancePaid,
        }),
      }
    );

    setEditingProject(null);
    fetchData();
  };

  /* ---------- ADD PROJECT ---------- */
  const handleAddProject = async (e: any) => {
    e.preventDefault();

    const totalAmount = Number(projectForm.totalAmount);
    const advancePaid = Number(projectForm.advancePaid);
    const remainingAmount = totalAmount - advancePaid;

    await fetch(
      `${import.meta.env.VITE_API_BASE}/api/clients/${id}/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...projectForm,
          totalAmount,
          advancePaid,
          remainingAmount,
        }),
      }
    );

    setProjectForm({
      title: "",
      totalAmount: "",
      advancePaid: "",
      remainingAmount: "",
      status: "Active",
      liveUrl: "",
      startDate: "",
      deadline: "",
      description: "",
    });

    fetchData();
  };

  /* ---------- ADD PAYMENT ---------- */
  const handleAddPayment = async (e: any) => {
    e.preventDefault();

    await fetch(
      `${import.meta.env.VITE_API_BASE}/api/clients/${id}/payments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...paymentForm,
          amount: Number(paymentForm.amount),
        }),
      }
    );

    setPaymentForm({
      projectId: "",
      amount: "",
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: "Bank Transfer",
      notes: "",
    });

    setShowPaymentForm(false);
    fetchData();
  };

  /* ---------- DELETE PROJECT ---------- */
  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    await fetch(
      `${import.meta.env.VITE_API_BASE}/api/projects/${projectId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchData();
  };

  /* ---------- STATUS BADGE COLOR ---------- */
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "active":
      case "in progress":
        return "bg-blue-500";
      case "on hold":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-muted-foreground">
        Loading client details...
      </div>
    );
  }

  if (!client) return null;

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* ---------- CLIENT HEADER ---------- */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold">{client.name}</h1>
              <p className="text-muted-foreground mt-1">{client.email}</p>
              {client.phone && (
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              )}
              <Badge className={`mt-3 ${getStatusColor(client.status)}`}>
                {client.status || "Active"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <FolderKanban className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <div className="text-2xl font-bold">{projects.length}</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-600" />
                <div className="text-2xl font-bold">₹{totals.totalDealValue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Value</div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                <Wallet className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                <div className="text-2xl font-bold">₹{totals.totalAdvance.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Advance Paid</div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                <div className="text-2xl font-bold">₹{totals.totalRemaining.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------- TABS ---------- */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "overview"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "projects"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "payments"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Payments
        </button>
      </div>

      {/* ---------- OVERVIEW TAB ---------- */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Add Project Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Project
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Project Title *"
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, title: e.target.value }))
                    }
                    required
                  />

                  <Input
                    placeholder="Total Deal Amount *"
                    type="number"
                    value={projectForm.totalAmount}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, totalAmount: e.target.value }))
                    }
                    required
                  />

                  <Input
                    placeholder="Advance Paid"
                    type="number"
                    value={projectForm.advancePaid}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, advancePaid: e.target.value }))
                    }
                  />

                  <select
                    value={projectForm.status}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, status: e.target.value }))
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <Input
                    placeholder="Start Date"
                    type="date"
                    value={projectForm.startDate}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, startDate: e.target.value }))
                    }
                  />

                  <Input
                    placeholder="Deadline"
                    type="date"
                    value={projectForm.deadline}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, deadline: e.target.value }))
                    }
                  />

                  <Input
                    placeholder="Live URL (optional)"
                    value={projectForm.liveUrl}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, liveUrl: e.target.value }))
                    }
                  />
                </div>

                <Textarea
                  placeholder="Project Description"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                />

                <Button type="submit" className="w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.slice(0, 3).map((p) => (
                <div key={p._id} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <h4 className="font-medium">{p.title}</h4>
                    <Badge className={`mt-1 ${getStatusColor(p.status)}`} variant="outline">
                      {p.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{p.totalAmount?.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      Remaining: ₹{p.remainingAmount?.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---------- PROJECTS TAB ---------- */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <FolderKanban className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No projects added yet.</p>
              </CardContent>
            </Card>
          ) : (
            projects.map((p) => (
              <Card key={p._id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{p.title}</h3>
                        <Badge className={getStatusColor(p.status)}>
                          {p.status}
                        </Badge>
                      </div>
                      {p.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {p.description}
                        </p>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Live Project →
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setEditingProject(p)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(p._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/50 p-4 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                      <div className="text-lg font-semibold">₹{p.totalAmount?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Advance Paid</div>
                      <div className="text-lg font-semibold text-green-600">₹{p.advancePaid?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Remaining</div>
                      <div className="text-lg font-semibold text-orange-600">₹{p.remainingAmount?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Payment Status</div>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        {p.remainingAmount === 0 ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Paid</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-orange-600">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {(p.startDate || p.deadline) && (
                    <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
                      {p.startDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Started: {new Date(p.startDate).toLocaleDateString()}
                        </div>
                      )}
                      {p.deadline && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Deadline: {new Date(p.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* ---------- PAYMENTS TAB ---------- */}
      {activeTab === "payments" && (
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment History</CardTitle>
              <Button onClick={() => setShowPaymentForm(!showPaymentForm)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment
              </Button>
            </CardHeader>

            {showPaymentForm && (
              <CardContent className="border-t">
                <form onSubmit={handleAddPayment} className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      value={paymentForm.projectId}
                      onChange={(e) =>
                        setPaymentForm((f) => ({ ...f, projectId: e.target.value }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select Project</option>
                      {projects.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.title}
                        </option>
                      ))}
                    </select>

                    <Input
                      placeholder="Amount *"
                      type="number"
                      value={paymentForm.amount}
                      onChange={(e) =>
                        setPaymentForm((f) => ({ ...f, amount: e.target.value }))
                      }
                      required
                    />

                    <Input
                      placeholder="Payment Date"
                      type="date"
                      value={paymentForm.paymentDate}
                      onChange={(e) =>
                        setPaymentForm((f) => ({ ...f, paymentDate: e.target.value }))
                      }
                      required
                    />

                    <select
                      value={paymentForm.paymentMethod}
                      onChange={(e) =>
                        setPaymentForm((f) => ({ ...f, paymentMethod: e.target.value }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                  </div>

                  <Input
                    placeholder="Notes (optional)"
                    value={paymentForm.notes}
                    onChange={(e) =>
                      setPaymentForm((f) => ({ ...f, notes: e.target.value }))
                    }
                  />

                  <div className="flex gap-2">
                    <Button type="submit">Add Payment</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPaymentForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            )}
          </Card>

          {payments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No payment records yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {payments.map((payment) => (
                    <div key={payment._id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {projects.find((p) => p._id === payment.projectId)?.title || "Unknown Project"}
                          </h4>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </span>
                            <span>{payment.paymentMethod}</span>
                          </div>
                          {payment.notes && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {payment.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-semibold text-green-600">
                            ₹{payment.amount?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ---------- EDIT PROJECT ---------- */}
      {editingProject && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProject} className="space-y-4">
              <Input
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
              />
              <Input
                type="number"
                value={editingProject.totalAmount}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, totalAmount: e.target.value })
                }
              />
              <Input
                type="number"
                value={editingProject.advancePaid}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, advancePaid: e.target.value })
                }
              />
              <Textarea
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, description: e.target.value })
                }
              />
              <div className="flex gap-2">
                <Button type="submit">Update</Button>
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientDetail;
