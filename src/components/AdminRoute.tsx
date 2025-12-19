import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [checked, setChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }

    setChecked(true);
  }, []);

  // ⏳ Wait until token check is done
  if (!checked) {
    return null; // or loader
  }

  return authorized ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
