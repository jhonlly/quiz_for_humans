import * as React from 'react';
import { options } from './Options.module.css';

const Options = ({ answers, isDisabled, required = false }) => {
  return (
    <>
      <select
        disabled={isDisabled}
        className={options}
        required={required}
        hidden="hidden"
      >
        <option>Select answer</option>
        {answers.map((answer, index) => (
          <option key={index} value={answer.answer}>
            {answer.answer}
          </option>
        ))}
      </select>
    </>);
};

export default Options;