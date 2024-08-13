import '@testing-library/jest-dom';

import { renderHook, waitFor } from '@testing-library/react';
import useGetImage from './useGetImage';

jest.mock('../../assets/members/member1.jpg', () => 'mocked-image-path-1', { virtual: true });
jest.mock('../../assets/members/member2.jpg', () => 'mocked-image-path-2', { virtual: true });

describe('useGetImage', () => {
    test('deve carregar a imagem corretamente quando o ID é válido', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useGetImage('member1'));

        // Espera a próxima atualização do hook
        await waitFor(() => {
            expect(result.current).toBe('mocked-image-path-1');
        });

    });

    test('deve retornar uma string vazia e logar um erro no console quando a imagem não é encontrada', async () => {
        console.error = jest.fn(); // Mock do console.error

        const { result, waitForNextUpdate } = renderHook(() => useGetImage('invalid-id'));

        // Espera a próxima atualização do hook
        await waitFor(() => {
            expect(result.current).toBe('');
        })

    });

    test('deve atualizar a imagem quando o ID mudar', async () => {
        const { result, rerender, waitForNextUpdate } = renderHook(
            ({ id }) => useGetImage(id),
            {
                initialProps: { id: 'member1' },
            }
        );

        // Espera a primeira atualização
        await waitFor(() => {
            expect(result.current).toBe('mocked-image-path-1');
        })

        // Altera o ID e renderiza novamente
        rerender({ id: 'member2' });

        // Espera a próxima atualização
        await waitFor(() => {
            expect(result.current).toBe('mocked-image-path-2');
        })
    });
});
