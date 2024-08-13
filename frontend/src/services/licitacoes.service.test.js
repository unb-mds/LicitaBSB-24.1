import '@testing-library/jest-dom';
import { api } from '../config/api';
// const MockAdapter = require('axios-mock-adapter')
import { getLicitacoes, getLicitacaoById } from './licitacoes.service';

// var axiosMock = new MockAdapter(axios)

jest.mock('../config/api')

const mockData = [{
    'assinante': "RENATO DUTRA COELHO",
    'cargo': "Pregoeiro",
    'data': "09/08/2024",
    'edicao': "153",
    'id': 35564,
    'idorgao': 242,
    'link': "http://www.in.gov.br/web/dou/-/aviso-de-licitacao-577280474",
    'nome_orgao': "Poder Judiciário/Supremo Tribunal Federal",
    'numero_licitacao': "Pregão Eletrônico Nº 90045/2024 - UASG 40001",
    'numero_processo': "010304/2023",
    'objeto': "Nº Processo: 010304/2023. Objeto: Aquisição de mobiliário e divisórias.. Total de Itens Licitados: 54. Edital: 09/08/2024 das 09h00 às 17h59. Endereço: Praca Dos Tres Proderes - Ed. Sede - 2. Andar, Plano Piloto - BRASÍLIA/DF ou https://www.gov.br/compras/edital/40001-5-90045-2024. Entrega das Propostas: a partir de 09/08/2024 às 09h00 no site www.gov.br/compras. Abertura das Propostas: 22/08/2024 às 09h00 no site www.gov.br/compras. Informações Gerais: Edital disponível em: www.stf.jus.br e www.gov.br/compras/pt-br.",
    'secao_pagina': "Seção: 3\n | \nPágina: \n112",
    'tipo': "aviso",
    'titulo': "AVISO DE LICITAÇÃO",
    'valores': null,
}]

const mockId = 35564

const mockFIlter = {
    page: 1,
    tipo: "aviso",
    status: '',
    search: '',
    value: '',
}

const mockRequisicao = (retorno) => {
    // Caso de uma requisição com sucesso
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno,
            })
        }, 200)
    })
}

const mockRequisicaoErro = () => {
    // Caso de uma requisição com Erro
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("Requisições para a API> Licitações", () => {
    test('deve retornar uma licitação a partir do ID', async () => {
        api.get.mockImplementation(() => mockRequisicao(mockData))
        const bidding = await getLicitacaoById(mockId)
        expect(bidding).toEqual(mockData)
        expect(api.get).toHaveBeenCalledWith(`/licitacoes/35564`)
    })
    test('deve retornar um objeto vazio quando a requisição falhar', async () => {
        api.get.mockImplementation(() => mockRequisicaoErro(mockData))
        const bidding = await getLicitacaoById(mockId)
        expect(bidding).toEqual({})
        expect(api.get).toHaveBeenCalledWith(`/licitacoes/35564`)
    })
    test('deve retornar uma lista de licitações a partir dos filtros', async () => {
        api.get.mockImplementation(() => mockRequisicao(mockData))
        const bidding = await getLicitacoes(mockFIlter)
        expect(bidding).toEqual(mockData)
        expect(api.get).toHaveBeenCalledWith('/licitacoes', {
            "params": {
                "page": 1, "search": "", "status": "",
                "tipo": "aviso", "value": ""
            }
        })
    })
    test('deve retornar uma lista vaiza a partir dos filtros quando a requisição falhar', async () => {
        api.get.mockImplementation(() => mockRequisicaoErro(mockData))
        const bidding = await getLicitacoes(mockFIlter)
        expect(bidding).toEqual([])
        expect(api.get).toHaveBeenCalledWith('/licitacoes', {
            "params": {
                "page": 1, "search": "", "status": "",
                "tipo": "aviso", "value": ""
            }
        })
    })
})




// describe('getLicitacoes', () => {
//     test('deve retornar dados quando a requisição for bem-sucedida', async () => {
//         axios.get.mockImplementation(() => mockRequisicao(mockData));

//         const result = await getLicitacoes(mockFIlter)

//         expect(result).toEqual(mockData)
//         expect(axios.get).toHaveBeenCalledWith('/licitacoes.service')
//     })
// })