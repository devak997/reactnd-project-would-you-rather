import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionAnswer extends Component {
    render() {
        const {
            optionOneText,
            optionTwoText,
            optionOnePercentage,
            optionTwoPercentage,
            user,
            isAnswered
        } = this.props;
        console.log("Is answered", isAnswered);
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
                                <div className="ui basic green button">{optionOneText}</div>
                                <div className="ui basic blue button">{optionTwoText}</div>
                            </div>)
                            : (
                                <div className=''>
                                    <div className="ui labeled fluid button" tabIndex="0">
                                        <div className="ui green right pointing label">
                                            {`${optionOnePercentage}%`}
                                        </div>
                                        <div className="ui  button disabled">
                                            {optionOneText}
                                        </div>
                                    </div>
                                    <div className="ui labeled fluid button " tabIndex="0">
                                        <div className="ui right pointing blue label">
                                            {`${optionTwoPercentage}%`}
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
    const { id, optionOne, optionTwo, author } = questions[match.params.id];
    const user = users[author];
    const optionOneVotes = optionOne.votes;
    const optionTwoVotes = optionTwo.votes;
    const isAnswered = optionOneVotes.concat(optionTwoVotes).includes(authedUser);
    const totalVotes = optionOneVotes.length + optionTwoVotes.length;
    const optionOnePercentage = (optionOneVotes.length / (totalVotes)) * 100;
    const optionTwoPercentage = (optionTwoVotes.length / (totalVotes)) * 100
    return {
        id,
        optionOneText: optionOne.text,
        optionTwoText: optionTwo.text,
        optionOnePercentage,
        optionTwoPercentage,
        user,
        isAnswered
    };

}


export default connect(mapStateToProps)(QuestionAnswer);