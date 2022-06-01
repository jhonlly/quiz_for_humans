import React from 'react';
import { When } from '../../../../../components';

const FeedBack = ({ text }) => {
  return (
    <div style={{ minHeight: '80px' }}>
      <When condition={text !== ''}>
        <h2>
           ❌ The correct answer is: {text}
        </h2>
      </When>
    </div>
  );
};

export default FeedBack;