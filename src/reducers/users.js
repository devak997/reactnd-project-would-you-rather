import { RECEIVE_USERS } from '../actions/users';
import { ANSWER_QUESTION, UNANSWER_QUESTION } from '../actions/shared';

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
        default:
            return state
    }
}