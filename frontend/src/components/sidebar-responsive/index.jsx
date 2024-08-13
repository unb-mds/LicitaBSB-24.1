import React from 'react';
import styles from './style.module.css'

export default function SidebarResponsive({showSidebar, setShowSidebar}) {
  return (
    <section style={{display: showSidebar ? 'flex' : 'none'}}>
      <div className={styles.sidebarContainer} onClick={() => setShowSidebar((prev) => !prev)}>
      </div>
      <div className={styles.sidebar}>
        Teste
      </div>
    </section>
  )
}
