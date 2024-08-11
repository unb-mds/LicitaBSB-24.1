import React, { useEffect, useState } from 'react';

import styles from './style.module.css';
import { Link, useParams } from 'react-router-dom';

import facebook from '../../../assets/facebook.svg';
import google from '../../../assets/google.svg';
import twitter from '../../../assets/twitter.svg';
import calendario from '../../../assets/calendario.svg';
import valor from '../../../assets/valor.svg';
import { getLicitacaoById, getLicitacoes } from '../../services/licitacoes.service';
import CardLicitacoes from '../../components/card-licitacoes';

export default function BiddingPage() {
  const parametros = useParams();
  const [licitData, setLicitData] = useState({});
  const [maisLicitacoes, setMaisLicitacoes] = useState([]);

  const loadData = async () => {
    const data = await getLicitacaoById(parametros.id);
    setLicitData(data);
    const maisLicit = await getLicitacoes();
    setMaisLicitacoes(maisLicit.results.slice(0, 3))
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <main className={styles.mainContainer}>
      <div className={styles.biddingContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{licitData.titulo}</h3>
            <span className={styles.subtitle}>{licitData.nome_orgao}</span>
          </div>
          <div className={styles.shareContainer}>
            <a data-testid="role-link-id" href="">
              <img src={twitter} />
            </a>
            <a data-testid="role-link-id" href="">
              <img src={facebook} />
            </a>
            <a data-testid="role-link-id" href="">
              <img src={google} />
            </a>
          </div>
        </div>
        <div className={styles.biddingInfoContainer}>
          <div className={styles.biddingInfoElement}>
            <img src={calendario} />
            <p>{licitData.data}</p>
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
        <div className={styles.cardsLicitacoesWrapper}>
          {
            maisLicitacoes.map((data) => {
              return <CardLicitacoes data={data}/>
            })
          }
        </div>
        <Link to={'/licitacoes'} className={styles.link}>
          Ver mais licitações...
        </Link>
      </section>
    </main>
  );
}
