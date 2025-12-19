import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setClient);

    fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setProjects);
  }, [id]);

  if (!client) return null;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{client.name}</h1>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-2">
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
          <p>Address: {client.address}</p>
          <p>Status: {client.status}</p>
          <p>Advance: ₹{client.advance}</p>
          <p>Total Earnings: ₹{client.totalEarnings}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-3">
        Projects ({projects.length})
      </h2>

      <div className="space-y-3">
        {projects.map(project => (
          <Card key={project._id}>
            <CardContent className="p-4 flex justify-between">
              <div>
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm">{project.status}</p>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="text-blue-600 text-sm"
                  >
                    Live URL
                  </a>
                )}
              </div>
              <div className="font-semibold">
                ₹ {project.earnings}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientDetail;
