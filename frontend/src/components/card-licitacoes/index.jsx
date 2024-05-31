import React from 'react'

import styles from './style.module.css'

export default function CardLicitacoes({titulo, data, preco, descricao}) {
  return (
    <div className={styles.cardWrapper}>
      <h6>{titulo}</h6>
      <div>
        <p>{data}</p>
        <p>{preco}</p>
      </div>
      <div>
        <p>{descricao}</p>
      </div>
      <div>
        <a href="">Ver Mais</a>
      </div>
    </div>
  )
}

