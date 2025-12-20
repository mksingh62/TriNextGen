import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Mail, 
  IndianRupee, 
  FolderKanban,
  Search,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wallet,
  Plus,
  Phone,
  MapPin
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
const ClientsList = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  /* ---------------- FETCH CLIENTS ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE}/api/clients`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      })
      .then((data) => {
        setClients(data);
        setFilteredClients(data);
      })
      .catch(() => {
        setClients([]);
        setFilteredClients([]);
      })
      .finally(() => setLoading(false));
  }, [navigate]);
/* ---------------- DELETE CLIENT FUNCTION ---------------- */
  const handleDeleteClient = async (e: React.MouseEvent, clientId: string, clientName: string) => {
    // Prevent the card's onClick (navigation) from firing
    e.stopPropagation();

    const confirmDelete = window.confirm(`Are you sure you want to delete ${clientName}? All associated project and payment data will be lost.`);
    
    if (!confirmDelete) return;

    setIsDeleting(clientId);
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${clientId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // Remove from local state immediately
        setClients((prev) => prev.filter((c) => c._id !== clientId));
        toast({
          title: "Client Deleted",
          description: `${clientName} has been removed successfully.`,
          variant: "destructive",
        });
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      alert("Error deleting client. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };
  /* ---------------- FILTER & SEARCH ---------------- */
  useEffect(() => {
    let filtered = clients;

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (c) => c.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  }, [searchQuery, statusFilter, clients]);

  /* ---------------- CALCULATE TOTALS ---------------- */
  const getTotals = () => {
    return {
      totalClients: clients.length,
      activeClients: clients.filter((c) => c.status === "Active").length,
      totalProjects: clients.reduce((sum, c) => sum + (c.projectsCount || 0), 0),
      totalRevenue: clients.reduce((sum, c) => sum + (c.totalDealValue || 0), 0),
      totalPending: clients.reduce((sum, c) => sum + (c.totalRemaining || 0), 0),
    };
  };

  const totals = getTotals();

  /* ---------------- STATUS BADGE COLOR ---------------- */
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500 text-white";
      case "inactive":
        return "bg-gray-500 text-white";
      case "on hold":
        return "bg-yellow-500 text-white";
      case "completed":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  /* ---------------- STATUS ICON ---------------- */
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircle2 className="w-3 h-3" />;
      case "on hold":
        return <Clock className="w-3 h-3" />;
      case "completed":
        return <CheckCircle2 className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your clients, projects and earnings efficiently
          </p>
        </div>

        <Button onClick={() => navigate("/admin/clients/new")} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Total Clients
                </p>
                <p className="text-3xl font-bold mt-2">{totals.totalClients}</p>
              </div>
              <Users className="w-10 h-10 text-blue-600 dark:text-blue-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Active Clients
                </p>
                <p className="text-3xl font-bold mt-2">{totals.activeClients}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Total Projects
                </p>
                <p className="text-3xl font-bold mt-2">{totals.totalProjects}</p>
              </div>
              <FolderKanban className="w-10 h-10 text-purple-600 dark:text-purple-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold mt-2">
                  ₹{totals.totalRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-600 dark:text-orange-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  Pending Amount
                </p>
                <p className="text-2xl font-bold mt-2">
                  ₹{totals.totalPending.toLocaleString()}
                </p>
              </div>
              <Wallet className="w-10 h-10 text-red-600 dark:text-red-400 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEARCH AND FILTER */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 items-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RESULTS COUNT */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredClients.length} of {clients.length} clients
        </p>
      </div>

      {/* EMPTY STATE */}
      {filteredClients.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <Users className="mx-auto mb-4 w-16 h-16 opacity-50" />
            <p className="font-medium text-lg mb-2">
              {searchQuery || statusFilter !== "All"
                ? "No clients found"
                : "No clients yet"}
            </p>
            <p className="text-sm mb-4">
              {searchQuery || statusFilter !== "All"
                ? "Try adjusting your search or filters"
                : "Add your first client to start managing projects"}
            </p>
            {!searchQuery && statusFilter === "All" && (
              <Button onClick={() => navigate("/admin/clients/new")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Client
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        /* CLIENT GRID */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <Card
              key={client._id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary"
              onClick={() => navigate(`/admin/clients/${client._id}`)}
            >
              <CardContent className="p-6 space-y-4">
                {/* TOP SECTION */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                      {client.name}
                    </h3>
                    
                    <div className="space-y-1 mt-2">
                      {client.email && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1.5" />
                          {client.email}
                        </div>
                      )}
                      {client.phone && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1.5" />
                          {client.phone}
                        </div>
                      )}
                      {client.address && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1.5" />
                          {client.address}
                        </div>
                      )}
                    </div>
                  </div>

                  <Badge className={`${getStatusColor(client.status)} flex items-center gap-1`}>
                    {getStatusIcon(client.status)}
                    {client.status || "Active"}
                  </Badge>
                </div>

                {/* FINANCIAL OVERVIEW */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-bold text-green-600">
                      ₹{(client.totalDealValue || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Advance</span>
                    <span className="font-semibold text-blue-600">
                      ₹{(client.totalAdvance || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-semibold text-orange-600">
                      ₹{(client.totalRemaining || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                {client.totalDealValue > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Payment Progress</span>
                      <span>
                        {((client.totalAdvance / client.totalDealValue) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (client.totalAdvance / client.totalDealValue) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* STATS ROW */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1.5 text-sm">
                    <FolderKanban className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{client.projectsCount || 0}</span>
                    <span className="text-muted-foreground">Projects</span>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {client.totalRemaining === 0 && client.projectsCount > 0
                      ? "✓ Fully Paid"
                      : "Pending"}
                  </Badge>
                </div>
                {/* DELETE BUTTON (Floating Top Right) */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10 z-10"
            disabled={isDeleting === client._id}
            onClick={(e) => handleDeleteClient(e, client._id, client.name)}
          >
            {isDeleting === client._id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/clients/${client._id}`);
                    }}
                  >
                    View Details
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/clients/${client._id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsList;
