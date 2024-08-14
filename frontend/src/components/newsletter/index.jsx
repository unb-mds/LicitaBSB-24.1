import React, { useState } from 'react';
import axios from 'axios';
import style from '../newsletter/style.module.css';
import amicoImage from './amico.png';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email_address: email, // Ajuste o campo conforme necessário
      status: 'subscribed',
    };

    try {
      const response = await axios.post(
        'https://licitabsbserer-a1c309841042.herokuapp.com/app/subscribe',
        payload,
        {
          headers: {
            'Content-Type': 'application/json', // Adiciona o cabeçalho Content-Type
          },
        },
      );
      setMessage('Inscrição realizada com sucesso!');
    } catch (error) {
      setMessage('Houve um erro, tente novamente!');
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <form className={style.newsletter} onSubmit={handleSubmit}>
      <div className={style.newsletterContainer}>
        <div className={style.mobileContainer}>
          <img className={style.newsletterImageMobile} src={amicoImage} />
          <h1 className={style.newsletterTitle}>
            Receba as mais recentes licitações diretamente no seu e-mail
          </h1>
        </div>
        <p className={style.newsletterSubtitle}>
          Se você deseja receber no seu melhor email as licitações mais recentes
          do Distrito Federal, cadastre seu email no LicitaBSB abaixo:
        </p>

        <div className={style['newsletter-form']}>
          <input
            placeholder="Digite seu email aqui."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </div>
      </div>

      <img className={style.newsletterImageDesk} src={amicoImage} />
      {message && <p>{message}</p>}
    </form>
  );
};

export default SubscribeForm;
