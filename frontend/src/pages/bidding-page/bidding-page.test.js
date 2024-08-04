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

})