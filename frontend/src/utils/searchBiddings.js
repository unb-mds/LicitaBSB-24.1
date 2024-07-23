export function searchBidding(licitacoes, input) {
    const busca = licitacoes.filter(
        (licitacao) => {
            const tipo = 'Nome_UG' in licitacao ? 'aviso' : 'extrato';
            const titulo =
                tipo === 'aviso'
                    ? licitacao['Nome_UG']
                    : licitacao['nomeOrgao'];
            return licitacao['objeto'].includes(input) || titulo.includes(input);
        });
    return busca
}