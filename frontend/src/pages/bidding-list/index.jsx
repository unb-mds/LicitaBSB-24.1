import React, { useEffect, useState } from 'react'
import CardLicitacoes from '../../components/card-licitacoes';
import search from '../../../assets/SearchDark.svg';
import { getLicitacoes, getLicitacoesByType, pagLicitacoes } from '../../services/licitacoes.service';
import styles from './style.module.css';
import CampoPesquisa from '../../components/campo-pesquisa';
import Filter from './filter';
import filter from '../../../assets/filter.svg';
import { useSearchParams } from 'react-router-dom';


export default function BiddingList() {
  const [searchParams] = useSearchParams();
  const filterTipo = searchParams.get('tipo');

  const licitacoes = filterTipo ? getLicitacoesByType(filterTipo) : getLicitacoes();
  const [listaLicitacoes, setListaLicitacoes] = useState([]);
  const [lengthBids, setLengthBids] = useState(10);

  const loadMoreBids = () => {
    licitacoes.length - lengthBids < 10
      ? setLengthBids(
          (prevLength) => (prevLength += licitacoes.length - lengthBids),
        )
      : setLengthBids((prevLength) => (prevLength += 10));
  };

  const filterBidding = (tipo) => {
    setListaLicitacoes(getLicitacoesByType(tipo));
  }

  useEffect(() => {
    setListaLicitacoes(pagLicitacoes(licitacoes, lengthBids, 0));
  }, [lengthBids, licitacoes])
  return (
    <section className={styles.mainSection}>
      <CampoPesquisa />
      <div className={styles.licitacoesSection}>
        <Filter
          setFilter={filterBidding}
        />
        <div className={styles.cardsWrapper}>
          {listaLicitacoes.map((item, idx) => {
            return (
              <CardLicitacoes key={`${idx} ${item.id}`} data={item}/>
            );
          })}

          {lengthBids >= licitacoes.length ? <></> :
            <button className={styles.botaoCarregarMais} type='button' onClick={loadMoreBids}>Carregar Mais</button>
          }
        </div>
      </div>
    </section>
  )
}
