import api from "@/lib/authApi";

export type UserRole = "super_admin" | "admin";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  refresh_token?: string;
  user?: AuthUser;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/api/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const getWhoAmI = async () => {
  const response = await api.get<AuthUser | { user: AuthUser }>("/api/auth/whoami");
  return response.data;
};

export const createAdminAccount = async (payload: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post<AuthUser>("/api/auth/admins", payload);
  return response.data;
};

export const refreshAccessToken = async (refreshToken?: string) => {
  const response = await api.post<{
    accessToken?: string;
    token?: string;
  }>("/api/auth/refresh", refreshToken ? { refreshToken } : undefined);
  return response.data;
};

export const logoutUser = async (refreshToken?: string) => {
  const response = await api.post("/api/auth/logout", refreshToken ? { refreshToken } : undefined);
  return response.data;
};

export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post("/api/auth/change-password", {
    current_password: payload.currentPassword,
    new_password: payload.newPassword,
  });
  return response.data;
};
