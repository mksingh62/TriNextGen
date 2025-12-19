import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  /* ---------- FETCH CLIENT (EDIT MODE) ---------- */
  useEffect(() => {
    if (!token) return navigate("/admin/login");

    if (id) {
      fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            status: data.status || "Active",
          });
        });
    }
  }, [id, token, navigate]);

  /* ---------- SUBMIT ---------- */
  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch(
      `${import.meta.env.VITE_API_BASE}/api/clients${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    navigate("/admin/clients");
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>
            {id ? "Edit Client" : "Add New Client"}
          </CardTitle>
          <CardDescription>
            {id
              ? "Update client information and status"
              : "Create a new client profile for project tracking"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            {/* -------- BASIC INFO -------- */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Client Name"
                value={form.name}
                required
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />

              <Input
                placeholder="Email Address"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
                className="border rounded-md px-3 py-2 bg-background"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <Input
              placeholder="Address"
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
            />

            {/* -------- ACTIONS -------- */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/clients")}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : id
                  ? "Update Client"
                  : "Create Client"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientForm;
