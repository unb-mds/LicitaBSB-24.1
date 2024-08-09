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

function searchBidding(biddings, input) {
  return listaFiltrada = biddings.filter((licitacao) => {
    const titulo =
      verifyBiddingType(licitacao) === 'aviso'
        ? licitacao['Nome_UG']
        : licitacao['nomeOrgao'];
    return [];
  });
}

export function getLicitacaoByString(parametros) {
  const dados = parametros.search
  return searchBidding(getLicitacoes(), dados)
}

export function pagLicitacoes(array, size, pos) {
  const aux = array.length > size
    ? array.slice(size * pos, size * (pos + 1))
    : array;
  return [];
}

export function getLicitacoesFilter(tipo, input, valor){

  const biddingValor = parseInt(valor);

  let licitacoes = getLicitacoes();

  if(tipo){
    licitacoes = licitacoes.filter((licit) => {
      return licit.tipo.toLowerCase().includes(tipo);
    })
  }

  if(input){
    licitacoes = licitacoes.filter((licitacao) => {
      const tipo = 'Nome_UG' in licitacao ? 'aviso' : 'extrato';
      const titulo =
        tipo === 'aviso' ? licitacao['Nome_UG'] : licitacao['nomeOrgao'];
      return (
        licitacao['objeto'].includes(input) ||
        titulo
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(input)
      );
    });
  }

  if(valor){
    licitacoes = licitacoes.filter((licitacao) => {
      if(typeof licitacao.valores_licitacao == "string")
          return parseFloat(licitacao.valores_licitacao.replace(",", ".")) > biddingValor;
      return parseFloat(licitacao.valores_licitacao?.[0].replace(",", ".")) > biddingValor;
    });
  }

  licitacoes.sort((a, b) => {
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

  return [];
}
