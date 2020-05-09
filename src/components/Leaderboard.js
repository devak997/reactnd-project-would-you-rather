import React from 'react';
import { connect } from 'react-redux';

const Leaderboard = ({ usersList }) => {
    return (
        <ol className="ui very relaxed divided centered list">
            {usersList.map(user => {
                return (
                    <li className="item" key={user.id}>
                        <img className="ui avatar image" src={user.avatarURL} />
                        <div className="content">
                            <a className="header">{user.name}</a>
                            <div className="description">
                                {`No. of questions: ${user.questions.length} |
                                No. of answers: ${Object.keys(user.answers).length}`}
                            </div>
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