import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class HomePage extends Component {
    state = { showUnanswered: true }
    render() {
        const { showUnanswered } = this.state;
        const { answered, unanswered } = this.props;
        const ids = showUnanswered ? unanswered : answered;
        return (
            <Fragment>
                <div className="ui two item menu">
                    <div className={`item ${showUnanswered && 'active'}`} onClick={() => this.setState({ showUnanswered: true })}>
                        Unanswered Questions
                    </div>
                    <div className={`item ${!showUnanswered && 'active'}`} onClick={() => this.setState({ showUnanswered: false })}>
                        Answered Questions
                    </div>
                </div>
                <div className='ui very relaxed middle aligned divided large list'>
                    {ids.map(question_id => {
                        return (
                            <Question id={question_id} key={question_id} />
                        );
                    })}
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({ questions, authedUser, users }) {
    const question_ids = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    const answered = question_ids.filter(id => Object.keys(users[authedUser].answers).includes(id));
    const unanswered = question_ids.filter(id => !Object.keys(users[authedUser].answers).includes(id));
    return {
        answered,
        unanswered,
    };
}

export default connect(mapStateToProps)(HomePage);