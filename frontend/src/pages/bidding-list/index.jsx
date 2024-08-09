import React, { useEffect, useState, useCallback, useMemo } from 'react';
import CardLicitacoes from '../../components/card-licitacoes';
import { getLicitacoes } from '../../services/licitacoes.service';
import styles from './style.module.css';
import CampoPesquisa from '../../components/campo-pesquisa';
import Filter from './filter';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';

export default function BiddingList() {
  const navigate = useNavigate();

  const [filterParams, setFilterParams] = useState({
    page: 1,
    tipo: '',
    status: '',
    search: '',
    value: '',
  });


  const [listaLicitacoes, setListaLicitacoes] = useState([]);
  const [lengthBids, setLengthBids] = useState(10);

  async function loadData(filter) {
    const data = await getLicitacoes(filter);
    setLengthBids(Math.round(data.count / 10));
    setListaLicitacoes(data.results);
  }

  const handlePageChange = useCallback((_, value) => {
    setFilterParams(prevParams => ({ ...prevParams, page: value }));
  }, []);

  const buildFilterQuery = (params) => {
    return Object.keys(params)
      .filter(key => params[key])
      .map(key => `${key}=${params[key]}`)
      .join('&');
  };

  function handleSearch(){
    const querySearch = `/licitacoes?${buildFilterQuery(filterParams)}`;
    navigate(querySearch);
    navigate(0);
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filterTipo = searchParams.get('tipo');
    const filterInput = searchParams.get('search');
    const filterValue = searchParams.get('value');
    loadData({
      page: 1,
      tipo: filterTipo ? filterTipo : '',
      search: filterInput ? filterInput : '',
      value: filterValue ? filterValue : '',
    });
  }, [])

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
            return (
              <CardLicitacoes key={`${idx} ${item.id}`} data={item}/>
            );
          })}
          <Pagination count={lengthBids} onChange={handlePageChange} />
        </div>
      </div>
    </section>
  );
}
