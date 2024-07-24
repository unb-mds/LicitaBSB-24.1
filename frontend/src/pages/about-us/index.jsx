import membros from '../../mocks/members';
import CardMember from './card-member';
import { styled } from 'styled-components';

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 60%;
  margin-left: 20%;
  margin-top: 32px;
`;
const TitulosEstilizados = styled.h2`
  font-weight: bold;
  font-size: 32px;
`;
const DescMemberEstilizada = styled.p`
  text-align: justify;
  font-size: 20px;
  text-align: justify;
`;
const PhotoEstilizada = styled.img`
  width: 70%;
  @media (max-width: 1500px) {
    width: 80%;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export default function AboutUs() {
  return (
    <AboutUsContainer>
      <TitulosEstilizados>Sobre nós</TitulosEstilizados>

      <DescMemberEstilizada>
        Somos um grupo de estudantes da Universidade de Brasília (UnB) dedicados
        a facilitar o acesso à informação sobre licitações e promover a
        transparência pública nesse processo. Nosso objetivo é criar ferramentas
        que simplifiquem o entendimento e a consulta de dados de licitações,
        contribuindo para uma gestão pública mais transparente e eficiente.
      </DescMemberEstilizada>

      <PhotoEstilizada
        src="../../assets/download.jpg"
        alt="Foto de toda a equipe"
      />

      <TitulosEstilizados>Agora, um pouco de cada um</TitulosEstilizados>

      {membros.map((membro) => (
        <CardMember
          key={membro.id}
          nome={membro.nome}
          descricao={membro.descricao}
          github={membro.github}
          id={membro.id}
        />
      ))}
    </AboutUsContainer>
  );
}
