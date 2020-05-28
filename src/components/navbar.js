import React, { Component } from 'react';
import '../style.scss';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { signoutUser } from '../actions';

class Nav extends Component {
    handleSignOut = () => {
        this.props.signoutUser(this.props.history, this.props.editUser);
    }

    authRender = () => {
        if (this.props.user.auth) {
            return (
                <Button onClick={this.handleSignOut} variant="outline-danger">Sign Out</Button>
            );
        } else {
            return (
                <div className="two-buttons">
                    <NavLink to="/signin">Sign In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="sign-out">
                    <div>
                        <NavLink className="brand" to="/">Better-LinkedIn</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/company">Companies</NavLink>
                        <NavLink to="/event">Events</NavLink>
                        <NavLink to="/group">Groups</NavLink>
                    </div>
                    {this.authRender()}
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, { signoutUser })(Nav));
