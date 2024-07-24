import React from 'react';
import styles from './style.module.css';
import search from '../../../assets/SearchDark.svg';

export default function CampoPesquisa({
  filterParams,
  setFilterParams,
  handleSearch
}) {

  return (
    <div className={styles.campoPesquisaWrapper}>
      <div className={styles.campoPesquisa}>
        <img src={search} className={styles.searchIcon} alt="" />
        <input
          type="text"
          placeholder="Busque por uma licitação"
          className={styles.inputStyle}
          value={filterParams.input}
          onChange={(e) => setFilterParams({
            ...filterParams,
            input: e.target.value,
          })}
        />
      </div>
      <div>
        <div>
          <button
            onClick={handleSearch}
            className={styles.botaoBuscar}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
