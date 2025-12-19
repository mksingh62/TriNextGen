import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, IndianRupee, FolderKanban } from "lucide-react";

const ClientsList = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      .then(setClients)
      .catch(() => setClients([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-muted-foreground">Loading clients...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Client Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage your clients, projects and earnings
          </p>
        </div>

        <Button onClick={() => navigate("/admin/clients/new")}>
          + Add Client
        </Button>
      </div>

      {/* EMPTY STATE */}
      {clients.length === 0 ? (
        <div className="border rounded-lg p-12 text-center text-muted-foreground">
          <Users className="mx-auto mb-3 w-8 h-8" />
          <p className="font-medium">No clients yet</p>
          <p className="text-sm">
            Add your first client to start managing projects
          </p>
        </div>
      ) : (
        /* CLIENT GRID */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card
              key={client._id}
              className="hover:shadow-lg transition cursor-pointer"
              onClick={() =>
                navigate(`/admin/clients/${client._id}`)
              }
            >
              <CardContent className="p-5 space-y-4">
                {/* TOP */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {client.name}
                    </h3>

                    {client.email && (
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Mail className="w-4 h-4 mr-1" />
                        {client.email}
                      </div>
                    )}
                  </div>

                  <Badge variant="secondary">
                    {client.status || "Active"}
                  </Badge>
                </div>

                {/* STATS */}
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <FolderKanban className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {client.projectsCount || 0} Projects
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-medium">
                    <IndianRupee className="w-4 h-4" />
                    {client.totalEarnings || 0}
                  </div>
                </div>

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
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/admin/clients/${client._id}/edit`
                      );
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
