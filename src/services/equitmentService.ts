import api from "@/lib/api";

const basePath = (api.defaults.baseURL ?? "").replace(/\/+$/, "");
const equipmentsPath = basePath.endsWith("/equipments") ? "" : "/equipments";
const silentConfig = { skipGlobalErrorLog: true } as any;

// GET
export const getEquipments = async () => {
  const response = await api.get(equipmentsPath);
  return response.data;
};

// GET by ID
export const getEquipmentById = async (id: number) => {
  const response = await api.get(`${equipmentsPath}/${id}`);
  return response.data;
};

// POST
export const createEquipment = async (data: any) => {
  const response = await api.post(equipmentsPath, data);
  return response.data;
};

// PUT
export const updateEquipment = async (id: number, data: any) => {
  const payload =
    data && typeof data === "object" && !Array.isArray(data)
      ? { ...data, id }
      : data;

  const attempts = [
    () => api.patch(`${equipmentsPath}/${id}`, payload, silentConfig),
    () => api.patch(`${equipmentsPath}?id=${id}`, payload, silentConfig),
    () => api.patch(equipmentsPath, payload, silentConfig),
    () => api.post(`${equipmentsPath}/${id}`, payload, silentConfig),
    () => api.post(`${equipmentsPath}/update/${id}`, payload, silentConfig),
    () => api.post(`${equipmentsPath}/update`, payload, silentConfig),
    () => api.put(`${equipmentsPath}/${id}`, payload, silentConfig),
    () => api.put(`${equipmentsPath}?id=${id}`, payload, silentConfig),
    () => api.put(equipmentsPath, payload, silentConfig),
  ];

  let lastError: any = null;

  for (const attempt of attempts) {
    try {
      const response = await attempt();
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      if (status && status < 500 && status !== 404 && status !== 405) {
        throw error;
      }
      lastError = error;
    }
  }

  throw lastError;
};

// DELETE
export const deleteEquipment = async (id: number) => {
  const response = await api.delete(`${equipmentsPath}/${id}`);
  return response.data;
};
