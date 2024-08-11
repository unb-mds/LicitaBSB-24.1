import style from './style.module.css';
import { useEffect, useState } from 'react';

export default function AboutBiddingDispatch() {
  const [image, setImage] = useState('');
  useEffect(() => {
    import('../../../assets/articles/imagem-dispensa.png')
      .then((image) => {
        setImage(image.default);
      })
      .catch((err) => {
        console.log(
          'Erro ao carregar imagem (../../../assets/articles/imagem-dispensa.png)',
        );
      });
  }, []);

  return (
    <main className={style.mainContext}>
      <div data-testid="main-context" className={style.cardAboutContext}>
        <h1 className={style.cardAboutTitle}>
          Dispensa de Licitação: Entendendo os Procedimentos e as Situações
        </h1>
        <p className={style.cardAboutTextP}>
          A licitação é um processo administrativo formal que visa garantir a
          isonomia e a melhor proposta para a administração pública na
          contratação de bens e serviços. No entanto, há situações específicas
          previstas na legislação brasileira em que a realização do processo
          licitatório pode ser dispensada. Esses casos são conhecidos como
          "dispensa de licitação".
        </p>
        <h2 className={style.cardAboutSubtitle}>Fundamentos Legais</h2>
        <p className={style.cardAboutTextP}>
          A dispensa de licitação está prevista na Lei nº 8.666/1993, também
          conhecida como Lei de Licitações e Contratos, e na Lei nº 14.133/2021,
          a Nova Lei de Licitações e Contratos Administrativos. Ambas
          estabelecem critérios e condições para que a administração pública
          possa contratar diretamente sem a necessidade de licitação.
        </p>
        <img className={style.cardAboutImg} src={image} />
        <h2 className={style.cardAboutSubtitle}>
          Principais Hipóteses de Dispensa de Licitação
        </h2>
        <h3 className={style.cardAboutSubtitle3}>1. Baixo Valor:</h3>
        <p className={style.cardAboutTextP}>
          Contratação de obras e serviços de engenharia com valor até R$
          100.000,00.
          <br />
          Contratação de outros serviços e compras com valor até R$ 50.000,00.
        </p>
        <h3 className={style.cardAboutSubtitle3}>
          2. Situação de Emergência ou Calamidade Pública:
        </h3>
        <p className={style.cardAboutTextP}>
          Quando há necessidade de resposta imediata para evitar prejuízo ou
          risco à segurança de pessoas, obras, serviços, equipamentos e outros
          bens, públicos ou particulares.
        </p>
        <h3 className={style.cardAboutSubtitle3}>
          3. Intervenção no Domínio Econômico:
        </h3>
        <p className={style.cardAboutTextP}>
          Contratação de empresas para aquisição de bens ou serviços necessários
          à reabilitação de empresa pública, inclusive na hipótese de
          desestatização.
        </p>
        <h3 className={style.cardAboutSubtitle3}>
          4. Aquisição ou Locação de Imóvel:
        </h3>
        <p className={style.cardAboutTextP}>
          Quando se tratar de imóvel destinado ao atendimento das finalidades
          precípuas da administração.
        </p>
        <h3 className={style.cardAboutSubtitle3}>
          5. Contratação de Instituições de Ensino ou de Pesquisa:
        </h3>
        <p className={style.cardAboutTextP}>
          Para serviços técnicos especializados de natureza singular, com
          profissionais ou empresas de notória especialização.
        </p>
        <h3 className={style.cardAboutSubtitle3}>
          6. Restauro de Obras de Arte e Bens Históricos:
        </h3>
        Serviços de restauração de obras de arte e bens de valor histórico cujo
        valor de mercado seja impossível de ser estabelecido.
        <h2 className={style.cardAboutSubtitle}>
          Procedimentos e Formalidades
        </h2>
        <p className={style.cardAboutTextP}>
          Mesmo nos casos de dispensa de licitação, a administração pública deve
          observar certos procedimentos para garantir a transparência e a
          justificativa da contratação:
          <br />
          <br />
          - Justificação da Dispensa: A motivação para a dispensa deve ser
          claramente documentada, demonstrando que a situação enquadra-se nas
          hipóteses previstas em lei.
          <br />
          - Publicidade: Deve-se assegurar a publicação do ato que autoriza a
          dispensa, garantindo a transparência e a fiscalização por parte dos
          órgãos de controle e da sociedade.
          <br />- Pesquisa de Preços: Sempre que possível, deve-se realizar
          pesquisa de preços no mercado para assegurar que os valores
          contratados são compatíveis com os praticados.
        </p>
        <h2 className={style.cardAboutSubtitle}>Considerações Finais</h2>
        <p className={style.cardAboutTextP}>
          A dispensa de licitação é um instrumento importante para a
          administração pública, permitindo maior flexibilidade e eficiência em
          determinadas situações. No entanto, seu uso deve ser criterioso e bem
          fundamentado, a fim de evitar abusos e garantir que os princípios da
          legalidade, impessoalidade, moralidade, publicidade e eficiência sejam
          sempre respeitados. A correta aplicação das hipóteses de dispensa e a
          transparência nos procedimentos são fundamentais para assegurar a
          integridade e a confiança no processo de contratação pública.
        </p>
        <p>
          As referências para escrita deste material foram retiradas da{' '}
          <a
            data-testid="link-test-id-1"
            href="https://legislacao.presidencia.gov.br/atos/?tipo=LEI&numero=8666&ano=1993&ato=beaEzYU5ENFpWTd78"
            target="__blank"
          >
            Lei nº 8.666 de 21 de junho de 1993
          </a>{' '}
          e da{' '}
          <a
            data-testid="link-test-id-2"
            href="https://legislacao.presidencia.gov.br/atos/?tipo=LEI&numero=14133&ano=2021&ato=8d4MTTE5UMZpWTf64"
            target="__blank"
          >
            Lei nº 14.133 de 01 de abril de 2021
          </a>
          .
        </p>
      </div>
    </main>
  );
}
