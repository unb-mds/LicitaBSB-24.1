import React from "react";
import Header from "../../components/header";
import CardAbout from "../../components/card-about";
import sobreLicitacoes from "../../mocks/sobreLicitacoes";

import style from './style.module.css'

export default function AboutBidding() {

    const propsCardAbout = sobreLicitacoes[0]

    return(
        <div className={style.aboutBidding}>
            <CardAbout 
                primeiroTitulo={propsCardAbout.primeiroTitulo}
                segundoTitulo={propsCardAbout.segundoTitulo}
                primeiroP={propsCardAbout.primeiroP}
                segundoP={propsCardAbout.segundoP}
                urlDaFonte={propsCardAbout.urlDaFonte}
                imagem={propsCardAbout.imagem}/>
        </div>
    )

}