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
  const [searchParams] = useSearchParams();

  const filterTipo = searchParams.get('tipo') ? searchParams.get('tipo') : '';
  const filterInput = searchParams.get('search')
    ? searchParams.get('search')
    : '';
  const filterValue = searchParams.get('value')
    ? searchParams.get('value')
    : '';

  const [filterParams, setFilterParams] = useState({
    page: 1,
    tipo: filterTipo,
    status: '',
    search: filterInput,
    value: filterValue,
  });

  const [listaLicitacoes, setListaLicitacoes] = useState([]);
  const [resultCount, setResultCount] = useState(0);

  async function loadData(filter) {
    const data = await getLicitacoes(filter);
    setResultCount(data.count);
    setListaLicitacoes(data.results);
  }

  const handlePageChange = (_, value) => {
    setFilterParams((prevParams) => ({ ...prevParams, page: value }));
    loadData(filterParams);
  };

  const buildFilterQuery = (params) => {
    return Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${key}=${params[key]}`)
      .join('&');
  };

  function handleSearch() {
    const querySearch = `/licitacoes?${buildFilterQuery(filterParams)}`;
    navigate(querySearch);
    navigate(0);
  }

  useEffect(() => {
    loadData(filterParams);
  }, []);

  return (
    <main className={styles.mainSection}>
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
          resultCount={resultCount}
          filterInput={filterInput}
        />
        <div className={styles.cardsWrapper}>
          {listaLicitacoes.map((item, idx) => {
            return <CardLicitacoes key={`${idx} ${item.id}`} data={item} />;
          })}
          <Pagination count={Math.ceil(resultCount / 10)} onChange={handlePageChange} />
        </div>
      </div>
    </main>
  );
}
