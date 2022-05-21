import React from 'react';
import * as Styles from './Button.module.css';

const Button = ({ children, onClick, className, disabled, ...props }) => (
  <button className={ `${Styles.button} ${className}`} onClick={onClick} disabled={disabled} {...props}>
    {children}
  </button>
);

export default Button;