import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import unb from '../../../assets/unb.png';
import search from '../../../assets/Search.svg';
import styles from './style.module.css';
import { BiddingContext } from '../../context/BiddingContext';

const Header = () => {
  const navigate = useNavigate();
  const { biddings, setSearchBiddgins } = useContext(BiddingContext);
  const [input, setInput] = useState('');

  function handdleChange(e) {
    const busca = e.target.value;
    setInput(busca);
  }

  function verifyBiddingType(data) {
    return 'Nome_UG' in data ? 'aviso' : 'extrato';
  }

  function searchBidding() {
    const listaFiltrada = biddings.filter((licitacao) => {
      const titulo =
        verifyBiddingType(licitacao) === 'aviso'
          ? licitacao['Nome_UG']
          : licitacao['nomeOrgao'];
      return licitacao['objeto'].includes(input) || titulo.includes(input);
    });
    setSearchBiddgins([...listaFiltrada]);
    navigate('/licitacoesBuscadas');
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
          {/* ------------------------------------------- */}
          <div>
            <div className={styles.campoPesquisa}>
              <button
                className={styles.botaoPesquisa}
                onClick={() => searchBidding()}
              >
                <img src={search} alt="" />
              </button>
              <input
                onChange={(e) => handdleChange(e)}
                type="text"
                placeholder="Pesquise aqui"
                className={styles.textInput}
              />
            </div>
          </div>
          {/* ------------------------------------------- */}
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
