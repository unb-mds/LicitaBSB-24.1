import React, { useState } from 'react';
import axios from 'axios';
import style from '../newsletter/style.module.css';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://us22.api.mailchimp.com/3.0/lists/96c79ddec6/members/',
        { email },
      );
      // Adicionar API e URL do site quando estiver pronto.
      // Ainda está me modo produção.
      setMessage(response.data);
    } catch (error) {
      setMessage('Subscription failed.');
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.newsletter}>
        <h1>Se inscreva para receber atualizações sobre futuras licitações!</h1>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SubscribeForm;
