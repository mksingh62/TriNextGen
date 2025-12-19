import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  IndianRupee,
  FolderKanban,
  Plus,
  Wallet,
  CreditCard,
  TrendingUp,
} from "lucide-react";

const ClientDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("adminToken");

  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- ADD PROJECT FORM ---------------- */
  const [projectForm, setProjectForm] = useState({
    title: "",
    dealAmount: "",
    advance: "",
    earnings: "",
    liveUrl: "",
    status: "Active",
  });

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    const c = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/clients/${id}`,
      { headers }
    ).then((r) => r.json());

    const p = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/clients/${id}/projects`,
      { headers }
    ).then((r) => r.json());

    setClient(c);
    setProjects(Array.isArray(p) ? p : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  /* ---------------- ADD PROJECT ---------------- */
  const addProject = async (e: any) => {
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
          dealAmount: Number(projectForm.dealAmount),
          advance: Number(projectForm.advance),
          earnings: Number(projectForm.earnings),
        }),
      }
    );

    setProjectForm({
      title: "",
      dealAmount: "",
      advance: "",
      earnings: "",
      liveUrl: "",
      status: "Active",
    });

    fetchData();
  };

  if (loading) {
    return (
      <div className="container py-8 text-muted-foreground">
        Loading client dashboard...
      </div>
    );
  }

  if (!client) return null;

  const totalDeal = projects.reduce(
    (s, p) => s + (p.dealAmount || 0),
    0
  );
  const totalAdvance = projects.reduce(
    (s, p) => s + (p.advance || 0),
    0
  );
  const totalPaid = projects.reduce(
    (s, p) => s + (p.earnings || 0),
    0
  );

  const balance = totalDeal - totalPaid;

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* ================= CLIENT SUMMARY ================= */}
      <Card>
        <CardContent className="p-6 grid md:grid-cols-4 gap-6">
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">{client.email}</p>
            <Badge className="mt-2">{client.status}</Badge>
          </div>

          <Summary label="Total Deal" value={totalDeal} icon={TrendingUp} />
          <Summary label="Advance" value={totalAdvance} icon={Wallet} />
          <Summary label="Paid" value={totalPaid} icon={CreditCard} />
        </CardContent>
      </Card>

      {/* ================= ADD PROJECT ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={addProject}
            className="grid md:grid-cols-3 gap-4"
          >
            <Input placeholder="Project Title" required
              value={projectForm.title}
              onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))} />

            <Input placeholder="Deal Amount" type="number" required
              value={projectForm.dealAmount}
              onChange={e => setProjectForm(f => ({ ...f, dealAmount: e.target.value }))} />

            <Input placeholder="Advance" type="number"
              value={projectForm.advance}
              onChange={e => setProjectForm(f => ({ ...f, advance: e.target.value }))} />

            <Input placeholder="Paid Amount" type="number"
              value={projectForm.earnings}
              onChange={e => setProjectForm(f => ({ ...f, earnings: e.target.value }))} />

            <Input placeholder="Live URL"
              value={projectForm.liveUrl}
              onChange={e => setProjectForm(f => ({ ...f, liveUrl: e.target.value }))} />

            <Button type="submit">Add Project</Button>
          </form>
        </CardContent>
      </Card>

      {/* ================= PROJECT LIST ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FolderKanban className="w-5 h-5" />
          Projects ({projects.length})
        </h2>

        <div className="space-y-3">
          {projects.map((p) => {
            const pending = (p.dealAmount || 0) - (p.earnings || 0);

            return (
              <Card key={p._id}>
                <CardContent className="p-4 grid md:grid-cols-5 gap-4">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <Badge variant="outline">{p.status}</Badge>
                  </div>

                  <Money label="Deal" value={p.dealAmount} />
                  <Money label="Advance" value={p.advance} />
                  <Money label="Paid" value={p.earnings} />
                  <Money label="Balance" value={pending} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE ================= */

const Summary = ({ label, value, icon: Icon }: any) => (
  <div className="flex items-center gap-3">
    <Icon className="w-6 h-6 text-primary" />
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-bold">₹ {value || 0}</p>
    </div>
  </div>
);

const Money = ({ label, value }: any) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-semibold">₹ {value || 0}</p>
  </div>
);

export default ClientDetail;
