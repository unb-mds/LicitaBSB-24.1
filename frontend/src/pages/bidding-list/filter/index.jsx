import React from 'react';
import styles from './style.module.css';
import { biddingTypes } from '../../../utils/bidding-types';

export default function Filter({
  setFilter,
}) {
  return (
    <section className={styles.filterSection}>
      <h2 className={styles.title}>Resultados obtidos de:</h2>
      <h3 className={styles.subtitle}>"Palavras-chave de busca"</h3>
      <span className={styles.description}>14 resultados obtidos</span>
      <h3 className={styles.sectionTitle}>Modalidade de compra</h3>
      <ul>
        {
          biddingTypes.map((type) => (
            <li key={type} className={styles.listItemStyle}>
              <input type='radio' name='licit-tipo' id={type}
                onClick={(e) => {
                  setFilter(e.target.id);
                }}
              />
              <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
            </li>
          ))
        }
      </ul>
      <h3 className={styles.sectionTitle}>Órgão</h3>
      <ul>
        <li className={styles.listItemStyle}>
          <input type='checkbox' name='org1' />
          <label htmlFor="org1">Órgão</label>
        </li>
        <li className={styles.listItemStyle}>
          <input type='checkbox' name='org1' />
          <label htmlFor="org1">Órgão</label>
        </li>
        <li className={styles.listItemStyle}>
          <input type='checkbox' name='org1' />
          <label htmlFor="org1">Órgão</label>
        </li>
      </ul>
      <h3 className={styles.sectionTitle}>Status</h3>
      <h3 className={styles.sectionTitle}>Preço</h3>
      <input type="range" />
      <h3 className={styles.sectionTitle}>Período</h3>
    </section>
  )
}
