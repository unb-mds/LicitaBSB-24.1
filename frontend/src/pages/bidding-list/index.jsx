import React, { useEffect, useState } from 'react'
import CardLicitacoes from '../../components/card-licitacoes';
import search from '../../../assets/SearchDark.svg';
import styles from './style.module.css'
import { getLicitacoes, pagLicitacoes } from '../../services/licitacoes.service';
import Filter from './filter';

import filter from '../../../assets/filter.svg';

export default function BiddingList() {

  const licitacoes = getLicitacoes();
  const [listaLicitacoes, setListaLicitacoes] = useState([]);
  const [lengthBids, setLengthBids] = useState(10)


  const loadMoreBids = () => {
    (licitacoes.length - lengthBids < 10) ? setLengthBids(prevLength => prevLength += licitacoes.length - lengthBids) : setLengthBids(prevLength => prevLength += 10)
  }

  useEffect(() => {
    setListaLicitacoes(pagLicitacoes(licitacoes, lengthBids, 0));
  }, [lengthBids])
  return (
    <>
      {/* <Header /> */}
      <section className={styles.mainSection}>
        <div className={styles.campoPesquisaWrapper} >
          <div className={styles.campoPesquisa}>
            <img src={search} className={styles.searchIcon} />
            <input type="text" placeholder='Busque por uma licitação' className={styles.inputStyle} />
          </div>
          <div>
            <div>
              <a href="" className={styles.botaoBuscar}>Buscar</a>
            </div>
            <img src={filter} className={styles.filterButton}/>
          </div>
        </div>


        <div className={styles.licitacoesSection}>
          <Filter />
          <div className={styles.cardsWrapper}>
            {listaLicitacoes.map(item => {
              return (
                <CardLicitacoes key={item["numero_processo"]} data={item}/>
              );
            })}

            {lengthBids >= licitacoes.length ? <></> :
              <button className={styles.botaoCarregarMais} type='button' onClick={loadMoreBids}>Carregar Mais</button>
            }
          </div>
        </div>
      </section>
    </>
  )
}
