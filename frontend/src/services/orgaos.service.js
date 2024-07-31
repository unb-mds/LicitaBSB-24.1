import orgaos from "../../../backend/colecao_de_dados/database/orgaos.json";

export const getOrgaosNomes = () => {
  return orgaos.slice(1);
}
