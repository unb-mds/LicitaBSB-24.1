import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutBot from '.';

describe('Na página Sobre o Bot, deve ser renderizado ', () => {
    test('a lista de títulos do artigo', async () => {
        render(<AboutBot />)
        const lista = await screen.getAllByRole('heading')
        expect(lista).toHaveLength(6)
    })
    test('a lista de parágrafos do artigo', async () => {
        render(<AboutBot />)
        const lista = await screen.getAllByRole('paragraph')
        expect(lista).toHaveLength(5)
    })
    test('o snapshot com o conteúdo do artigo', () => {
        render(<AboutBot />)
        const lista = screen.getByTestId('main-container-text')
        expect(lista).toMatchSnapshot()
    })
})