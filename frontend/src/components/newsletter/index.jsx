import React, { useState } from 'react';
import axios from 'axios';
import style from '../newsletter/style.module.css'
import amicoImage from './amico.png';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/subscribe', { email });
      // Adicionar API e URL do site quando estiver pronto.
      // Ainda está me modo produção.
      setMessage(response.data);
    } catch (error) {
      setMessage('Subscription failed.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.newsletter}>
      <div className={style['newsletter-text']}>
            <h1>Receba as mais recentes licitações diretamente no seu e-mail</h1>
            <h2>Se você deseja receber no seu melhor email XXXMENTE as licitações mais recentes do Distrito Federal, cadastre seu email no LicitaBSB abaixo:</h2>
        </div>
        <div className={style['newsletter-image']}>
            <img src={amicoImage}/>
        </div>
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
      {message && <p>{message}</p>}
    </form>
  );
};

export default SubscribeForm;
