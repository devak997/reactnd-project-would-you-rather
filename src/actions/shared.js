import { showLoading, hideLoading } from 'react-redux-loading';
import { _getUsers, _getQuestions, _saveQuestionAnswer } from '../utils/_DATA';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const UNANSWER_QUESTION = 'UNANSWER_QUESTION'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        Promise.all([_getUsers(), _getQuestions()])
            .then(([users, questions]) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            })
            .then(() => dispatch(hideLoading()));
    };
}

export function answerQuestion(qid, answer, authedUser) {
    return {
        type: ANSWER_QUESTION,
        qid,
        answer,
        authedUser
    }
}

export function unanswerQuestion(id, authedUser) {
    return {
        type: UNANSWER_QUESTION,
        id,
        authedUser
    };
}

export function handleAnswerQuestion(qid, answer, authedUser) {
    return (dispatch) => {
        console.log("authed user:", authedUser);
        dispatch(showLoading());
        dispatch(answerQuestion(qid, answer, authedUser));
        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => dispatch(hideLoading()))
            .catch(() => {
                alert('Unable to answer question. Try Again!');
                dispatch(unanswerQuestion(qid, authedUser));
                dispatch(hideLoading());
            })

    }
}