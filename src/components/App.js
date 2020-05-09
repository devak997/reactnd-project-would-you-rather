import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';

import LoginPage from './LoginPage';
import Navbar from './Navbar';
import HomePage from './HomePage';
import { Route, Switch } from 'react-router-dom';
import QuestionDetail from './QuestionDetail';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { authedUser } = this.props;
        return (
            <Fragment>
                <Navbar authedUser={authedUser} />
                <LoadingBar />
                <div className='my-container'>
                    {authedUser === null || authedUser === ''
                        ? <LoginPage />
                        : (
                            <Switch>
                                <Route exact path='/' component={HomePage} />
                                <Route path='/question/:question_id' component={QuestionDetail} />
                                <Route path='/add' component={NewQuestion} />
                                <Route path='/leaderboard' component={Leaderboard}/>
                            </Switch>
                        )}
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App);