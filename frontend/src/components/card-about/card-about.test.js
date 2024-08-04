import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import CardAbout from ".";

const artigoTeste = {
    primeiroTitulo: "Título teste",
    segundoTitulo: "Subtítulo teste",
    primeiroP: "conteudoTeste",
    segundoP: "conteudoTeste",
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
        const info = screen.getByText(artigoTeste.primeiroTitulo)
        expect(info).toBeInTheDocument("Título teste")
    })
    test("Subtítulo do artigo", () => {
        render(<CardAbout primeiroTitulo={artigoTeste.primeiroTitulo}
            segundoTitulo={artigoTeste.segundoTitulo}
            primeiroP={artigoTeste.primeiroP}
            segundoP={artigoTeste.segundoP}
            urlDaFonte={artigoTeste.urlDaFonte}
            imagem={artigoTeste.imagem} />)
        const info = screen.getByText(artigoTeste.segundoTitulo)
        expect(info).toBeInTheDocument("Subtítulo teste")
    })
})