import React from 'react'
import styles from './style.module.css';

export default function CustomButton({ onPress, title }) {
  return (
    <button
      className={styles.customButton}
      onPress={onPress}
    >
      {title}
    </button>
  )
}
