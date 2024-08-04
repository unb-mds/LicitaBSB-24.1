import React, { useEffect, useState } from 'react';
import CardLicitacoes from '../../components/card-licitacoes';
import {
  getLicitacoes,
  getLicitacoesFilter,
  pagLicitacoes,
} from '../../services/licitacoes.service';
import styles from './style.module.css';
import CampoPesquisa from '../../components/campo-pesquisa';
import Filter from './filter';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BiddingList() {
  const navigate = useNavigate();

  const [filterParams, setFilterParams] = useState({
    tipo: '',
    input: '',
    value: 0,
  });

  const [searchParams] = useSearchParams();
  const filterTipo = searchParams.get('tipo');
  const filterInput = searchParams.get('input');
  const filterValue = searchParams.get('value');

  const licitacoes =
    filterTipo || filterInput || filterValue
      ? getLicitacoesFilter(filterTipo, filterInput, filterValue)
      : getLicitacoes();
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
  }, []);

  const handleSearch = () => {
    const querySearch = `/licitacoes?${filterParams.tipo && `tipo=${filterParams.tipo}`}&${filterParams.input && `input=${filterParams.input}`}&${filterParams.value && `value=${filterParams.value}`}`;
    navigate(querySearch);
  };

  return (
    <section className={styles.mainSection}>
      <CampoPesquisa
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        handleSearch={handleSearch}
      />
      <div className={styles.licitacoesSection}>
        <Filter
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          handleSearch={handleSearch}
        />
        <div className={styles.cardsWrapper}>
          {listaLicitacoes.map((item, idx) => {
            return <CardLicitacoes key={`${idx} ${item.id}`} data={item} />;
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
  );
}
