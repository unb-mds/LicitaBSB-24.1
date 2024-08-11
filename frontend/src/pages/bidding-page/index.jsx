import React, { useEffect } from 'react';

import styles from './style.module.css';
import { useParams } from 'react-router-dom';
import { formatBiddingObject } from '../../utils/format-bidding-object';

import facebook from '../../../assets/facebook.svg';
import google from '../../../assets/google.svg';
import twitter from '../../../assets/twitter.svg';
import calendario from '../../../assets/calendario.svg';
import valor from '../../../assets/valor.svg';

export default function BiddingPage() {
  const parametros = useParams();
  const licitacao = {};
  const dados = formatBiddingObject(licitacao);

  const loadData = async () => {

  }

  useEffect(() => {
    console.log(parametros)
  }, [])

  return (
    <div className={styles.biddingContainer}>
      <h4 className={styles.biddingType}>{dados.tipo}</h4>
      <div className={styles.headingContainer}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{dados.nomeOrgao}</h3>
          <span className={styles.subtitle}>{dados.nomeOrgao}</span>
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
          <p>{dados.data_abertura}</p>
        </div>
        {dados.valor_Licitacao && (
          <div className={styles.biddingInfoElement}>
            <img src={valor} />
            <p>{dados.valor_Licitacao}</p>
          </div>
        )}
      </div>

      <div className={styles.horizontalLine}></div>

      <p data-testid="objeto-test-id" className={styles.objetoText}>
        {dados.objeto}
      </p>
      <div className={styles.BiddingLink}>
        {dados.link && (
          <p>
            Acessar licitação em:{' '}
            <a href={`${dados.link}`} target="blank">
              {dados.link}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
