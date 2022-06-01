import React from 'react';
import * as Style from './Title.module.css';

const Title = ({ children, ...props }) => (
  <h1 className={`title ${Style.title}`} {...props}>
    {children}
  </h1>
);

export default Title;