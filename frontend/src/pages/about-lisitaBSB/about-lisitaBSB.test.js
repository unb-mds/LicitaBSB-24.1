import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutLisitasobrelisitaBSB from '.';

describe('A página "Sobre o Projeto" deve', () => {
    test('renderizar os títulos do artigo', () => {
        render(<AboutLisitasobrelisitaBSB />)
        const titles = screen.getAllByRole('heading')
        expect(titles).toHaveLength(6)
    })
    test('renderizar os parágrados do artigo', () => {
        render(<AboutLisitasobrelisitaBSB />)
        const titles = screen.getAllByRole('paragraph')
        expect(titles).toHaveLength(6)
    })
    test('renderizar a imagem do artigo', () => {
        render(<AboutLisitasobrelisitaBSB />)
        const titles = screen.getByRole('img')
        expect(titles).toBeInTheDocument()
    })
    test('o snapshot com o conteúdo do artigo', () => {
        render(<AboutLisitasobrelisitaBSB />)
        const lista = screen.getByTestId('main-container-text')
        expect(lista).toMatchSnapshot()
    })
})