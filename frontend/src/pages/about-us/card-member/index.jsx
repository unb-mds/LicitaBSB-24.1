import { useEffect, useState } from 'react';
import styles from './style.module.css'
import { FaGithub } from "react-icons/fa";

export default function CardMember({nome, descricao, github, id}){
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
    import(`../../../../assets/members/${id}.jpg`)
      .then(image => {
        setImageSrc(image.default);
      })
      .catch(err => {
        console.error('Erro ao carregar a imagem:', err);
      });
    }, [id])

    return(
        <div
         className={styles.cardAboutUsContext}
         style={{flexDirection: (id%2 === 1 ? 'row' : 'row-reverse')}}>
            <span>
                <h3 className={styles.cardAboutUsNome}>{nome}</h3>
                <p className={styles.cardAboutUsDes}>{descricao}</p>
            </span>
            <span className={styles.cardAboutUsPhotoContext}>
                <img className={styles.cardAboutUsPhoto} src={imageSrc} alt='Foto do membro'/>
                <a href={github}>
                    <FaGithub/> Github
                </a>
            </span>
        </div>
    )
}
