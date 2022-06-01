import { getQuestions } from '../../data/questions';

const initialState = {
  questions: getQuestions(),
  currentQuestion: {},
  questionIndex: 0,
  isDisabled: false,
  correctAnswer: '',
  results: {
    correct: 0,
    incorrect: 0,
  },
};

const Actions = {
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  SET_QUESTION_INDEX: 'SET_QUESTION_INDEX',
  SET_IS_DISABLED: 'SET_IS_DISABLED',
  SET_CORRECT_ANSWER: 'SET_CORRECT_ANSWER',
  SET_RESULTS: 'SET_RESULTS',
  RESET_QUIZ: 'RESET_QUIZ',
  NEXT_QUESTION: 'NEXT_QUESTION',
};

const reducer = (state, action) => {
  switch (action.type) {
  case Actions.SET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  case Actions.SET_CURRENT_QUESTION:
    return {
      ...state,
      currentQuestion: action.payload,
    };
  case Actions.SET_QUESTION_INDEX:
    return {
      ...state,
      questionIndex: action.payload,
    };
  case Actions.SET_IS_DISABLED:
    return {
      ...state,
      isDisabled: action.payload,
    };
  case Actions.SET_CORRECT_ANSWER:
    return {
      ...state,
      correctAnswer: action.payload,
    };
  case Actions.SET_RESULTS:
    return {
      ...state,
      results: {
        ...state.results,
        ...action.payload
      },
    };

  case Actions.NEXT_QUESTION:
    return {
      ...state,
      questionIndex: state.questionIndex + 1,
      isDisabled: false,
      correctAnswer: '',
    };

  case Actions.RESET_QUIZ:
    return initialState;

  default:
    return state;
  }
};

export {
  initialState,
  Actions,
  reducer,
};