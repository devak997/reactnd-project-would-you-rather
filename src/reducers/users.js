import { RECEIVE_USERS } from '../actions/users';
import { ANSWER_QUESTION, UNANSWER_QUESTION, ADD_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...action.users
            };
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            };
        case UNANSWER_QUESTION:
            let { [action.qid]: deletedItem, ...rest } = state[action.authedUser].answers
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...rest
                    }
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: [
                        ...state[action.question.author].questions,
                        action.question.id
                    ]
                }
            }
        default:
            return state
    }
}