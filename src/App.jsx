import * as React from 'react';
import { QuestionsProvider } from './context/questionsContext';
import Quiz from './pages/Quiz/Quiz';

function App() {
  return (
    <QuestionsProvider>
      <Quiz />
    </QuestionsProvider>
  );
}

export default App;
