import { api } from "../config/api";

export const getOrgaos = async (filters) => {
  const { data } = await api.get("/orgaos", {
    params: {
      ...filters
    }
  })
  return data;
}
