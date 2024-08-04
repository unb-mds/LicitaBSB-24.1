import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import CardAbout from ".";

const artigoTeste = {
    primeiroTitulo: "Título teste",
    segundoTitulo: "Subtítulo teste",
    primeiroP: "conteudoTeste1",
    segundoP: "conteudoTeste2",
    urlDaFonte: "linkTeste",
    imagem: "urlTeste",
}

describe("Deve renderizar as seguintes informações do artigo: ", () => {
    test("Título do artigo", () => {
        render(<CardAbout primeiroTitulo={artigoTeste.primeiroTitulo}
            segundoTitulo={artigoTeste.segundoTitulo}
            primeiroP={artigoTeste.primeiroP}
            segundoP={artigoTeste.segundoP}
            urlDaFonte={artigoTeste.urlDaFonte}
            imagem={artigoTeste.imagem} />)
        const info = screen.getByText("Título teste")
        expect(info).toBeInTheDocument(artigoTeste.primeiroTitulo)
    })
    test("Subtítulo do artigo", () => {
        render(<CardAbout primeiroTitulo={artigoTeste.primeiroTitulo}
            segundoTitulo={artigoTeste.segundoTitulo}
            primeiroP={artigoTeste.primeiroP}
            segundoP={artigoTeste.segundoP}
            urlDaFonte={artigoTeste.urlDaFonte}
            imagem={artigoTeste.imagem} />)
        const info = screen.getByText("Subtítulo teste")
        expect(info).toBeInTheDocument(artigoTeste.segundoTitulo)
    })
    test("Primeiro parágrafo do artigo", () => {
        render(<CardAbout primeiroTitulo={artigoTeste.primeiroTitulo}
            segundoTitulo={artigoTeste.segundoTitulo}
            primeiroP={artigoTeste.primeiroP}
            segundoP={artigoTeste.segundoP}
            urlDaFonte={artigoTeste.urlDaFonte}
            imagem={artigoTeste.imagem} />)
        const info = screen.getByText("conteudoTeste1")
        expect(info).toBeInTheDocument(artigoTeste.primeiroP)
    })
    test("Segundo parágrafo do artigo", () => {
        render(<CardAbout primeiroTitulo={artigoTeste.primeiroTitulo}
            segundoTitulo={artigoTeste.segundoTitulo}
            primeiroP={artigoTeste.primeiroP}
            segundoP={artigoTeste.segundoP}
            urlDaFonte={artigoTeste.urlDaFonte}
            imagem={artigoTeste.imagem} />)
        const info = screen.getByText("conteudoTeste2")
        expect(info).toBeInTheDocument(artigoTeste.segundoP)
    })
})