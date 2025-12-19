import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  const token = localStorage.getItem("adminToken");

  // 🚨 HARD GUARD
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    // EDIT MODE → load client
    if (id) {
      fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setForm(data));
    }
  }, [id, token, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const url = id
      ? `/api/clients/${id}`
      : `/api/clients`;

    const method = id ? "PUT" : "POST";

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}${url}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ THIS WAS MISSING / FAILING
        },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      alert("Unauthorized or failed to save client");
      return;
    }

    navigate("/admin/clients");
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Client" : "Add Client"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Client Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        />
        <Input
          placeholder="Address"
          value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
        />

        <Button type="submit">
          {id ? "Update Client" : "Create Client"}
        </Button>
      </form>
    </div>
  );
};

export default ClientForm;
