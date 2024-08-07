import formatCurrency from "./format-currency";
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("Quando a função 'formatCurrency' receber ", () => {
    test('um valor em string, deve retornar uma string formatada com vírgula', () => {
        const valor = '100'
        const novoValor = formatCurrency(valor)
        expect(novoValor).toEqual('100,00')
    })
})