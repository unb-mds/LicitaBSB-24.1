import React, { useState, useEffect, useContext } from 'react';
import CardLicitacoes from '../../components/card-licitacoes';
import search from '../../../assets/SearchDark.svg';
import styles from './style.module.css';
import {
  pagLicitacoes,
  getLicitacoes,
} from '../../services/licitacoes.service';
import { useParams } from 'react-router-dom';
import { BiddingContext } from '../../context/BiddingContext';
import Filter from '../bidding-list/filter';
import { searchBidding } from '../../utils/searchBiddings';

export default function BiddingSearchList() {
  const { searchBiddings, setSearchBiddgins } = useContext(BiddingContext);
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

  useEffect(() => {
    setListaLicitacoes(pagLicitacoes(licitacoes, lengthBids, 0));
  }, [lengthBids, searchBiddings]);

  return (
    <>
      <section className={styles.mainSection}>
        <div className={styles.campoPesquisaWrapper}>
          <div className={styles.campoPesquisa}>
            <img src={search} className={styles.searchIcon} alt="" />
            <input
              type="text"
              placeholder="Busque por uma licitação"
              className={styles.inputStyle}
            />
          </div>
          <div>
            <div>
              <a href="" className={styles.botaoBuscar}>
                Buscar
              </a>
            </div>
          </div>
        </div>

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
