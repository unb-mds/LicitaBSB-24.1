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

    const tituloLicitacao = ("nomeOrgao" in licitacao) ? licitacao["nomeOrgao"] : licitacao["Nome_UG"]
    const objetoLicitacao = licitacao["objeto"]
    const dataAberturaLicitacao = licitacao["data_abertura"]
    const modalidadeLicitacao = licitacao["tipo"]
    const linkLicitacao = ("link" in licitacao) ? licitacao["tipo"] : ""
    const valorLicitacao = ("Valor_Licitacao" in licitacao) ? licitacao["Valor_Licitacao"] : "R$ 00.000.00,00"



    return(
    <div>
        <div>
            <div>
                <h3>{tituloLicitacao}</h3>
                <h5>{modalidadeLicitacao}</h5>
            </div>
            <div>
                {/* LINKS PARA COMPARTILHAMENTO */}
            </div>
        </div>
        <div>
            <p>{dataAberturaLicitacao}</p>
            <p>{valorLicitacao}</p>
        </div>
        
        <div></div>

        <p>{objetoLicitacao}</p>
    </div>
    )
}