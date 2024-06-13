import React from 'react'

import styles from './style.module.css'

export default function CardLicitacoes({ data }) {

  return (
    <div className={styles.cardWrapper}>
      <h5 className={styles.cardTitle}>{data["Modalidade Compra"]}</h5>
      <div>
        <div className={styles.cardSection}>
          <p>{data["Data Abertura"]}</p>
          <p>{data["Valor Licita��o"]}</p>
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

