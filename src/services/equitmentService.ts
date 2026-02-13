import api from "@/lib/api";

const basePath = (api.defaults.baseURL ?? "").replace(/\/+$/, "");
const equipmentsPath = basePath.endsWith("/equipments") ? "" : "/equipments";

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
  const response = await api.put(`${equipmentsPath}/${id}`, data);
  return response.data;
};

// DELETE
export const deleteEquipment = async (id: number) => {
  const response = await api.delete(`${equipmentsPath}/${id}`);
  return response.data;
};
