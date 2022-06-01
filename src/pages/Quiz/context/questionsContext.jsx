import * as React from 'react';
import { useQuestionReducer } from '../hooks/useQuestionReducer';

const QuestionsContext = React.createContext();

const QuestionsProvider = ({ children }) => {
  return (
    <QuestionsContext.Provider value={useQuestionReducer()}>
      {children}
    </QuestionsContext.Provider>
  );
};

const useQuestions = () => {
  const context = React.useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};

export {
  QuestionsProvider,
  useQuestions,
};