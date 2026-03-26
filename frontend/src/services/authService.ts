import api from "@/lib/authApi";

export type UserRole = "super_admin" | "user";
export type UserStatus = "pending" | "active" | "rejected";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
};

const usersPath = "/users";

export const getUserById = async (id: string) => {
  const response = await api.get<UserRecord>(`${usersPath}/${id}`);
  return response.data;
};

export const findUserByEmail = async (email: string) => {
  const response = await api.get<UserRecord[]>(usersPath, {
    params: { email },
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.get<UserRecord[]>(usersPath, {
    params: { email, password },
  });
  return response.data;
};

export const registerUser = async (payload: Omit<UserRecord, "id">) => {
  const response = await api.post<UserRecord>(usersPath, payload);
  return response.data;
};

export const listPendingUsers = async () => {
  const response = await api.get<UserRecord[]>(usersPath, {
    params: { status: "pending" },
  });
  return response.data;
};

export const updateUserStatus = async (
  id: string,
  status: UserStatus,
  meta: Partial<UserRecord> = {},
) => {
  const response = await api.patch<UserRecord>(`${usersPath}/${id}`, {
    status,
    ...meta,
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};
