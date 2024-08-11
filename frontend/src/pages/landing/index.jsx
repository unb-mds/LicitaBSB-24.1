import React from 'react';
import UltimasLicitacoes from './ultimas-licitacoes';
import Newsletter from '../../components/newsletter/index.jsx';

export default function Landing() {
  return (
    <>
      <main>
        <div>
          <UltimasLicitacoes />
          <Newsletter />
        </div>
      </main>
    </>
  );
}
