import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PendingApproval() {
  const { user, refresh, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.status === "active" || user?.role === "super_admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="max-w-lg w-full rounded-lg border border-border bg-card p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-foreground">Approval Pending</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Hi {user?.name ?? "there"}, your account is awaiting Super Admin approval.
          You will get full access once your status becomes active.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => refresh()}
            className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm"
          >
            Refresh Status
          </button>
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded border border-border text-sm text-foreground hover:bg-accent/20"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
