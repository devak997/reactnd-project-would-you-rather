import { RECEIVE_QUESTIONS } from '../actions/questions';
import { ANSWER_QUESTION, UNANSWER_QUESTION } from '../actions/shared';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...action.questions
            };
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: [
                            ...state[action.qid][action.answer].votes,
                            action.authedUser
                        ]
                    }
                }
            }
        case UNANSWER_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: [
                            ...state[action.qid][action.answer].votes.filter(uid => uid !== action.authedUser),
                            action.authedUser
                        ]
                    }
                }
            }
        default:
            return state
    }
}