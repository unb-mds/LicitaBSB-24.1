import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import unb from '../../../assets/unb.png';
import search from '../../../assets/Search.svg';
import styles from './style.module.css';
import { useSearchBidding } from '../../hooks/useSearchBidding';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(''); //Estado com o input de texto

  const { searchBidding, biddings, setSearchBiddgins, setWords } =
    useSearchBidding();

  function handdleChange(e) {
    setInput(e.target.value);
  }

  function buscarLicitacao() {
    setWords(input);
    const listaBuscada = searchBidding(biddings, input);
    if (listaBuscada.length === 0) {
      navigate(`*`);
    } else {
      setSearchBiddgins(listaBuscada);
      navigate(`/resultadobusca/${input}`);
    }
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerUnb}>
        <img src={unb} alt="Logo da Universidade de brasília" />
      </div>
      <div className={styles.subHeaderWrapper}>
        <div className={styles.subHeader}>
          <a href="/">
            <img src={logo} alt="Logo do Projeto 'licita bsb'" />
          </a>
          <ul className={styles.headerLinksWrapper}>
            <li className={styles.headerListItem}>
              <a href="/licitacoes" className={styles.headerLink}>
                Licitações
              </a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/SobreLicitacao" className={styles.headerLink}>
                Sobre as Licitações
              </a>
            </li>
            <li className={styles.headerListItem}>
              <a href="" className={styles.headerLink}>
                Sobre o Projeto
              </a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/sobrenos" className={styles.headerLink}>
                Sobre Nós
              </a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/dashboard" className={styles.headerLink}>
                Dashboard
              </a>
            </li>
          </ul>
          <div>
            <div className={styles.campoPesquisa}>
              <button
                className={styles.botaoPesquisa}
                onClick={() => buscarLicitacao()}
              >
                <img src={search} alt="" />
              </button>
              <input
                onChange={(e) => handdleChange(e)}
                type="text"
                placeholder="Pesquise aqui"
                className={styles.textInput}
                value={input}
              />
            </div>
          </div>
        </div>
        <ul className={styles.headerLinksWrapperResponsive}>
          <li className={styles.headerListItem}>
            <a href="/licitacoes" className={styles.headerLink}>
              Licitações
            </a>
          </li>
          <li className={styles.headerListItem}>
            <a href="/SobreLicitacao" className={styles.headerLink}>
              Sobre as Licitações
            </a>
          </li>
          <li className={styles.headerListItem}>
            <a href="" className={styles.headerLink}>
              Sobre o Projeto
            </a>
          </li>
          <li className={styles.headerListItem}>
            <a href="/sobrenos" className={styles.headerLink}>
              Sobre Nós
            </a>
          </li>
          <li className={styles.headerListItem}>
            <a href="/dashboard" className={styles.headerLink}>
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
