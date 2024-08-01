import React from 'react';
import UltimasLicitacoes from './ultimas-licitacoes';
import CampoPesquisa from '../../components/campo-pesquisa';
import SubscribeForm from '../../components/newsletter';

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
