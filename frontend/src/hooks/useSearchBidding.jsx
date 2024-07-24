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
    const inputFormat = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    console.log(inputFormat);
    //Retorna lista com os resultados buscados
    const busca = licitacoes.filter((licitacao) => {
      const tipo = 'Nome_UG' in licitacao ? 'aviso' : 'extrato';
      const titulo =
        tipo === 'aviso' ? licitacao['Nome_UG'] : licitacao['nomeOrgao'];
      // console.log(titulo.toLowerCase().includes(input));
      return (
        licitacao['objeto'].includes(input) ||
        titulo
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(input)
      );
    });
    return busca;
  }

  function goToSearchRote(biddings, input) {
    const inputFormat = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    // const listaBuscada = searchBidding(biddings, inputFormat);
    if (biddings.length === 0) {
      navigate(`*`);
    } else {
      setSearchBiddgins(biddings);
      navigate(`/resultadobusca/${inputFormat}`);
    }
  }

  return {
    biddings,
    setBiddgins,
    searchBiddings,
    setSearchBiddgins,
    words,
    setWords,
    searchBidding,
    goToSearchRote,
  };
};
