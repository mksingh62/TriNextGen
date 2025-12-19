import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, FolderKanban, Plus } from "lucide-react";

const ClientDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("adminToken");

  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- ADD PROJECT FORM ---------- */
  const [projectForm, setProjectForm] = useState({
    title: "",
    earnings: "",
    status: "Active",
    liveUrl: "",
  });

  /* ---------- FETCH DATA ---------- */
  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

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

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  /* ---------- ADD PROJECT ---------- */
  const handleAddProject = async (e: any) => {
    e.preventDefault();

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
          earnings: Number(projectForm.earnings),
        }),
      }
    );

    setProjectForm({
      title: "",
      earnings: "",
      status: "Active",
      liveUrl: "",
    });

    fetchData(); // refresh client + projects
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
    <div className="container mx-auto py-8 space-y-8">
      {/* ---------- CLIENT SUMMARY ---------- */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">{client.email}</p>
            <Badge className="mt-2">{client.status || "Active"}</Badge>
          </div>

          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-1">
              <FolderKanban className="w-4 h-4" />
              {projects.length} Projects
            </div>
            <div className="flex items-center gap-1 font-medium">
              <IndianRupee className="w-4 h-4" />
              {client.totalEarnings || 0}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------- ADD PROJECT ---------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Project
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleAddProject}
            className="grid md:grid-cols-4 gap-4"
          >
            <Input
              placeholder="Project Title"
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm((f) => ({
                  ...f,
                  title: e.target.value,
                }))
              }
              required
            />

            <Input
              placeholder="Earnings"
              type="number"
              value={projectForm.earnings}
              onChange={(e) =>
                setProjectForm((f) => ({
                  ...f,
                  earnings: e.target.value,
                }))
              }
              required
            />

            <Input
              placeholder="Live URL (optional)"
              value={projectForm.liveUrl}
              onChange={(e) =>
                setProjectForm((f) => ({
                  ...f,
                  liveUrl: e.target.value,
                }))
              }
            />

            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>

      {/* ---------- PROJECT LIST ---------- */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Projects ({projects.length})
        </h2>

        {projects.length === 0 ? (
          <p className="text-muted-foreground">
            No projects added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <Card key={p._id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{p.title}</h3>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        className="text-sm text-blue-600"
                      >
                        Live Link
                      </a>
                    )}
                  </div>

                  <div className="font-semibold flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {p.earnings}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetail;
