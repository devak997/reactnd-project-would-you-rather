import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../actions/authedUser';

const Navbar = ({ authedUser, user, dispatch, history }) => {
    const handleLogoutUser = () => {
        dispatch(logoutUser());
        history.push('/');
    }
    return (
        <div className="ui inverted segment" style={{ borderRadius: 0, marginBottom: 0 }}>
            <div className="ui inverted secondary small menu">
                <div className="item" disabled>
                    Would you rather?
                </div>
                {(authedUser !== null && authedUser !== '') && (
                    <Fragment>
                        <NavLink className="item" exact activeClassName='active' to='/'>
                            Home
                        </NavLink>
                        <NavLink className="item" activeClassName='active' to='/add'>
                            New Question
                        </NavLink>
                        <NavLink className="item" activeClassName='active' to='/leaderboard'>
                            Leaderboard
                        </NavLink>
                        <div className='right menu'>
                            <div className='item'>
                                <div className="ui avatar image">
                                    <img src={user.avatarURL} alt='avatar' />
                                </div>
                                <div className="content">
                                    {user.name}
                                </div>
                            </div>
                            <button className='item' onClick={handleLogoutUser}>
                                Logout
                            </button>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

function mapStateToProps({ users }, { authedUser }) {
    if (authedUser !== null) {
        return {
            user: users[authedUser]
        }
    }
    return {};
}

export default withRouter(connect(mapStateToProps)(Navbar));