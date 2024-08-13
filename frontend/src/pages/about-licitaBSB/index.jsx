import style from './style.module.css';
import image from '../../../assets/articles/logo-licita.jpg';

export default function AboutLicitaBSB() {
  return (
    <main className={style.mainContext}>
      <div data-testid="main-container-text" className={style.cardAboutContext}>
        <span className={style.paragraph1Context}>
          <div>
            <h1 className={style.cardAboutTitle}>
              Licita BSB: Facilitando o Acesso às Licitações em Brasília
            </h1>
            <p className={style.cardAboutTextP}>
              No mundo atual, a transparência e o acesso à informação são mais
              cruciais do que nunca. Nesse contexto, o *Licita BSB* se destaca
              como uma ferramenta essencial para a gestão e acompanhamento das
              licitações em Brasília. O projeto visa proporcionar um acesso
              descomplicado e eficiente às informações sobre processos
              licitatórios, promovendo maior clareza e participação cidadã.
            </p>
          </div>
        </span>

        <span className={style.imageContext}>
          <div className={style.divImageContext}>
            <h2 className={style.cardAboutSubtitle}>O Que é o Licita BSB?</h2>
            <p className={style.cardAboutTextP}>
              <br />
              O Licita BSB é um portal online inovador que centraliza as
              licitações realizadas em Brasília, oferecendo uma plataforma onde
              qualquer pessoa pode acessar informações detalhadas sobre essas
              oportunidades. A ideia é simplificar o acesso a dados
              frequentemente dispersos e difíceis de encontrar, permitindo que
              tanto empresas quanto cidadãos interessados possam encontrar
              facilmente os detalhes das licitações em um único lugar.
              <br />
              <br />
              Com uma interface amigável e fácil de usar, o portal permite que
              os usuários filtrem e busquem informações específicas, tornando o
              processo de consulta muito mais ágil e eficiente. A plataforma é
              ideal para empresas que desejam acompanhar oportunidades de
              negócios e para cidadãos que buscam entender melhor como os
              recursos públicos estão sendo alocados e administrados.
            </p>
          </div>
          <img className={style.imagem1} src={image} />
        </span>

        <span>
          <h2 className={style.cardAboutSubtitle}>
            O Impacto da Transparência
          </h2>
          <p className={style.cardAboutTextP}>
            <br />A transparência é um dos pilares fundamentais da administração
            pública e, com o Licita BSB, esse princípio ganha uma nova dimensão.
            Ao disponibilizar as licitações de forma clara e acessível, o
            projeto não só facilita o acompanhamento dos processos, mas também
            fortalece a confiança pública na gestão governamental. Cidadãos
            informados têm mais capacidade de fiscalizar e participar ativamente
            dos processos que afetam a sua comunidade.
          </p>
        </span>

        <span>
          <h2 className={style.cardAboutSubtitle}>
            A Tecnologia a Favor da Comunicação
          </h2>
          <p className={style.cardAboutTextP}>
            <br />
            Para complementar o portal, o Licita BSB também se destaca pelo uso
            de tecnologia para melhorar a comunicação. Através de um bot
            integrado à rede social X (antigo Twitter), o projeto garante que as
            informações sobre as licitações mais recentes sejam compartilhadas
            automaticamente. Esse bot, acessível pelo{' '}
            <a target="_blank" href="https://x.com/LicitaBSB">
              perfil @LicitaBSB
            </a>
            , proporciona uma maneira prática e imediata de receber atualizações
            sobre as novas oportunidades e processos em andamento.
            <br />
            <br />
            Essa abordagem não só amplia o alcance das informações, como também
            se adapta aos hábitos de consumo de notícias e atualizações dos
            usuários modernos. A combinação do portal com o bot social cria um
            ecossistema de informação acessível e eficiente, promovendo uma
            maior participação e engajamento da comunidade.
          </p>
        </span>

        <span>
          <h2 className={style.cardAboutSubtitle}>
            Um Projeto Acadêmico com Repercussão Social
          </h2>
          <p className={style.cardAboutTextP}>
            <br />O Licita BSB foi desenvolvido como parte da disciplina de
            Métodos de Desenvolvimento de Software da Universidade de Brasília,
            no primeiro semestre de 2024. O projeto não apenas demonstra a
            capacidade técnica dos estudantes envolvidos, mas também ilustra a
            aplicação prática dos conceitos aprendidos em sala de aula para
            resolver problemas reais e contribuir para a sociedade.
          </p>
        </span>

        <span>
          <h2 className={style.cardAboutSubtitle}>Conclusão</h2>
          <p className={style.cardAboutTextP}>
            <br />O Licita BSB é mais do que uma plataforma de acesso a
            licitações; é uma ferramenta poderosa para a transparência e a
            participação cidadã. Com um portal intuitivo e um bot eficiente no
            Twitter, o projeto oferece uma solução moderna para a disseminação
            de informações públicas, promovendo uma gestão mais transparente e
            acessível. Visite o{' '}
            <a target="_blank" href="https://licitabsb.netlify.app">
              portal Licita BSB
            </a>{' '}
            e acompanhe as atualizações através do{' '}
            <a target="_blank" href="https://x.com/LicitaBSB">
              bot no X
            </a>{' '}
            para ficar sempre informado sobre as licitações em Brasília.
          </p>
        </span>
      </div>
    </main>
  );
}
