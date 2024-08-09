import React, { useState, useReducer } from 'react';
import styles from './style.module.css';
import { biddingTypes } from '../../../utils/bidding-types';
import { Box, Slider } from '@mui/material';
import { getOrgaosNomes } from '../../../services/orgaos.service';
import CustomButton from '../../../components/layout/custom-button';
import CustomInputRadio from '../../../components/layout/custom-input-radio';
import CustomInputCheckbox from '../../../components/layout/custom-input-checkbox';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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

  const handleDateChange = (value) => {
    function formatNumber(number) {
      if(number < 10){
        return `0${number}`
      }
      return number
    }

    setFilterParams({
      ...filterParams,
      data: `${formatNumber(value.$D)}-${formatNumber(value.$M +1)}-${value.$y}`
    })
  }

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
      <div>
        <h3 className={styles.subtitle}>"Palavras-chave de busca"</h3>
        <span className={styles.description}>14 resultados obtidos</span>
      </div>
      <div>
        <h3 className={styles.sectionTitle}>Tipo de Licitação</h3>
        <ul className={styles.filterOptionsContainer}>
          {
            biddingTypes.map((type) => (
              <li key={type} className={styles.listItemStyle}>
                <CustomInputRadio
                  name="licit-tipo"
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  onPress={() => {
                    setFilterParams({
                      ...filterParams,
                      tipo: type
                    })
                  }}
                  id={type}
                />
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <h3 className={styles.sectionTitle}>Órgão</h3>
        <ul className={styles.filterOptionsContainer}>
          {
            orgaosValue.orgaos.map((type) => (
              <li key={type} className={styles.listItemStyle}>
                <CustomInputCheckbox
                  name={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  onPress={() => {}}
                  id={type}
                />
              </li>
            ))
          }
          <li className={styles.mostrarMaisOrgaos}>
            <a onClick={mostrarMais}>Mostrar mais...</a>
          </li>
        </ul>
      </div>
      {/*
      <div>
        <h3 className={styles.sectionTitle}>Status</h3>
        <ul className={styles.filterOptionsContainer}>
          <li className={styles.listItemStyle}>
            <CustomInputRadio
              name="status"
              label="Aberto"
              onPress={() => {
                setFilterParams({
                  ...filterParams,
                  status: 'aberto'
                })
              }}
              id='aberto'
            />
          </li>
          <li className={styles.listItemStyle}>
            <CustomInputRadio
              name="status"
              label="Fechado"
              onPress={() => {
                setFilterParams({
                  ...filterParams,
                  status: 'fechado'
                })
              }}
              id='fechado'
            />
          </li>
        </ul>
      </div>
      <div>
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
      </div>



      */}
      <div>
        <h3 className={styles.sectionTitle}>Período</h3>
        <div className={styles.calendariosWrapper}>
          <div width='20px'>
            <Box
              sx={{
                width: '100%',  // Ajusta a largura conforme necessário
                maxWidth: '100%',  // Define um limite máximo de largura para o calendário
                aspectRatio: '1 / 1',  // Mantém a proporção de aspecto
                '& .MuiPickersCalendar-root': {
                  height: '100%',
                  maxHeight: '100%'  // Garante que o calendário preencha a altura do container
                },
              }}
            >
              <DateCalendar
                onChange={handleDateChange}
                sx={{
                  width: '100%',
                  height: '100%',
                  '& .MuiPickersCalendar-week': {
                    display: 'flex',
                    justifyContent: 'space-between',
                  },
                  '& .MuiPickersDay-root': {
                    width: 'calc(100% / 7)',  // Divide igualmente a largura entre os dias da semana
                    height: 'auto',  // Ajusta a altura automaticamente
                    aspectRatio: '1 / 1',  // Mantém os dias como quadrados
                  },
                }}
              />
            </Box>
          </div>
        </div>
      </div>
      <CustomButton onPress={handleSearch} title="buscar"/>
    </section>
  );
}
