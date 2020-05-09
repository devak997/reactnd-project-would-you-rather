import { showLoading, hideLoading } from 'react-redux-loading';
import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';
import { receiveUsers } from './users';
import { receiveQuestions, answerQuestion, unanswerQuestion, addQuestion } from './questions';


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



export function handleAnswerQuestion(qid, answer, authedUser) {
    return (dispatch) => {
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

export function handleAddQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestion({optionOneText, optionTwoText, author}).then(question => {
            dispatch(addQuestion(question));
            dispatch(hideLoading());
        })
        .catch(err => console.log(err));


    }
}