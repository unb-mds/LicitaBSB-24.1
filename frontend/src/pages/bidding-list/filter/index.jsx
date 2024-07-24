import React, { useState } from 'react';
import styles from './style.module.css';
import { biddingTypes } from '../../../utils/bidding-types';
import { Slider } from '@mui/material';

export default function Filter({
  filterParams,
  setFilterParams,
  handleSearch
}) {
  const [value, setValue] = useState(0);

  const marks = [
    {
      value: 0,
      label: 'R$ 0',
    },
    {
      value: 1000000,
      label: 'R$ 1.000.000,00',
    },
  ];

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
                onClick={() => {
                  setFilterParams({
                    ...filterParams,
                    tipo: type
                  })
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
      <ul>
        <li className={styles.listItemStyle}>
          <input type='radio' name='status' id='aberto' />
          <label htmlFor="aberto">Aberto</label>
        </li>
        <li className={styles.listItemStyle}>
          <input type='radio' name='status' id='fechado' />
          <label htmlFor="fechado">Fechado</label>
        </li>
      </ul>
      <h3 className={styles.sectionTitle}>Preço</h3>
      <div className={styles.inputRangeWrapper}>
        <Slider
          size="small"
          aria-label="Small"
          valueLabelDisplay="auto"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          max={1000000}
          step={10}
          marks={marks}
        />
      </div>
      <h3 className={styles.sectionTitle}>Período</h3>
      <button
        onClick={handleSearch}
      >
        Buscar
      </button>
    </section>
  );
}
