import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CampoPesquisa from '.';

const filterParams = { tipo: '', data: '' };
const setFilterParams = jest.fn();
const handleSearch = jest.fn();

describe('O componente campo-pesquisa deve', () => {
    test('Renderizar o ícone de busca', () => {
        render(<CampoPesquisa filterParams={filterParams} setFilterParams={setFilterParams} handleSearch={handleSearch} />)
        const icon = screen.getByRole('presentation')
        expect(icon).toBeInTheDocument()
    })
    test('Renderizar o input de texto digitado pelo usuário', async () => {
        render(<CampoPesquisa filterParams={filterParams} setFilterParams={setFilterParams} handleSearch={handleSearch} />)
        const input = screen.getByRole('textbox')

        act(() => {
            userEvent.type(input, 'Poder Judiciário/Supremo Tribunal Federal')
        })

        await waitFor(() => {
            expect(input).toHaveValue("Poder Judiciário/Supremo Tribunal Federal")
        })
    })
    test('Renderizar uma função ao clicar no botão Buscar', async () => {
        render(<CampoPesquisa filterParams={filterParams} setFilterParams={setFilterParams} handleSearch={handleSearch} />)
        // Encontrar o botão pelo texto
        const buscarButton = screen.getByText('Buscar');

        // Simular o clique no botão
        act(() => {
            userEvent.click(buscarButton);
        })

        // Verificar se a função handleSearch foi chamada
        await waitFor(() => {
            expect(handleSearch).toHaveBeenCalledTimes(1);
        })
    })
})