import React from 'react';
import { connect } from 'react-redux';

const Leaderboard = ({ usersList }) => {
    return (
        <ol className="ui very relaxed divided centered list">
            {usersList.map(user => {
                const noOfQuestions = user.questions.length;
                const noOfAnswers = Object.keys(user.answers).length;
                return (
                    <li className="item" key={user.id}>
                        <img className="ui avatar image" src={user.avatarURL} alt='avatar'/>
                        <div className="content">
                            <div className="header">{user.name}</div>
                            <div className="description">
                                {`No. of questions asked: ${noOfQuestions} |
                                No. of questions answered: ${noOfAnswers}`}
                            </div>
                        </div>
                        <div className="right floated content">
                            <div>Score: {noOfQuestions + noOfAnswers}</div>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

function mapStateToProps({ users }) {
    const usersList = Object.values(users).sort((a, b) => (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length))
    return {
        usersList
    }
}

export default connect(mapStateToProps)(Leaderboard);