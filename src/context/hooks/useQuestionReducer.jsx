import * as React from 'react';
import { Actions,initialState,reducer } from '../reducer/questionReducer';


export const useQuestionReducer = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const setQuestions = React.useCallback((questions) => {
    dispatch({
      type: Actions.SET_QUESTIONS,
      payload: questions,
    });
  }, []);
  const setCurrentQuestion = React.useCallback((currentQuestion) => {
    dispatch({
      type: Actions.SET_CURRENT_QUESTION,
      payload: currentQuestion,
    });
  }, []);
  const setQuestionIndex = React.useCallback((questionIndex) => {
    dispatch({
      type: Actions.SET_QUESTION_INDEX,
      payload: questionIndex,
    });
  }, []);
  const setIsDisabled = React.useCallback((isDisabled) => {
    dispatch({
      type: Actions.SET_IS_DISABLED,
      payload: isDisabled,
    });
  }, []);
  const setCorrectAnswer = React.useCallback((correctAnswer) => {
    dispatch({
      type: Actions.SET_CORRECT_ANSWER,
      payload: correctAnswer,
    });
  }, []);
  const setResults = React.useCallback((results) => {
    dispatch({
      type: Actions.SET_RESULTS,
      payload: results,
    });
  }, []);

  const nextQuestion = React.useCallback(() => {
    dispatch({
      type: Actions.NEXT_QUESTION,
    });
  }, []);

  const resetQuiz = React.useCallback(() => {
    dispatch({
      type: Actions.RESET_QUIZ,
    });
  }, []);

  return {
    state,
    setQuestions,
    setCurrentQuestion,
    setQuestionIndex,
    setIsDisabled,
    setCorrectAnswer,
    setResults,
    resetQuiz,
    nextQuestion,
  };
};