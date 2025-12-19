import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientsList = () => {
  const [clients, setClients] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return navigate("/admin/login");

    fetch(`${import.meta.env.VITE_API_BASE}/api/clients`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setClients(Array.isArray(data) ? data : []));
  }, [navigate]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button onClick={() => navigate("/admin/clients/new")}>
          + Add Client
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {clients.map(c => (
          <Card key={c._id}>
            <CardContent className="p-4">
              <h3 className="font-semibold">{c.name}</h3>
              <p>{c.email}</p>
              <p>Projects: {c.projectsCount}</p>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => navigate(`/admin/clients/${c._id}`)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/clients/${c._id}/edit`)}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientsList;
