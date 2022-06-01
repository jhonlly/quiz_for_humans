import * as React from 'react';
import When from '../Conditionals/When';
import Row from '../Row/Row';
import Button from './Button/Button';
import Options from './Options/Options';
import * as Styles from './Form.module.css';
import FeedBack from './FeedBack/FeedBack';

const Form = ({
  checkAnswer = () => {},
  currentQuestion = {},
  isDisabled = false,
  nextQuestion = () => {},
  correctAnswer = '',
  formRef = React.useRef(),
  questionIndex = 0,
}) => (
  <form onSubmit={checkAnswer} ref={formRef}>
    <h2>{currentQuestion?.question}</h2>
    <When condition={currentQuestion?.type === 'options'}>
      <>
        <Options answers={currentQuestion?.answers} isDisabled={isDisabled} required />
        <FeedBack text={correctAnswer} />
      </>
    </When>
    <When condition={currentQuestion?.type === 'text'}>
      <>
        <input className={Styles.inputField} type="text" name={`answer-${questionIndex}`} disabled={isDisabled} required />
        <FeedBack text={correctAnswer} />
      </>
    </When>
    <Row>
      <Button type='submit' disabled={isDisabled}>
          Check
      </Button>
      <When condition={isDisabled}>
        <Button onClick={nextQuestion}> Next </Button>
      </When>
    </Row>
  </form>
);

export default Form;