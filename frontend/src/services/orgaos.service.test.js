import '@testing-library/jest-dom';
import { api } from '../config/api';
import { getOrgaos } from './orgaos.service';

jest.mock('../config/api')

const mockFIlter = {
    page: 1,
    tipo: "aviso",
    status: '',
    search: '',
    value: '',
}

const mockOrgao = [{
    id: 1,
    nome: 'orgão teste'
}]

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

describe('Requisições para API: Orgãos', () => {
    test('deve retornar a lista de órgãos a partir dos filtros', async () => {
        api.get.mockImplementation(() => mockRequisicao(mockOrgao))
        const orgao = await getOrgaos(mockFIlter)
        expect(orgao).toEqual(mockOrgao)
        expect(api.get).toHaveBeenCalledWith("/orgaos", { "params": { "page": 1, "search": "", "status": "", "tipo": "aviso", "value": "" } })
    })
    test('deve retornar a lista de órgãos vazia a partir dos filtros quando a requisição falhar', async () => {
        api.get.mockImplementation(() => mockRequisicaoErro(mockOrgao))
        const orgao = await getOrgaos(mockFIlter)
        expect(orgao).toEqual([])
        expect(api.get).toHaveBeenCalledWith("/orgaos", { "params": { "page": 1, "search": "", "status": "", "tipo": "aviso", "value": "" } })
    })
})