import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardMember from '.';

const mockMember = {
    id: 1,
    nome: 'Maria Helena',
    descricao:
        'Me chamo Maria Helena Carvalho e sou Scrum Master e Desenvolvedora Front End do projeto. Atualmente, também trabalho com desenvolvimento Front End e Mobile, além de ser atuar como assessora de projetos em uma Empresa Júnior da Universidade de Brasília, o que me proporciona um vasto contato com o mundo do desenvolvimento de projetos de Software. Espero que, com esse projeto, as informações a respeito do dinheiro público se tornem mais transparentes e acessíveis, e que mais moradores de Brasília se mantenham conscientes e ativos politicamente.',
    github: 'https://github.com/MariaCHelena',
}
const mockMember2 = {
    id: 2,
    nome: 'Maria Helena',
    descricao:
        'Me chamo Maria Helena Carvalho e sou Scrum Master e Desenvolvedora Front End do projeto. Atualmente, também trabalho com desenvolvimento Front End e Mobile, além de ser atuar como assessora de projetos em uma Empresa Júnior da Universidade de Brasília, o que me proporciona um vasto contato com o mundo do desenvolvimento de projetos de Software. Espero que, com esse projeto, as informações a respeito do dinheiro público se tornem mais transparentes e acessíveis, e que mais moradores de Brasília se mantenham conscientes e ativos politicamente.',
    github: 'https://github.com/MariaCHelena',
}

describe('O componente CardMember deve', () => {
    test('renderizar o nome do membro', () => {
        render(<CardMember nome={mockMember.nome} descricao={mockMember.descricao} github={mockMember.github} id={mockMember.id} />)
        const nome = screen.getByText(mockMember.nome)
        expect(nome).toHaveTextContent("Maria Helena")
    })
    test('renderizar a descrição do membro', () => {
        render(<CardMember nome={mockMember2.nome} descricao={mockMember2.descricao} github={mockMember2.github} id={mockMember2.id} />)
        const nome = screen.getByText(mockMember.descricao)
        expect(nome).toHaveTextContent("Me chamo Maria Helena Carvalho e sou Scrum Master e Desenvolvedora Front End do projeto. Atualmente, também trabalho com desenvolvimento Front End e Mobile, além de ser atuar como assessora de projetos em uma Empresa Júnior da Universidade de Brasília, o que me proporciona um vasto contato com o mundo do desenvolvimento de projetos de Software. Espero que, com esse projeto, as informações a respeito do dinheiro público se tornem mais transparentes e acessíveis, e que mais moradores de Brasília se mantenham conscientes e ativos politicamente.")
    })
    test('renderizar o link para o github do membro', () => {
        render(<CardMember nome={mockMember.nome} descricao={mockMember.descricao} github={mockMember.github} id={mockMember.id} />)
        const nome = screen.getByRole('link')
        expect(nome).toBeInTheDocument()
    })
    test('renderizar o link para o github do membro', () => {
        render(<CardMember nome={mockMember.nome} descricao={mockMember.descricao} github={mockMember.github} id={mockMember.id} />)
        const nome = screen.getByRole('link')
        expect(nome).toBeInTheDocument()
    })
    test('renderizar a imagem do membro', () => {
        render(<CardMember nome={mockMember.nome} descricao={mockMember.descricao} github={mockMember.github} id={mockMember.id} />)
        const nome = screen.getByRole('img')
        expect(nome).toBeInTheDocument()
    })
})