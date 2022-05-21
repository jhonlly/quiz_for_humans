import * as React from 'react';
import { Button, Container, Row } from './components';
import { questions } from './data/questions';


function App() {
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const nextQuestion = () => {
    setQuestionIndex((prevState) => {
      if(prevState < questions.length -1 ) {
        return prevState + 1;
      }
      return prevState;
    }
    );
    setIsDisabled(false);
  };

  const checkAnswer = (isAnswer) => {
    console.log({ test: isAnswer });
    setIsDisabled(true);
  };

  React.useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [questionIndex]);


  return (
    <Container>
      <h1>Quiz for humans</h1>
      <input type="range" min={0} max={questions?.length} step="1" value={questionIndex} readOnly/>
      <Row>Question {questionIndex}/{questions.length}</Row>
      <form>
        <h2>{currentQuestion?.question}</h2>
        {
          currentQuestion?.answers?.map((answer,index) => (
            <Row key={index}>
              <Button
                type="button"
                name="answer"
                onClick={() => checkAnswer(answer?.correct)}
                disabled={isDisabled}
                style={ isDisabled ? { color: answer?.correct  ? 'green' : 'red' } : {}}
              >
                {answer.answer}
              </Button>
            </Row>
          ))
        }

      </form>
      <Row>
        <button
          style={{
            marginRight: '10px', padding: '10px 30px', borderRadius: '5px',
            border:'none', backgroundColor: '#00bcd4', color: 'white',
            fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer'
          }}
          type='button'
          onClick={nextQuestion}
          disabled={!isDisabled}
        >
          Next
        </button>
      </Row>

    </Container>
  );
}

export default App;
