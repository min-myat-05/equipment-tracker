import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  findUserByEmail,
  getUserById,
  loginUser,
  registerUser,
  type UserRecord,
  type UserRole,
  type UserStatus,
} from "@/services/authService";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string; user?: AuthUser }>;
  register: (input: { name: string; email: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const STORAGE_KEY = "equipment_auth_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const sanitizeUser = (record: UserRecord): AuthUser => ({
  id: String(record.id),
  name: record.name,
  email: record.email,
  role: record.role ?? "user",
  status: record.status ?? "pending",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as AuthUser;
      setUser(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const persistUser = useCallback((nextUser: AuthUser | null) => {
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(nextUser);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const cleanedEmail = email.trim().toLowerCase();
    if (!cleanedEmail || !password.trim()) {
      return { ok: false, error: "Email and password are required." };
    }
    try {
      const results = await loginUser(cleanedEmail, password);
      if (!results.length) {
        return { ok: false, error: "Invalid email or password." };
      }
      const nextUser = sanitizeUser(results[0]);
      if (nextUser.status === "rejected") {
        return { ok: false, error: "Your account was rejected. Please contact the administrator." };
      }
      persistUser(nextUser);
      return { ok: true, user: nextUser };
    } catch {
      return { ok: false, error: "Login failed. Please try again." };
    }
  }, [persistUser]);

  const register = useCallback(async (input: { name: string; email: string; password: string }) => {
    const name = input.name.trim();
    const email = input.email.trim().toLowerCase();
    const password = input.password.trim();
    if (!name || !email || !password) {
      return { ok: false, error: "All fields are required." };
    }

    try {
      const existing = await findUserByEmail(email);
      if (existing.length > 0) {
        return { ok: false, error: "An account with this email already exists." };
      }

      await registerUser({
        name,
        email,
        password,
        role: "user",
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      return { ok: true };
    } catch {
      return { ok: false, error: "Registration failed. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const refresh = useCallback(async () => {
    if (!user) return;
    try {
      const latest = await getUserById(user.id);
      persistUser(sanitizeUser(latest));
    } catch {
      // If refresh fails, keep existing session to avoid kicking users out accidentally.
    }
  }, [user, persistUser]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading, login, register, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
