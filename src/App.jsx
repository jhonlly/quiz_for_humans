import * as React from 'react';
import { Container, Row, Title, When, Result, Form } from './components';
import { getQuestions } from './data/questions';

function App() {
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [questions, setQuestions] = React.useState(getQuestions() || []);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState('');
  const [results, setResults] = React.useState({
    correct: 0,
    incorrect: 0,
  });

  const formRef = React.useRef();

  React.useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [questionIndex]);

  const nextQuestion = React.useCallback(() => {
    setQuestionIndex((prevState) => prevState + 1);
    setIsDisabled(false);
    setCorrectAnswer('');
    formRef.current[0].value = '';
  }, [setQuestionIndex, setIsDisabled, formRef]);

  const formatValue = React.useCallback((value) =>  value.toLowerCase().trim(), []);

  const checkAnswer = React.useCallback((event) => {
    event.preventDefault();
    const value = formatValue(event.target[0].value);
    const isCorrect = currentQuestion.answers.find((answer) => answer.answer === value && answer.correct);
    setResults((prevState) => ({
      ...prevState,
      correct: isCorrect ? prevState.correct + 1 : prevState.correct,
      incorrect: !isCorrect ? prevState.incorrect + 1 : prevState.incorrect,
    }));

    if (!isCorrect) {
      const correct = currentQuestion.answers.find((answer) => answer.correct);
      setCorrectAnswer(correct?.answer);
    }
    setIsDisabled(true);
  }, [currentQuestion]);

  const resetQuiz = React.useCallback(() => {
    setQuestionIndex(0);
    setIsDisabled(false);
    setCorrectAnswer('');
    setResults({
      correct: 0,
      incorrect: 0,
    });
    setQuestions(getQuestions());
  }, [setQuestionIndex, setIsDisabled, setCorrectAnswer, setResults]);


  const isFinished = React.useMemo(() => questionIndex > questions.length - 1, [questionIndex]);

  return (
    <>
      <Title>Quiz for Humans</Title>
      <Container>
        <When condition={!isFinished}>
          <Row>Question {questionIndex + 1}/{questions.length}</Row>
        </When>
        <When condition={!isFinished}>
          <Form
            currentQuestion={currentQuestion}
            questionIndex={questionIndex}
            isDisabled={isDisabled}
            correctAnswer={correctAnswer}
            formRef={formRef}
            nextQuestion={nextQuestion}
            checkAnswer={checkAnswer}
          />
        </When>
        <When condition={isFinished}>
          <Result result={results} onClick={resetQuiz} />
        </When>
      </Container>
    </>
  );
}

export default App;
