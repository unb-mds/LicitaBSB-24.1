import React from 'react';
import styles from "./style.module.css";

export default function CustomInputCheckbox({ name, label, onPress, id }) {
  return (
    <label className={styles.checkboxBtn} htmlFor={id} onClick={onPress}>
      <input type="checkbox" name={name} id={id} />
      <span></span>
      {label}
    </label>
  )
}
