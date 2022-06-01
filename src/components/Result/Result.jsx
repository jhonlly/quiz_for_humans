import * as React from 'react';
import { Button } from '../Form';

const Result = ({ result, onClick }) => {
  return (
    <div>
      <h2>{result.correct} correct answers</h2>
      <h2>{result.incorrect} incorrect answers</h2>
      <Button onClick={onClick}>
            Try again
      </Button>
    </div>
  );
};

export default Result;
