import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ authedUser, user }) => {
    return (
        <div className="ui inverted segment" style={{ borderRadius: 0, marginBottom: 0 }}>
            <div className="ui inverted secondary small menu">
                <div className="item" disabled>
                    Would you rather?
                </div>
                {(authedUser !== null && authedUser !== '') && (
                    <Fragment>
                        <Link className="active item" to='/'>
                            Home
                        </Link>
                        <Link className="item" to='/add'>
                            New Question
                        </Link>
                        <Link className="item" to='/leaderboard'>
                            Leaderboard
                        </Link>
                        <div className='right menu'>
                            <div className='item'>
                                <div className="ui avatar image">
                                    <img src={user.avatarURL} alt='avatar' />
                                </div>
                                <div className="content">
                                    {user.name}
                                </div>
                            </div>
                            <div className='item'>
                                Logout
                            </div>
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

export default connect(mapStateToProps)(Navbar);