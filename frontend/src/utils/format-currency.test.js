import formatCurrency from "./format-currency";
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("Quando a função 'formatCurrency' receber ", () => {
    test('um valor uma string de valor inteiro, deve retornar uma string formatada com vírgula', () => {
        const valor = '100'
        const novoValor = formatCurrency(valor)
        expect(novoValor).toEqual('100,00')
    })
    test('um valor uma string de valor float com ponto, deve retornar uma string formatada com vírgula', () => {
        const valor = '100.00'
        const novoValor = formatCurrency(valor)
        expect(novoValor).toEqual('100,00')
    })
})