import React, { useEffect, useState } from 'react';
import Filter from './filter';
import CardLicitacoes from '../../components/card-licitacoes';
import styles from './style.module.css';
import {
  getLicitacoes,
  pagLicitacoes,
} from '../../services/licitacoes.service';
import CampoPesquisa from '../../components/campo-pesquisa';

export default function BiddingList() {
  const licitacoes = getLicitacoes();
  const [listaLicitacoes, setListaLicitacoes] = useState([]);
  const [lengthBids, setLengthBids] = useState(10);

  const loadMoreBids = () => {
    licitacoes.length - lengthBids < 10
      ? setLengthBids(
          (prevLength) => (prevLength += licitacoes.length - lengthBids),
        )
      : setLengthBids((prevLength) => (prevLength += 10));
  };

  useEffect(() => {
    setListaLicitacoes(pagLicitacoes(licitacoes, lengthBids, 0));
  }, [lengthBids]);
  return (
    <>
      {/* <Header /> */}
      <section className={styles.mainSection}>
        <CampoPesquisa />
        <div className={styles.licitacoesSection}>
          <Filter />
          <div className={styles.cardsWrapper}>
            {listaLicitacoes.map((item) => {
              return (
                <CardLicitacoes key={item['numero_processo']} data={item} />
              );
            })}

            {lengthBids >= licitacoes.length ? (
              <></>
            ) : (
              <button
                className={styles.botaoCarregarMais}
                type="button"
                onClick={loadMoreBids}
              >
                Carregar Mais
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
