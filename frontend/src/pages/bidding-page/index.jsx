import React, { useState } from "react";

import styles from './style.module.css'
import { useParams } from "react-router-dom";
import { getLicitacaoById } from "../../services/licitacoes.service";
import { formatBiddingObject } from "../../utils/format-bidding-object";


export default function BiddingPage(){
    const parametros = useParams()
    const licitacao = getLicitacaoById(parametros.id)
    const dados = formatBiddingObject(licitacao);

    return(
    <div className={styles.biddingContainer}>
        <div className={styles.headingContainer}>
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{dados.nomeOrgao}</h3>
                <span className={styles.subtitle}>{dados.nomeOrgao}</span>
            </div>
            <div>
                {/* LINKS PARA COMPARTILHAMENTO */}
            </div>
        </div>
        <div>
            <p>{dados.data_abertura}</p>
            <p>{dados.valor_Licitacao}</p>
        </div>

        <div className={styles.horizontalLine}></div>

        <p>{dados.objeto}</p>
    </div>
    )
}
