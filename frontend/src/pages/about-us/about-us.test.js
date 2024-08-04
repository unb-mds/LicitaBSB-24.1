import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '.';

describe("Deve renderizar as seguintes informações presentes na página Sobre Nós: ", () => {
    test("Título da página", () => {
        render(<AboutUs />)
        const info = screen.getByText("Sobre nós")
        expect(info).toBeInTheDocument()
    })
})