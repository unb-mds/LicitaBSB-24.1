import { useContext } from 'react';
import { BiddingContext } from '../context/BiddingContext';

export const useSearchBidding = () => {
  const {
    biddings,
    setBiddgins,
    searchBiddings,
    setSearchBiddgins,
    words,
    setWords,
  } = useContext(BiddingContext);

  function searchBidding(licitacoes, input) {
    //Retorna lista com os resultados buscados
    const busca = licitacoes.filter((licitacao) => {
      const tipo = 'Nome_UG' in licitacao ? 'aviso' : 'extrato';
      const titulo =
        tipo === 'aviso' ? licitacao['Nome_UG'] : licitacao['nomeOrgao'];
      return licitacao['objeto'].includes(input) || titulo.includes(input);
    });
    return busca;
  }

  return {
    biddings,
    setBiddgins,
    searchBiddings,
    setSearchBiddgins,
    words,
    setWords,
    searchBidding,
  };
};
