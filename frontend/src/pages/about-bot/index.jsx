import style from './style.module.css';

export default function AboutBot() {
  return (
    <main>
      <h1>
        Sobre o Bot: Automatização de Postagens na Rede Social X (antigo
        Twitter)
      </h1>

      <h2>O que é um Bot</h2>
      <p>
        Um "bot de Twitter" é um software automatizado que interage com a
        plataforma X (Twitter). Esses bots podem realizar diversas funções
        automaticamente, como:
      </p>
      <ul>
        <li>Postar tweets</li>
        <li>Retweetar</li>
        <li>Seguir contas</li>
        <li>Responder a tweets</li>
        <li>Enviar mensagens diretas</li>
      </ul>
      <p>Os bots são utilizados para uma variedade de propósitos, incluindo:</p>
      <ul>
        <li>
          <b>Marketing:</b> Promover produtos ou serviços.
        </li>
        <li>
          <b>Suporte ao Cliente:</b> Fornecer assistência inicial e responder a
          perguntas comuns.
        </li>
        <li>
          <b>Entretenimento:</b> Criar e compartilhar conteúdo divertido.
        </li>
        <li>
          <b>Manipulação de Informações:</b> Espalhar desinformação ou manipular
          conversas online.
        </li>
        <li>
          <b>Divulgação de Notícias:</b> Compartilhar automaticamente
          atualizações de notícias ou informações relevantes.
        </li>
      </ul>

      <h2>Como Foi Feito</h2>
      <p>Para configurar o bot, utilizamos duas bibliotecas principais:</p>
      <ol>
        <li>
          <b>Tweepy:</b> Uma biblioteca Python para acessar a API do Twitter.
          Ela facilita a interação com a plataforma, permitindo que o bot poste
          tweets, siga contas, entre outras funcionalidades. A documentação da
          Tweepy pode ser acessada{' '}
          <a href="https://docs.tweepy.org/en/stable/" target="_blank">
            aqui
          </a>
          .
        </li>
        <li>
          <b>Pillow:</b> Uma biblioteca Python para processamento de imagens.
          Utilizamos o Pillow para adicionar imagens aos tweets, tornando as
          postagens mais atrativas e informativas. A documentação do Pillow pode
          ser acessada{' '}
          <a href="https://pillow.readthedocs.io/en/stable/" target="_blank">
            aqui
          </a>
          .
        </li>
      </ol>
      <h3>Etapas da Configuração</h3>
      <ol>
        <li>
          <b>Autenticação:</b> Configuramos as credenciais de acesso à API do
          Twitter utilizando a Tweepy.
        </li>
        <li>
          <b>Criação de Conteúdo:</b> Desenvolvemos scripts para gerar
          automaticamente o conteúdo dos tweets, incluindo texto e imagens.
        </li>
        <li>
          <b>Postagem Automática:</b> Implementamos a lógica para postar
          automaticamente os tweets em horários pré-definidos ou em resposta a
          eventos específicos.
        </li>
        <li>
          <b>Manutenção e Monitoramento:</b> Configuramos mecanismos para
          monitorar o funcionamento do bot e fazer ajustes conforme necessário.
        </li>
      </ol>

      <h2>Qual o Objetivo</h2>
      <p>
        O principal objetivo deste bot é proporcionar aos usuários uma
        atualização rápida e precisa sobre avisos e extratos de licitações,
        promovendo maior transparência nos gastos governamentais. Com isso,
        esperamos:
      </p>
      <ul>
        <li>
          <b>Facilitar o Acesso à Informação:</b> Tornar as informações sobre
          licitações mais acessíveis e organizadas para o público.
        </li>
        <li>
          <b>Promover a Transparência:</b> Aumentar a clareza sobre os gastos
          governamentais, permitindo que cidadãos acompanhem e fiscalizem melhor
          as despesas públicas.
        </li>
        <li>
          <b>Agilizar a Comunicação:</b> Fornecer atualizações em tempo real,
          permitindo que os usuários recebam as informações mais recentes sem
          precisar procurar manualmente.
        </li>
      </ul>
      <p>
        Com este bot, acreditamos que os usuários terão uma ferramenta útil e
        eficiente para se manterem informados sobre as atividades governamentais
        relacionadas a licitações.
      </p>
    </main>
  );
}
