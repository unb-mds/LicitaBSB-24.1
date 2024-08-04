import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '.';

describe("Deve renderizar as seguintes informações presentes na página Sobre Nós: ", () => {
    test("Título da página", () => {
        render(<AboutUs />)
        const info = screen.getByText("Sobre nós")
        expect(info).toBeInTheDocument()
    })
    test("Descrição da equipe", () => {
        render(<AboutUs />)
        const info = screen.getByTestId("desc-testid")
        expect(info).toBeInTheDocument()
    })
    test("Foto de toda a equipe", () => {
        render(<AboutUs />)
        const info = screen.getByTestId("photo-testid")
        expect(info).toBeInTheDocument()
    })
    test("Subtítulo da página", () => {
        render(<AboutUs />)
        const info = screen.getByText("Agora, um pouco de cada um")
        expect(info).toBeInTheDocument()
    })
    test("Lista com os cards dos membros do projeto", () => {
        render(<AboutUs />)
        const lista = screen.getAllByRole('listitem')
        expect(lista).toHaveLength(7)
    })
})
