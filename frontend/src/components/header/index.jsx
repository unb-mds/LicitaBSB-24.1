import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import unb from '../../../assets/unb.png';
import search from '../../../assets/Search.svg';
import menuBurger from '../../../assets/burger.svg';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import SidebarResponsive from '../sidebar-responsive';

const Header = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  function handdleChange(e) {
    setInput(e.target.value);
  }

  function buscarLicitacao() {
    const nomeDaRota = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\//g, '-');
    navigate(`/resultadobusca/${nomeDaRota}`);
  }

  return (
    <div className={styles.headerWrapper}>
      <SidebarResponsive showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <div className={styles.headerUnb}>
        <img src={unb} alt="Logo da Universidade de brasília" />
      </div>
      <div className={styles.subHeaderWrapper}>
        <div className={styles.subHeader}>
          <a href="/" className={styles.logo}>
            <img src={logo} alt="Logo do Projeto 'licita bsb'" />
          </a>
          <ul
            data-testid="listaResponsiva"
            className={styles.headerLinksWrapper}
          >
            <li className={styles.headerListItem}>
              <a href="/licitacoes" className={styles.headerLink}>
                Licitações
              </a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/artigos" className={styles.headerLink}>
                Conheça o Projeto
              </a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/sobrenos" className={styles.headerLink}>
                Sobre Nós
              </a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/graficos" className={styles.headerLink}>
                Gráficos
              </a>
            </li>
          </ul>
          <div>
            <div className={styles.responsiveCampoPesquisa}>
              <a href="/licitacoes" style={{display: 'flex', alignItems: 'center'}}>
                <img
                  src={search}
                />
              </a>
              <img
                src={menuBurger}
                onClick={() => setShowSidebar((prev) => !prev)}
              />
            </div>
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
            <a href="/artigos" className={styles.headerLink}>
              Conheça o Projeto
            </a>
          </li>
          <li className={styles.headerListItem}>
            <a href="/sobrenos" className={styles.headerLink}>
              Sobre Nós
            </a>
          </li>
          <li className={styles.headerListItem}>
            <a href="/graficos" className={styles.headerLink}>
              Gráficos
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
