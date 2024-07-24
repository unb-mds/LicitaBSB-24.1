import styles from './style.module.css';
import search from '../../../assets/SearchDark.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSearchBidding } from '../../hooks/useSearchBidding';

export default function CampoPesquisa() {
  const navigate = useNavigate();
  const [input, setInput] = useState(''); //Estado com o input de texto

  const { searchBidding, biddings, setSearchBiddgins, setWords } =
    useSearchBidding();

  function handdleChange(e) {
    setInput(e.target.value);
  }

  function buscarLicitacao() {
    const nomeDaRota = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\//g, '-');
    setWords(nomeDaRota);
    navigate(`/resultadobusca/${nomeDaRota}`);
    // const listaBuscada = searchBidding(biddings, nomeDaRota);
    // if (listaBuscada.length === 0) {
    //   navigate(`*`);
    // } else {
    //   setSearchBiddgins(listaBuscada);
    //   navigate(`/resultadobusca/${nomeDaRota}`);
    // }
  }
  return (
    <div className={styles.campoPesquisaWrapper}>
      <div className={styles.campoPesquisa}>
        <img src={search} className={styles.searchIcon} alt="" />
        <input
          type="text"
          placeholder="Busque por uma licitação"
          className={styles.inputStyle}
          onChange={(e) => handdleChange(e)}
        />
      </div>
      <div>
        <div>
          <button
            href=""
            onClick={() => buscarLicitacao()}
            className={styles.botaoBuscar}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
