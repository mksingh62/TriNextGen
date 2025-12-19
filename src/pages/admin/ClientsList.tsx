import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientsList = () => {
  const [clients, setClients] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/clients`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then(res => res.json())
      .then(setClients);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Client Management</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <Card
            key={client._id}
            className="cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/admin/clients/${client._id}`)}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{client.name}</h3>
              <p className="text-sm text-muted-foreground">{client.email}</p>
              <p className="text-sm">{client.phone}</p>

              <div className="flex justify-between mt-3 text-sm">
                <span>Status: {client.status}</span>
                <span>Projects: {client.projectsCount}</span>
              </div>

              <div className="mt-2 font-medium">
                ₹ {client.totalEarnings}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientsList;
