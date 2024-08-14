import React, { useEffect, useState } from 'react';

import styles from './style.module.css';
import { Link, useParams } from 'react-router-dom';

import facebook from '../../../assets/facebook.svg';
import twitter from '../../../assets/twitter.svg';
import calendario from '../../../assets/calendario.svg';
import valor from '../../../assets/valor.svg';
import {
  getLicitacaoById,
  getLicitacoes,
} from '../../services/licitacoes.service';
import CardLicitacoes from '../../components/card-licitacoes';
import useLoadData from '../../hooks/useLoadData';

export default function BiddingPage() {
  const parametros = useParams();

  const { licitData, maisLicitacoes } = useLoadData(parametros.id);

  const urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=https%3A//licitabsb.netlify.app/licitacoes/${parametros.id}`;
  const urlX = `https://twitter.com/intent/tweet?text=https%3A//licitabsb.netlify.app/licitacoes/${parametros.id}`;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.biddingContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.titleContainer}>
            <h3 data-testid="titulo-testid" className={styles.title}>
              {licitData.titulo}
            </h3>
            <span className={styles.subtitle}>{licitData.nome_orgao}</span>
          </div>
          <div className={styles.shareContainer}>
            <a target="_blank" data-testid="role-link-id" href={urlX}>
              <img src={twitter} />
            </a>
            <a target="_blank" data-testid="role-link-id" href={urlFacebook}>
              <img src={facebook} />
            </a>
          </div>
        </div>
        <div className={styles.biddingInfoContainer}>
          <div className={styles.biddingInfoElement}>
            <img src={calendario} />
            <p data-testid="data-testid">{licitData.data}</p>
          </div>
          {licitData.valores && (
            <div className={styles.biddingInfoElement}>
              <img src={valor} />
              <p>{licitData.valores[0]}</p>
            </div>
          )}
        </div>

        <div className={styles.horizontalLine}></div>

        <p data-testid="objeto-test-id" className={styles.objetoText}>
          {licitData.objeto}
        </p>
        <div className={styles.BiddingLink}>
          {licitData.link && (
            <p>
              Acessar licitação em:{' '}
              <a href={`${licitData.link}`} target="blank">
                {licitData.link}
              </a>
            </p>
          )}
        </div>
      </div>
      <section className={styles.outrasLicitacoesContainer}>
        <h3>Licitações mais recentes:</h3>
        <div
          data-testid="outras-licitacoes-testid"
          className={styles.cardsLicitacoesWrapper}
        >
          {maisLicitacoes.map((data) => {
            return <CardLicitacoes key={data.id} data={data} />;
          })}
        </div>
        <Link to={'/licitacoes'} className={styles.link}>
          Ver mais licitações...
        </Link>
      </section>
    </main>
  );
}
