import React from 'react';
import styles from './style.module.css';

export default function CustomButton({ onPress, title, light = false }) {
  return (
    <button
      className={`${styles.customButton} ${light ? styles.customButtonLight : ''}`}
      onClick={onPress}
    >
      {title}
    </button>
  );
}
