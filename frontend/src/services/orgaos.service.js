import { api } from "../config/api";

export const getOrgaos = async (filters) => {
  try {
    const { data } = await api.get("/orgaos", {
      params: {
        ...filters
      }
    })
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
