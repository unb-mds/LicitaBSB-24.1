import React, { useState } from 'react';
import axios from 'axios';
import style from '../newsletter/style.module.css'
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
      const response = await axios.post('https://licitabsbserer-a1c309841042.herokuapp.com/app/subscribe', payload, {
        headers: {
          'Content-Type': 'application/json' // Adiciona o cabeçalho Content-Type
        }
      });
      setMessage('Inscrição realizada com sucesso!');
    } catch (error) {
      setMessage('Houve um erro, tente novamente!');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.newsletter}>
      <div>
      <div className={style['newsletter-text']}>
            <h1>Receba as mais recentes licitações diretamente no seu e-mail</h1>
            <h2>Se você deseja receber no seu melhor email XXXMENTE as licitações mais recentes do Distrito Federal, cadastre seu email no LicitaBSB abaixo:</h2>
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
        <div className={style['newsletter-image']}>
            <img src={amicoImage}/>
        </div>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SubscribeForm;
