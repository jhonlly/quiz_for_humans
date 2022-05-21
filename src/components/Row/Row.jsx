import * as Styles from './Row.module.css';
import React from 'react';

const Row = ({ children, className, ...props }) => (
  <div className={`${Styles.row} ${className}`} {...props}>
    {children}
  </div>
);

export default Row;