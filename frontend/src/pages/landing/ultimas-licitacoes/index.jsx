import React, { useEffect, useState } from 'react';

import { getLicitacoes } from '../../../services/licitacoes.service';
import CardLicitacoes from '../../../components/card-licitacoes';

import styles from './style.module.css';
import { Link } from 'react-router-dom';

export default function UltimasLicitacoes() {
  const [listaLicitacoes, setListaLicitacoes] = useState([]);

  const loadData = async () => {
    const data = await getLicitacoes();
    setListaLicitacoes(data.results.slice(0, 3));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div data-testid="main-testid" className={styles.wrapper}>
        <div className={styles.licitacoesHeader}>
          <h2>Últimas Licitações</h2>
          <Link
            data-testid="link-testid"
            to="/licitacoes"
            className={styles.linkLicitacoes}
          >
            Ver todas as licitações
          </Link>
        </div>
        <ul className={styles.licitacoesWrapper}>
          {listaLicitacoes.map((item) => {
            return (
              <li data-testid="listitem-testid">
                <CardLicitacoes key={item.id} data={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
