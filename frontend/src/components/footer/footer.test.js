import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './'

describe("Deve renderizar os links para as rotas: ", () => {
    test('Licitações', () => {
        render(<Footer />)
        const linkRoute = screen.getByText('Licitações')
        expect(linkRoute).toBeInTheDocument()
    })
    test('SobreLicitacao', () => {
        render(<Footer />)
        const linkRoute = screen.getByText('Sobre as Licitações')
        expect(linkRoute).toBeInTheDocument()
    })
    test('sobrenos', () => {
        render(<Footer />)
        const linkRoute = screen.getByText('Sobre a Equipe')
        expect(linkRoute).toBeInTheDocument()
    })
    test('Dashboard', () => {
        render(<Footer />)
        const linkRoute = screen.getByText('Dashboard')
        expect(linkRoute).toBeInTheDocument()
    })
})

test("Deve renderizar a lista de links presentes no componente", () => {
    render(<Footer />)
    const listaDeLinks = screen.getAllByRole('listitem')
    expect(listaDeLinks).toHaveLength(4)
})

test("Deve renderizar o snapshot da lista de links presentes no componente", () => {
    render(<Footer />)
    const listaDeLinks = screen.getAllByRole('listitem')
    expect(listaDeLinks).toMatchSnapshot()
})