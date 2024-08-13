import React from 'react';
import { setStatusBidding } from '../../utils/status-bidding';
import styles from './style.module.css';
import formatCurrency from '../../utils/format-currency';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '@mui/material';

export default function CardLicitacoes({ data }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/licitacoes/${data.id}`);
    navigate(0);
  };

  return (
    <div className={styles.cardWrapper}>
      <h5 className={styles.cardTitle}>{data.nome_orgao}</h5>

      <div>
        <div className={styles.cardStatus}>
          <div className={styles.statusContainer}>
            <p data-testid="status-testid" className={styles.cardStatusText}>
              Status: {setStatusBidding(data)}
            </p>
          </div>
          <p data-testid="modalidade-testid" className={styles.cardStatusText}>
            Modalidade: {capitalize(data.tipo) ? capitalize(data.tipo) : ''}
          </p>
        </div>

        <div className={styles.licitacoesInfo}>
          <p data-testid="data-testid">Data de publicação: {data.data}</p>
          {data.valores && (
            <p data-testid="valor-testid" className={styles.statusContainer}>
              Valor da licitação: {formatCurrency(data.valores[0])}
            </p>
          )}
        </div>

        <div className={styles.cardSection}></div>

        <div>
          <p className={styles.cardDescricao}>{data.objeto}</p>
        </div>
      </div>
      <div>
        <a
          data-testid="link-testid"
          onClick={handleNavigate}
          className={styles.cardButton}
        >
          <p>Ver Mais</p>
        </a>
      </div>
    </div>
  );
}
