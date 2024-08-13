import React from 'react';
import { act, render, screen, waitFor, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getLicitacaoById, getLicitacoes } from '../services/licitacoes.service';
import useLoadData from './useLoadData';

// Mock dos serviços
jest.mock('../services/licitacoes.service');

describe('useLoadData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('deve carregar os dados da licitação por ID', async () => {
        const mockData = { id: 1, nome: 'Licitação 1' };
        const mockMaisLicitacoes = { results: [{ id: 2 }, { id: 3 }, { id: 4 }] };

        getLicitacaoById.mockResolvedValue(mockData);
        getLicitacoes.mockResolvedValue(mockMaisLicitacoes);

        const { result, waitForNextUpdate } = renderHook(() => useLoadData(1));

        await waitFor(() => {
            expect(result.current.licitData).toEqual(mockData);
            expect(result.current.maisLicitacoes).toEqual(mockMaisLicitacoes.results.slice(0, 3));
        })

    });

    test('deve carregar apenas as últimas licitações quando o ID não for fornecido', async () => {
        const mockMaisLicitacoes = { results: [{ id: 2 }, { id: 3 }, { id: 4 }] };

        getLicitacoes.mockResolvedValue(mockMaisLicitacoes);

        const { result, waitForNextUpdate } = renderHook(() => useLoadData());

        await waitFor(() => {
            expect(result.current.licitData).toEqual({});
            expect(result.current.maisLicitacoes).toEqual(mockMaisLicitacoes.results.slice(0, 3));
        })
    });
});