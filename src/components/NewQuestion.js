import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddQuestion } from '../actions/shared';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleOnSubmit = e => {
        e.preventDefault();
        this.props.dispatch(handleAddQuestion(this.state.optionOne, this.state.optionTwo,this.props.authedUser));
        this.props.history.push('/');
    }
    render() {
        return (
            <Fragment>
                <h1 className="ui center aligned header">
                    Would you rather? - New Question
                </h1>
                <form className="ui form" onSubmit={this.handleOnSubmit}>
                    <div className="six wide field">
                        <label>Option 1</label>
                        <input type="text" placeholder="Option 1" value={this.state.optionOne} onChange={(e) => this.setState({ optionOne: e.target.value })} />
                    </div>
                    <div className="six wide field">
                        <label>Option 2</label>
                        <input type="text" placeholder="Option 2" value={this.state.optionTwo} onChange={(e) => this.setState({ optionTwo: e.target.value })} />
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </Fragment>

        );
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    };
}

export default withRouter(connect(mapStateToProps)(NewQuestion));