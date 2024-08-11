import styles from './style.module.css';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useGetImage from '../../../hooks/useGetImage';

export default function CardMember({ nome, descricao, github, id }) {
  const imageMember = useGetImage(`../../../../assets/members/${id}.jpg`);
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
        {imageMember && (
          <img
            className={styles.cardAboutUsPhotoEstilizado}
            src={imageMember}
            alt="Foto do membro"
          />
        )}
        <div className={styles.githubLinkContainer}>
          <a data-testid="campoLink" href={github} target="_blank">
            <FaGithub /> Github
          </a>
        </div>
      </div>
    </li>
  );
}
