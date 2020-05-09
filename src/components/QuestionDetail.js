import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';

class QuestionDetail extends Component {
    handleOptOneClick = () => {
        this.props.dispatch(handleAnswerQuestion(this.props.id, 'optionOne', this.props.authedUser));
    }
    handleOptTwoClick = () => {
        this.props.dispatch(handleAnswerQuestion(this.props.id, 'optionTwo', this.props.authedUser));
    }
    render() {
        const {
            optionOneText,
            optionTwoText,
            optionOnePercentage,
            optionTwoPercentage,
            user,
            isAnswered,
            answer
        } = this.props;
        return (
            <div className="ui centered card" style={{ marginTop: '100px', width: '500px' }}>
                <div className="content">
                    <img className="right floated mini ui image" src={user.avatarURL} alt='avatar' />
                    <div className="header">
                        {`Asked by, ${user.name},`}
                    </div>
                    <div className="description">
                        Would you rather?
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        {!isAnswered
                            ? (<div className="ui two buttons">
                                <div className="ui basic green button" onClick={this.handleOptOneClick}>{optionOneText}</div>
                                <div className="ui basic blue button" onClick={this.handleOptTwoClick}>{optionTwoText}</div>
                            </div>)
                            : (
                                <div className=''>
                                    <div className="ui labeled fluid button" tabIndex="0">
                                        <div className="ui green right pointing label">
                                            {`${optionOnePercentage}% ${answer === 'optionOne' ? ' (Your Response)' : ''}`}
                                        </div>
                                        <div className="ui  button disabled">
                                            {optionOneText}
                                        </div>
                                    </div>
                                    <div className="ui labeled fluid button " tabIndex="0">
                                        <div className="ui right pointing blue label">
                                            {`${optionTwoPercentage}% ${answer === 'optionTwo' ? ' (Your Response)' : ''}`}
                                        </div>
                                        <div className="ui secondary button disabled">
                                            {optionTwoText}
                                        </div>
                                    </div>
                                </div>
                            )}

                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
    const { id, optionOne, optionTwo, author } = questions[match.params.question_id];
    const user = users[author];
    const optionOneVotes = optionOne.votes;
    const optionTwoVotes = optionTwo.votes;
    const totalVotesLen = optionOneVotes.length + optionTwoVotes.length;
    return {
        id,
        optionOneText: optionOne.text,
        optionTwoText: optionTwo.text,
        optionOnePercentage: ((optionOneVotes.length / (totalVotesLen)) * 100).toFixed(2),
        optionTwoPercentage: ((optionTwoVotes.length / (totalVotesLen)) * 100).toFixed(2),
        user,
        isAnswered: Object.keys(users[authedUser].answers).includes(id),
        authedUser,
        answer: users[authedUser].answers[id]
    };

}


export default connect(mapStateToProps)(QuestionDetail);