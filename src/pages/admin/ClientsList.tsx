import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ClientsList = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // 🚨 Hard guard – no token
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
        // ❌ Ignore unauthorized duplicate calls
        if (res.status === 401 || res.status === 403) {
          console.warn("Clients API unauthorized (duplicate call ignored)");
          return [];
        }

        const data = await res.json();
        return Array.isArray(data) ? data : [];
      })
      .then((data) => {
        if (isMounted) {
          setClients(data);
        }
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
      <h1 className="text-2xl font-bold mb-6">Client Management</h1>

      {clients.length === 0 ? (
        <p className="text-muted-foreground">No clients found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card
              key={client._id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/admin/clients/${client._id}`)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{client.name}</h3>
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsList;
