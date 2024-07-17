import React from 'react';

import style from './style.module.css';

export default function CardAbout({
  primeiroTitulo,
  segundoTitulo,
  primeiroP,
  segundoP,
  urlDaFonte,
  imagem,
}) {
  return (
    <div className={style.cardAboutContext}>
      <h2 className={style.cardAboutText}>{primeiroTitulo}</h2>

      <p className={style.cardAboutTextP}>{primeiroP}</p>

      <h2 className={style.cardAboutText}>{segundoTitulo}</h2>

      <p className={style.cardAboutTextP}>{segundoP}</p>

      <img className={style.cardAboutImg} src={imagem} />

      <p className={style.cardAboutTextP}>
        Para saber mais, acesso este{' '}
        <a target="_blank" href={urlDaFonte}>
          link
        </a>
        .
      </p>
    </div>
  );
}
