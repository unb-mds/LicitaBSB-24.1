import React from 'react';
import Header from '../../components/header';

import search from '../../../assets/SearchDark.svg';

import styles from './style.module.css';

export default function Landing(){
  return (
    <>
      <Header />
      <main>
        <div>
          <div className={styles.campoPesquisaWrapper} >
            <div className={styles.campoPesquisa}>
              <img src={search} className={styles.searchIcon} alt="" />
              <input type="text" placeholder='Busque por uma licitação' className={styles.inputStyle} />
            </div>
            <div>
              <div>
                <a href="" className={styles.botaoBuscar}>Buscar</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

