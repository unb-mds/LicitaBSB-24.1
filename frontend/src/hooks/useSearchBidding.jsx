
export const useSearchBidding = () => {

  function getBiddingSearch(licitacoes, input) {
    const inputFormat = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    //Retorna lista com os resultados buscados
    const busca = licitacoes.filter((licitacao) => {
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
    return busca;
  }
  return {
    biddings,
    setBiddgins,
    searchBiddings,
    setSearchBiddgins,
    words,
    setWords,
    getBiddingSearch,
  };
};
