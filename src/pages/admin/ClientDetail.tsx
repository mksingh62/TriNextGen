import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ClientDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("adminToken");

  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

useEffect(() => {
  const token = localStorage.getItem("adminToken");

  fetch(`${API_BASE}/api/clients/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(setClient);

  fetch(`${API_BASE}/api/clients/${id}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(setProjects);
}, [id]);

  if (!client) return null;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold">{client.name}</h1>
      <p>Email: {client.email}</p>
      <p>Total Earnings: ₹{client.totalEarnings}</p>

      <h2 className="mt-6 font-semibold">Projects</h2>
      {projects.map(p => (
        <div key={p._id}>
          {p.title} – ₹{p.earnings}
        </div>
      ))}
    </div>
  );
};

export default ClientDetail;
