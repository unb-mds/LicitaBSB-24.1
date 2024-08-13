import React from 'react';
import styles from "./style.module.css"
import { Link } from 'react-router-dom';


export default function ArticleCard({img, title, text, path}) {
  return (
    <div className={styles.cardWrapper}>
      <img
        src={img}
        className={styles.articleImage}
      />
      <div className={styles.articleText}>
        <h4>{title}</h4>
        <p>{text}</p>
        <Link to={path}>Continue lendo...</Link>
      </div>
    </div>
  )
}

