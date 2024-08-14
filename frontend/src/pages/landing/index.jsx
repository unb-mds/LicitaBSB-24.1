import React from 'react';
import UltimasLicitacoes from './ultimas-licitacoes';
import Newsletter from '../../components/newsletter/index.jsx';
import Carrossel from './carrossel/index.jsx';
import items from '../../mocks/carrossel.js';

export default function Landing() {
  return (
    <>
      <main>
        <div>
          <Carrossel items={items} />
          <UltimasLicitacoes />
          <Newsletter />
        </div>
      </main>
    </>
  );
}
