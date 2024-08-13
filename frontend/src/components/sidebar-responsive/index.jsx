import React from 'react';
import styles from './style.module.css'

export default function SidebarResponsive({showSidebar, setShowSidebar}) {
  return (
    <section className={styles.sidebarContainer} style={{display: showSidebar ? 'flex' : 'none'}} onClick={() => setShowSidebar((prev) => !prev)}>

    </section>
  )
}
