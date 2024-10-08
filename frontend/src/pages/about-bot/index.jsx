import style from './style.module.css';
// import useGetImage from '../../hooks/useGetImage';
import image from '../../../assets/articles/imagem-bot.png';

export default function AboutBot() {
  // const image = useGetImage('');

  return (
    <main className={style.mainContext}>
      <div data-testid="main-container-text" className={style.cardAboutContext}>
        <div className={style.paragraph1Context}>
          <div>
            <h1 className={style.cardAboutTitle}>
              Sobre o Bot: Automatização de Postagens na Rede Social X (antigo
              Twitter)
            </h1>

            <h2 className={style.cardAboutSubtitle}>O que é um Bot</h2>
            <p className={style.cardAboutTextP}>
              Um "bot de Twitter" é um software automatizado que interage com a
              plataforma X (Twitter). Esses bots podem realizar diversas funções
              automaticamente, como: Postar tweets, Retweetar, Seguir contas,
              Responder a tweets e Enviar mensagens diretas.
            </p>
            <p className={style.cardAboutTextP}>
              Os bots são utilizados para uma variedade de propósitos,
              incluindo:
              <br />
              <br />
              <b>Marketing:</b> Promover produtos ou serviços.
              <br />
              <b>Suporte ao Cliente:</b> Fornecer assistência inicial e
              responder a perguntas comuns.
              <br />
              <b>Entretenimento:</b> Criar e compartilhar conteúdo divertido.
              <br />
              <b>Manipulação de Informações:</b> Espalhar desinformação ou
              manipular conversas online.
              <br />
              <b>Divulgação de Notícias:</b> Compartilhar automaticamente
              atualizações de notícias ou informações relevantes.
            </p>
          </div>
          <img className={style.imagem1} src={image} />
        </div>

        <span>
          <h2 className={style.cardAboutSubtitle}>Como Foi Feito</h2>
          <h3 className={style.cardAboutSubtitle3}>
            Para configurar o bot, utilizamos duas bibliotecas principais:
          </h3>
          <p className={style.cardAboutTextP}>
            <br />
            <b>Tweepy:</b> Uma biblioteca Python para acessar a API do Twitter.
            Ela facilita a interação com a plataforma, permitindo que o bot
            poste tweets, siga contas, entre outras funcionalidades. A
            documentação da Tweepy pode ser acessada{' '}
            <a href="https://docs.tweepy.org/en/stable/" target="_blank">
              aqui
            </a>
            .
            <br />
            <b>Pillow:</b> Uma biblioteca Python para processamento de imagens.
            Utilizamos o Pillow para adicionar imagens aos tweets, tornando as
            postagens mais atrativas e informativas. A documentação do Pillow
            pode ser acessada{' '}
            <a href="https://pillow.readthedocs.io/en/stable/" target="_blank">
              aqui
            </a>
            .
          </p>
          <h3 className={style.cardAboutSubtitle3}>Etapas da Configuração</h3>
          <p className={style.cardAboutTextP}>
            <b>Autenticação:</b> Configuramos as credenciais de acesso à API do
            Twitter utilizando a Tweepy.
            <br />
            <b>Criação de Conteúdo:</b> Desenvolvemos scripts para gerar
            automaticamente o conteúdo dos tweets, incluindo texto e imagens.
            <br />
            <b>Postagem Automática:</b> Implementamos a lógica para postar
            automaticamente os tweets em horários pré-definidos ou em resposta a
            eventos específicos.
            <br />
            <b>Manutenção e Monitoramento:</b> Configuramos mecanismos para
            monitorar o funcionamento do bot e fazer ajustes conforme
            necessário.
          </p>
        </span>

        <span>
          <h2 className={style.cardAboutSubtitle}>Qual o Objetivo</h2>
          <p className={style.cardAboutTextP}>
            O principal objetivo deste bot é proporcionar aos usuários uma
            atualização rápida e precisa sobre avisos e extratos de licitações,
            promovendo maior transparência nos gastos governamentais. Com isso,
            esperamos:
            <br />
            <br />
            <b>Facilitar o Acesso à Informação:</b> Tornar as informações sobre
            licitações mais acessíveis e organizadas para o público.
            <br />
            <b>Promover a Transparência:</b> Aumentar a clareza sobre os gastos
            governamentais, permitindo que cidadãos acompanhem e fiscalizem
            melhor as despesas públicas.
            <br />
            <b>Agilizar a Comunicação:</b> Fornecer atualizações em tempo real,
            permitindo que os usuários recebam as informações mais recentes sem
            precisar procurar manualmente.
          </p>
          <br />
          Com este bot, acreditamos que os usuários terão uma ferramenta útil e
          eficiente para se manterem informados sobre as atividades
          governamentais relacionadas a licitações.
        </span>
      </div>
    </main>
  );
}
