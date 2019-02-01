import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button: React.SFC<ButtonProps> = (props) => (
  <button className={styles.button} {...props}>{props.text}</button>
);
