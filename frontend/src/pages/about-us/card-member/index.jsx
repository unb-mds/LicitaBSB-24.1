import styles from './style.module.css';
import { FaGithub } from 'react-icons/fa';

export default function CardMember({ nome, descricao, github, id }) {
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
        <img
          className={styles.cardAboutUsPhotoEstilizado}
          src={`../../../../assets/members/${id}.jpg`}
          alt="Foto do membro"
        />
        <a data-testid="campoLink" href={github} target="_blank">
          <FaGithub /> Github
        </a>
      </div>
    </li>
  );
}
