import * as React from 'react';
import { Container, Row, Title, When, Result, Form } from '../../components';
import { QuestionsProvider, useQuestions } from '../../context/questionsContext';

const Quiz = () => {
  const {
    state: { questions, results, currentQuestion, questionIndex, isDisabled, correctAnswer },
    setResults, resetQuiz, setCurrentQuestion,
    setIsDisabled, setCorrectAnswer, nextQuestion  } = useQuestions();

  const formRef = React.useRef();

  React.useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [questionIndex]);

  const onNextQuestion = React.useCallback(() => {
    nextQuestion();
    formRef.current[0].value = '';
  }, [questionIndex, setIsDisabled, formRef]);

  const formatValue = React.useCallback((value) =>  value.toLowerCase().trim(), []);

  const checkAnswer = React.useCallback((event) => {
    event.preventDefault();
    const value = formatValue(event.target[0].value);
    const isCorrect = currentQuestion.answers.find((answer) => formatValue(answer.answer) === value && answer.correct);
    setResults(
      {
        correct: isCorrect ? results.correct + 1 : results.correct,
        incorrect: !isCorrect ? results.incorrect + 1 : results.incorrect,
      });

    if (!isCorrect) {
      const correct = currentQuestion.answers.find((answer) => answer.correct);
      setCorrectAnswer(correct?.answer);
    }
    setIsDisabled(true);
  }, [currentQuestion]);

  const isFinished = React.useMemo(() => questionIndex > questions.length - 1, [questionIndex]);

  return (
    <QuestionsProvider>
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
            nextQuestion={onNextQuestion}
            checkAnswer={checkAnswer}
          />
        </When>
        <When condition={isFinished}>
          <Result result={results} onClick={resetQuiz} />
        </When>
      </Container>
    </QuestionsProvider>
  );
};

export default Quiz;
