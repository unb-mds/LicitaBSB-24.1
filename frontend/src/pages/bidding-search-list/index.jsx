import React, { useState, useEffect, useContext } from 'react';
import CardLicitacoes from '../../components/card-licitacoes';
import styles from './style.module.css';
import { pagLicitacoes } from '../../services/licitacoes.service';
import { BiddingContext } from '../../context/BiddingContext';
import Filter from '../bidding-list/filter';
import CampoPesquisa from '../../components/campo-pesquisa';

export default function BiddingSearchList() {
  const { searchBiddings, words } = useContext(BiddingContext);
  const licitacoes = searchBiddings;

  const [listaLicitacoes, setListaLicitacoes] = useState([]);
  const [lengthBids, setLengthBids] = useState(10);

  const loadMoreBids = () => {
    licitacoes.length - lengthBids < 10
      ? setLengthBids(
          (prevLength) => (prevLength += licitacoes.length - lengthBids),
        )
      : setLengthBids((prevLength) => (prevLength += 10));
  };

  const quantidadeDeLicitacoes = licitacoes.length;

  useEffect(() => {
    setListaLicitacoes(pagLicitacoes(licitacoes, lengthBids, 0));
  }, [lengthBids, searchBiddings]);

  return (
    <>
      <section className={styles.mainSection}>
        <h1>Resultados obtidos de:</h1>
        <h2>{words}</h2>
        <p>{quantidadeDeLicitacoes} resultados encontrados</p>

        <CampoPesquisa />

        <div className={styles.licitacoesSection}>
          <Filter />
          <div className={styles.cardsWrapper}>
            {listaLicitacoes.map((item) => {
              return <CardLicitacoes key={item['id']} data={item} />;
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
