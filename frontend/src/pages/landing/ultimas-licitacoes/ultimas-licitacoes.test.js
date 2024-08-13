import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UltimasLicitacoes from '.';
import useLoadData from '../../../hooks/useLoadData';

// Mock do hook customizado
jest.mock('../../../hooks/useLoadData');

describe('UltimasLicitacoes', () => {
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

    test('renderizar o título do componente', () => {
        render(<MemoryRouter>
            <UltimasLicitacoes />
        </MemoryRouter>)
        const title = screen.getAllByRole('heading')
        expect(title[0].innerHTML).toBe("Últimas Licitações")
    })
    test('renderizar os links presentes no componente', () => {
        render(<MemoryRouter>
            <UltimasLicitacoes />
        </MemoryRouter>)
        const link = screen.getAllByTestId('link-testid')
        expect(link).toHaveLength(3)
    })
    test('deve a lista com as licitações mais recentes', () => {
        render(<MemoryRouter>
            <UltimasLicitacoes />
        </MemoryRouter>)
        const link = screen.getByRole('list')
        expect(link).toBeInTheDocument()
    });
    test('o snapshot com a lista de licitações', () => {
        render(<MemoryRouter>
            <UltimasLicitacoes />
        </MemoryRouter>)
        const link = screen.getByTestId('main-testid')
        expect(link).toMatchSnapshot()
    })
});