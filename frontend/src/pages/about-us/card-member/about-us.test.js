import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CardMember from '.'

describe("Deve renderizar a seguinte informação sobre o membro do projeto: ", () => {
    test("Nome", () => {
        const membro = [
            {
                id: '1',
                nome: 'Membro Teste',
                descricao:
                    'Descrição',
                github: 'https://github.com/MembroTeste',
            }
        ]
        render(<CardMember nome={membro.nome}
            descricao={membro.descricao}
            github={membro.github}
            id={membro.id} />)
        const info = screen.getByRole('heading')
        expect(info).toBeInTheDocument()
    })
    test("Descrição", () => {
        const membro = [
            {
                id: '1',
                nome: 'Membro Teste',
                descricao:
                    'Descrição',
                github: 'https://github.com/MembroTeste',
            }
        ]
        render(<CardMember nome={membro.nome}
            descricao={membro.descricao}
            github={membro.github}
            id={membro.id} />)
        const info = screen.getByTestId('campoDescrica')
        expect(info).toBeInTheDocument()
    })
    test("github", () => {
        const membro = [
            {
                id: '1',
                nome: 'Membro Teste',
                descricao:
                    'Descrição',
                github: 'https://github.com/MembroTeste',
            }
        ]
        render(<CardMember nome={membro.nome}
            descricao={membro.descricao}
            github={membro.github}
            id={membro.id} />)
        const info = screen.getByTestId('campoLink')
        expect(info).toBeInTheDocument()
    })

})