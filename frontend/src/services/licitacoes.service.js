import { transformDate } from '../utils/transform-date.utils';
import { api } from '../config/api';

export async function getLicitacoes(filters) {
  try {
    const { data } = await api.get('/licitacoes', {
      params: {
        ...filters
      }
    });
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
