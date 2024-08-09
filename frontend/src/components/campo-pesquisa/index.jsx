import React from 'react';
import styles from './style.module.css';
import search from '../../../assets/SearchDark.svg';
import CustomButton from '../layout/custom-button';

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
          value={filterParams.search}
          onChange={(e) => setFilterParams({
            ...filterParams,
            search: e.target.value,
          })}
        />
      </div>
      <CustomButton title="Buscar" onPress={handleSearch}/>
    </div>
  );
}
