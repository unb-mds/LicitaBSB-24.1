import React, { useEffect, useState } from 'react';

import licitacoes from '../../../../../backend/data_analysis/output.json';
import CardLicitacoes from '../../../components/card-licitacoes';

import styles from './style.module.css'
import { Link } from 'react-router-dom';

export default function UltimasLicitacoes (){

  const [listaLicitacoes, setListaLicitacoes] = useState([]);

  useEffect(() => {
    setListaLicitacoes(licitacoes[15].length > 3 ? licitacoes[15].slice(0, 3) : licitacoes[15]);
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.licitacoesHeader}>
          <h2>Últimas Licitações</h2>
          <Link to="/licitacoes" className={styles.linkLicitacoes}>Ver todas as licitações</Link>
        </div>
        <div className={styles.licitacoesWrapper}>
          {listaLicitacoes.map(item => {
            return (
              <CardLicitacoes data={item}/>
            );
          })}
        </div>
      </div>
    </>
  )
}
