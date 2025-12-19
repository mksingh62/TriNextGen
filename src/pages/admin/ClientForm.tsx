import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active"
  });

  useEffect(() => {
    if (!token) return navigate("/admin/login");

    if (id) {
      fetch(`${import.meta.env.VITE_API_BASE}/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(setForm);
    }
  }, [id, token, navigate]);

  const submit = async (e: any) => {
    e.preventDefault();

    await fetch(
      `${import.meta.env.VITE_API_BASE}/api/clients${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      }
    );

    navigate("/admin/clients");
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit Client" : "Add Client"}
      </h1>

      <form onSubmit={submit} className="space-y-4">
        <Input placeholder="Name" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <Input placeholder="Email" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <Input placeholder="Phone" value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        <Input placeholder="Address" value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />

        <Button type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default ClientForm;
