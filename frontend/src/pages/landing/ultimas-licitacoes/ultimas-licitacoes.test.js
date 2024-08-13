import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UltimasLicitacoes from '.';


describe('UltimasLicitacoes', () => {
    test('renderizar o título do componente', () => {
        render(<MemoryRouter>
            <UltimasLicitacoes />
        </MemoryRouter>)
        const title = screen.getByRole('heading')
        expect(title).toBeInTheDocument()
    })
    test('renderizar o link para página Ver mais licitações', () => {
        render(<MemoryRouter>
            <UltimasLicitacoes />
        </MemoryRouter>)
        const link = screen.getByTestId('link-testid')
        expect(link).toBeInTheDocument()
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