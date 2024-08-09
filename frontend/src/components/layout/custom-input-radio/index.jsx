import React from 'react';
import styles from "./style.module.css";

export default function CustomInputRadio({ name, label, onPress, id, checked }) {
  return (
    <label className={styles.radioButton} htmlFor={id} onClick={onPress}>
      <input type="radio" name={name} id={id} defaultChecked={checked}/>
      <span></span>
      {label}
    </label>
  )
}
