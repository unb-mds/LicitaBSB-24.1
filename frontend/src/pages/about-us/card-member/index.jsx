import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const CardAboutUsContextEstilizada = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: ${(props) => (props.$id ? 'row' : 'row-reverse')};
  span h3 {
    font-size: 28px;
    font-weight: 600;
  }
  span p {
    font-size: 20px;
    text-align: justify;
  }
  @media (max-width: 1500px) {
    span p {
      font-size: 16px;
      text-align: justify;
    }
  }
  @media (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`;
const CardAboutUsPhotoContextEstilizada = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardAboutUsPhotoEstilizado = styled.img`
  margin-bottom: 16px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: drop-shadow(-5px 6px 6px gray);
  @media (max-width: 1500px) {
    width: 220px;
    height: 220px;
  }
`;

export default function CardMember({ nome, descricao, github, id }) {
  const controler = id % 2 === 1;

  return (
    <CardAboutUsContextEstilizada $id={controler}>
      <span>
        <h3>{nome}</h3>
        <p>{descricao}</p>
      </span>
      <CardAboutUsPhotoContextEstilizada>
        <CardAboutUsPhotoEstilizado
          src={`../../../../assets/members/${id}.jpg`}
          alt="Foto do membro"
        />
        <a href={github} target="_blank">
          <FaGithub /> Github
        </a>
      </CardAboutUsPhotoContextEstilizada>
    </CardAboutUsContextEstilizada>
  );
}
