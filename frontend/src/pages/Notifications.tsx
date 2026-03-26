import { useCallback, useEffect, useState } from "react";
import { listPendingUsers, updateUserStatus, type UserRecord } from "@/services/authService";

export default function Notifications() {
  const [pendingUsers, setPendingUsers] = useState<UserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const notifySidebar = () => {
    window.dispatchEvent(new Event("pending-users-updated"));
  };

  const loadPending = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listPendingUsers();
      setPendingUsers(data);
      notifySidebar();
    } catch {
      setError("Failed to load pending users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  const handleStatusChange = async (user: UserRecord, status: "active" | "rejected") => {
    try {
      await updateUserStatus(String(user.id), status, {
        updatedAt: new Date().toISOString(),
      });
      setPendingUsers((prev) => prev.filter((item) => String(item.id) !== String(user.id)));
      notifySidebar();
    } catch {
      setError("Unable to update user status. Try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Pending user registrations awaiting approval.
          </p>
        </div>
        <button
          type="button"
          onClick={loadPending}
          className="px-3 py-2 rounded border border-border text-sm hover:bg-accent/10"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card">
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading pending users...</div>
        ) : error ? (
          <div className="p-4 text-sm text-destructive">{error}</div>
        ) : pendingUsers.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">No pending users right now.</div>
        ) : (
          <div className="divide-y divide-border">
            {pendingUsers.map((user) => (
              <div key={user.id} className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(user, "active")}
                    className="px-3 py-2 rounded bg-emerald-600 text-white text-xs"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(user, "rejected")}
                    className="px-3 py-2 rounded bg-destructive text-white text-xs"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
