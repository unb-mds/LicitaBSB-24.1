import { api } from '../config/api';

export async function getLicitacoes(filters) {
  try {
    const { data } = await api.get('/licitacoes', {
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

export async function getLicitacaoById(id) {
  try {
    const { data } = await api.get(`/licitacoes/${id}`);
    console.log(data)
    return data;

  } catch (error) {
    console.log(error);
    return {};
  }
}
