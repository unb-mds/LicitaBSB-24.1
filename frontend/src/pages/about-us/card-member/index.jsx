import styles from './style.module.css';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useGetImage from '../../../hooks/useGetImage';

export default function CardMember({ nome, descricao, github, id }) {
  // const [memberImage, setMemberImage] = useState('');

  // useEffect(() => {
  //   import(`../../../../assets/members/${id}.jpg`)
  //   .then((image) => {
  //     setMemberImage(image.default);
  //   })
  //   .catch((err) => {
  //     console.error(`Erro ao carregar a imagem do membro ${id}:`, err);
  //   });
  // }, [id]);
  const memberImage = useGetImage(id);

  const controler = id % 2 === 1;
  return (
    <li>
      <span className={styles.cardSpan}>
        <h3 className={styles.name}>{nome}</h3>
        <p className={styles.desc} data-testid="campoDescrica">
          {descricao}
        </p>
      </span>
      <div
        className={
          controler
            ? styles.cardAboutUsPhotoContextEstilizadaPar
            : styles.cardAboutUsPhotoContextEstilizadaImpar
        }
      >
        {
          <img
            className={styles.cardAboutUsPhotoEstilizado}
            src={memberImage}
            alt="Foto do membro"
          />
        }
        <div className={styles.githubLinkContainer}>
          <a data-testid="campoLink" href={github} target="_blank">
            <FaGithub /> Github
          </a>
        </div>
      </div>
    </li>
  );
}
