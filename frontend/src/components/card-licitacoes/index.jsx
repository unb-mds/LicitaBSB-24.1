import React from 'react'
import { setStatusBidding } from '../../utils/status-bidding'

import styles from './style.module.css'
import formatCurrency from '../../utils/format-currency'

export default function CardLicitacoes({ data }) {

  const statusBidding = setStatusBidding(data)
  
  const dataLicitacao = data['data_abertura']
  const tipoLicitacao = data['tipo']
  const objetoLicitacao = data['objeto']
  
  if('nomeOrgao' in data){
    var tituloLicitacao = data['nomeOrgao']
    var valorLicitacao = data['valores_licitacao']
    console.log(data)
  } else {
    var tituloLicitacao = data['Nome_UG']
    var valorLicitacao = data['Valor_Licitacao']
  }

  // {`R$ ${formatCurrency(data["Valor_Licitacao"])}`}

  return (
    <div className={styles.cardWrapper}>
      <h5 className={styles.cardTitle}>{tituloLicitacao}</h5>
      
      <div>
        <div className={styles.cardStatus}>
          <div className={styles.statusContainer}>
            <p className={styles.cardStatusText}>Status: {statusBidding}</p>
          </div>
          <p className={styles.cardStatusText}>Modalidade: {tipoLicitacao}</p>
        </div>

        <div className={styles.licitacoesInfo}>
            <p>Dara de publicação: {dataLicitacao}</p>
            <p className={styles.statusContainer}>Valor da licitação: R$ 0.000.000,00</p>
        </div>

        <div className={styles.cardSection}>
        </div>

        <div>
          <p className={styles.cardDescricao}>{objetoLicitacao}</p>
        </div>
        
      </div>
      <div>
        <a href="" className={styles.cardButton}>Ver Mais</a>
      </div>
    </div>
  )
}

