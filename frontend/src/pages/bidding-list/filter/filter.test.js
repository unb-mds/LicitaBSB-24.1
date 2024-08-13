import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Filter from ".";
import { MemoryRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mocka o useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// jest.mock('../../../services/orgaos.service');

// Mock das props necessárias
const filterParams = { tipo: '', data: '' };
const setFilterParams = jest.fn();
const handleSearch = jest.fn();

describe('O componente Filter deve', () => {
    test('renderizar a quantidade de resultados obtidos', () => {
        render(
            <MemoryRouter>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Filter
                        filterParams={filterParams}
                        setFilterParams={setFilterParams}
                        handleSearch={handleSearch}
                        resultCount={5}
                        filterInput="teste"
                    />
                </LocalizationProvider>
            </MemoryRouter>
        );

        // Verificação se o componente foi renderizado corretamente
        const resultado = screen.getByTestId('resultados-test-id');
        expect(resultado).toBeInTheDocument();
        expect(resultado).toHaveTextContent('5 resultados obtidos');
    });
    test('renderizar os tipos de licitação e a lista de órgãos', () => {
        render(
            <MemoryRouter>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Filter
                        filterParams={filterParams}
                        setFilterParams={setFilterParams}
                        handleSearch={handleSearch}
                        resultCount={5}
                        filterInput="teste"
                    />
                </LocalizationProvider>
            </MemoryRouter>
        );

        const resultado = screen.getAllByRole('list');
        expect(resultado).toHaveLength(2);
    });
    test('renderizar o nome do órgão digitado pelo usuário', async () => {
        render(
            <MemoryRouter>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Filter
                        filterParams={filterParams}
                        setFilterParams={setFilterParams}
                        handleSearch={handleSearch}
                        resultCount={5}
                        filterInput="teste"
                    />
                </LocalizationProvider>
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText('Pesquise o nome do órgão');

        act(() => {
            userEvent.type(input, 'orgao teste')
        })

        // waitFor: É utilizado para esperar atualizações assíncronas, como efeitos do useEffect que podem depender de promessas ou outros side effects.
        await waitFor(() => {
            expect(input).toHaveValue('orgao teste');
        })
    });
})