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
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Save,
} from "lucide-react";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(!!id);

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
        })
        .catch((err) => {
          console.error("Failed to fetch client:", err);
        })
        .finally(() => setFetchLoading(false));
    }
  }, [id, token, navigate]);

  /* ---------- STATUS OPTIONS ---------- */
  const statusOptions = [
    { value: "Active", label: "Active", color: "bg-green-500" },
    { value: "Inactive", label: "Inactive", color: "bg-gray-500" },
    { value: "On Hold", label: "On Hold", color: "bg-yellow-500" },
    { value: "Completed", label: "Completed", color: "bg-blue-500" },
  ];

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
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

      if (response.ok) {
        navigate("/admin/clients");
      } else {
        console.error("Failed to save client");
      }
    } catch (err) {
      console.error("Error saving client:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- LOADING STATE ---------- */
  if (fetchLoading) {
    return (
      <div className="container mx-auto py-10 max-w-2xl">
        <Card>
          <CardContent className="p-12">
            <div className="space-y-4">
              <div className="h-8 bg-muted animate-pulse rounded"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
              <div className="space-y-3 pt-4">
                <div className="h-10 bg-muted animate-pulse rounded"></div>
                <div className="h-10 bg-muted animate-pulse rounded"></div>
                <div className="h-10 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/admin/clients")}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {id ? "Edit Client" : "Add New Client"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {id
              ? "Update client information and status"
              : "Create a new client profile for project tracking"}
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Client Information
          </CardTitle>
          <CardDescription>
            Enter the client details below. All fields marked with * are required.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* -------- BASIC INFO -------- */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Client Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Enter client name"
                    value={form.name}
                    required
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="client@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                  <textarea
                    placeholder="Enter full address"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Client Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-2">
                  Set the current status of this client
                </p>
              </div>
            </div>

            {/* -------- INFO CARD -------- */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Important Information
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      After creating the client, you'll be able to add projects and track payments.
                      The client's financial summary will be automatically calculated based on their projects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* -------- ACTIONS -------- */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/clients")}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {id ? "Update Client" : "Create Client"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PREVIEW CARD (EDIT MODE ONLY) */}
      {id && (
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">Client Preview</CardTitle>
            <CardDescription>
              This is how the client will appear in the clients list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{form.name || "Client Name"}</h3>
                  <div className="space-y-1 mt-2">
                    {form.email && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1.5" />
                        {form.email}
                      </div>
                    )}
                    {form.phone && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="w-3 h-3 mr-1.5" />
                        {form.phone}
                      </div>
                    )}
                    {form.address && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1.5" />
                        {form.address}
                      </div>
                    )}
                  </div>
                </div>
                <Badge
                  className={`${
                    statusOptions.find((s) => s.value === form.status)?.color ||
                    "bg-gray-500"
                  } text-white flex items-center gap-1`}
                >
                  {form.status === "Active" && <CheckCircle2 className="w-3 h-3" />}
                  {form.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientForm;
