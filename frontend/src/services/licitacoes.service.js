import licitacoes1 from '../../../backend/data_collection_avisos/database/data.json';
import licitacoes2 from '../../../backend/data_collection_extrato/database/data.json';
import { transformDate } from '../utils/transform-date.utils';

const data_licitacoes = [...licitacoes1, ...licitacoes2]

export function getLicitacoes() {
  let licit = data_licitacoes;

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

export function getLicitacaoById(parametros){
  const dados = parametros.split('-')
  let licit;
  if(dados[1] == "aviso"){
    licit = licitacoes1.find(data => {
      return data.id === Number(dados[0])
    })
  } else {
    licit = licitacoes2.find(data => {
      return data.id === Number(dados[0])
    })
  }

  return licit;
}

export function pagLicitacoes(array, size, pos) {
  return array.length > size ? array.slice((size * pos), (size * (pos + 1))) : array
}
