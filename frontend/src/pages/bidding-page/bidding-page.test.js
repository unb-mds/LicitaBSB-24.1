import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BiddingPage from '.';
import { MemoryRouter } from 'react-router-dom';

// Mocka o useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe("A página da licitação deve", () => {
    test('Renderizar o título da licitação', () => {
        render(<MemoryRouter>
            <BiddingPage />
        </MemoryRouter>)
        const titulo = screen.getByTestId('titulo-testid')
        expect(titulo).toBeInTheDocument()
    })
    test('Renderizar a lista de links para compartilhamento', () => {
        render(<MemoryRouter>
            <BiddingPage />
        </MemoryRouter>)
        const links = screen.getAllByTestId('role-link-id')
        expect(links).toHaveLength(3)
    })
    test('Renderizar a data da licitação', () => {
        render(<MemoryRouter>
            <BiddingPage />
        </MemoryRouter>)
        const data = screen.getByTestId('data-testid')
        expect(data).toBeInTheDocument()
    })
    test('Renderizar o objeto da licitação', () => {
        render(<MemoryRouter>
            <BiddingPage />
        </MemoryRouter>)
        const objeto = screen.getByTestId('objeto-test-id')
        expect(objeto).toBeInTheDocument()
    })
    test('Renderizar a lista com outras licitações recentes', () => {
        render(<MemoryRouter>
            <BiddingPage />
        </MemoryRouter>)
        const lista = screen.getByTestId('outras-licitacoes-testid')
        expect(lista).toBeInTheDocument()
    })
})