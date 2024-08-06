import React, { useEffect, useState } from 'react'
import CardLicitacoes from '../../components/card-licitacoes';
import { getLicitacoes, getLicitacoesFilter, pagLicitacoes } from '../../services/licitacoes.service';
import styles from './style.module.css';
import CampoPesquisa from '../../components/campo-pesquisa';
import Filter from './filter';
import { useNavigate, useSearchParams } from 'react-router-dom';


export default function BiddingList() {

  const navigate = useNavigate();

  const [filterParams, setFilterParams] = useState({
    tipo: '',
    input: '',
    value: 0
  })

  const [searchParams] = useSearchParams();
  const filterTipo = searchParams.get('tipo');
  const filterInput = searchParams.get('input');
  const filterValue = searchParams.get('value');

  const [listaLicitacoes, setListaLicitacoes] = useState([]);
  const [lengthBids, setLengthBids] = useState(10);

  async function loadData(params) {
    const data = await getLicitacoes();
    setListaLicitacoes(data);
  }

  useEffect(() => {
    loadData();
  }, [])

  const handleSearch = () => {
    const querySearch = `/licitacoes?${filterParams.tipo && `tipo=${filterParams.tipo}`}&${filterParams.input && `input=${filterParams.input}`}&${filterParams.value && `value=${filterParams.value}`}`;
    navigate(querySearch);
  }

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

          {lengthBids >= licitacoes.length ? <></> :
            <button className={styles.botaoCarregarMais} type='button' onClick={loadMoreBids}>Carregar Mais</button>
          }
        </div>
      </div>
    </section>
  )
}
