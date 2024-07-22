import licitacoes1 from '../../../backend/colecao_de_dados/database/data_avisos.json';
import licitacoes2 from '../../../backend/colecao_de_dados/database/data_extratos.json';
import { transformDate } from '../utils/transform-date.utils';

const data_licitacoes = [...licitacoes1, ...licitacoes2];

export function getLicitacoes() {
  let licit = data_licitacoes;

  licit.sort((a, b) => {
    const dateA = Date.parse(transformDate(a['data_abertura']));
    const dateB = Date.parse(transformDate(b['data_abertura']));
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }

    return 0;
  });

  return licit;
}

export function getLicitacaoById(parametros) {
  const dados = parametros.split('-')
  let licit;
  if (dados[1] == "aviso") {
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

function searchBidding(biddings, input) {
  return listaFiltrada = biddings.filter((licitacao) => {
    const titulo =
      verifyBiddingType(licitacao) === 'aviso'
        ? licitacao['Nome_UG']
        : licitacao['nomeOrgao'];
    return licitacao['objeto'].includes(input) || titulo.includes(input);
  });
}

export function getLicitacaoByString(parametros) {
  const dados = parametros.search
  return searchBidding(getLicitacoes(), dados)
}

export function pagLicitacoes(array, size, pos) {
  return array.length > size
    ? array.slice(size * pos, size * (pos + 1))
    : array;
}
