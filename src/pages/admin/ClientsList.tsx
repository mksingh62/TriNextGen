import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientsList = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ---------------- FETCH CLIENTS ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // 🚨 No token → login
    if (!token) {
      navigate("/admin/login");
      return;
    }

    let isMounted = true;

    fetch(`${import.meta.env.VITE_API_BASE}/api/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          console.warn("Unauthorized (ignored – strict mode)");
          return [];
        }

        const data = await res.json();
        return Array.isArray(data) ? data : [];
      })
      .then((data) => {
        if (isMounted) setClients(data);
      })
      .catch((err) => {
        console.error("Clients API error:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  /* ---------------- DELETE CLIENT ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    const token = localStorage.getItem("adminToken");

    await fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // remove from UI
    setClients((prev) => prev.filter((c) => c._id !== id));
  };

  /* ---------------- UI ---------------- */

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <Button onClick={() => navigate("/admin/clients/new")}>
          + Add Client
        </Button>
      </div>

      {/* EMPTY STATE */}
      {clients.length === 0 ? (
        <p className="text-muted-foreground">No clients found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card
              key={client._id}
              className="hover:shadow-lg transition"
            >
              <CardContent className="p-4">
                {/* CLIENT INFO */}
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/clients/${client._id}`)
                  }
                >
                  <h3 className="font-semibold text-lg">
                    {client.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {client.email}
                  </p>
                  <p className="text-sm">{client.phone}</p>

                  <div className="flex justify-between mt-3 text-sm">
                    <span>Status: {client.status || "Active"}</span>
                    <span>Projects: {client.projectsCount || 0}</span>
                  </div>

                  <div className="mt-2 font-medium">
                    ₹ {client.totalEarnings || 0}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/admin/clients/${client._id}/edit`
                      );
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(client._id);
                    }}
                  >
                    Delete
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
