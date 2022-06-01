import * as React from 'react';
import When from '../Conditionals/When';
import { Button } from '../Form';
import * as Style from './Result.module.css';

const Result = ({ result, onClick }) => {
  return (
    <div>
      <p className={Style.text}>{result.correct} correct answers</p>
      <p className={Style.text}>{result.incorrect} incorrect answers</p>
      <When condition={result.correct > result.incorrect}>
        <p className={Style.text}>You are a human!😃 </p>
      </When>
      <When condition={result.correct < result.incorrect}>
        <p className={Style.text}>You are a robot!🤖 </p>
      </When>
      <Button onClick={onClick}>Try again </Button>
    </div>
  );
};

export default Result;
