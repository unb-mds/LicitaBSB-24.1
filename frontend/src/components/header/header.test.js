import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Header from ".";
import { MemoryRouter } from "react-router-dom";
import { BiddingProvider } from "../../context/BiddingContext";
import userEvent from '@testing-library/user-event'

describe("Deve renderizar os links das rotas: ", () => {
    test("Licitações", () => {
        render(<MemoryRouter>
            <BiddingProvider>
                <Header />
            </BiddingProvider>
        </MemoryRouter>)
        const linkRoute = screen.getAllByText('Licitações')
        expect(linkRoute).toHaveLength(2)
    })
    test("Sobre as Licitações", () => {
        render(<MemoryRouter>
            <BiddingProvider>
                <Header />
            </BiddingProvider>
        </MemoryRouter>)
        const linkRoute = screen.getAllByText('Sobre as Licitações')
        expect(linkRoute).toHaveLength(2)
    })
    test("Sobre o Projeto", () => {
        render(<MemoryRouter>
            <BiddingProvider>
                <Header />
            </BiddingProvider>
        </MemoryRouter>)
        const linkRoute = screen.getAllByText('Sobre o Projeto')
        expect(linkRoute).toHaveLength(2)
    })
    test("Sobre Nós", () => {
        render(<MemoryRouter>
            <BiddingProvider>
                <Header />
            </BiddingProvider>
        </MemoryRouter>)
        const linkRoute = screen.getAllByText('Sobre Nós')
        expect(linkRoute).toHaveLength(2)
    })
    test("Dashboard", () => {
        render(<MemoryRouter>
            <BiddingProvider>
                <Header />
            </BiddingProvider>
        </MemoryRouter>)
        const linkRoute = screen.getAllByText('Dashboard')
        expect(linkRoute).toHaveLength(2)
    })
})

test("Deve renderizar a lista de links presentes no componente", () => {
    render(<MemoryRouter>
        <BiddingProvider>
            <Header />
        </BiddingProvider>
    </MemoryRouter>)
    const listaDeLinks = screen.getAllByRole('listitem')
    expect(listaDeLinks).toHaveLength(10)
})

test("Deve renderizar o snapshot da lista de links do componente", () => {
    render(<MemoryRouter>
        <BiddingProvider>
            <Header />
        </BiddingProvider>
    </MemoryRouter>)
    const listaDeLinks = screen.getAllByRole('listitem')
    expect(listaDeLinks).toMatchSnapshot()
})

describe("Deve renderizar um campo de input", () => {
    test("no documento", () => {
        render(<MemoryRouter>
            <BiddingProvider>
                <Header />
            </BiddingProvider>
        </MemoryRouter>)
        const campoTexto = screen.getByPlaceholderText("Pesquise aqui")
        expect(campoTexto).toBeInTheDocument()
    })

    test("de type: text", () => {
        render(<MemoryRouter>
            <BiddingProvider>
                <Header />
            </BiddingProvider>
        </MemoryRouter>)
        const campoTexto = screen.getByPlaceholderText("Pesquise aqui")
        expect(campoTexto).toBeInTheDocument('type', 'text')
    })

    test(" de type: text que pode ser preenchido", async () => {
        render(
            <MemoryRouter>
                <BiddingProvider>
                    <Header />
                </BiddingProvider>
            </MemoryRouter>
        );
        const campoTexto = screen.getByPlaceholderText("Pesquise aqui");
        await userEvent.type(campoTexto, 'inputtest');
        expect(campoTexto).toHaveValue('inputtest');
    });
})