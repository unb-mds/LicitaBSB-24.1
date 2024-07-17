export function formatBiddingObject(licitacao){
  const dados = {
    tipo: licitacao.tipo,
    numero_licitacao: licitacao.numero_licitacao,
    nomeOrgao: licitacao.nomeOrgao,
    objeto: licitacao.objeto,
    numero_processo: licitacao.numero_processo,
    assinante: licitacao.assinante,
    data_abertura: licitacao.data_abertura,
    cargo: licitacao.cargo,
    edicao: licitacao.edicao,
    secao_pagina: licitacao.secao_pagina,
    link: licitacao.link,
    valor_Licitacao: licitacao.Valor_Licitacao
  };

  return dados
}
