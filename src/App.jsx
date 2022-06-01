import * as React from 'react';
import { Container, Row, Title, When, Options, Button, Result } from './components';
import { questions } from './data/questions';


function App() {
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState('');
  const formRef = React.useRef();

  const [results, setResults] = React.useState({
    correct: 0,
    incorrect: 0,
  });

  const nextQuestion = React.useCallback(() => {
    setQuestionIndex((prevState) => {
      if(prevState < questions.length -1 ) {
        return prevState + 1;
      }
      return prevState;
    }
    );
    setIsDisabled(false);
    setCorrectAnswers('');
    formRef.current[0].value = '';
  }, [setQuestionIndex, setIsDisabled, formRef]);

  const checkAnswer = React.useCallback((event) => {
    event.preventDefault();
    const value = event.target[0].value;
    const isCorrect = currentQuestion.answers.find((answer) => answer.answer === value && answer.correct);
    if(isCorrect) {
      setResults((prevState) => ({
        ...prevState,
        correct: isCorrect ? prevState.correct + 1 : prevState.correct,
        incorrect: !isCorrect ? prevState.incorrect + 1 : prevState.incorrect,
      }));
    }{
      const correct = currentQuestion.answers.find((answer) => answer.correct);
      console.warn({ correct });
      setCorrectAnswers(correct.answer);
    }

    setIsDisabled(true);

  }, [currentQuestion]);


  React.useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [questionIndex]);


  return (
    <>
      <Title>Quiz for Humans</Title>
      <Container>
        <Row>Question {questionIndex +1 }/{questions.length}</Row>
        {/*Extraer el formulario a un componente. */}
        <form onSubmit={checkAnswer} ref={formRef}>
          <h2>{currentQuestion?.question}</h2>
          <When condition={currentQuestion?.type === 'options'}>
            <>
              <Options
                answers={currentQuestion?.answers}
                isDisabled={isDisabled}
                required
              />
              <When condition={correctAnswers !== ''}>
                <h2>
                  {correctAnswers}
                </h2>
              </When>
            </>
          </When>
          <When condition={currentQuestion?.type === 'text' }>
            <input
              type="text"
              name={`answer-${questionIndex}`}
              disabled={isDisabled}
              required
            />
            <When condition={correctAnswers !== ''}>
              <h2>
                {correctAnswers}
              </h2>
            </When>
          </When>
          <Row>
            <Button type='submit'disabled={isDisabled}>
              Check
            </Button>
            <When condition={isDisabled}>
              <Button onClick={nextQuestion}> Next </Button>
            </When>
          </Row>
        </form>
        <When condition={isFinished}>
          <Result result={results} />
        </When>
        {JSON.stringify(results)}
      </Container>
    </>
  );
}

export default App;
