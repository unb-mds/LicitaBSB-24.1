import licitacoes from '../../../backend/data_collection/database/data_copy.json';
import { transformDate } from '../utils/transform-date.utils';

const licitacoesTipe1 = licitacoes.filter((licitacao) => {
  return !('Municipio' in licitacao);
});
// console.log(licitacoesTipe1)

const licitacoesTipe2 = licitacoes.filter((licitacao) => {
  return ('Municipio' in licitacao);
});
// console.log(licitacoesTipe2)

export function getLicitacoes() {
  let licit = licitacoesTipe2;
  // licitacoesTipe1.forEach((lista) => {
  //   licit = [...licit, ...lista];
  // })

  licit.sort((a, b) => {
    const dateA = Date.parse(transformDate(a["data_abertura"]))
    const dateB = Date.parse(transformDate(b["data_abertura"]))
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

export function pagLicitacoes(array, size, pos) {
  return array.length > size ? array.slice((size * pos), (size * (pos + 1))) : array
}
