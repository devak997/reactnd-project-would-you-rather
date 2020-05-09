import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DateTimeFormat } from 'intl';
import 'intl/locale-data/jsonp/en.js';

const Question = ({ question, user }) => {
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return (
        <div className="item">
            <div className="right floated content">
                <Link to={`/question/${question.id}`} className="ui blue small button">View Poll</Link>
            </div>
            <img className="ui avatar image" src={user.avatarURL} alt='avatar' />
            <div className="content">
                <div className="header">{user.name}</div>
                <div className="description">
                    <i>
                        {`${DateTimeFormat('en-IN', dateOptions).format(new Date(question.timestamp))} - `}
                    </i>
                    Would you rather,
                    <strong>
                        {` ${question.optionOne.text} or ... `}
                    </strong>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps({ users, questions }, { id }) {
    const question = questions[id];
    return {
        question,
        user: users[question.author]
    }
}

export default connect(mapStateToProps)(Question);