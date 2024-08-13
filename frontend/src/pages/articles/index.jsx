import React from 'react';
import ArticleCard from './article-card';

import botImg from '../../../assets/articles/imagem-bot.png';
import licitImg from '../../../assets/articles/imagem-licitacao.png';
import dispensaImg from '../../../assets/articles/imagem-dispensa.png';

import styles from "./style.module.css"

export default function Articles() {
  return (
    <main>
      <h3 className={styles.title}>Veja um pouco mais sobre o nosso projeto:</h3>
      <section className={styles.articlesWrapper}>
        <ArticleCard
          img={botImg}
          title="Sobre o Bot: Automatização de Postagens na Rede Social X (antigo Twitter)"
          text="Um 'bot de Twitter' é um software automatizado que interage com a plataforma X (Twitter). Esses bots podem realizar diversas funções automaticamente, como: Postar tweets, Retweetar, Seguir contas, Responder a tweets e Enviar mensagens diretas."
          path="sobrebot"
        />
        <ArticleCard
          img={licitImg}
          title="Licitações: Conceito e Termos Relevantes"
          text="A licitação é um procedimento administrativo formal utilizado por
          órgãos públicos para a contratação de serviços, aquisição de bens ou
          execução de obras. Esse processo visa garantir a igualdade de
          condições entre os concorrentes e promover a transparência nas
          contratações públicas, assegurando que a proposta mais vantajosa seja
          escolhida."
          path="sobrelicitacao"
        />
        <ArticleCard
          img={dispensaImg}
          title="Dispensa de Licitação: Entendendo os Procedimentos e as Situações"
          text="A licitação é um processo administrativo formal que visa garantir a
          isonomia e a melhor proposta para a administração pública na
          contratação de bens e serviços. No entanto, há situações específicas
          previstas na legislação brasileira em que a realização do processo
          licitatório pode ser dispensada. Esses casos são conhecidos como
          'dispensa de licitação'."
          path="sobredispensadelicitacao"
        />
      </section>
    </main>
  )
}
