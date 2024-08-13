import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BiddingPage from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useLoadData from '../../hooks/useLoadData';

// Mock do hook customizado
jest.mock('../../hooks/useLoadData');

describe('BiddingPage Component', () => {
    const mockData = {
        titulo: 'Licitação Teste',
        nome_orgao: 'Órgão Teste',
        data: '01/01/2024',
        valores: ['R$ 100.000,00'],
        objeto: 'Objeto da licitação',
        link: 'http://example.com',
    };

    const mockMaisLicitacoes = [
        { id: 1, nome_orgao: 'Órgão A', tipo: 'Tipo A', data: '01/01/2024' },
        { id: 2, nome_orgao: 'Órgão B', tipo: 'Tipo B', data: '02/01/2024' },
    ];

    beforeEach(() => {
        useLoadData.mockReturnValue({
            licitData: mockData,
            maisLicitacoes: mockMaisLicitacoes,
        });
    });

    test('deve renderizar os dados da licitação corretamente', () => {
        render(
            <MemoryRouter>
                <BiddingPage />
            </MemoryRouter>
        );

        expect(screen.getByTestId('titulo-testid')).toHaveTextContent(mockData.titulo);
        expect(screen.getByText(mockData.nome_orgao)).toBeInTheDocument();
        expect(screen.getAllByTestId('data-testid')).toHaveLength(3);
        expect(screen.getByText(mockData.valores[0])).toBeInTheDocument();
        expect(screen.getByTestId('objeto-test-id')).toHaveTextContent(mockData.objeto);
    });

    test('deve renderizar as licitações mais recentes', () => {
        render(
            <MemoryRouter>
                <BiddingPage />
            </MemoryRouter>
        );

        const recentLicitacoes = screen.getByTestId('outras-licitacoes-testid');
        expect(recentLicitacoes).toBeInTheDocument();
        expect(screen.getByText('Órgão A')).toBeInTheDocument();
        expect(screen.getByText('Órgão B')).toBeInTheDocument();
    });

    test('deve renderizar links de compartilhamento de redes sociais', () => {
        render(
            <MemoryRouter>
                <BiddingPage />
            </MemoryRouter>
        );

        const socialLinks = screen.getAllByTestId('role-link-id');
        expect(socialLinks).toHaveLength(3); // Twitter, Facebook, Google
    });

    test('deve renderizar o link "Ver mais licitações..." corretamente', () => {
        render(
            <MemoryRouter>
                <BiddingPage />
            </MemoryRouter>
        );

        const link = screen.getByText('Ver mais licitações...');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/licitacoes');
    });

    test('deve renderizar o link da licitação corretamente', () => {
        render(
            <MemoryRouter>
                <BiddingPage />
            </MemoryRouter>
        );

        const linkElement = screen.getByText(mockData.link);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.closest('a')).toHaveAttribute('href', mockData.link);
    });

    test('não deve renderizar o valor da licitação se "valores" estiver vazio', () => {
        useLoadData.mockReturnValue({
            licitData: { ...mockData, valores: [] },
            maisLicitacoes: mockMaisLicitacoes,
        });

        render(
            <MemoryRouter>
                <BiddingPage />
            </MemoryRouter>
        );

        expect(screen.queryByText(mockData.valores[0])).not.toBeInTheDocument();
    });
});
