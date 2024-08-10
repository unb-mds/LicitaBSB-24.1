import React from 'react';
import UltimasLicitacoes from './ultimas-licitacoes';
import SubscribeForm from '../../components/newsletter/Index.jsx';

export default function Landing() {
  return (
    <>
      <main>
        <div>
          <UltimasLicitacoes />
          <SubscribeForm />
        </div>
      </main>
    </>
  );
}
