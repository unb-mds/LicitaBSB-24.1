import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './'

test('Deve renderizar o innerText do componente', () => {
    render(<Footer />)
    const licitacoes = screen.getByText('Licitações')
    expect(licitacoes).toBeInTheDocument()
    const sobreLicitacoes = screen.getByText('Sobre as Licitações')
    expect(sobreLicitacoes).toBeInTheDocument()
    const sobreEquipe = screen.getByText('Sobre a Equipe')
    expect(sobreEquipe).toBeInTheDocument()
    const dash = screen.getByText('Dashboard')
    expect(dash).toBeInTheDocument()
})