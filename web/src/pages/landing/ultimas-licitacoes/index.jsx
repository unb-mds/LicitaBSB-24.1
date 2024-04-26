import React, { useEffect, useState } from 'react';

import licitacoes from '../../../mocks/licitacoes';
import CardLicitacoes from '../../../components/card-licitacoes';

import styles from './style.module.css'

export default function UltimasLicitacoes (){

  const [listaLicitacoes, setListaLicitacoes] = useState([]);

  useEffect(() => {
    setListaLicitacoes(licitacoes.length > 3 ? licitacoes.slice(0, 3) : licitacoes);
  }, [])

  return (
    <>
      <div>
        <h2>Últimas Licitações</h2>
        <div className={styles.licitacoesWrapper}>
          {listaLicitacoes.map(item => {
            return (
              <CardLicitacoes {...item}/>
            );
          })}
        </div>
      </div>
    </>
  )
}
