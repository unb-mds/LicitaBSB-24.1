import React from 'react';
import { setStatusBidding } from '../../utils/status-bidding';
import styles from './style.module.css';
import formatCurrency from '../../utils/format-currency';
import { Link } from 'react-router-dom';
import { capitalize } from '@mui/material';

export default function CardLicitacoes({ data }) {
  return (
    <div className={styles.cardWrapper}>
      <h5 className={styles.cardTitle}>{data.nome_orgao}</h5>

      <div>
        <div className={styles.cardStatus}>
          <div className={styles.statusContainer}>
            <p className={styles.cardStatusText}>
              Status: {capitalize(setStatusBidding(data))}
            </p>
          </div>
          <p className={styles.cardStatusText}>Modalidade: {capitalize(data.tipo)}</p>
        </div>

        <div className={styles.licitacoesInfo}>
          <p>Data de publicação: {data.data}</p>
          {data.valores && (
            <p className={styles.statusContainer}>
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
        <Link to={`/licitacoes/${data.id}`} className={styles.cardButton}>
          <p>Ver Mais</p>
        </Link>
      </div>
    </div>
  );
}
