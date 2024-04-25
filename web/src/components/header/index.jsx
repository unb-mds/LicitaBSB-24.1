import React from 'react'
import logo from '../../../assets/logo.png'
import unb from '../../../assets/unb.png'
import styles from './style.module.css'
import search from '../../../assets/Search.svg'

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerUnb}>
        <img src={unb} alt="Logo da Universidade de brasília" />
      </div>
      <div className={styles.subHeader}>
        <img src={logo} alt="Logo do Projeto 'licita bsb'" />
        <ul className={styles.headerLinksWrapper}>
          <li className={styles.headerListItem}>
            <a href="" className={styles.headerLink}>Licitações</a>
          </li>
          <li className={styles.headerListItem}>
            <a href="" className={styles.headerLink}>Sobre as Licitações</a>
          </li>
          <li className={styles.headerListItem}>
            <a href="" className={styles.headerLink}>Sobre o Projeto</a>
          </li>
          <li className={styles.headerListItem}>
            <a href="" className={styles.headerLink}>Sobre Nós</a>
          </li>
        </ul>
        <div>
          <div className={styles.campoPesquisa}>
            <img src={search} style={{color: 'white'}} alt="" />
            <input type="text" placeholder='Pesquise aqui' className={styles.textInput}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
