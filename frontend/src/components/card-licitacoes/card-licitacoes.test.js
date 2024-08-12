import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CardLicitacoes from '.';
import formatCurrency from '../../utils/format-currency';
import { setStatusBidding } from '../../utils/status-bidding';

// Mocka o useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockData = {
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
    'tipo': "Aviso",
    'titulo': "AVISO DE LICITAÇÃO",
    'valores': ['110,00'],
}

describe("O Card da licitação deve", () => {
    test('Renderizar o nome do órgão da licitação', () => {
        render(<CardLicitacoes data={mockData} />)
        const titulo = screen.getByText(mockData.nome_orgao)
        expect(titulo.innerHTML).toBe('Poder Judiciário/Supremo Tribunal Federal')
    })
    test('Renderizar a data da licitação', () => {
        render(<CardLicitacoes data={mockData} />)
        const data = screen.getByTestId('data-testid')
        expect(data).toBeInTheDocument()
    })
    test('Renderizar o valor da licitação', () => {
        render(<CardLicitacoes data={mockData} />)
        const valor = screen.getByTestId('valor-testid')
        expect(valor).toBeInTheDocument()
    })
    test('deve navegar para a página de detalhes ao clicar no botão "Ver Mais"', async () => {
        const navigate = require('react-router-dom').useNavigate;
        const mockNavigate = jest.fn();
        navigate.mockImplementation(() => mockNavigate);

        render(
            <MemoryRouter>
                <CardLicitacoes data={mockData} />
            </MemoryRouter>
        );

        // Encontrar o link pelo testId
        const linkElement = screen.getByTestId('link-testid');

        // Simular o clique no link
        act(() => {
            userEvent.click(linkElement);
        })

        await waitFor(() => {
            // Verificar se a navegação foi chamada com o caminho correto
            expect(mockNavigate).toHaveBeenCalledWith(`/licitacoes/${mockData.id}`);

            // Verificar se a navegação foi chamada novamente para recarregar a página
            expect(mockNavigate).toHaveBeenCalledTimes(2);
        })
    });
    test('Renderizar a modalidade da licitação', () => {
        render(<CardLicitacoes data={mockData} />)
        const valor = screen.getByTestId('modalidade-testid')
        expect(valor).toHaveTextContent(`Modalidade: ${mockData.tipo}`)
    })
    test('Renderizar uma string vazia caso a licitação não tenha modalidade', () => {
        const data = {
            id: 1,
            nome_orgao: 'Orgao Exemplo',
            tipo: '',
            data: '01/01/2024',
            valores: [1000000],
            objeto: 'Descrição do objeto da licitação',
        };
        render(<CardLicitacoes data={data} />)
        const valor = screen.getByTestId('modalidade-testid')
        expect(valor).toBeInTheDocument()
    })
    test('Renderizar o status da licitação', () => {
        render(<CardLicitacoes data={mockData} />)
        const valor = screen.getByTestId('status-testid')
        expect(valor).toHaveTextContent("Status: Aberta")
    })
})