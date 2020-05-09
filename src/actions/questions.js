export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const UNANSWER_QUESTION = 'UNANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
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

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

