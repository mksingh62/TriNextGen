import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    setOk(!!localStorage.getItem("adminToken"));
  }, []);

  if (ok === null) return null;
  return ok ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
