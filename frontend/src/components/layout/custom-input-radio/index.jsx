import React from 'react';
import styles from './style.module.css';

export default function CustomInputRadio({ name, label, onPress, id }) {
  return (
    <label className={styles.radioButton} htmlFor={id} onClick={onPress}>
      <input type="radio" name={name} id={id} />
      <span></span>
      {label}
    </label>
  );
}
