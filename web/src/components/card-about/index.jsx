import React from "react";

import style from './style.module.css'

export default function CardAbout() {
    return(
        <div>
            <div className={style.cardAboutContext}>
                <h2 className={style.cardAboutText}>O que é uma licitação?</h2>

                <p>É o processo por meio do qual a Administração Pública contrata obras, serviços, compras e alienações. Em outras palavras, licitação é a forma como a Administração Pública pode comprar e vender. Já o contrato é o ajuste entre órgãos ou entidades da Administração Pública e particulares, em que há um acordo para a formação de vínculo e a estipulação de obrigações recíprocas.</p>
                
                <h2 className={style.cardAboutText}>Da legislação</h2>
                
                <p>Atualmente existem duas leis gerais de licitações em vigor: a Lei nº 8.666/1993, com vigência até dezembro de 2023 (MP nº 1.167/2023) , e a Lei nº 14.133/2021 (Nova de Lei de Licitações e Contratos). 
                Durante o período de transição – até dezembro de 2023 – o gestor público pode optar por utilizar o regramento de qualquer uma das duas leis, mas não pode combiná-las em um mesmo certame, ou seja, ao realizar um processo licitatório, deverá aplicar ou uma norma ou a outra. Após esse período, tanto a Lei nº 8.666/93 quanto as demais legislações ligadas à licitação (do Pregão - Lei nº 10.520/02 - e do RDC - Art. 1º ao 47-A da ’) serão revogadas.</p>
                
                <img src="..\..\public\images\card-about-bidding\licitacao01.jpg" alt="Imagem sobre licitação"/>
                
                <p>As informações descritas aqui foram retiradas do portal da transparência, disponível para acesso e leitura.</p>
                <a target="_blank" href="https://portaldatransparencia.gov.br/entenda-a-gestao-publica/licitacoes-e-contratacoes">aqui</a>
            </div>
        </div>
    )
}