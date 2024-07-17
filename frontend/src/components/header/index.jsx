import React from 'react';
import logo from '../../../assets/logo.png';
import unb from '../../../assets/unb.png';
import search from '../../../assets/Search.svg';
import styles from './style.module.css';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerUnb}>
        <img src={unb} alt="Logo da Universidade de brasília" />
      </div>
      <div className={styles.subHeaderWrapper}>
        <div className={styles.subHeader}>
          <a href='/'>
            <img src={logo} alt="Logo do Projeto 'licita bsb'" />
          </a>
          <ul className={styles.headerLinksWrapper}>
            <li className={styles.headerListItem}>
              <a href="/licitacoes" className={styles.headerLink}>Licitações</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/SobreLicitacao" className={styles.headerLink}>Sobre as Licitações</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="" className={styles.headerLink}>Sobre o Projeto</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/sobrenos" className={styles.headerLink}>Sobre Nós</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/dashboard" className={styles.headerLink}>Dashboard</a>
            </li>
          </ul>
          <div>
            <div className={styles.campoPesquisa}>
              <img src={search} alt="" />
              <input type="text" placeholder='Pesquise aqui' className={styles.textInput}/>
            </div>
          </div>
        </div>
        <ul className={styles.headerLinksWrapperResponsive}>
            <li className={styles.headerListItem}>
              <a href="/licitacoes" className={styles.headerLink}>Licitações</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/SobreLicitacao" className={styles.headerLink}>Sobre as Licitações</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="" className={styles.headerLink}>Sobre o Projeto</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/sobrenos" className={styles.headerLink}>Sobre Nós</a>
            </li>
            <li className={styles.headerListItem}>
              <a href="/dashboard" className={styles.headerLink}>Dashboard</a>
            </li>
          </ul>
      </div>
    </div>
  )
}

export default Header
