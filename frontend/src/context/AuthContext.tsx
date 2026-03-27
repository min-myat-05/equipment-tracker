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
  loginUser,
  createAdminAccount,
  getWhoAmI,
  refreshAccessToken,
  logoutUser,
  changePassword as changePasswordApi,
  type AuthUser,
  type UserRole,
} from "@/services/authService";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string; user?: AuthUser }>;
  createAdmin: (input: { username: string; email: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<{ ok: boolean; error?: string }>;
};

const ACCESS_TOKEN_KEY = "token";
const ACCESS_TOKEN_ALT_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const LEGACY_USER_KEY = "equipment_auth_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const extractUser = (payload: any): AuthUser | null => {
  const candidate = payload?.user ?? payload;
  if (!candidate) return null;
  return {
    id: String(candidate.id ?? ""),
    username: candidate.username ?? candidate.name ?? "",
    email: candidate.email ?? "",
    role: (candidate.role ?? "admin") as UserRole,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const getErrorMessage = (err: unknown) => {
    const anyErr = err as any;
    return (
      anyErr?.response?.data?.message ||
      anyErr?.response?.data?.detail ||
      anyErr?.response?.data?.error ||
      anyErr?.message ||
      "Request failed."
    );
  };

  const clearSession = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_ALT_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
    setUser(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const cleanedEmail = email.trim().toLowerCase();
    if (!cleanedEmail || !password.trim()) {
      return { ok: false, error: "Email and password are required." };
    }
    try {
      const result = await loginUser(cleanedEmail, password);
      const accessToken =
        (result as any)?.tokens?.access ??
        (result as any)?.tokens?.access_token ??
        (result as any).access_token ??
        result.accessToken ??
        result.token;
      const refreshToken =
        (result as any)?.tokens?.refresh ??
        (result as any)?.tokens?.refresh_token ??
        (result as any).refresh_token ??
        result.refreshToken;
      if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(ACCESS_TOKEN_ALT_KEY, accessToken);
      }
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }

      const userFromLogin = extractUser(result);
      if (userFromLogin) {
        setUser(userFromLogin);
        return { ok: true, user: userFromLogin };
      }

      const who = await getWhoAmI();
      const resolved = extractUser(who);
      if (!resolved) {
        return { ok: false, error: "Unable to load user profile." };
      }
      setUser(resolved);
      return { ok: true, user: resolved };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  }, []);

  const createAdmin = useCallback(async (input: { username: string; email: string; password: string }) => {
    const username = input.username.trim();
    const email = input.email.trim().toLowerCase();
    const password = input.password.trim();
    if (!username || !email || !password) {
      return { ok: false, error: "All fields are required." };
    }
    try {
      await createAdminAccount({
        username,
        email,
        password,
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const current = currentPassword.trim();
    const next = newPassword.trim();
    if (!current || !next) {
      return { ok: false, error: "Current and new passwords are required." };
    }
    try {
      await changePasswordApi({ currentPassword: current, newPassword: next });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) ?? undefined;
    try {
      await logoutUser(refreshToken);
    } catch (err) {
      // Ignore logout errors, clear local session anyway.
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    localStorage.removeItem(LEGACY_USER_KEY);
    const hydrate = async () => {
      const accessToken =
        localStorage.getItem(ACCESS_TOKEN_KEY) ??
        localStorage.getItem(ACCESS_TOKEN_ALT_KEY);
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        const who = await getWhoAmI();
        const resolved = extractUser(who);
        if (!resolved) {
          throw new Error("Invalid profile");
        }
        setUser(resolved);
      } catch {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (refreshToken) {
          try {
            const refreshed = await refreshAccessToken(refreshToken);
            const nextToken =
              (refreshed as any)?.tokens?.access ??
              (refreshed as any)?.tokens?.access_token ??
              (refreshed as any).access_token ??
              refreshed.accessToken ??
              refreshed.token;
            if (!nextToken) {
              throw new Error("Refresh failed");
            }
            localStorage.setItem(ACCESS_TOKEN_KEY, nextToken);
            localStorage.setItem(ACCESS_TOKEN_ALT_KEY, nextToken);
            const who = await getWhoAmI();
            const resolved = extractUser(who);
            if (!resolved) {
              throw new Error("Invalid profile");
            }
            setUser(resolved);
          } catch {
            clearSession();
          }
        } else {
          clearSession();
        }
      } finally {
        setLoading(false);
      }
    };
    hydrate();
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login,
      createAdmin,
      logout,
      changePassword,
    }),
    [user, loading, login, createAdmin, logout, changePassword],
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
