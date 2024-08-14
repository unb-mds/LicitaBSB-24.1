import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { biddingTypes } from '../../../utils/bidding-types';
import { Box, capitalize } from '@mui/material';
import { getOrgaos } from '../../../services/orgaos.service';
import CustomButton from '../../../components/layout/custom-button';
import CustomInputRadio from '../../../components/layout/custom-input-radio';
import CustomInputCheckbox from '../../../components/layout/custom-input-checkbox';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import seach from '../../../../assets/SearchDark.svg';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export default function Filter({
  filterParams,
  setFilterParams,
  handleSearch,
  resultCount = 0,
  filterInput,
}) {
  const navigate = useNavigate();

  const handleDateChange = (value) => {
    function formatNumber(number) {
      if (number < 10) {
        return `0${number}`;
      }
      return number;
    }

    setFilterParams({
      ...filterParams,
      data: `${formatNumber(value.$D)}-${formatNumber(value.$M + 1)}-${value.$y}`,
    });
  };

  const [searchParams] = useSearchParams();
  const filterOrgaos = searchParams.get('orgao')
    ? searchParams.get('orgao')
    : '';
  const [orgaosPage, setOrgaosPage] = useState(1);
  const [orgaosName, setOrgaosName] = useState('');
  const [selectedOrgaos, setSelectedOrgaos] = useState(filterOrgaos.split(','));
  const [orgaosDados, setOrgaosDados] = useState([]);

  const mostrarMais = () => {
    setOrgaosPage(orgaosPage + 1);
  };

  const handleOrgaoSearch = async () => {
    const orgaos = await getOrgaos({
      search: orgaosName,
      page: orgaosPage,
    });
    setOrgaosDados(orgaos.results);
  };

  const getOrgaosInCheckBox = (nomeOrgao) => {
    if (selectedOrgaos.includes(nomeOrgao)) {
      setSelectedOrgaos(() => {
        return selectedOrgaos.filter(
          (selectedName) => selectedName !== nomeOrgao,
        );
      });
    } else {
      setSelectedOrgaos([...selectedOrgaos, nomeOrgao]);
    }
  };

  const loadOrgaos = async () => {
    const orgaos = await getOrgaos({
      search: orgaosName,
      page: orgaosPage,
    });
    setOrgaosDados((curr) => [...curr, ...orgaos.results]);
  };

  useEffect(() => {
    console.log(filterParams.orgao.split(','));
    setFilterParams({
      ...filterParams,
      orgao: selectedOrgaos.join(','),
    });
  }, [selectedOrgaos]);

  useEffect(() => {
    loadOrgaos();
  }, [orgaosPage]);

  const handleLimparFiltros = async () => {
    navigate('/licitacoes');
    navigate(0);
  };

  return (
    <section className={styles.filterSection}>
      <h2 className={styles.title}>Resultados obtidos:</h2>
      <div>
        {filterInput && <h3 className={styles.subtitle}>"{filterInput}"</h3>}
        <span data-testid="resultados-test-id" className={styles.description}>
          {resultCount} resultados obtidos
        </span>
      </div>
      <div>
        <h3 className={styles.sectionTitle}>Tipo de Licitação</h3>
        <ul className={styles.filterOptionsContainer}>
          {biddingTypes.map((type) => (
            <li key={type} className={styles.listItemStyle}>
              <CustomInputRadio
                data-testid="tipo-licitacao-test-id"
                name="licit-tipo"
                label={capitalize(type)}
                onPress={() => {
                  setFilterParams({
                    ...filterParams,
                    tipo: type,
                  });
                }}
                checked={filterParams.tipo === type}
                id={type}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className={styles.sectionTitle}>Órgão</h3>
        <div className={styles.orgaosInputContainer}>
          <input
            type="text"
            value={orgaosName}
            onChange={(e) => {
              setOrgaosName(e.target.value);
              handleOrgaoSearch();
            }}
            className={styles.orgaosInput}
            placeholder="Pesquise o nome do órgão"
          />
          <img src={seach} />
        </div>
        <ul className={styles.filterOptionsContainer}>
          {orgaosDados.map((item) => {
            console.log();

            const valor = filterOrgaos.split(',').includes(item.nome);

            return (
              <li
                key={`${item.nome}${item.id}`}
                className={styles.listItemStyle}
              >
                <CustomInputCheckbox
                  checked={valor}
                  name={item.nome}
                  label={item.nome}
                  onPress={() => {
                    getOrgaosInCheckBox(item.nome);
                  }}
                  id={item.nome}
                />
              </li>
            );
          })}
          <li className={styles.mostrarMaisOrgaos}>
            <a onClick={mostrarMais}>Mostrar mais...</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className={styles.sectionTitle}>Período</h3>
        <div className={styles.calendariosWrapper}>
          <div width="20px">
            <Box
              sx={{
                width: '100%', // Ajusta a largura conforme necessário
                maxWidth: '100%', // Define um limite máximo de largura para o calendário
                aspectRatio: '1 / 1', // Mantém a proporção de aspecto
                '& .MuiPickersCalendar-root': {
                  height: '100%',
                  maxHeight: '100%', // Garante que o calendário preencha a altura do container
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
                    width: 'calc(100% / 7)', // Divide igualmente a largura entre os dias da semana
                    height: 'auto', // Ajusta a altura automaticamente
                    aspectRatio: '1 / 1', // Mantém os dias como quadrados
                  },
                }}
              />
            </Box>
          </div>
        </div>
      </div>
      <CustomButton
        data-testid="botao-limparFiltros-testId"
        onPress={handleLimparFiltros}
        title="limpar filtros"
        light
      />
      <CustomButton onPress={handleSearch} title="buscar" />
    </section>
  );
}
