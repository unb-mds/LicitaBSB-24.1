import React from 'react'

import styles from './style.module.css'

export default function CardLicitacoes({ data }) {

  const formatValue = parseFloat(data["Valor_Licitacao"]).toFixed(2)

  return (
    <div className={styles.cardWrapper}>
      <h5 className={styles.cardTitle}>{data["Nome_UG"]}</h5>
      <div className={styles.licitacoesInfo}>
        <div className={styles.cardSection}>
          <p>{data["data_abertura"]}</p>
          <p>{`R$${formatValue}`}</p>
        </div>
        <div>
          <p className={styles.cardDescricao}>{data["Objeto"]}</p>
        </div>
      </div>
      <div>
        <a href="" className={styles.cardButton}>Ver Mais</a>
      </div>
    </div>
  )
}

