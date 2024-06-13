import licitacoes from '../../../backend/data_analysis/output.json';
import { transformDate } from '../utils/transform-date.utils';

export function getLicitacoes(){
  let licit = [];
  licitacoes.forEach((lista) => {
    licit = [...licit, ...lista];
  })

  licit.sort((a, b) => {
    const dateA = Date.parse(transformDate(a["Data Abertura"]))
    const dateB = Date.parse(transformDate(b["Data Abertura"]))
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }

    return 0;
  })

  return licit;
}

export function pagLicitacoes(array, size, pos){
  return array.length > size ? array.slice((size * pos), (size * (pos + 1))) : array
}
