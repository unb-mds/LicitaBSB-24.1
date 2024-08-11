import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import AboutBiddingDispatch from '.';

describe('Na página Sobre Dispensas de Licitações, deve ser renderizado ', () => {
    test('a lista de títulos do artigo', () => {
        render(<AboutBiddingDispatch />)
        const lista = screen.getAllByRole('heading')
        expect(lista).toHaveLength(11)
    })
    test('a lista de parágrafos do artigo', () => {
        render(<AboutBiddingDispatch />)
        const lista = screen.getAllByRole('paragraph')
        expect(lista).toHaveLength(10)
    })
})