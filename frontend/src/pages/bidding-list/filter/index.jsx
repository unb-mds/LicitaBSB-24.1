import React from 'react';
import styles from './style.module.css';

export default function Filter() {
  return (
    <section className={styles.filterSection}>
      <h2 className={styles.title}>Resultados obtidos de:</h2>
      <h3 className={styles.subtitle}>"Palavras-chave de busca"</h3>
      <span className={styles.description}>14 resultados obtidos</span>
      <h3 className={styles.sectionTitle}>Modalidade de compra</h3>
      <ul>
        <li className={styles.listItemStyle}>
          <input type="checkbox" name="licit1" />
          <label htmlFor="licit1">Tipo de licitação</label>
        </li>
        <li className={styles.listItemStyle}>
          <input type="checkbox" name="licit1" />
          <label htmlFor="licit1">Tipo de licitação</label>
        </li>
        <li className={styles.listItemStyle}>
          <input type="checkbox" name="licit1" />
          <label htmlFor="licit1">Tipo de licitação</label>
        </li>
      </ul>
      <h3 className={styles.sectionTitle}>Órgão</h3>
      <ul>
        <li className={styles.listItemStyle}>
          <input type="checkbox" name="org1" />
          <label htmlFor="org1">Órgão</label>
        </li>
        <li className={styles.listItemStyle}>
          <input type="checkbox" name="org1" />
          <label htmlFor="org1">Órgão</label>
        </li>
        <li className={styles.listItemStyle}>
          <input type="checkbox" name="org1" />
          <label htmlFor="org1">Órgão</label>
        </li>
      </ul>
      <h3 className={styles.sectionTitle}>Status</h3>
      <h3 className={styles.sectionTitle}>Preço</h3>
      <input type="range" />
      <h3 className={styles.sectionTitle}>Período</h3>
    </section>
  );
}
