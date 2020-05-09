import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAuthedUser } from '../actions/authedUser';

class LoginPage extends Component {
    state = { value: '' }

    handleSelectChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(setAuthedUser(this.state.value))
    }

    render() {
        return (
            <div className="ui middle aligned center aligned grid" style={{ marginTop: "125px" }}>
                <div className="column" style={{ width: 450 }}>
                    <h2 className="ui header">Welcome!</h2>
                    <form className="ui form">
                        <div className="field">
                            <select value={this.state.value} onChange={this.handleSelectChange}>
                                <option disabled value=''>Select Username</option>
                                {this.props.users.map(user => {
                                    return (
                                        <option value={user.id} key={user.id}>
                                            {user.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="ui fluid blue button" onClick={this.handleSubmit}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(LoginPage);