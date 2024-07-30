import React, { useState, useReducer } from 'react';
import styles from './style.module.css';
import { biddingTypes } from '../../../utils/bidding-types';
import { Slider } from '@mui/material';
import { getOrgaosNomes } from '../../../services/orgaos.service';
import CustomButton from '../../../components/layout/custom-button';

function reducer(state, action) {
  if(action.type === 'increment_value') {
    return {
      index: state.index + 1,
      orgaos: getOrgaosNomes().slice(0, 10 + state.index*10),
    };
  }

  throw Error('Unknown action.');
}

export default function Filter({
  filterParams,
  setFilterParams,
  handleSearch
}) {
  const [orgaosValue, dispatch] = useReducer(reducer, { index: 1, orgaos: getOrgaosNomes().slice(0, 10) });

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

  const mostrarMais = () => {
    dispatch({ type: 'increment_value' });
  }

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
        {
          orgaosValue.orgaos.map((type) => (
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
        <li>
          <a onClick={mostrarMais}>Mostrar mais...</a>
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
          value={filterParams.value}
          onChange={(e) => {
            setFilterParams({
              ...filterParams,
              value: e.target.value
            })
          }}
          max={1000000}
          step={10}
          marks={marks}
        />
      </div>
      <h3 className={styles.sectionTitle}>Período</h3>
      <CustomButton onPress={handleSearch} title="buscar"/>
    </section>
  );
}
