import React, { useEffect, useState } from 'react';

import {
  getLicitacoes,
  pagLicitacoes,
} from '../../../services/licitacoes.service';
// import licitacoes from '../../../../../backend/data_collection/database/data_copy.json';
import CardLicitacoes from '../../../components/card-licitacoes';

import styles from './style.module.css';
import { Link } from 'react-router-dom';

export default function UltimasLicitacoes() {
  const licitacoes = getLicitacoes();
  const [listaLicitacoes, setListaLicitacoes] = useState([]);

  useEffect(() => {
    // setListaLicitacoes(licitacoes[15].length > 3 ? licitacoes[15].slice(0, 3) : licitacoes[15]);
    setListaLicitacoes(pagLicitacoes(licitacoes, 3, 0));
  }, []);

  // console.log(listaLicitacoes)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.licitacoesHeader}>
          <h2>Últimas Licitações</h2>
          <Link to="/licitacoes" className={styles.linkLicitacoes}>
            Ver todas as licitações
          </Link>
        </div>
        <div className={styles.licitacoesWrapper}>
          {listaLicitacoes.map((item) => {
            // console.log(item)
            return <CardLicitacoes data={item} />;
          })}
        </div>
      </div>
    </>
  );
}
