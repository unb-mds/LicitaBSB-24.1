import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setStatusBidding } from './status-bidding';

describe('A função setStatusBidding deve retornar ', () => {
    test('Encerrada, quando tiver data de resultado de compra na licitação', () => {
        const data = {
            "Data_Resultado_Compra": "10/10/1999"
        }
        const status = setStatusBidding(data)
        expect(status).toBe('Encerrada')
    })
    test('Aberta, quando não tiver data de resultado de compra na licitação', () => {
        const data = {}
        const status = setStatusBidding(data)
        expect(status).toBe('Aberta')
    })
})