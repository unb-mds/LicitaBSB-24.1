import React from "react";

import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { getLicitacoes } from "../../services/licitacoes.service";


export default function BiddingPage(){
    const parametros = useParams()
    const licitacoes = getLicitacoes()
    const licitacao = licitacoes.find(data => {
        return data["id"] === Number(parametros.id)
    })

    console.log(parametros)
    console.log(licitacao)

    return(
    <>
        <p>{licitacao["id"]}</p>
    </>
    )
}