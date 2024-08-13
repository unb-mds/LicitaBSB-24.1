import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '.';

describe('A página Sobre Nós deve', () => {
    test('renderizar todos os títulos da página"', () => {
        render(<AboutUs />)
        const titles = screen.getAllByRole('heading')
        expect(titles).toHaveLength(9)
    })
    test('renderizar os títulos "Sobre nós" e "Agora, um pouco de cada um" da página"', () => {
        render(<AboutUs />)
        const titles = screen.getAllByRole('heading')
        expect(titles[0].innerHTML).toBe('Sobre nós')
        expect(titles[1].innerHTML).toBe('Agora, um pouco de cada um')
    })
    test('renderizar os parágrafos da página da página"', () => {
        render(<AboutUs />)
        const ps = screen.getAllByRole('paragraph')
        expect(ps).toHaveLength(8)
    })
    test('renderizar todas as imagens da página"', () => {
        render(<AboutUs />)
        const imagem = screen.getAllByRole('img')
        expect(imagem).toHaveLength(8)
    })
})