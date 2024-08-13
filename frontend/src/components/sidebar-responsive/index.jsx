import React from 'react';
import styles from './style.module.css'
import { Link } from 'react-router-dom';

export default function SidebarResponsive({showSidebar, setShowSidebar}) {
  return (
    <section style={{display: showSidebar ? 'flex' : 'none'}}>
      <div className={styles.sidebarContainer} onClick={() => setShowSidebar((prev) => !prev)}>
      </div>
      <div className={styles.sidebar}>
        <ul>
          <li>
            <a href="/licitacoes" onClick={() => setShowSidebar((prev) => !prev)}>
              Licitações
            </a>
          </li>
          <li>
            <a href="/artigos" onClick={() => setShowSidebar((prev) => !prev)}>
              Conheça o Projeto
            </a>
          </li>
          <li>
            <a href="/sobrenos" onClick={() => setShowSidebar((prev) => !prev)}>
              Sobre Nós
            </a>
          </li>
          <li>
            <a href="/dashboard" onClick={() => setShowSidebar((prev) => !prev)}>
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
