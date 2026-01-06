import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { token, role: userRole } = useAuth();

  if (!token) return <Navigate to="/" />;

  if (role && role !== userRole) return <Navigate to="/" />;

  return children;
}
