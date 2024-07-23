import React from 'react';
import UltimasLicitacoes from './ultimas-licitacoes';
import CampoPesquisa from '../../components/campo-pesquisa';

export default function Landing() {
  return (
    <>
      <main>
        <div>
          <CampoPesquisa />
          <UltimasLicitacoes />
        </div>
      </main>
    </>
  );
}
