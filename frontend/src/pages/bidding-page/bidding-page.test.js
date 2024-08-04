import { screen, render } from '@testing-library/react'
import BiddingPage from '.'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe("Deve renderizar as seguintes informações da licitação: ", () => {
    test("tipo da licitação e órgão.", () => {
        const mockId = '10101010'
        render(
            <MemoryRouter initialEntries={[`/licitacoes/${mockId}`]}>
                <Routes>
                    <Route path='/licitacoes/:id' element={<BiddingPage />} />
                </Routes>
            </MemoryRouter>
        )
        const info = screen.getAllByRole('heading')
        expect(info).toHaveLength(2)
    })
    test("lista de links para compartilhamento.", () => {
        const mockId = '10101010'
        render(
            <MemoryRouter initialEntries={[`/licitacoes/${mockId}`]}>
                <Routes>
                    <Route path='/licitacoes/:id' element={<BiddingPage />} />
                </Routes>
            </MemoryRouter>
        )
        const listaDeLinks = screen.getAllByTestId('role-link-id')
        expect(listaDeLinks).toHaveLength(3)
    })
    test("lista de imagens referentes aos links de compartilamento", () => {
        const mockId = '10101010'
        render(
            <MemoryRouter initialEntries={[`/licitacoes/${mockId}`]}>
                <Routes>
                    <Route path='/licitacoes/:id' element={<BiddingPage />} />
                </Routes>
            </MemoryRouter>
        )
        const listaDeLinks = screen.getAllByRole('img')
        expect(listaDeLinks).toHaveLength(4)
    })
})

test("Deve renderizar o snapshot da lista de links para compartilhamento", () => {
    const mockId = '10101010'
    render(
        <MemoryRouter initialEntries={[`/licitacoes/${mockId}`]}>
            <Routes>
                <Route path='/licitacoes/:id' element={<BiddingPage />} />
            </Routes>
        </MemoryRouter>
    )
    const listaDeLinks = screen.getAllByTestId('role-link-id')
    expect(listaDeLinks).toMatchSnapshot()
})