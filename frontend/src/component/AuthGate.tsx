import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PENDING_ROUTE = "/pending";
const SUPER_ADMIN_ONLY = ["/notifications"];

export default function AuthGate() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.status !== "active" && user.role !== "super_admin") {
    if (!path.startsWith(PENDING_ROUTE)) {
      return <Navigate to={PENDING_ROUTE} replace />;
    }
  }

  if (SUPER_ADMIN_ONLY.some((route) => path.startsWith(route)) && user.role !== "super_admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
