import React, { useState, useEffect } from 'react';
import style from './style.module.css';
// import imagens from `../../../../assets/carrossel/${items[currentIndex].id}`

export default function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [imagem, setImage] = useState({
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(../../../../assets/carrossel/${items[currentIndex].id}.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    import(`../../../../assets/carrossel/${items[currentIndex].id}.png`)
      .then(() => {
        const newImg = {
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(../../../../assets/carrossel/${items[currentIndex].id}.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
        setImage(newImg);
      })
      .catch((err) => {
        console.error(`Erro ao carregar a imagem do membro ${id}:`, err);
      });
  }, [currentIndex]);

  return (
    <div className={style.carousel}>
      <div className={style.textContext} style={imagem}>
        <h3 className={style.title}>{items[currentIndex].title}</h3>
        <p>{items[currentIndex].paragraph}</p>
        <a href={items[currentIndex].path}>Continue lendo...</a>
      </div>
      <span className={style.menuContext}>
        <button className={style.botao} onClick={handlePrevious}>
          &lt;
        </button>
        <button className={style.botao} onClick={handleNext}>
          &gt;
        </button>
      </span>
    </div>
  );
}
