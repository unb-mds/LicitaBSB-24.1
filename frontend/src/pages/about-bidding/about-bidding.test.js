import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutBidding from '.';

describe("Na página 'Sobre licitações', deve ser renderizado ", () => {
    test('a lista de parágrafos do artigo', () => {
        render(<AboutBidding />)
        const lista = screen.getAllByRole('paragraph')
        expect(lista).toHaveLength(2)
    })
    test('a lista de títulos do artigo', () => {
        render(<AboutBidding />)
        const lista = screen.getAllByRole('heading')
        expect(lista).toHaveLength(2)
    })
    test('o snapshot com o conteúdo do artigo', () => {
        render(<AboutBidding />)
        const lista = screen.getByTestId('main-container-text')
        expect(lista).toMatchSnapshot()
    })
})