import React, { useState, useEffect } from 'react';
import CardLicitacoes from '../../components/card-licitacoes';
import styles from './style.module.css';
import { pagLicitacoes } from '../../services/licitacoes.service';
import Filter from '../bidding-list/filter';
import CampoPesquisa from '../../components/campo-pesquisa';
import { useSearchBidding } from '../../hooks/useSearchBidding';
import { useLocation } from 'react-router-dom';

export default function BiddingSearchList() {
  const { biddings, searchBiddings, getBiddingSearch } = useSearchBidding();
  const location = useLocation().pathname.split('/');
  const locationName = location[location.length - 1];
  const licitacoes = getBiddingSearch(
    biddings,
    decodeURIComponent(locationName).replace(/-/g, '/'),
  );

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
        <h1 className={styles.h1Section}>Resultados obtidos de:</h1>
        <h2 className={styles.h2Section}>
          "{decodeURIComponent(locationName).replace(/-/g, '/')}"
        </h2>
        <p className={styles.pSection}>
          {quantidadeDeLicitacoes} resultados encontrados
        </p>

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
