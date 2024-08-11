import React from 'react';
import imagemLicitacao from '../../../assets/articles/imagem-licitacao.png';
import style from './style.module.css';

export default function AboutBidding() {
  return (
    <main className={style.mainContext}>
      <div className={style.cardAboutContext}>
        <h1 className={style.cardAboutTitle}>
          Licitações: Conceito e Termos Relevantes
        </h1>
        <p className={style.cardAboutTextP}>
          A licitação é um procedimento administrativo formal utilizado por
          órgãos públicos para a contratação de serviços, aquisição de bens ou
          execução de obras. Esse processo visa garantir a igualdade de
          condições entre os concorrentes e promover a transparência nas
          contratações públicas, assegurando que a proposta mais vantajosa seja
          escolhida.
        </p>
        <img className={style.cardAboutImg} src={imagemLicitacao} />
        <h2 className={style.cardAboutSubtitle}>Termos Importantes</h2>
        <p className={style.cardAboutTextP}>
          <b>Edital</b>: Documento que estabelece as regras e condições para a
          participação na licitação, sendo a base legal do processo (Lei nº
          8.666/1993, Art. 40).
          <br />
          <br />
          <b>Pregão</b>: Modalidade de licitação destinada à aquisição de bens e
          serviços comuns, caracterizada pela celeridade e competitividade. O
          pregão pode ser presencial ou eletrônico, permitindo a participação de
          qualquer interessado que atenda aos requisitos do edital. Essa
          modalidade é frequentemente utilizada para grandes contratos (Lei nº
          10.520/2002).
          <br />
          <br />
          <b>Tomada de Preços</b>: Modalidade de licitação voltada para
          contratos de valor intermediário, destinada a empresas previamente
          cadastradas e qualificadas junto ao órgão licitante (Lei nº
          8.666/1993, Art. 22, II).
          <br />
          <br />
          <b>Convite</b>: Modalidade simplificada de licitação para contratos de
          menor valor, onde pelo menos três empresas são convidadas a
          participar. É uma forma de processo mais restrito e ágil (Lei nº
          8.666/1993, Art. 22, III).
          <br />
          <br />
          <b>Homologação</b>: Ato formal realizado pela autoridade competente
          que aprova o resultado da licitação, assegurando que o processo seguiu
          todas as normas legais (Lei nº 8.666/1993, Art. 43, VI).
          <br />
          <br />
          <b>Adjudicação</b>: Atribuição do contrato ao licitante vencedor,
          conferindo a este o direito de assinar o contrato e executar o objeto
          licitado (Lei nº 8.666/1993, Art. 43, VII).
          <br />
          <br />
          <b>Contrato Administrativo</b>: Instrumento que formaliza a relação
          entre a administração pública e o fornecedor ou prestador de serviços,
          detalhando as obrigações e direitos das partes (Lei nº 8.666/1993,
          Art. 54). O processo licitatório é fundamental para assegurar a
          economia, a legalidade e a participação equitativa nas contratações
          públicas, contribuindo para a eficiência e a integridade na gestão dos
          recursos públicos. As referências para a elaboração deste material
          foram retiradas das Leis nº 8.666/1993 e nº 10.520/2002.
        </p>
      </div>
    </main>
  );
}
