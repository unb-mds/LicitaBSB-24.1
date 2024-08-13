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
            <Link>Licitações</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
