import React from 'react';
import styles from './style.module.css';

export default function CustomInputCheckbox({
  checked,
  name,
  label,
  onPress,
  id,
}) {
  return (
    <label className={styles.checkboxBtn} htmlFor={id}>
      <input
        defaultChecked={checked}
        type="checkbox"
        name={name}
        id={id}
        onClick={onPress}
      />
      <span></span>
      <p>{label}</p>
    </label>
  );
}
